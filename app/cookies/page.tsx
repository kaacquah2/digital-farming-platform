import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cookie Policy | TerraBit",
  description: "TerraBit's cookie policy and how we use cookies on our website",
}

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold">Cookie Policy</h1>

        <div className="prose prose-green max-w-none dark:prose-invert">
          <p>Last updated: March 31, 2025</p>

          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to the owners of the
            site.
          </p>

          <h2>How we use cookies</h2>
          <p>TerraBit uses cookies for several purposes, including:</p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> These are necessary for the website to function properly and cannot be
              turned off.
            </li>
            <li>
              <strong>Performance cookies:</strong> These help us understand how visitors interact with our website by
              collecting and reporting information anonymously.
            </li>
            <li>
              <strong>Functional cookies:</strong> These enable the website to provide enhanced functionality and
              personalization.
            </li>
            <li>
              <strong>Targeting cookies:</strong> These may be set through our site by our advertising partners to build
              a profile of your interests.
            </li>
          </ul>

          <h2>Types of cookies we use</h2>

          <h3>Essential cookies</h3>
          <p>
            These cookies are necessary for the website to function and cannot be switched off in our systems. They are
            usually only set in response to actions made by you which amount to a request for services, such as setting
            your privacy preferences, logging in, or filling in forms.
          </p>

          <h3>Performance cookies</h3>
          <p>
            These cookies allow us to count visits and traffic sources so we can measure and improve the performance of
            our site. They help us to know which pages are the most and least popular and see how visitors move around
            the site.
          </p>

          <h3>Functional cookies</h3>
          <p>
            These cookies enable the website to provide enhanced functionality and personalization. They may be set by
            us or by third-party providers whose services we have added to our pages.
          </p>

          <h3>Targeting cookies</h3>
          <p>
            These cookies may be set through our site by our advertising partners. They may be used by those companies
            to build a profile of your interests and show you relevant adverts on other sites.
          </p>

          <h2>Managing cookies</h2>
          <p>
            Most web browsers allow some control of most cookies through the browser settings. To find out more about
            cookies, including how to see what cookies have been set, visit{" "}
            <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
              www.allaboutcookies.org
            </a>
            .
          </p>

          <h2>Changes to our cookie policy</h2>
          <p>
            We may update our cookie policy from time to time. Any changes will be posted on this page and, where
            appropriate, notified to you by email.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have any questions about our use of cookies, please <Link href="/contact">contact us</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}

