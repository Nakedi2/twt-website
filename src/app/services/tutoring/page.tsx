"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useAnimation,
  type Variants,
} from "framer-motion";
import {
  Calculator,
  Atom,
  Leaf,
  Map,
  CheckCircle,
  Users,
  Calendar,
  BarChart3,
  Award,
  DollarSign,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Star,
  Clock,
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

const subjects = [
  {
    icon: Calculator,
    title: "Mathematics",
    topics: ["Algebra", "Calculus", "Geometry", "Statistics", "Trigonometry"],
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Atom,
    title: "Physical Sciences",
    topics: ["Mechanics", "Thermodynamics", "Waves", "Electricity", "Chemistry"],
    gradient: "from-purple-500 to-violet-400",
  },
  {
    icon: Leaf,
    title: "Life Sciences",
    topics: ["Biology", "Ecology", "Genetics", "Human Biology", "Environmental Studies"],
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: Map,
    title: "Geography",
    topics: ["Physical Geography", "Human Geography", "Map Skills", "Climate Studies"],
    gradient: "from-orange-500 to-amber-400",
  },
];

const features = [
  {
    icon: Users,
    title: "Qualified Tutors",
    description: "University-educated tutors with teaching experience",
  },
  {
    icon: BookOpen,
    title: "Personalised Learning",
    description: "Custom study plans tailored to each student",
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Online and in-person sessions at your convenience",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Regular assessments and progress reports",
  },
  {
    icon: Award,
    title: "Exam Preparation",
    description: "Matric and university exam preparation",
  },
  {
    icon: DollarSign,
    title: "Affordable Rates",
    description: "Competitive pricing with package deals",
  },
];

const steps = [
  {
    number: "01",
    title: "Tell Us About Yourself",
    description:
      "Share your academic goals, current standing, and the subjects you need help with. We'll match you with the ideal tutor.",
  },
  {
    number: "02",
    title: "Get Matched",
    description:
      "We pair you with a qualified tutor who specialises in your subject area and understands the South African curriculum.",
  },
  {
    number: "03",
    title: "Start Learning",
    description:
      "Begin your personalised learning journey with structured sessions, practice materials, and real-time feedback.",
  },
  {
    number: "04",
    title: "Track Your Progress",
    description:
      "Receive regular progress reports, take assessments, and watch your confidence and grades improve.",
  },
];

const packages = [
  {
    name: "Basic",
    price: "R250",
    period: "per session",
    description: "Perfect for occasional support and homework help",
    features: [
      "1-on-1 tutoring sessions",
      "Subject-specific support",
      "Homework assistance",
      "Basic progress reports",
      "Email support",
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    popular: false,
  },
  {
    name: "Standard",
    price: "R899",
    period: "per month",
    description: "The most popular choice for consistent academic improvement",
    features: [
      "8 tutoring sessions per month",
      "Personalised study plan",
      "Practice tests & materials",
      "Detailed progress reports",
      "WhatsApp support",
      "Exam preparation",
    ],
    gradient: "from-blue-500/30 to-purple-500/30",
    popular: true,
  },
  {
    name: "Premium",
    price: "R1,699",
    period: "per month",
    description: "Comprehensive support for maximum academic achievement",
    features: [
      "16 tutoring sessions per month",
      "Multi-subject support",
      "AI-powered practice platform",
      "Weekly progress reports",
      "Priority WhatsApp support",
      "Exam preparation & revision",
      "Parent progress updates",
    ],
    gradient: "from-purple-500/30 to-pink-500/30",
    popular: false,
  },
];

export default function TutoringPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 antialiased overflow-x-hidden">
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
        <div className="pointer-events-none absolute inset-0 [background-size:60px_60px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />

        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[15%] top-[30%] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-700 dark:text-slate-300 backdrop-blur-sm">
              <GraduationCap className="h-3.5 w-3.5" />
              Academic Excellence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
          >
            Academic{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Tutoring
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-slate-400 md:text-xl"
          >
            Expert guidance to help students excel in their academic journey.
          </motion.p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-slate-950" />
      </section>

      {/* ================================================================ */}
      {/* SUBJECTS GRID                                                    */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 py-24">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Subjects We{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Cover
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-slate-400">
            Comprehensive tutoring across the core subjects that matter most
            for South African learners.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <motion.div
              key={subject.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02] p-7 backdrop-blur-sm transition-all hover:border-gray-300 hover:bg-gray-100 dark:hover:border-white/[0.12] dark:hover:bg-white/[0.04]"
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${subject.gradient} shadow-lg`}>
                <subject.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {subject.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {subject.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300"
                  >
                    <CheckCircle className="h-3.5 w-3.5 shrink-0 text-green-400" />
                    {topic}
                  </li>
                ))}
              </ul>
              <button className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors hover:text-blue-500 dark:hover:text-blue-300">
                Learn More
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* FEATURES                                                         */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why Choose Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Tutoring?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-slate-400">
            We combine expert teaching with modern tools to deliver an
            unmatched learning experience.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02] p-7 transition-all hover:border-gray-300 hover:bg-gray-100 dark:hover:border-white/[0.12] dark:hover:bg-white/[0.04]"
            >
              <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* HOW IT WORKS                                                     */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-6xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            How It{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-slate-400">
            Getting started is simple. Follow these four steps to begin your
            journey to academic success.
          </p>
        </Fade>

        <Fade className="mt-16 grid gap-8 md:grid-cols-4">
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="relative text-center"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-gray-200 dark:ring-white/10">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* PRICING                                                          */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Packages
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-slate-400">
            Flexible pricing options designed to fit every budget and learning
            requirement.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={fadeUp}
              className={`relative overflow-hidden rounded-2xl border p-8 transition-all ${
                pkg.popular
                  ? "border-blue-500/30 bg-gray-100 dark:bg-white/[0.04] ring-1 ring-blue-500/20"
                  : "border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/[0.12]"
              }`}
            >
              {pkg.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Most Popular
                </span>
              )}
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${pkg.gradient}`}>
                <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{pkg.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{pkg.price}</span>
                <span className="text-sm text-gray-600 dark:text-slate-400">{pkg.period}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">{pkg.description}</p>
              <ul className="mt-6 space-y-3">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300"
                  >
                    <CheckCircle className="h-4 w-4 shrink-0 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all ${
                  pkg.popular
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:brightness-110"
                    : "border border-gray-200 dark:border-white/15 bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-slate-200 backdrop-blur-sm hover:border-gray-300 dark:hover:border-white/25 hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* TESTIMONIAL                                                      */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-4xl px-6 pb-28">
        <Fade>
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02] p-10 md:p-14">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="relative z-10">
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-gray-700 dark:text-slate-300 md:text-xl">
                &ldquo;My son struggled with Mathematics for years. After just
                three months with TWT&apos;s tutoring service, his marks
                improved from 42% to 78%. The personalised approach and
                dedicated tutor made all the difference. We could not be
                happier with the results.&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white">
                  NP
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Nomsa Phiri
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-500">
                    Parent, Johannesburg &mdash; Matric 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* CTA                                                              */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-4xl px-6 pb-28">
        <Fade>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-8 py-16 text-center shadow-2xl shadow-purple-500/20 md:px-16">
            <div className="pointer-events-none absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Ready to Improve Your Grades?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70 md:text-base">
                Start your personalised tutoring journey today and see the
                difference expert guidance makes.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-purple-700 transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  Book a Free Trial Session
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
