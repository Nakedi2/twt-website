"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  User,
  Mail,
  Send,
} from "lucide-react";

const categories = ["All", "Education", "Technology", "AI", "Trading", "Business"];

const allPosts = [
  {
    slug: "how-ai-is-transforming-education-in-africa",
    title: "How AI is Transforming Education in Africa",
    excerpt:
      "Artificial intelligence is reshaping how students learn across the continent, from personalised tutoring systems to automated assessment platforms.",
    category: "AI",
    author: "Thabo Mokoena",
    authorRole: "Head of AI Research",
    date: "Jul 8, 2026",
    readTime: "8 min read",
    featured: true,
    gradient: "from-indigo-600 to-purple-600",
    tags: ["AI", "Education", "Africa", "EdTech"],
  },
  {
    slug: "forex-trading-a-beginners-complete-guide",
    title: "Forex Trading: A Beginner's Complete Guide",
    excerpt:
      "Everything you need to know before placing your first trade, including risk management, chart reading, and building a sustainable strategy.",
    category: "Trading",
    author: "Lebo Nkosi",
    authorRole: "Senior Trading Analyst",
    date: "Jul 5, 2026",
    readTime: "12 min read",
    featured: false,
    gradient: "from-emerald-600 to-teal-600",
    tags: ["Forex", "Trading", "Beginner", "Finance"],
  },
  {
    slug: "the-future-of-edtech-in-south-africa",
    title: "The Future of EdTech in South Africa",
    excerpt:
      "From township classrooms to university lecture halls, technology is bridging gaps and creating new opportunities for learners nationwide.",
    category: "Education",
    author: "Sipho Dlamini",
    authorRole: "Education Strategist",
    date: "Jul 2, 2026",
    readTime: "6 min read",
    featured: false,
    gradient: "from-blue-600 to-cyan-600",
    tags: ["EdTech", "South Africa", "Education", "Innovation"],
  },
  {
    slug: "building-custom-trading-bots-with-python",
    title: "Building Custom Trading Bots with Python",
    excerpt:
      "A hands-on walkthrough of creating algorithmic trading systems using Python, Pandas, and popular broker APIs.",
    category: "Technology",
    author: "Kagiso Tshepe",
    authorRole: "Lead Developer",
    date: "Jun 28, 2026",
    readTime: "15 min read",
    featured: false,
    gradient: "from-orange-600 to-red-600",
    tags: ["Python", "Trading Bots", "Algo Trading", "Programming"],
  },
  {
    slug: "5-study-tips-for-matric-success",
    title: "5 Study Tips for Matric Success",
    excerpt:
      "Proven strategies that helped thousands of South African matriculants ace their finals and secure university placements.",
    category: "Education",
    author: "Naledi Molefe",
    authorRole: "Academic Coach",
    date: "Jun 25, 2026",
    readTime: "5 min read",
    featured: false,
    gradient: "from-pink-600 to-rose-600",
    tags: ["Matric", "Study Tips", "Exams", "Success"],
  },
  {
    slug: "why-every-student-should-learn-about-ai",
    title: "Why Every Student Should Learn About AI",
    excerpt:
      "AI literacy is no longer optional. Here is why understanding artificial intelligence is critical for every career path in the 21st century.",
    category: "AI",
    author: "Thabo Mokoena",
    authorRole: "Head of AI Research",
    date: "Jun 20, 2026",
    readTime: "7 min read",
    featured: false,
    gradient: "from-violet-600 to-indigo-600",
    tags: ["AI", "Students", "Future Skills", "Technology"],
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
};

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = filteredPosts.find((p) => p.featured);
  const gridPosts = filteredPosts.filter((p) => !p.featured);
  const totalPages = Math.ceil(gridPosts.length / postsPerPage);
  const paginatedPosts = gridPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900 py-24 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2RvdHMpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-40" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto leading-relaxed"
          >
            Insights, tutorials, and thought leadership in education and
            technology.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 mb-12"
        >
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Post */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-12"
          >
            <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${featured.gradient} p-8 md:p-12 text-white`}>
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm border border-white/30">
                  ★ Featured
                </span>
              </div>
              <div className="mt-8 md:mt-4 max-w-3xl">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm mb-4">
                  {featured.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {featured.title}
                </h2>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-semibold text-sm">
                      {featured.author.charAt(0)}
                    </div>
                    <span>{featured.author}</span>
                  </div>
                  <span>{featured.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{featured.readTime}</span>
                  </div>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        {paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginatedPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300"
              >
                <div className={`h-48 bg-gradient-to-br ${post.gradient} relative`}>
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/20">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {post.author}
                        </p>
                        <p className="text-xs text-slate-400">{post.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      Read More
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 mb-12">
            <p className="text-slate-400 text-lg">
              No articles found. Try a different search or category.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mb-16">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                  currentPage === page
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900 p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2RvdHMpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-30" />
            <div className="relative max-w-xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Enjoyed this article?
              </h2>
              <p className="text-indigo-200 mb-8 text-lg">
                Subscribe to our newsletter for the latest insights on education
                and technology.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
