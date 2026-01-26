"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
  CreditCard,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 lg:pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-black text-white tracking-tight">
                electhub
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Your one-stop destination for premium electronics. We deliver the
              latest tech with authorized warranty and express shipping across
              the globe.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#ffd700] hover:text-slate-900 transition-all"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#ffd700] hover:text-slate-900 transition-all"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#ffd700] hover:text-slate-900 transition-all"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#ffd700] hover:text-slate-900 transition-all"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#ffd700] transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#ffd700] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Contact Support
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Tech Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Customer Care</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/track-order"
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-policy"
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[#ffd700] transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[#ffd700] transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-[#ffd700] shrink-0" />
                <span>123 Tech Park, Silicon Valley, CA 94025, USA</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-[#ffd700] shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-[#ffd700] shrink-0" />
                <span>support@electhub.com</span>
              </li>
            </ul>

            <div className="pt-4">
              <h4 className="text-sm font-bold text-white mb-2">
                Subscribe to Newsletter
              </h4>
              <div className="flex gap-2">
                <Input
                  placeholder="Your email"
                  className="bg-slate-800 border-none text-white placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-[#ffd700]"
                />
                <Button
                  size="icon"
                  className="bg-[#ffd700] hover:bg-[#ffe135] text-slate-900 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} ElectHub. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-6 w-6" />{" "}
              {/* Placeholder for payment icons */}
              <span>Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
