import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = headers()
  const signature = headersList.get("stripe-signature")

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing stripe signature or webhook secret" },
      { status: 400 }
    )
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id
        const subscriptionId = session.subscription as string

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const priceId = subscription.items.data[0].price.id

        // Determine plan type
        let planType = "basic"
        if (priceId.includes("pro")) {
          planType = "pro"
        } else if (priceId.includes("enterprise")) {
          planType = "enterprise"
        }

        // Update user's subscription in Firestore
        await setDoc(
          doc(db, "users", userId),
          {
            subscription: {
              status: "active",
              plan: planType,
              subscriptionId: subscriptionId,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
          },
          { merge: true }
        )

        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata.userId

        if (userId) {
          await setDoc(
            doc(db, "users", userId),
            {
              subscription: {
                status: subscription.status,
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              },
            },
            { merge: true }
          )
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata.userId

        if (userId) {
          await setDoc(
            doc(db, "users", userId),
            {
              subscription: {
                status: "canceled",
                currentPeriodEnd: new Date(subscription.current_period_end * 1000),
              },
            },
            { merge: true }
          )
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 }
    )
  }
} 