# Digital Farming Platform

A modern farming platform with AI-powered insights, data analytics, and smart crop management.

## Features

- Smart Crop Management
- Data Analytics
- Disease Prevention
- Weather Forecasting
- Subscription Plans with Stripe Integration

## Deployment to Vercel

### Prerequisites

- [Vercel Account](https://vercel.com/signup)
- [GitHub Account](https://github.com/signup)
- [Stripe Account](https://dashboard.stripe.com/register)
- [Firebase Project](https://console.firebase.google.com/)

### Deployment Steps

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import your project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository and click "Import"

3. **Configure Environment Variables**
   - In the Vercel project settings, go to "Environment Variables"
   - Add all the environment variables from your `.env.local` file:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
     NEXT_PUBLIC_FIREBASE_PROJECT_ID
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
     NEXT_PUBLIC_FIREBASE_APP_ID
     NEXT_PUBLIC_FIREBASE_DATABASE_URL
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
     STRIPE_SECRET_KEY
     STRIPE_WEBHOOK_SECRET
     NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID
     NEXT_PUBLIC_STRIPE_PRO_PRICE_ID
     NEXT_PUBLIC_APP_URL
     ```

4. **Configure Stripe Webhook**
   - In your Stripe Dashboard, go to Developers > Webhooks
   - Add a new endpoint: `https://your-vercel-domain.com/api/stripe/webhook`
   - Select events to listen for: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy the Webhook Signing Secret and add it to your Vercel environment variables as `STRIPE_WEBHOOK_SECRET`

5. **Deploy**
   - Vercel will automatically deploy your application
   - Once deployed, you'll get a URL to access your application

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Firebase
- Stripe
- Vercel
