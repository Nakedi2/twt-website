"use client";

import { motion } from "framer-motion";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const sections = [
  {
    title: "Information We Collect",
    content: `When you interact with The Walking Textbooks (TWT), we may collect the following types of information:

Personal Information: Name, email address, phone number, postal address, and payment details when you register for courses, create an account, or contact us.

Educational Information: Your academic history, course enrolments, learning progress, grades, and assessment results to provide personalised learning experiences.

Technical Information: IP address, browser type, operating system, device identifiers, and usage data collected automatically through cookies and similar technologies when you visit our website or use our platform.

Communication Data: Records of your correspondence with us, including support tickets, feedback, and survey responses.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect for the following purposes:

Service Delivery: To provide, maintain, and improve our tutoring, trading education, AI solutions, and technology services. This includes processing enrolments, delivering course content, and tracking learning progress.

Personalisation: To tailor your learning experience, recommend relevant courses, and provide adaptive content through our AI-powered systems.

Communication: To send you course updates, newsletters, marketing materials (with your consent), and respond to your enquiries. You can opt out of marketing communications at any time.

Payment Processing: To process transactions securely and maintain accurate financial records.

Analytics and Improvement: To analyse usage patterns, conduct research, and improve our platform, content, and services.

Legal Compliance: To comply with applicable South African laws, including the Protection of Personal Information Act (POPIA), and to protect our legal rights.`,
  },
  {
    title: "Data Security",
    content: `TWT takes the security of your personal information seriously. We implement appropriate technical and organisational measures to protect your data against unauthorised access, alteration, disclosure, or destruction. These measures include:

Encryption of data in transit (TLS/SSL) and at rest
Regular security assessments and penetration testing
Access controls and authentication mechanisms
Employee training on data protection practices
Secure data storage facilities within South Africa

While we strive to protect your information, no method of transmission over the Internet or electronic storage is completely secure. We cannot guarantee absolute security but are committed to implementing industry best practices to safeguard your data.`,
  },
  {
    title: "Cookies",
    content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us understand how you use our site.

Essential Cookies: Required for the website to function properly, including session management and security features.

Analytics Cookies: Help us understand how visitors interact with our website, allowing us to improve performance and user experience.

Marketing Cookies: Used to deliver relevant advertisements and track the effectiveness of our marketing campaigns.

You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.`,
  },
  {
    title: "Third-Party Links",
    content: `Our website and services may contain links to third-party websites, platforms, or services that are not operated by TWT. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party services before providing them with your personal information.

Third-party services we may integrate with include payment processors, analytics providers, and educational tools. These providers have their own privacy policies governing the use of your information.`,
  },
  {
    title: "Children's Privacy",
    content: `TWT provides services to learners of various ages, including minors under the age of 18. We are committed to protecting the privacy of children in accordance with South African law.

For learners under 18, we require verifiable consent from a parent or legal guardian before collecting personal information. Parents and guardians have the right to review, modify, or request deletion of their child's personal information at any time by contacting us directly.

We do not knowingly collect personal information from children under 13 without parental consent, and we do not use children's data for marketing purposes.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we make material changes, we will notify you through our website, email, or other appropriate channels.

We encourage you to review this policy periodically to stay informed about how we protect your information. Your continued use of our services after any changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

The Walking Textbooks (TWT)
Email: thewalkingtextbooks@gmail.com
Johannesburg, South Africa

You also have the right to lodge a complaint with the Information Regulator of South Africa if you believe your privacy rights have been infringed.`,
  },
];

export default function PrivacyPage() {
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
            <Shield className="mx-auto mb-6 h-12 w-12 text-blue-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            Privacy{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Policy
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
            The Walking Textbooks (&quot;TWT&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is
            committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when
            you visit our website and use our services. This policy is compliant
            with the Protection of Personal Information Act (POPIA) of South
            Africa.
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
