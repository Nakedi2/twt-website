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
  BarChart3,
  Shield,
  Brain,
  Users,
  Zap,
  Globe,
  Award,
  TrendingUp,
  ArrowRight,
  GraduationCap,
  LineChart,
  Star,
  Target,
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

const courses = [
  {
    icon: BookOpen,
    title: "Forex Basics",
    description:
      "Learn currency pairs, market structure, and trading fundamentals to build a solid foundation in the foreign exchange market.",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: BarChart3,
    title: "Technical Analysis",
    description:
      "Master chart patterns, indicators, and price action strategies to identify high-probability trading setups.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description:
      "Protect your capital with proven risk management techniques used by professional traders worldwide.",
    gradient: "from-purple-500 to-violet-400",
  },
  {
    icon: Brain,
    title: "Trading Psychology",
    description:
      "Develop the mindset of a successful trader by mastering emotions, discipline, and mental resilience.",
    gradient: "from-pink-500 to-rose-400",
  },
];

const features = [
  {
    icon: TrendingUp,
    title: "Live Trading Sessions",
    description: "Watch and learn from professional traders in real-time market conditions",
  },
  {
    icon: Users,
    title: "Mentorship Program",
    description: "One-on-one guidance from experienced traders who have navigated all market conditions",
  },
  {
    icon: Target,
    title: "Real-Time Practice",
    description: "Practice with demo accounts and live market data before risking real capital",
  },
  {
    icon: Globe,
    title: "Community Access",
    description: "Join a thriving community of South African traders sharing insights and strategies",
  },
  {
    icon: Zap,
    title: "Lifetime Updates",
    description: "Course content is continuously updated to reflect current market dynamics",
  },
  {
    icon: Award,
    title: "Certificate of Completion",
    description: "Receive an accredited certificate recognised across the trading industry",
  },
];

const platforms = [
  {
    name: "MetaTrader 5",
    description: "Industry-standard platform for automated and manual trading",
  },
  {
    name: "TradingView",
    description: "Advanced charting and technical analysis with social features",
  },
  {
    name: "AI-Powered Analysis",
    description: "Our proprietary AI tools for pattern recognition and market analysis",
  },
];

const stats = [
  { value: "500+", label: "Students", icon: Users },
  { value: "92%", label: "Profitability", icon: TrendingUp },
  { value: "10+", label: "Countries", icon: Globe },
  { value: "4.9/5", label: "Rating", icon: Star },
];

export default function TradingAcademyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden">
      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-950">
        <div className="pointer-events-none absolute inset-0 [background-size:60px_60px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />

        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[15%] top-[30%] h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm">
              <TrendingUp className="h-3.5 w-3.5" />
              Financial Education
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
          >
            Trading{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Academy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
          >
            Master the markets with comprehensive trading education.
          </motion.p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* ================================================================ */}
      {/* COURSES GRID                                                     */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 py-24">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            A structured curriculum designed to take you from complete beginner
            to confident, profitable trader.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 sm:grid-cols-2">
          {courses.map((course) => (
            <motion.div
              key={course.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${course.gradient} shadow-lg`}>
                <course.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                {course.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {course.description}
              </p>
              <button className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300">
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
            What Makes Our Academy{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Different
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            We go beyond theory. Our academy equips you with practical skills,
            real experience, and ongoing support.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <feature.icon className="h-8 w-8 text-emerald-400" />
              <h3 className="mt-4 text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* PLATFORM SECTION                                                 */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-6xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Powered by{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Industry-Leading Technology
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Learn to trade using the same platforms and tools used by
            professional traders worldwide.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 md:grid-cols-3">
          {platforms.map((platform) => (
            <motion.div
              key={platform.name}
              variants={fadeUp}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 ring-1 ring-white/10">
                <LineChart className="h-7 w-7 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {platform.name}
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                {platform.description}
              </p>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* STUDENT SUCCESS STATS                                            */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-5xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Student{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Success
            </span>
          </h2>
        </Fade>

        <Fade className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 ring-1 ring-white/10">
                <stat.icon className="h-7 w-7 text-emerald-400" />
              </div>
              <p className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* TESTIMONIAL                                                      */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-4xl px-6 pb-28">
        <Fade>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-10 md:p-14">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-teal-500/10 blur-3xl" />
            <div className="relative z-10">
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-slate-300 md:text-xl">
                &ldquo;I started the Trading Academy with zero knowledge of
                forex markets. Eight months later, I am consistently
                profitable and managing my own portfolio. The structured
                curriculum and hands-on mentorship from TWT gave me the
                confidence and skill to trade professionally.&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-bold text-white">
                  KL
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Karabo Lesedi
                  </p>
                  <p className="text-xs text-slate-500">
                    Independent Forex Trader, Pretoria
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
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 px-8 py-16 text-center shadow-2xl shadow-emerald-500/20 md:px-16">
            <div className="pointer-events-none absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Start Your Trading Journey Today
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70 md:text-base">
                Join hundreds of South African traders who have transformed
                their financial future with TWT.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-teal-700 transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  Enrol Now
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
