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
  Bot,
  Brain,
  Zap,
  Terminal,
  ArrowRight,
  GraduationCap,
  Shield,
  Gauge,
  Wrench,
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

const solutions = [
  {
    icon: Bot,
    title: "MT5 Expert Advisors",
    description:
      "Custom automated trading robots for MetaTrader 5. Our Expert Advisors are built with advanced algorithms that execute trades based on predefined strategies, removing emotional bias and operating 24/7 across multiple currency pairs.",
    gradient: "from-violet-500 to-purple-400",
    features: [
      "Custom strategy development",
      "Backtested with historical data",
      "Multi-pair support",
      "Risk management built in",
    ],
  },
  {
    icon: Brain,
    title: "AI Trading Systems",
    description:
      "Machine learning-powered trading algorithms that adapt to changing market conditions. Our AI systems analyse vast datasets to identify patterns and opportunities that human traders often miss.",
    gradient: "from-pink-500 to-rose-400",
    features: [
      "Deep learning models",
      "Real-time market analysis",
      "Adaptive algorithms",
      "Sentiment analysis integration",
    ],
  },
  {
    icon: Zap,
    title: "Automation",
    description:
      "Streamline your trading with intelligent automation tools. From trade execution to portfolio management, our solutions handle repetitive tasks so you can focus on strategy.",
    gradient: "from-amber-500 to-orange-400",
    features: [
      "Automated trade execution",
      "Portfolio rebalancing",
      "Alert systems",
      "Custom workflow automation",
    ],
  },
  {
    icon: Terminal,
    title: "Python Solutions",
    description:
      "Custom Python scripts for data analysis, backtesting, and trading. Leverage the power of Python's data science ecosystem to gain insights and build robust trading tools.",
    gradient: "from-emerald-500 to-teal-400",
    features: [
      "Custom data pipelines",
      "Backtesting frameworks",
      "Signal generation",
      "Performance analytics",
    ],
  },
];

const benefits = [
  {
    icon: Gauge,
    title: "Performance",
    description: "Our solutions are optimised for speed and reliability, executing trades in milliseconds",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Enterprise-grade security protocols protect your data, strategies, and trading accounts",
  },
  {
    icon: Wrench,
    title: "Customisation",
    description: "Every solution is tailored to your specific trading style, risk tolerance, and goals",
  },
];

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden">
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-purple-950">
        <div className="pointer-events-none absolute inset-0 [background-size:60px_60px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />

        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
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
              <GraduationCap className="h-3.5 w-3.5" />
              Trading Technology
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
          >
            Technology{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
          >
            Advanced trading technology and automation solutions.
          </motion.p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* ================================================================ */}
      {/* SOLUTIONS GRID                                                   */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 py-24">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Powerful technology solutions built to give traders a competitive
            edge in the global markets.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 sm:grid-cols-2">
          {solutions.map((solution) => (
            <motion.div
              key={solution.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${solution.gradient} shadow-lg`}>
                <solution.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                {solution.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {solution.description}
              </p>
              <ul className="mt-5 space-y-2">
                {solution.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <CheckCircle className="h-4 w-4 shrink-0 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* FEATURES & BENEFITS                                              */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-6xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why Choose Our{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Technology
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Built by traders, for traders. Our technology is designed with
            performance, security, and customisation at its core.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={fadeUp}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 text-center transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 ring-1 ring-white/10">
                <benefit.icon className="h-7 w-7 text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {benefit.description}
              </p>
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
            Our Development{" "}
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            From initial concept to deployment, we follow a rigorous process
            to ensure every solution meets the highest standards.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-8 md:grid-cols-4">
          {[
            { number: "01", title: "Consultation", description: "We discuss your trading goals, strategies, and technical requirements" },
            { number: "02", title: "Development", description: "Our engineers build your solution using industry best practices and rigorous testing" },
            { number: "03", title: "Backtesting", description: "We validate performance against historical data to ensure reliability" },
            { number: "04", title: "Deployment & Support", description: "We deploy to your environment and provide ongoing maintenance and optimisation" },
          ].map((step) => (
            <motion.div
              key={step.number}
              variants={fadeUp}
              className="text-center"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 ring-1 ring-white/10">
                <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* CTA                                                              */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-4xl px-6 pb-28">
        <Fade>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 px-8 py-16 text-center shadow-2xl shadow-purple-500/20 md:px-16">
            <div className="pointer-events-none absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Ready to Automate Your Trading?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70 md:text-base">
                Let us build a custom technology solution tailored to your
                trading strategy and goals.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-purple-700 transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  Request a Consultation
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
