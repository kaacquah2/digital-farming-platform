import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/digitalfarming",
    icon: Facebook,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/digitalfarming",
    icon: Twitter,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/digitalfarming",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/digitalfarming",
    icon: Linkedin,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/digitalfarming",
    icon: Youtube,
  },
]

export function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Digital Farming</h3>
            <p className="text-sm text-gray-500">
              Empowering farmers with data-driven insights for better crop management.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm text-gray-500 hover:text-gray-900">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-gray-500 hover:text-gray-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-sm text-gray-500 hover:text-gray-900">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-sm text-gray-500 hover:text-gray-900">
                  System Status
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900"
                >
                  <span className="sr-only">{social.name}</span>
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Digital Farming. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

