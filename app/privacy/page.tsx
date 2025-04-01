import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CropIcon } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-terrabit-900 to-terrabit-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <CropIcon className="h-6 w-6 text-terrabit-400" />
            <span className="text-xl font-bold text-white">TerraBit</span>
          </Link>
          <Button
            asChild
            variant="outline"
            className="border-terrabit-700 text-terrabit-200 hover:bg-terrabit-800 hover:text-white"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        <div className="rounded-lg border border-terrabit-800 bg-terrabit-900/60 p-8 backdrop-blur-sm">
          <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

          <div className="space-y-6">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">1. Introduction</h2>
              <p className="text-terrabit-100">
                TerraBit is committed to protecting your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our digital farming platform. Please read this
                privacy policy carefully.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">2. Information We Collect</h2>
              <p className="text-terrabit-100">
                We collect information that you provide directly to us, such as when you create an account, update your
                profile, use interactive features, or contact us. This may include:
              </p>
              <ul className="mt-2 list-disc pl-6 text-terrabit-100">
                <li>Personal information (name, email address, phone number)</li>
                <li>Farm and field data (location, size, crop types)</li>
                <li>Agricultural practices and inputs</li>
                <li>Soil and crop health data</li>
                <li>Usage data and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">3. How We Use Your Information</h2>
              <p className="text-terrabit-100">We use the information we collect to:</p>
              <ul className="mt-2 list-disc pl-6 text-terrabit-100">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices, updates, and administrative messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Develop new products and services</li>
                <li>Generate anonymized, aggregated data for research and analysis</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">4. Sharing of Information</h2>
              <p className="text-terrabit-100">We may share your information in the following circumstances:</p>
              <ul className="mt-2 list-disc pl-6 text-terrabit-100">
                <li>
                  With vendors, consultants, and service providers who need access to such information to carry out work
                  on our behalf
                </li>
                <li>
                  In response to a request for information if we believe disclosure is in accordance with applicable law
                </li>
                <li>If we believe your actions are inconsistent with our user agreements or policies</li>
                <li>
                  In connection with, or during negotiations of, any merger, sale of company assets, financing, or
                  acquisition of all or a portion of our business by another company
                </li>
                <li>With your consent or at your direction</li>
              </ul>
              <p className="mt-2 text-terrabit-100">
                We may also share aggregated or de-identified information, which cannot reasonably be used to identify
                you.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">5. Data Security</h2>
              <p className="text-terrabit-100">
                We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized
                access, disclosure, alteration, and destruction. However, no security system is impenetrable, and we
                cannot guarantee the security of our systems.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">6. Your Choices</h2>
              <p className="text-terrabit-100">
                You can access and update certain information about you from within your account settings. You can also
                request that we delete your account and associated data by contacting us.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">7. Changes to this Privacy Policy</h2>
              <p className="text-terrabit-100">
                We may change this Privacy Policy from time to time. If we make changes, we will notify you by revising
                the date at the bottom of the policy and, in some cases, we may provide you with additional notice. We
                encourage you to review the Privacy Policy whenever you access our services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">8. Contact Us</h2>
              <p className="text-terrabit-100">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a
                  href="mailto:privacy@terrabit.com"
                  className="text-terrabit-400 hover:text-terrabit-300 hover:underline"
                >
                  privacy@terrabit.com
                </a>
                .
              </p>
            </section>
          </div>

          <div className="mt-8 text-center text-sm text-terrabit-300">Last updated: March 31, 2025</div>
        </div>
      </div>
    </div>
  )
}

