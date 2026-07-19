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
  BookOpen,
  TrendingUp,
  Monitor,
  Brain,
  Code,
  Search,
  Compass,
  Rocket,
  Headphones,
  ArrowRight,
  GraduationCap,
  CheckCircle,
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

const services = [
  {
    icon: BookOpen,
    title: "Academic Tutoring",
    description:
      "Expert tutoring in Mathematics, Physical Sciences, Life Sciences, and Geography for learners across South Africa.",
    href: "/services/tutoring",
    gradient: "from-blue-500 to-cyan-400",
    features: [
      "Matric & university preparation",
      "Personalised study plans",
      "Online & in-person sessions",
    ],
  },
  {
    icon: TrendingUp,
    title: "Trading Academy",
    description:
      "Master the art of trading with comprehensive courses covering Forex, Technical Analysis, Risk Management, and Trading Psychology.",
    href: "/services/trading-academy",
    gradient: "from-emerald-500 to-teal-400",
    features: [
      "Live trading sessions",
      "Expert mentorship",
      "Real-time practice accounts",
    ],
  },
  {
    icon: Monitor,
    title: "Technology Solutions",
    description:
      "Cutting-edge technology solutions including MT5 Expert Advisors, AI Trading Systems, and automation tools.",
    href: "/services/technology",
    gradient: "from-violet-500 to-purple-400",
    features: [
      "Custom Expert Advisors",
      "AI-powered trading bots",
      "Intelligent automation",
    ],
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description:
      "Custom artificial intelligence solutions, machine learning models, educational AI tools, and intelligent chatbots.",
    href: "/services/ai-solutions",
    gradient: "from-pink-500 to-rose-400",
    features: [
      "Custom AI development",
      "Machine learning models",
      "Educational AI platforms",
    ],
  },
  {
    icon: Code,
    title: "Software Development",
    description:
      "Full-stack software development including web applications, desktop applications, and custom automation tools.",
    href: "/services",
    gradient: "from-orange-500 to-amber-400",
    features: [
      "Web & mobile applications",
      "Desktop software",
      "Custom automation tools",
    ],
  },
];

const processSteps = [
  {
    icon: Search,
    title: "Discovery",
    description: "We understand your needs",
  },
  {
    icon: Compass,
    title: "Strategy",
    description: "We create a tailored plan",
  },
  {
    icon: Rocket,
    title: "Delivery",
    description: "We execute with precision",
  },
  {
    icon: Headphones,
    title: "Support",
    description: "We're there every step of the way",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-slate-950 dark:text-slate-100 antialiased overflow-x-hidden">
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
        <div className="pointer-events-none absolute inset-0 [background-size:60px_60px] [background-image:linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />

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
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-700 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <GraduationCap className="h-3.5 w-3.5" />
              Comprehensive Solutions
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-slate-400 md:text-xl"
          >
            Comprehensive solutions spanning education, technology, and
            artificial intelligence.
          </motion.p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-slate-950" />
      </section>

      {/* ================================================================ */}
      {/* SERVICES GRID                                                    */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 py-24">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What We{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Offer
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-slate-400">
            Five core service pillars designed to meet the diverse needs of
            students, educators, traders, and businesses across South Africa.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-8 backdrop-blur-sm transition-all hover:border-gray-300 hover:bg-gray-100 dark:border-white/[0.06] dark:bg-white/[0.02] dark:hover:border-white/[0.12] dark:hover:bg-white/[0.04]"
            >
              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                <service.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-slate-400">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2">
                {service.features.map((feature) => (
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
                href={service.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Learn More
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* PROCESS                                                          */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-6xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            How We{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-slate-400">
            A proven four-step process that ensures every engagement delivers
            measurable results.
          </p>
        </Fade>

        <Fade className="mt-16">
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-[36px] hidden h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 md:block" />

            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:border-white/10">
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  <step.icon className="h-7 w-7 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* CTA                                                              */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-4xl px-6 pb-28">
        <Fade>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 px-8 py-16 text-center shadow-2xl shadow-purple-500/20 md:px-16">
            <div className="pointer-events-none absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Not Sure Which Service Is Right For You?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70 md:text-base">
                Our team will help you find the perfect solution tailored to
                your specific needs and goals.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-purple-700 transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  Get a Free Consultation
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
