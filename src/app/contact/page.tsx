"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ChevronDown,
  ArrowRight,
  Twitter,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  ExternalLink,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "thewalkingtextbooks@gmail.com",
    subtitle: "We respond within 24 hours",
    href: "mailto:thewalkingtextbooks@gmail.com",
    gradient: "from-[#6C3CE1] to-[#00D4FF]",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+27 65 638 7182",
    subtitle: "Mon-Fri 8AM-5PM",
    href: "tel:+27656387182",
    gradient: "from-[#00D4FF] to-[#6C3CE1]",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Johannesburg, South Africa",
    subtitle: "Gauteng Province",
    href: "#map",
    gradient: "from-[#6C3CE1] to-purple-500",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Mon-Fri 8AM-5PM",
    subtitle: "Sat 9AM-1PM",
    href: "#",
    gradient: "from-purple-500 to-[#00D4FF]",
  },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter / X", href: "#", color: "hover:bg-sky-500", brandColor: "#1DA1F2" },
  { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:bg-[#0A66C2]", brandColor: "#0A66C2" },
  { icon: Instagram, label: "Instagram", href: "#", color: "hover:bg-gradient-to-tr hover:from-[#F56040] hover:to-[#C13584]", brandColor: "#E4405F" },
  { icon: Facebook, label: "Facebook", href: "#", color: "hover:bg-[#1877F2]", brandColor: "#1877F2" },
  { icon: Youtube, label: "YouTube", href: "#", color: "hover:bg-[#FF0000]", brandColor: "#FF0000" },
];

const faqs = [
  {
    question: "What services does The Walking Textbooks offer?",
    answer:
      "We offer a comprehensive range of services including EdTech platforms, AI-powered learning tools, trading education through our Trading Academy, custom software development, digital marketing, e-learning content creation, and innovation consulting for businesses and educational institutions.",
  },
  {
    question: "How can I enrol in the Trading Academy?",
    answer:
      "You can enrol in our Trading Academy by visiting our services page or contacting us directly. We offer courses for all levels — from beginner to advanced — covering technical analysis, fundamental analysis, risk management, and trading psychology. Our expert instructors guide you through every step of your trading journey.",
  },
  {
    question: "Do you offer corporate or institutional training?",
    answer:
      "Yes, we work with businesses, schools, universities, and government institutions across Africa. We offer tailored training programmes, bulk licensing for our e-learning platforms, and custom AI solutions designed to meet the specific needs of your organisation. Contact us to discuss your requirements.",
  },
  {
    question: "What countries do you operate in?",
    answer:
      "While headquartered in South Africa, TWT serves students and clients across more than 10 countries in Africa and beyond. Our online platforms and digital services are accessible globally, and we're continually expanding our reach to serve more communities.",
  },
];

const subjectOptions = [
  "General Inquiry",
  "Tutoring",
  "Trading Academy",
  "AI Solutions",
  "Technology",
  "Partnership",
  "Other",
];

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200/60 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-white/5 backdrop-blur-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="text-sm font-medium text-gray-900 dark:text-white">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 border-t border-gray-100 dark:border-white/5">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pt-4">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject) newErrors.subject = "Please select a subject";
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#1a1040] to-[#2d1b69] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-[#6C3CE1]/20 blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-[#00D4FF]/15 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-gray-300 mb-8"
            >
              <MessageSquare className="h-4 w-4 text-[#00D4FF]" />
              Contact Us
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              Get In{" "}
              <span className="bg-gradient-to-r from-[#6C3CE1] to-[#00D4FF] bg-clip-text text-transparent">
                Touch
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              We&apos;d love to hear from you. Reach out to us for any inquiries and we&apos;ll get back to you as soon as possible.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20 lg:py-28 bg-white dark:bg-[#0A1628]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form - 60% */}
            <AnimatedSection className="lg:col-span-3">
              <div className="relative rounded-2xl bg-gray-50 dark:bg-white/5 backdrop-blur-xl border border-gray-200/60 dark:border-white/10 p-6 sm:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6C3CE1]/5 via-transparent to-[#00D4FF]/5 pointer-events-none rounded-2xl" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Fill out the form below and we&apos;ll get back to you shortly.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Full Name"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                      />
                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        placeholder="+27 65 638 7182"
                        value={formData.phone}
                        onChange={handleChange}
                        hint="Optional"
                      />
                      <div className="w-full">
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`
                            w-full rounded-xl px-4 py-2.5 text-sm
                            bg-white dark:bg-white/5
                            border transition-all duration-200
                            text-gray-900 dark:text-white
                            focus:outline-none focus:ring-2 focus:ring-offset-0
                            ${
                              errors.subject
                                ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                                : "border-gray-300 dark:border-white/10 focus:ring-[#6C3CE1]/20 focus:border-[#6C3CE1]"
                            }
                          `}
                        >
                          <option value="">Select a subject</option>
                          {subjectOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        {errors.subject && (
                          <p className="mt-1.5 text-sm text-red-500">{errors.subject}</p>
                        )}
                      </div>
                    </div>

                    <Textarea
                      label="Message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      error={errors.message}
                    />

                    {/* Status Messages */}
                    <AnimatePresence>
                      {submitStatus === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20"
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                          <p className="text-sm text-green-700 dark:text-green-300">
                            Message sent successfully! We&apos;ll get back to you within 24 hours.
                          </p>
                        </motion.div>
                      )}
                      {submitStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20"
                        >
                          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                          <p className="text-sm text-red-700 dark:text-red-300">
                            Something went wrong. Please try again or email us directly.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isSubmitting}
                      icon={!isSubmitting ? <Send className="h-5 w-5" /> : undefined}
                      iconPosition="right"
                      fullWidth
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Info - 40% */}
            <AnimatedSection delay={0.1} className="lg:col-span-2">
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200/60 dark:border-white/10 group block"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6C3CE1]/5 via-transparent to-[#00D4FF]/5 pointer-events-none rounded-2xl" />
                    <div className={`relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} text-white flex-shrink-0 shadow-md`}>
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {info.title}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">
                        {info.details}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                        {info.subtitle}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section id="map" className="bg-gray-50 dark:bg-[#060e1a]">
        <AnimatedSection>
          <div className="w-full h-[400px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113712.75405369241!2d27.9375!3d-26.2041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1eab4e4b3e4b3e4b%3A0x1eab4e4b3e4b3e4b!2sJohannesburg%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TWT Location - Johannesburg, South Africa"
            />
          </div>
        </AnimatedSection>
      </section>

      {/* Social Media Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-[#0A1628]">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Connect With Us"
              subtitle="Follow us on social media to stay updated with our latest news and content."
              gradient
            />
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-12"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex flex-col items-center gap-3 p-6 sm:p-8 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 min-w-[120px] sm:min-w-[140px] group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 group-hover:text-white group-hover:bg-[#6C3CE1] transition-all duration-300">
                  <social.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {social.label}
                </span>
                <ExternalLink className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 lg:py-28 bg-gray-50 dark:bg-[#060e1a]">
        <Container>
          <AnimatedSection>
            <SectionHeading
              title="Frequently Asked Questions"
              subtitle="Quick answers to the questions we hear most."
              gradient
            />
          </AnimatedSection>

          <div className="max-w-3xl mx-auto mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedSection key={faq.question} delay={index * 0.05}>
                <FAQItem question={faq.question} answer={faq.answer} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="text-center mt-10">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#6C3CE1] dark:text-[#00D4FF] hover:underline underline-offset-4"
              >
                <HelpCircle className="h-4 w-4" />
                View All FAQs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0A1628] via-[#1a1040] to-[#2d1b69] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-32 h-96 w-96 rounded-full bg-[#6C3CE1]/15 blur-3xl" />
          <div className="absolute bottom-1/4 -left-32 h-96 w-96 rounded-full bg-[#00D4FF]/10 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#6C3CE1]/10 to-[#00D4FF]/10 text-[#00D4FF] mb-6">
                <Sparkles className="h-7 w-7" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
                Ready to Get{" "}
                <span className="bg-gradient-to-r from-[#6C3CE1] to-[#00D4FF] bg-clip-text text-transparent">
                  Started?
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
                Let&apos;s discuss how TWT can help you achieve your goals. Whether it&apos;s education,
                technology, or AI — we have the expertise to make it happen.
              </p>
              <Button href="/services" variant="primary" size="lg" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
                Start Your Journey
              </Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/27656387182"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(37, 211, 102, 0.4)",
              "0 0 0 12px rgba(37, 211, 102, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </motion.div>
      </motion.a>
    </main>
  );
}
