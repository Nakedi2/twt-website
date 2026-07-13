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
  BookOpen,
  TrendingUp,
  Monitor,
  Brain,
  Code,
  Users,
  Award,
  Clock,
  Globe,
  Zap,
  ArrowRight,
  Star,
  Quote,
  Send,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  Target,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Utility: AnimatedCounter
// ---------------------------------------------------------------------------
function AnimatedCounter({
  target,
  suffix = "",
  label,
  icon: Icon,
}: {
  target: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-white/10">
        <Icon className="h-7 w-7 text-blue-400" />
      </div>
      <p className="text-4xl font-bold tracking-tight text-white md:text-5xl">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-400">{label}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Utility: Fade-in wrapper
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Shared animation variant for children
// ---------------------------------------------------------------------------
function Fade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// PAGE
// ---------------------------------------------------------------------------
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden">
      {/* ================================================================ */}
      {/* 1. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
        {/* grid overlay */}
        <div className="pointer-events-none absolute inset-0 [background-size:60px_60px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />

        {/* floating shapes */}
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
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[30%] h-48 w-48 rounded-3xl bg-indigo-500/10 blur-2xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[8%] bottom-[25%] h-40 w-40 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [0, 18, 0], rotate: [0, -45, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[55%] top-[12%] h-20 w-20 rounded-lg border border-white/[0.05] bg-white/[0.03]"
        />

        {/* content */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm">
              <GraduationCap className="h-3.5 w-3.5" />
              South Africa&apos;s Premier Ed-Tech Company
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
          >
            Empowering Education
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Through Innovation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
          >
            Helping students, educators, and traders unlock their full potential
            using education, technology, and artificial intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:brightness-110"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* bottom gradient fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* ================================================================ */}
      {/* 2. TRUSTED BY                                                    */}
      {/* ================================================================ */}
      <Section className="border-y border-white/5 bg-slate-950/80 py-16 backdrop-blur-sm">
        <Fade className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
            Trusted by educators and innovators worldwide
          </p>
        </Fade>
        <Fade className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {["UNISA", "UCT", "WITS", "NWU", "UP", "SU"].map((name) => (
            <span
              key={name}
              className="text-xl font-bold tracking-wider text-slate-700 transition-colors hover:text-slate-500"
            >
              {name}
            </span>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* 3. STATS                                                         */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <Fade>
            <AnimatedCounter target={500} suffix="+" label="Students Tutored" icon={Users} />
          </Fade>
          <Fade>
            <AnimatedCounter target={50} suffix="+" label="Projects Delivered" icon={Target} />
          </Fade>
          <Fade>
            <AnimatedCounter target={98} suffix="%" label="Success Rate" icon={Award} />
          </Fade>
          <Fade>
            <AnimatedCounter target={10} suffix="+" label="Countries Reached" icon={Globe} />
          </Fade>
        </div>
      </Section>

      {/* ================================================================ */}
      {/* 4. SERVICES                                                      */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Comprehensive solutions designed to empower learners, educators, and
            businesses across Africa and beyond.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Academic Tutoring",
              description:
                "Expert tutoring in Mathematics, Physical Sciences, Life Sciences, and Geography for learners at every level.",
              href: "/services#tutoring",
              gradient: "from-blue-500 to-cyan-400",
            },
            {
              icon: TrendingUp,
              title: "Trading Academy",
              description:
                "Master forex trading with comprehensive courses from basics to advanced strategies that deliver real results.",
              href: "/services#trading",
              gradient: "from-emerald-500 to-teal-400",
            },
            {
              icon: Monitor,
              title: "Technology Solutions",
              description:
                "MT5 Expert Advisors, AI Trading Systems, and automation solutions for the modern trader.",
              href: "/services#technology",
              gradient: "from-violet-500 to-purple-400",
            },
            {
              icon: Brain,
              title: "AI Solutions",
              description:
                "Custom AI, Machine Learning, Educational AI, and Intelligent Chatbots tailored to your needs.",
              href: "/services#ai",
              gradient: "from-pink-500 to-rose-400",
            },
            {
              icon: Code,
              title: "Software Development",
              description:
                "Web Applications, Desktop Applications, and Automation Tools built with modern frameworks.",
              href: "/services#development",
              gradient: "from-orange-500 to-amber-400",
            },
          ].map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-lg`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                Learn More
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* 5. ABOUT PREVIEW                                                 */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Fade>
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-blue-400">
              Who We Are
            </span>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Bridging the Gap Between{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Education &amp; Technology
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-400">
              The Walking Textbooks is a South African education and technology
              company founded with a singular mission: to make quality education
              accessible to every learner, regardless of their background or
              location. We combine expert human teaching with cutting-edge
              artificial intelligence to deliver personalised learning
              experiences that drive measurable outcomes.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              From our roots in South Africa, we have expanded our reach across
              the continent and beyond, serving students, educators, and
              businesses in over ten countries. Our multi-disciplinary team
              brings together educators, engineers, and data scientists who are
              passionate about transforming how people learn and trade.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 hover:brightness-110"
            >
              Read More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Fade>

          <Fade className="relative hidden lg:flex">
            <div className="relative mx-auto h-[420px] w-full max-w-md">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 ring-1 ring-white/10" />
              <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-2xl" />
              <div className="absolute left-8 top-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <Lightbulb className="mb-2 h-8 w-8 text-yellow-400" />
                <p className="text-sm font-semibold text-white">AI-Powered</p>
                <p className="text-xs text-slate-400">Smart Learning</p>
              </div>
              <div className="absolute bottom-8 right-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <Globe className="mb-2 h-8 w-8 text-blue-400" />
                <p className="text-sm font-semibold text-white">Global Reach</p>
                <p className="text-xs text-slate-400">10+ Countries</p>
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <Award className="mb-2 h-8 w-8 text-purple-400" />
                <p className="text-sm font-semibold text-white">Proven</p>
                <p className="text-xs text-slate-400">98% Success</p>
              </div>
            </div>
          </Fade>
        </div>
      </Section>

      {/* ================================================================ */}
      {/* 6. WHY CHOOSE US                                                 */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              The Walking Textbooks
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            We combine the best of human expertise with cutting-edge technology
            to deliver an unmatched educational experience.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Expert Educators",
              description:
                "Our team comprises qualified professionals and experienced tutors who bring real-world knowledge to every lesson.",
            },
            {
              icon: Brain,
              title: "AI-Powered Learning",
              description:
                "Leverage adaptive AI that personalises your learning path, identifies gaps, and accelerates mastery.",
            },
            {
              icon: Award,
              title: "Proven Results",
              description:
                "A 98% success rate speaks for itself. Our students consistently achieve the grades and goals they set out for.",
            },
            {
              icon: Clock,
              title: "Flexible Learning",
              description:
                "Study at your own pace, on your own schedule. Our online platform is available 24/7 from any device.",
            },
            {
              icon: Globe,
              title: "Global Reach",
              description:
                "Serving students and businesses in over 10 countries, with content and tools designed for diverse contexts.",
            },
            {
              icon: Zap,
              title: "Innovation First",
              description:
                "We continuously adopt the latest technologies to keep our students ahead of the curve in a fast-changing world.",
            },
          ].map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <feature.icon className="h-8 w-8 text-blue-400" />
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
      {/* 7. TESTIMONIALS                                                  */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            What Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Students Say
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Real stories from students and professionals who have transformed
            their journey with TWT.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "TWT completely changed how I approach Mathematics. The combination of expert tutoring and AI-powered practice sessions took my grades from a D to a distinctions in just six months.",
              name: "Thabo Mokoena",
              role: "University of Johannesburg, BSc Computer Science",
              initials: "TM",
              color: "from-blue-500 to-indigo-500",
            },
            {
              quote:
                "The Trading Academy gave me the confidence and skills to start my own forex portfolio. The structured curriculum and mentorship are world-class. I have been consistently profitable for over a year now.",
              name: "Sarah van der Merwe",
              role: "Independent Forex Trader, Cape Town",
              initials: "SM",
              color: "from-purple-500 to-pink-500",
            },
            {
              quote:
                "As a teacher, the AI tools TWT built for our school have been transformational. Student engagement is up and we can track progress in real time. Their technology solutions are genuinely innovative.",
              name: "Dr. James Naidoo",
              role: "Head of Department, Durban Academy",
              initials: "JN",
              color: "from-emerald-500 to-teal-500",
            },
          ].map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
            >
              <Quote className="mb-4 h-8 w-8 text-white/10" />
              <p className="text-sm leading-relaxed text-slate-300">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-xs font-bold text-white`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* 8. FEATURED PROJECTS                                             */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            A selection of projects that showcase our capabilities in education
            and technology.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "TWT Learning Platform",
              description:
                "An AI-driven e-learning platform that adapts content to each student's pace and learning style, with real-time analytics for educators.",
              tags: ["Next.js", "OpenAI", "MongoDB", "Tailwind"],
              gradient: "from-blue-600 to-indigo-600",
            },
            {
              title: "ForexPulse EA",
              description:
                "An MT5 Expert Advisor powered by machine learning that identifies high-probability forex setups across multiple currency pairs.",
              tags: ["Python", "MQL5", "TensorFlow", "MetaTrader 5"],
              gradient: "from-purple-600 to-pink-600",
            },
            {
              title: "EduChat AI Assistant",
              description:
                "An intelligent chatbot that answers curriculum-aligned questions in multiple South African languages, available 24/7 for students.",
              tags: ["LangChain", "GPT-4", "React", "FastAPI"],
              gradient: "from-emerald-600 to-teal-600",
            },
          ].map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/[0.12]"
            >
              <div className={`h-44 bg-gradient-to-br ${project.gradient}`} />
              <div className="p-7">
                <h3 className="text-lg font-semibold text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
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
                  View Project
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* 9. BLOG PREVIEW                                                  */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Latest{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Insights
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Thought leadership, tutorials, and news from the TWT team.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              category: "AI & Education",
              title: "How AI Is Reshaping Education in South Africa",
              excerpt:
                "Explore how artificial intelligence is creating new opportunities for personalised learning across the African continent.",
              date: "June 28, 2026",
              gradient: "from-blue-600 to-purple-600",
            },
            {
              category: "Trading",
              title: "5 Risk Management Strategies Every Forex Trader Must Know",
              excerpt:
                "Master the fundamentals of risk management to protect your capital and grow your trading account sustainably.",
              date: "June 15, 2026",
              gradient: "from-emerald-600 to-teal-600",
            },
            {
              category: "Technology",
              title: "Building Scalable Ed-Tech Platforms with Next.js",
              excerpt:
                "A deep dive into the architecture decisions behind the TWT Learning Platform and how we scaled to thousands of users.",
              date: "May 30, 2026",
              gradient: "from-purple-600 to-pink-600",
            },
          ].map((post) => (
            <motion.div
              key={post.title}
              variants={fadeUp}
              className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/[0.12]"
            >
              <div className={`h-48 bg-gradient-to-br ${post.gradient}`} />
              <div className="p-7">
                <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-blue-300 ring-1 ring-white/10">
                  {post.category}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{post.date}</span>
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
                  >
                    Read More
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </Fade>

        <Fade className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* 10. NEWSLETTER CTA                                               */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <Fade>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 px-8 py-16 text-center shadow-2xl shadow-purple-500/20 md:px-16">
            {/* subtle bg pattern */}
            <div className="pointer-events-none absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Stay Updated
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70 md:text-base">
                Subscribe to our newsletter for the latest insights in education
                and technology.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-white/50 outline-none backdrop-blur-sm transition-colors focus:border-white/40 focus:bg-white/15"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-purple-700 transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  Subscribe
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* 11. FINAL CTA                                                    */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-4xl px-6 pb-28 text-center">
        <Fade>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Learning?
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-slate-400">
            Join hundreds of students and professionals who have already
            transformed their educational journey with TWT.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:brightness-110"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </Fade>
      </Section>
    </main>
  );
}
