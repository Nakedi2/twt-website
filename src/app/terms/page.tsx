"use client";

import { motion } from "framer-motion";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using the services provided by The Walking Textbooks (TWT), including our website, learning platform, trading academy, AI solutions, and any related applications (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.

These Terms constitute a legally binding agreement between you ("User", "you", or "your") and The Walking Textbooks (Pty) Ltd, a company registered in the Republic of South Africa. We reserve the right to modify these terms at any time, and continued use of the Services constitutes acceptance of any changes.`,
  },
  {
    title: "Use of Services",
    content: `Eligibility: You must be at least 13 years of age to use our Services. Users under 18 must have consent from a parent or legal guardian.

Account Registration: You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

Acceptable Use: You agree to use the Services only for lawful purposes and in accordance with these Terms. You shall not:
• Use the Services in any way that violates applicable South African or international laws
• Attempt to gain unauthorised access to any part of the Services
• Interfere with or disrupt the Services or servers
• Use automated systems to access the Services without our written permission
• Resell or redistribute any content or materials obtained through the Services without written consent`,
  },
  {
    title: "Intellectual Property",
    content: `All content, materials, and intellectual property associated with the Services, including but not limited to text, graphics, logos, course materials, software, AI models, video content, and trading strategies, are the property of TWT or its licensors and are protected by South African and international intellectual property laws.

You are granted a limited, non-exclusive, non-transferable licence to access and use the Services for personal, non-commercial educational purposes. This licence does not include the right to:
• Copy, modify, or distribute any content
• Use any content for commercial purposes without written permission
• Reverse-engineer or decompile any software
• Remove or alter any copyright or proprietary notices`,
  },
  {
    title: "User Accounts",
    content: `When you create an account with TWT, you must provide accurate and complete information. You are responsible for keeping your account details up to date.

Account Security: You are responsible for safeguarding your password and any other credentials used to access the Services. Notify us immediately if you suspect unauthorised access to your account.

Account Termination: We reserve the right to suspend or terminate your account at our discretion if you violate these Terms, engage in fraudulent activity, or for any other reason that we reasonably believe is necessary to protect TWT or its users.

Upon termination, your right to use the Services ceases immediately. We may retain your data as required by law or for legitimate business purposes.`,
  },
  {
    title: "Limitation of Liability",
    content: `To the maximum extent permitted by South African law, TWT and its directors, employees, partners, and agents shall not be liable for:

• Any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services
• Any loss of profits, data, or business opportunities
• Any damages resulting from unauthorised access to or alteration of your data

Our total aggregate liability for any claims arising from or related to the Services shall not exceed the amount you have paid to TWT in the twelve (12) months preceding the claim, or ZAR 1,000, whichever is greater.

Trading Disclaimer: Trading in financial markets involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results. TWT provides educational services only and does not provide financial advice. You are solely responsible for your trading decisions.`,
  },
  {
    title: "Indemnification",
    content: `You agree to indemnify, defend, and hold harmless TWT and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or relating to:

• Your use of the Services
• Your violation of these Terms
• Your violation of any rights of a third party
• Your violation of any applicable laws or regulations

This indemnification obligation survives the termination of your account and your use of the Services.`,
  },
  {
    title: "Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising from or relating to these Terms or the Services shall be subject to the exclusive jurisdiction of the courts of South Africa, specifically the High Court of South Africa, Gauteng Division, Johannesburg.

If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The failure of TWT to exercise any right or provision of these Terms shall not constitute a waiver of such right or provision.`,
  },
  {
    title: "Contact",
    content: `If you have any questions about these Terms of Service, please contact us:

The Walking Textbooks (Pty) Ltd
Email: thewalkingtextbooks@gmail.com
Johannesburg, South Africa

For general enquiries: thewalkingtextbooks@gmail.com
For support: thewalkingtextbooks@gmail.com`,
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden">
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
        <div className="pointer-events-none absolute inset-0 [background-size:60px_60px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <FileText className="mx-auto mb-6 h-12 w-12 text-blue-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            Terms of{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Service
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-4 text-slate-400"
          >
            Last updated: 1 July 2026
          </motion.p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* ================================================================ */}
      {/* CONTENT                                                          */}
      {/* ================================================================ */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-sm leading-relaxed text-slate-400"
        >
          <p>
            Welcome to The Walking Textbooks. These Terms of Service govern your
            use of our website, applications, and services. Please read these
            terms carefully before using our Services. By accessing or using our
            Services, you acknowledge that you have read, understood, and agree
            to be bound by these Terms.
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8"
            >
              <h2 className="mb-4 text-xl font-semibold text-white">
                {index + 1}. {section.title}
              </h2>
              <div className="text-sm leading-relaxed text-slate-400 whitespace-pre-line">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
