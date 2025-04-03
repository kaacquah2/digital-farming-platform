import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function GET(req: Request) {
  try {
    // Get the authorization header
    const authHeader = req.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Verify the Firebase ID token
    const idToken = authHeader.split("Bearer ")[1]
    const decodedToken = await getAdminAuth().verifyIdToken(idToken)
    const uid = decodedToken.uid

    // Get the customer ID from Firestore
    const db = getAdminFirestore()
    const userDoc = await db.collection('users').doc(uid).get()
    const userData = userDoc.data()
    
    if (!userData?.stripeCustomerId) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 404 }
      )
    }

    // Retrieve the customer's subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: userData.stripeCustomerId,
      status: "active",
      expand: ["data.default_payment_method"],
    })

    if (subscriptions.data.length === 0) {
      return NextResponse.json(
        { subscription: null },
        { status: 200 }
      )
    }

    // Return the most recent subscription
    const subscription = subscriptions.data[0]
    return NextResponse.json({ subscription })
  } catch (error) {
    console.error("Error fetching subscription:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 