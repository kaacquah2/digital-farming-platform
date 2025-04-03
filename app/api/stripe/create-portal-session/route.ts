import { NextResponse } from "next/server"
import Stripe from "stripe"
import { getAdminAuth, getAdminFirestore } from "@/lib/firebase-admin"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function POST(req: Request) {
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

    // Create a Stripe Customer Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: userData.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error creating portal session:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 