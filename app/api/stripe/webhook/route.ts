import { NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"
import { getAdminFirestore } from "@/lib/firebase-admin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    )
  }

  try {
    const db = getAdminFirestore()
    
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const subscriptionId = session.subscription as string
        const customerId = session.customer as string
        const priceId = session.metadata?.priceId
        const userId = session.metadata?.userId

        if (!userId) {
          console.error("No userId found in session metadata")
          break
        }

        // Update user's subscription status in Firestore
        await db.collection('users').doc(userId).update({
          stripeCustomerId: customerId,
          subscriptionId: subscriptionId,
          subscriptionStatus: 'active',
          subscriptionPlan: priceId,
          updatedAt: new Date().toISOString()
        })

        console.log(`Subscription created: ${subscriptionId} for customer: ${customerId} with price: ${priceId}`)
        break
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        const status = subscription.status

        // Find user by Stripe customer ID
        const usersSnapshot = await db.collection('users')
          .where('stripeCustomerId', '==', customerId)
          .limit(1)
          .get()

        if (usersSnapshot.empty) {
          console.error(`No user found with Stripe customer ID: ${customerId}`)
          break
        }

        const userDoc = usersSnapshot.docs[0]
        
        // Update user's subscription status
        await userDoc.ref.update({
          subscriptionStatus: status,
          updatedAt: new Date().toISOString()
        })

        console.log(`Subscription updated for customer: ${customerId} to status: ${status}`)
        break
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Find user by Stripe customer ID
        const usersSnapshot = await db.collection('users')
          .where('stripeCustomerId', '==', customerId)
          .limit(1)
          .get()

        if (usersSnapshot.empty) {
          console.error(`No user found with Stripe customer ID: ${customerId}`)
          break
        }

        const userDoc = usersSnapshot.docs[0]
        
        // Update user's subscription status
        await userDoc.ref.update({
          subscriptionStatus: 'canceled',
          updatedAt: new Date().toISOString()
        })

        console.log(`Subscription canceled for customer: ${customerId}`)
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
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