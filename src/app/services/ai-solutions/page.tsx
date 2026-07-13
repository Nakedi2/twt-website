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
  Settings,
  LineChart,
  GraduationCap,
  MessageSquare,
  ArrowRight,
  Brain,
  Sparkles,
  Database,
  Cpu,
  Globe,
  Layers,
  Zap,
  Shield,
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
    icon: Settings,
    title: "Custom AI Development",
    description:
      "Tailored artificial intelligence solutions built from the ground up to address your specific business challenges. From concept to deployment, we create AI systems that integrate seamlessly with your existing infrastructure.",
    gradient: "from-pink-500 to-rose-400",
    features: [
      "End-to-end AI solution design",
      "Custom model development",
      "Seamless integration with existing systems",
      "Ongoing optimisation and support",
    ],
  },
  {
    icon: LineChart,
    title: "Machine Learning",
    description:
      "Predictive models and data-driven insights that transform raw data into actionable intelligence. Our machine learning solutions help businesses forecast trends, detect anomalies, and make smarter decisions.",
    gradient: "from-blue-500 to-cyan-400",
    features: [
      "Predictive analytics models",
      "Data pipeline development",
      "Real-time inference systems",
      "Model monitoring and retraining",
    ],
  },
  {
    icon: GraduationCap,
    title: "Educational AI",
    description:
      "AI-powered learning tools and adaptive platforms that personalise the educational experience. From intelligent tutoring systems to automated assessment, we build tools that make learning more effective.",
    gradient: "from-emerald-500 to-teal-400",
    features: [
      "Adaptive learning platforms",
      "Intelligent tutoring systems",
      "Automated assessment tools",
      "Curriculum-aligned content generation",
    ],
  },
  {
    icon: MessageSquare,
    title: "Intelligent Chatbots",
    description:
      "24/7 conversational AI for customer support and education. Our chatbots understand context, handle complex queries, and deliver human-like interactions that enhance user experience.",
    gradient: "from-violet-500 to-purple-400",
    features: [
      "Natural language understanding",
      "Multi-language support",
      "Context-aware conversations",
      "Seamless human handoff",
    ],
  },
];

const capabilities = [
  {
    icon: Brain,
    title: "Natural Language Processing",
    description: "Text analysis, sentiment detection, and language generation in multiple South African languages",
  },
  {
    icon: Database,
    title: "Data Analytics",
    description: "Transform raw data into strategic insights with advanced analytics and visualisation",
  },
  {
    icon: Cpu,
    title: "Computer Vision",
    description: "Image recognition, object detection, and visual data processing for various applications",
  },
  {
    icon: Sparkles,
    title: "Generative AI",
    description: "Content generation, creative AI tools, and automated production systems",
  },
];

export default function AISolutionsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden">
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-pink-950 to-purple-950">
        <div className="pointer-events-none absolute inset-0 [background-size:60px_60px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />

        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-pink-500/10 blur-3xl"
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
              <Brain className="h-3.5 w-3.5" />
              Artificial Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
          >
            AI{" "}
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
          >
            Harnessing artificial intelligence to transform education and
            business.
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
            What We{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Build
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            From intelligent chatbots to predictive analytics, we create AI
            solutions that deliver real value.
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
      {/* AI SHOWCASE                                                       */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            AI{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Capabilities
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Our team works across the full spectrum of artificial intelligence
            to deliver comprehensive solutions.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl border border-white/[0.06] p-7 transition-all hover:border-white/[0.12]"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.04))",
              }}
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-2xl" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 ring-1 ring-white/10">
                  <cap.icon className="h-6 w-6 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* TECH STACK                                                       */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-6xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Built with{" "}
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Cutting-Edge Technology
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            We leverage the latest frameworks and tools to build robust,
            scalable AI solutions.
          </p>
        </Fade>

        <Fade className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { icon: Layers, label: "PyTorch" },
            { icon: Brain, label: "TensorFlow" },
            { icon: Sparkles, label: "OpenAI" },
            { icon: Cpu, label: "Hugging Face" },
            { icon: Database, label: "LangChain" },
            { icon: Zap, label: "FastAPI" },
            { icon: Globe, label: "Next.js" },
            { icon: Shield, label: "Scikit-learn" },
          ].map((tech) => (
            <motion.div
              key={tech.label}
              variants={fadeUp}
              className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <tech.icon className="h-8 w-8 text-pink-400" />
              <span className="text-sm font-medium text-slate-300">
                {tech.label}
              </span>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* CTA                                                              */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-4xl px-6 pb-28">
        <Fade>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-purple-600 to-fuchsia-600 px-8 py-16 text-center shadow-2xl shadow-purple-500/20 md:px-16">
            <div className="pointer-events-none absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Let&apos;s Build Something Intelligent
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70 md:text-base">
                Whether you need a simple chatbot or a complex machine
                learning system, our team is ready to bring your AI vision
                to life.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-purple-700 transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  Start Your AI Project
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
