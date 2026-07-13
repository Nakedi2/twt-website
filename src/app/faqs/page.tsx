"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function Section({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function Fade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

const faqCategories = ["All", "General", "Tutoring", "Trading", "Technology", "AI", "Billing"] as const;

const faqs = [
  {
    question: "What subjects do you tutor?",
    answer:
      "We offer expert tutoring in Mathematics, Physical Sciences, Life Sciences, Geography, Accounting, and English. Our tutors are qualified professionals with deep subject knowledge and experience teaching South African curricula, including CAPS, IEB, and university-level courses. We also provide specialised support for matric exam preparation and university entrance assessments.",
    category: "General",
  },
  {
    question: "How does the Trading Academy work?",
    answer:
      "Our Trading Academy offers a structured curriculum that takes you from complete beginner to confident trader. You'll learn technical analysis, fundamental analysis, risk management, and trading psychology through a combination of video lessons, live trading sessions, and hands-on practice with demo accounts. Each student is assigned a personal mentor who provides one-on-one guidance throughout the programme. We cover forex, commodities, and indices, with a focus on practical strategies that work in the South African and global markets.",
    category: "Trading",
  },
  {
    question: "Do you offer online classes?",
    answer:
      "Yes, all of our tutoring and training services are available online through our custom-built learning platform. Our virtual classrooms support live video, screen sharing, interactive whiteboards, and real-time messaging. You can access classes from any device with an internet connection, making it easy to learn from home, at work, or on the go. We also offer hybrid options for students in Johannesburg who prefer in-person sessions.",
    category: "General",
  },
  {
    question: "What AI solutions do you provide?",
    answer:
      "We develop custom AI solutions including intelligent tutoring chatbots, adaptive learning platforms, predictive analytics dashboards, natural language processing tools, and recommendation engines. Our AI team has experience building solutions for education, finance, and healthcare sectors. We use cutting-edge frameworks and models, including large language models, computer vision, and time-series forecasting, tailored to your specific business needs.",
    category: "AI",
  },
  {
    question: "How much does tutoring cost?",
    answer:
      "Our tutoring rates vary based on the subject, level, and session format. Individual online sessions start from R250 per hour for high school subjects and R400 per hour for university-level courses. We also offer package deals for weekly sessions, matric exam preparation bundles, and group tutoring at reduced rates. Contact us for a personalised quote based on your specific needs.",
    category: "Billing",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time. Monthly subscriptions can be cancelled with immediate effect, and you'll retain access until the end of your current billing period. Annual subscriptions can be cancelled with 30 days' notice, and we offer pro-rated refunds for the remaining period. There are no cancellation fees or hidden charges. Simply email us or manage your subscription through your account dashboard.",
    category: "Billing",
  },
  {
    question: "What programming languages do you teach?",
    answer:
      "Through our technology training programmes, we teach Python, JavaScript, TypeScript, React, Node.js, SQL, and MQL5 (for trading bots). Our curriculum is designed for both beginners and intermediate developers, with project-based learning that builds a real portfolio by the end of each course. We also offer specialised workshops in AI/ML frameworks like TensorFlow, PyTorch, and scikit-learn.",
    category: "Technology",
  },
  {
    question: "Do you provide certificates?",
    answer:
      "Yes, we provide certificates of completion for all our courses and programmes. Our certificates are recognised by employers and educational institutions across South Africa. Trading Academy graduates receive a TWT Certified Trader certificate. Technology course completers receive TWT Developer certifications. Tutoring students receive progress reports and achievement certificates that can be shared with their schools.",
    category: "General",
  },
  {
    question: "How do I get started with trading?",
    answer:
      "Getting started is simple. Enrol in our Trading Foundations course, which covers the basics of financial markets, chart reading, and risk management. You'll receive access to our learning platform, demo trading accounts with virtual capital, and a personal mentor. Most students begin live trading with small amounts after completing the first 4 weeks of the programme. We always emphasise responsible trading and never recommend risking money you cannot afford to lose.",
    category: "Trading",
  },
  {
    question: "Do you offer corporate training?",
    answer:
      "Absolutely. We provide customised corporate training programmes for companies looking to upskill their teams in technology, data analytics, AI, and digital literacy. Our corporate clients include banks, schools, government departments, and tech companies across South Africa. We can deliver training on-site, online, or in a hybrid format, and we tailor the curriculum to your organisation's specific needs and objectives.",
    category: "General",
  },
  {
    question: "What trading platforms do you support?",
    answer:
      "We primarily support MetaTrader 5 (MT5) for forex and CFD trading, which is the most widely used platform in South Africa. We also provide training on TradingView for technical analysis, cTrader for algorithmic trading, and custom Python-based backtesting frameworks. Our technology team builds Expert Advisors and custom indicators for MT5, and we offer consulting services for firms looking to implement automated trading systems.",
    category: "Technology",
  },
  {
    question: "How can I partner with TWT?",
    answer:
      "We're always open to partnerships with schools, universities, corporations, and organisations that share our vision for education and technology. Partnership opportunities include: curriculum integration, co-branded training programmes, technology development collaborations, sponsorships, and community outreach initiatives. Email us at thewalkingtextbooks@gmail.com or fill out the contact form on our website to start a conversation about how we can work together.",
    category: "General",
  },
];

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden">
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
        <div className="pointer-events-none absolute inset-0 [background-size:60px_60px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />

        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[15%] top-[30%] h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm">
              <HelpCircle className="h-3.5 w-3.5" />
              Help Centre
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
          >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
          >
            Find answers to common questions about our services.
          </motion.p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* ================================================================ */}
      {/* SEARCH BAR                                                       */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-3xl px-6 pt-24 pb-6">
        <Fade>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition-colors focus:border-blue-500/50 focus:bg-white/[0.07]"
            />
          </div>
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* CATEGORY FILTERS                                                 */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-3xl px-6 pb-10">
        <Fade className="flex flex-wrap justify-center gap-3">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* FAQ ACCORDION                                                    */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-3xl px-6 pb-28">
        <Fade className="space-y-3">
          {filteredFAQs.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-slate-400">
                No questions found matching your search. Try a different query or
                category.
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.question}
                variants={fadeUp}
                className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/[0.12]"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-block rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-slate-400 ring-1 ring-white/10">
                      {faq.category}
                    </span>
                    <h3 className="text-sm font-semibold text-white md:text-base">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-t border-white/[0.06] px-5 pb-5 pt-4">
                        <p className="text-sm leading-relaxed text-slate-400">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* STILL HAVE QUESTIONS CTA                                         */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-4xl px-6 pb-28">
        <Fade>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 px-8 py-16 text-center shadow-2xl shadow-purple-500/20 md:px-16">
            <div className="pointer-events-none absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

            <div className="relative z-10">
              <MessageCircle className="mx-auto mb-6 h-12 w-12 text-white/80" />
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Still Have Questions?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70 md:text-base">
                Can&apos;t find what you&apos;re looking for? Contact our support
                team and we&apos;ll get back to you within 24 hours.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-purple-700 transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Fade>
      </Section>
    </main>
  );
}
