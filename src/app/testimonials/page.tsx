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
  MessageSquareQuote,
  Star,
  Users,
  ThumbsUp,
  MessageSquare,
  Award,
  Play,
  ArrowRight,
  Quote,
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

const stats = [
  { icon: Users, value: "500+", label: "Students" },
  { icon: ThumbsUp, value: "98%", label: "Satisfaction" },
  { icon: MessageSquare, value: "50+", label: "Reviews" },
  { icon: Award, value: "4.9/5", label: "Rating" },
];

const testimonials = [
  {
    quote:
      "TWT completely changed how I approach Mathematics. The combination of expert tutoring and AI-powered practice sessions took my grades from a D to distinctions in just six months. I can't recommend them enough.",
    name: "Thabo Mokoena",
    role: "University of Johannesburg, BSc Computer Science",
    initials: "TM",
    color: "from-blue-500 to-indigo-500",
    stars: 5,
  },
  {
    quote:
      "The Trading Academy gave me the confidence and skills to start my own forex portfolio. The structured curriculum and mentorship are world-class. I've been consistently profitable for over a year now.",
    name: "Sarah van der Merwe",
    role: "Independent Forex Trader, Cape Town",
    initials: "SM",
    color: "from-purple-500 to-pink-500",
    stars: 5,
  },
  {
    quote:
      "As a teacher, the AI tools TWT built for our school have been transformational. Student engagement is up 40% and we can track progress in real time. Their technology solutions are genuinely innovative.",
    name: "Dr. James Naidoo",
    role: "Head of Department, Durban Academy",
    initials: "JN",
    color: "from-emerald-500 to-teal-500",
    stars: 5,
  },
  {
    quote:
      "My son was struggling with Physical Sciences and we tried everything. After just two months with TWT, his marks improved dramatically. The tutors are patient, knowledgeable, and truly care about their students.",
    name: "Nomsa Dlamini",
    role: "Parent, Soweto",
    initials: "ND",
    color: "from-orange-500 to-amber-500",
    stars: 5,
  },
  {
    quote:
      "The Smart Study App is a game-changer. It creates a personalised study schedule that actually works with my lifestyle. I prepared for my matric exams more efficiently than any of my classmates.",
    name: "Sipho Ndlovu",
    role: "Matric Learner, Pretoria",
    initials: "SN",
    color: "from-cyan-500 to-blue-500",
    stars: 5,
  },
  {
    quote:
      "We partnered with TWT to develop a custom learning management system for our campus. Their team delivered a robust, scalable platform on time and within budget. Outstanding professional service.",
    name: "Prof. Linda Mthembu",
    role: "Dean of IT, Central Technical College",
    initials: "LM",
    color: "from-rose-500 to-red-500",
    stars: 5,
  },
  {
    quote:
      "The EduChat AI assistant helped me prepare for my final year exams in a way no textbook could. It explains concepts in isiZulu when I'm stuck, which really helps me understand the material better.",
    name: "Ayanda Khumalo",
    role: "Final Year Student, UKZN",
    initials: "AK",
    color: "from-violet-500 to-purple-500",
    stars: 5,
  },
  {
    quote:
      "As a business owner, I needed reliable forex education before investing real capital. TWT's Trading Academy taught me risk management and strategy development that has saved me thousands of rands.",
    name: "Pieter Pretorius",
    role: "Entrepreneur, Centurion",
    initials: "PP",
    color: "from-teal-500 to-green-500",
    stars: 5,
  },
];

const videoTestimonials = [
  {
    title: "From Struggling to Distinctions",
    description: "Watch how TWT helped Thabo transform his mathematics marks in just six months.",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    title: "My Trading Journey",
    description: "Sarah shares her experience learning forex trading through the TWT Trading Academy.",
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    title: "Innovation in the Classroom",
    description: "Dr. Naidoo discusses how TWT's AI tools transformed teaching at his school.",
    gradient: "from-purple-600 to-pink-600",
  },
];

export default function TestimonialsPage() {
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
              <MessageSquareQuote className="h-3.5 w-3.5" />
              Testimonials
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
          >
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Testimonials
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
          >
            Hear from our students and partners about their experience with TWT.
          </motion.p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* ================================================================ */}
      {/* STATS BAR                                                        */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-6xl px-6 py-16">
        <Fade className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center"
            >
              <stat.icon className="mb-3 h-7 w-7 text-blue-400" />
              <p className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* TESTIMONIALS GRID                                                */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <Fade className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <Quote className="mb-4 h-7 w-7 text-white/10" />
              <p className="flex-1 text-sm leading-relaxed text-slate-300">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-xs font-bold text-white`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>

              <div className="mt-3 flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
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
      {/* VIDEO TESTIMONIALS                                               */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Video{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Stories
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Watch our students and partners share their TWT experience in their
            own words.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 md:grid-cols-3">
          {videoTestimonials.map((video) => (
            <motion.div
              key={video.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/[0.12]"
            >
              <div className={`relative h-56 bg-gradient-to-br ${video.gradient}`}>
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-white/30">
                    <Play className="ml-1 h-7 w-7 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">
                  {video.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {video.description}
                </p>
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
                Share Your Experience
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70 md:text-base">
                We&apos;d love to hear about your journey with TWT. Your story could
                inspire the next generation of learners and traders.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-purple-700 transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  Write a Testimonial
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
