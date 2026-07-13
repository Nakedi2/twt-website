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
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
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

const categories = ["All", "Events", "Team", "Students", "Technology", "Campus"] as const;

const galleryItems = [
  {
    title: "AI Workshop 2024",
    category: "Events",
    gradient: "from-blue-600 to-indigo-600",
    span: "row-span-2",
  },
  {
    title: "Trading Bootcamp",
    category: "Events",
    gradient: "from-emerald-600 to-teal-600",
    span: "",
  },
  {
    title: "Student Graduation",
    category: "Students",
    gradient: "from-purple-600 to-pink-600",
    span: "",
  },
  {
    title: "Team Building Day",
    category: "Team",
    gradient: "from-orange-600 to-amber-600",
    span: "",
  },
  {
    title: "Hackathon Winners",
    category: "Events",
    gradient: "from-rose-600 to-red-600",
    span: "row-span-2",
  },
  {
    title: "Tech Conference 2024",
    category: "Events",
    gradient: "from-cyan-600 to-blue-600",
    span: "",
  },
  {
    title: "Classroom Session",
    category: "Students",
    gradient: "from-violet-600 to-purple-600",
    span: "",
  },
  {
    title: "Code Review Sprint",
    category: "Technology",
    gradient: "from-indigo-600 to-blue-600",
    span: "",
  },
  {
    title: "Campus Launch",
    category: "Campus",
    gradient: "from-teal-600 to-green-600",
    span: "",
  },
  {
    title: "AI Model Training",
    category: "Technology",
    gradient: "from-pink-600 to-rose-600",
    span: "",
  },
  {
    "title": "Mentorship Programme",
    category: "Students",
    gradient: "from-amber-600 to-orange-600",
    span: "",
  },
  {
    title: "Johannesburg Office",
    category: "Campus",
    gradient: "from-blue-600 to-cyan-600",
    span: "row-span-2",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
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
              <Camera className="h-3.5 w-3.5" />
              Visual Journey
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
          >
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Gallery
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl"
          >
            Moments from our journey in education and technology.
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
      {/* GALLERY GRID                                                     */}
      {/* ================================================================ */}
      <Section className="mx-auto max-w-7xl px-6 pb-28">
        <Fade className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              layout
              className={`mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-all hover:border-white/[0.12] cursor-pointer group ${item.span}`}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative bg-gradient-to-br ${item.gradient} ${
                item.span === "row-span-2" ? "h-80" : "h-56"
              }`}>
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm">
                    <Camera className="h-4 w-4" />
                    View
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                  <span className="mb-1 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur-sm">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </Fade>
      </Section>

      {/* ================================================================ */}
      {/* LIGHTBOX                                                         */}
      {/* ================================================================ */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`flex h-[60vh] items-center justify-center bg-gradient-to-br ${filteredItems[lightboxIndex].gradient}`}>
                <div className="text-center">
                  <Camera className="mx-auto mb-4 h-16 w-16 text-white/40" />
                  <h3 className="text-2xl font-bold text-white">{filteredItems[lightboxIndex].title}</h3>
                  <span className="mt-2 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white">
                    {filteredItems[lightboxIndex].category}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
