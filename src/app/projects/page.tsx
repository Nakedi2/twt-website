"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useAnimation,
  type Variants,
} from "framer-motion";
import {
  Layers,
  ArrowRight,
  ExternalLink,
  Rocket,
  GraduationCap,
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

const categories = ["All", "Education", "Trading", "AI", "Web Development"] as const;

const projects = [
  {
    title: "TWT Learning Platform",
    description:
      "AI-powered adaptive learning platform for South African students that personalises content delivery based on individual learning patterns and progress.",
    tags: ["React", "Node.js", "MongoDB", "AI"],
    gradient: "from-blue-600 to-indigo-600",
    category: "Education",
  },
  {
    title: "ForexPro Trading Bot",
    description:
      "Automated trading bot with 85% win rate on major currency pairs, leveraging machine learning models trained on years of forex market data.",
    tags: ["Python", "MT5", "Machine Learning"],
    gradient: "from-emerald-600 to-teal-600",
    category: "Trading",
  },
  {
    title: "EduChat AI",
    description:
      "Intelligent tutoring chatbot that helps students with math and science questions, providing step-by-step solutions in multiple South African languages.",
    tags: ["OpenAI", "React", "NLP"],
    gradient: "from-purple-600 to-pink-600",
    category: "AI",
  },
  {
    title: "SchoolConnect LMS",
    description:
      "Learning management system for rural South African schools, designed to work on low-bandwidth connections and provide offline-first functionality.",
    tags: ["Next.js", "PostgreSQL", "AWS"],
    gradient: "from-orange-600 to-amber-600",
    category: "Web Development",
  },
  {
    title: "TradeMaster EA",
    description:
      "Expert Advisor for MetaTrader 5 with built-in risk management, advanced pattern recognition, and real-time market analysis for Johannesburg and global markets.",
    tags: ["MQL5", "Python", "Analytics"],
    gradient: "from-cyan-600 to-blue-600",
    category: "Trading",
  },
  {
    title: "Smart Study App",
    description:
      "Mobile app with AI-powered study schedules and progress tracking, helping South African students optimise their revision time ahead of exams.",
    tags: ["React Native", "AI", "Firebase"],
    gradient: "from-rose-600 to-red-600",
    category: "Education",
  },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
              <Layers className="h-3.5 w-3.5" />
              Our Portfolio
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
              Projects
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
          >
            Innovative solutions we&apos;ve built for clients and our own products.
          </motion.p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* ================================================================ */}
      {/* FILTER TABS                                                      */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pt-24 pb-8">
        <Fade className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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
      {/* PROJECTS GRID                                                     */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <Fade className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              layout
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm">
                    View Details
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </div>
                <div className="absolute right-4 top-4">
                  <span className="inline-block rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-lg font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">
                  View Details
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          ))}
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
                Have a Project in Mind?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70 md:text-base">
                We&apos;d love to hear about your idea. Let&apos;s build something
                extraordinary together.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-purple-700 transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  Start a Conversation
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
