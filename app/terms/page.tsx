import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CropIcon } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>

          <div className="space-y-6">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">1. Acceptance of Terms</h2>
              <p className="text-terrabit-100">
                By accessing or using TerraBit's digital farming platform, you agree to be bound by these Terms of
                Service. If you do not agree to all the terms and conditions, you may not access or use our services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">2. Description of Service</h2>
              <p className="text-terrabit-100">
                TerraBit provides a digital farming platform that offers tools for field management, crop monitoring,
                data analysis, and agricultural recommendations. Our services may change from time to time without prior
                notice.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">3. User Accounts</h2>
              <p className="text-terrabit-100">
                To access certain features of our platform, you must register for an account. You are responsible for
                maintaining the confidentiality of your account information and for all activities that occur under your
                account.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">4. Data Privacy</h2>
              <p className="text-terrabit-100">
                Your use of TerraBit is also governed by our Privacy Policy, which can be found{" "}
                <Link href="/privacy" className="text-terrabit-400 hover:text-terrabit-300 hover:underline">
                  here
                </Link>
                . By using our services, you consent to the collection and use of information as detailed in our Privacy
                Policy.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">5. User Content</h2>
              <p className="text-terrabit-100">
                You retain ownership of any content you submit to our platform. By submitting content, you grant
                TerraBit a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display your
                content for the purpose of providing our services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">6. Prohibited Activities</h2>
              <p className="text-terrabit-100">
                You agree not to engage in any activity that interferes with or disrupts the services or servers
                connected to TerraBit. Prohibited activities include unauthorized access, distribution of malware, and
                any illegal activities.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">7. Termination</h2>
              <p className="text-terrabit-100">
                TerraBit reserves the right to terminate or suspend your account and access to our services at our sole
                discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to
                other users, us, or third parties.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">8. Disclaimer of Warranties</h2>
              <p className="text-terrabit-100">
                TerraBit services are provided "as is" without any warranties, expressed or implied. We do not guarantee
                that our services will be error-free or uninterrupted, or that any defects will be corrected.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">9. Limitation of Liability</h2>
              <p className="text-terrabit-100">
                TerraBit shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                resulting from your use of or inability to use our services.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">10. Changes to Terms</h2>
              <p className="text-terrabit-100">
                We reserve the right to modify these Terms of Service at any time. We will provide notice of significant
                changes by posting the new Terms of Service on our platform. Your continued use of TerraBit after such
                modifications constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-terrabit-300">11. Contact Information</h2>
              <p className="text-terrabit-100">
                If you have any questions about these Terms of Service, please contact us at{" "}
                <a
                  href="mailto:support@terrabit.com"
                  className="text-terrabit-400 hover:text-terrabit-300 hover:underline"
                >
                  support@terrabit.com
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

