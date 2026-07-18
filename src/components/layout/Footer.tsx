"use client";

import React from "react";
import Link from "next/link";
import {
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Academic Tutoring", href: "/services/tutoring" },
  { label: "Trading Academy", href: "/services/trading-academy" },
  { label: "Technology Solutions", href: "/services/technology" },
  { label: "AI Solutions", href: "/services/ai-solutions" },
  { label: "Software Development", href: "/services" },
  { label: "All Services", href: "/services" },
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <img
                src="/logo.jpg"
                alt="The Walking Textbooks"
                className="h-10 w-10 rounded-xl object-cover"
              />
              <div>
                <p className="text-sm font-bold text-white leading-tight">The Walking</p>
                <p className="text-sm font-bold text-[#00D4FF] leading-tight">Textbooks</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Empowering education through technology. We build innovative digital
              solutions for the future of learning in Africa and beyond.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-[#6C3CE1] hover:text-white transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#00D4FF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#00D4FF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#6C3CE1]" />
                <span>Johannesburg, South Africa</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="h-4 w-4 flex-shrink-0 text-[#6C3CE1]" />
                <span>+27 65 638 7182</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="h-4 w-4 flex-shrink-0 text-[#6C3CE1]" />
                <span>thewalkingtextbooks@gmail.com</span>
              </li>
            </ul>

            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Newsletter
            </h4>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
                if (emailInput?.value) {
                  try {
                    const res = await fetch("/api/newsletter", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ email: emailInput.value }),
                    });
                    if (res.ok) {
                      emailInput.value = "";
                      alert("Thank you for subscribing!");
                    } else {
                      const data = await res.json();
                      alert(data.error || "Something went wrong. Please try again.");
                    }
                  } catch {
                    alert("Something went wrong. Please try again.");
                  }
                }
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="flex-1 min-w-0 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6C3CE1]/50 focus:border-[#6C3CE1] transition-all"
              />
              <button
                type="submit"
                className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-r from-[#6C3CE1] to-[#00D4FF] text-white hover:shadow-lg hover:shadow-[#6C3CE1]/25 transition-all"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} The Walking Textbooks. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
