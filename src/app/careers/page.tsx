"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  Briefcase,
  ArrowRight,
  Rocket,
  TrendingUp,
  Heart,
  Clock,
  Users,
  Gift,
  MapPin,
  Mail,
  Building2,
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  User,
  FileText,
  Phone,
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

const cultureCards = [
  {
    icon: Rocket,
    title: "Innovation",
    description: "Work on cutting-edge projects that push the boundaries of education and technology in Africa.",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "Continuous learning and development opportunities to help you grow your career and skills.",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    icon: Heart,
    title: "Impact",
    description: "Make a real difference in education, helping thousands of students across South Africa and beyond.",
    gradient: "from-pink-500 to-rose-400",
  },
  {
    icon: Clock,
    title: "Flexibility",
    description: "Remote-friendly work environment with flexible hours that respect your work-life balance.",
    gradient: "from-violet-500 to-purple-400",
  },
  {
    icon: Users,
    title: "Diversity",
    description: "An inclusive, multicultural team that values different perspectives and backgrounds.",
    gradient: "from-orange-500 to-amber-400",
  },
  {
    icon: Gift,
    title: "Benefits",
    description: "Competitive salary, health benefits, learning allowances, and performance bonuses.",
    gradient: "from-indigo-500 to-blue-400",
  },
];

const positions = [
  {
    title: "Full-Stack Developer",
    department: "Engineering",
    location: "Remote / Johannesburg",
    type: "Full-time",
    description:
      "Build and maintain scalable web applications using Next.js, Node.js, and PostgreSQL. You'll work closely with our product and design teams to deliver exceptional user experiences for our learning platform.",
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    title: "AI/ML Engineer",
    department: "Technology",
    location: "Remote",
    type: "Full-time",
    description:
      "Design and implement machine learning models for our adaptive learning platform and trading systems. Experience with NLP, recommendation systems, and time-series forecasting is highly valued.",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    title: "Mathematics Tutor",
    department: "Education",
    location: "Johannesburg",
    type: "Part-time",
    description:
      "Deliver engaging mathematics tutoring sessions for high school and university students. You'll create personalised learning materials and use our AI-powered tools to track student progress.",
    gradient: "from-emerald-600 to-teal-600",
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote / Johannesburg",
    type: "Full-time",
    description:
      "Create beautiful, intuitive interfaces for our education and trading platforms. You'll conduct user research, build prototypes, and collaborate with developers to bring designs to life.",
    gradient: "from-orange-600 to-amber-600",
  },
  {
    title: "Trading Analyst",
    department: "Trading Academy",
    location: "Johannesburg",
    type: "Full-time",
    description:
      "Analyse financial markets, develop educational content for our trading courses, and mentor aspiring traders. Strong knowledge of forex, technical analysis, and risk management is essential.",
    gradient: "from-cyan-600 to-blue-600",
  },
];

export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const openModal = (position: string) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
    setSubmitStatus("idle");
    setFormData({ name: "", email: "", phone: "", coverLetter: "" });
    setErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPosition("");
    setSubmitStatus("idle");
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    } else if (formData.coverLetter.trim().length < 20) {
      newErrors.coverLetter = "Cover letter must be at least 20 characters";
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
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          position: selectedPosition,
          coverLetter: formData.coverLetter,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit application");

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", coverLetter: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
              <Briefcase className="h-3.5 w-3.5" />
              Careers at TWT
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
          >
            Join Our{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Team
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
          >
            Help us shape the future of education and technology in Africa.
          </motion.p>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </section>

      {/* ================================================================ */}
      {/* COMPANY CULTURE                                                  */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 py-24">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Why Work at{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TWT?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            We&apos;re building something special, and we want passionate people to
            join us on this journey.
          </p>
        </Fade>

        <Fade className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cultureCards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {card.description}
              </p>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* OPEN POSITIONS                                                   */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-5xl px-6 pb-28">
        <Fade className="text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Open{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Positions
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Find the role that fits your skills and ambitions. We&apos;re always
            looking for talented people to join our team.
          </p>
        </Fade>

        <Fade className="mt-14 space-y-4">
          {positions.map((position) => (
            <motion.div
              key={position.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.04] md:p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {position.title}
                    </h3>
                    <span className="inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-white/10">
                      {position.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" />
                      {position.department}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {position.location}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {position.description}
                  </p>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => openModal(position.title)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 hover:brightness-110"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* APPLICATION SECTION                                              */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-4xl px-6 pb-28">
        <Fade>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 px-8 py-16 text-center shadow-2xl shadow-purple-500/20 md:px-16">
            <div className="pointer-events-none absolute inset-0 [background-size:40px_40px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Don&apos;t See Your Role?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm text-white/70 md:text-base">
                Send us your CV and we&apos;ll keep you in mind for future
                opportunities that match your skills and experience.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="mailto:thewalkingtextbooks@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-purple-700 transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  <Mail className="h-4 w-4" />
                  thewalkingtextbooks@gmail.com
                </a>
              </div>
            </div>
          </div>
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* APPLICATION MODAL                                                */}
      {/* ================================================================ */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl"
            >
              <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                <div className="pointer-events-none absolute inset-0 [background-size:30px_30px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)]" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Apply for Position</h3>
                    <p className="mt-1 text-sm text-white/70">{selectedPosition}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-8">
                {submitStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 py-8 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                      <CheckCircle2 className="h-8 w-8 text-green-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">Application Submitted!</h4>
                    <p className="max-w-sm text-sm text-slate-400">
                      Thank you for applying. We&apos;ll review your application and get back to you within 5-7 business days.
                    </p>
                    <button
                      onClick={closeModal}
                      className="mt-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-300">
                        <User className="h-4 w-4 text-slate-500" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-2 ${
                          errors.name
                            ? "border-red-500 focus:ring-red-500/20"
                            : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"
                        }`}
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-300">
                        <Mail className="h-4 w-4 text-slate-500" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-2 ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500/20"
                            : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"
                        }`}
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-300">
                        <Phone className="h-4 w-4 text-slate-500" />
                        Phone Number
                        <span className="text-xs text-slate-600">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+27 65 638 7182"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-300">
                        <FileText className="h-4 w-4 text-slate-500" />
                        Cover Letter
                      </label>
                      <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us why you're a great fit for this role..."
                        className={`w-full resize-none rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:ring-2 ${
                          errors.coverLetter
                            ? "border-red-500 focus:ring-red-500/20"
                            : "border-white/10 focus:border-blue-500 focus:ring-blue-500/20"
                        }`}
                      />
                      {errors.coverLetter && <p className="mt-1.5 text-xs text-red-400">{errors.coverLetter}</p>}
                    </div>

                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3"
                      >
                        <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-300">
                          Something went wrong. Please try again or email us directly.
                        </p>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/40 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
