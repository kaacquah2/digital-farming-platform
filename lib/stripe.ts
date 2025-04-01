import { loadStripe, Stripe } from '@stripe/stripe-js';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
}

export const stripePromise: Promise<Stripe | null> = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

interface SubscriptionPlan {
  name: string;
  price: string;
  amount: number;
}

interface SubscriptionPlans {
  basic: SubscriptionPlan;
  pro: SubscriptionPlan;
  enterprise: SubscriptionPlan;
}

export const subscriptionPlans: SubscriptionPlans = {
  basic: {
    name: "Basic",
    price: "price_1R8aWqP9eIEsOwZUiOXyerrW", // Replace with your actual Basic plan price ID
    amount: 29,
  },
  pro: {
    name: "Pro",
    price: "price_1R8aWqP9eIEsOwZUiOXyerrW", // Replace with your actual Pro plan price ID
    amount: 79,
  },
  enterprise: {
    name: "Enterprise",
    price: "price_1R8aWqP9eIEsOwZUiOXyerrW", // Replace with your actual Enterprise plan price ID
    amount: 199,
  },
} 