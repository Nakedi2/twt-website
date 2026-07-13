"use client";

import { useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Twitter,
  Linkedin,
  LinkIcon,
  Send,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

const allPosts = [
  {
    slug: "how-ai-is-transforming-education-in-africa",
    title: "How AI is Transforming Education in Africa",
    excerpt:
      "Artificial intelligence is reshaping how students learn across the continent.",
    category: "AI",
    author: "Thabo Mokoena",
    authorRole: "Head of AI Research",
    date: "Jul 8, 2026",
    readTime: "8 min read",
    gradient: "from-indigo-600 to-purple-600",
    tags: ["AI", "Education", "Africa", "EdTech"],
  },
  {
    slug: "forex-trading-a-beginners-complete-guide",
    title: "Forex Trading: A Beginner's Complete Guide",
    excerpt:
      "Everything you need to know before placing your first trade.",
    category: "Trading",
    author: "Lebo Nkosi",
    authorRole: "Senior Trading Analyst",
    date: "Jul 5, 2026",
    readTime: "12 min read",
    gradient: "from-emerald-600 to-teal-600",
    tags: ["Forex", "Trading", "Beginner", "Finance"],
  },
  {
    slug: "the-future-of-edtech-in-south-africa",
    title: "The Future of EdTech in South Africa",
    excerpt:
      "Technology is bridging gaps and creating new opportunities for learners nationwide.",
    category: "Education",
    author: "Sipho Dlamini",
    authorRole: "Education Strategist",
    date: "Jul 2, 2026",
    readTime: "6 min read",
    gradient: "from-blue-600 to-cyan-600",
    tags: ["EdTech", "South Africa", "Education", "Innovation"],
  },
  {
    slug: "building-custom-trading-bots-with-python",
    title: "Building Custom Trading Bots with Python",
    excerpt:
      "A hands-on walkthrough of creating algorithmic trading systems.",
    category: "Technology",
    author: "Kagiso Tshepe",
    authorRole: "Lead Developer",
    date: "Jun 28, 2026",
    readTime: "15 min read",
    gradient: "from-orange-600 to-red-600",
    tags: ["Python", "Trading Bots", "Algo Trading", "Programming"],
  },
  {
    slug: "5-study-tips-for-matric-success",
    title: "5 Study Tips for Matric Success",
    excerpt:
      "Proven strategies that helped thousands of South African matriculants ace their finals.",
    category: "Education",
    author: "Naledi Molefe",
    authorRole: "Academic Coach",
    date: "Jun 25, 2026",
    readTime: "5 min read",
    gradient: "from-pink-600 to-rose-600",
    tags: ["Matric", "Study Tips", "Exams", "Success"],
  },
  {
    slug: "why-every-student-should-learn-about-ai",
    title: "Why Every Student Should Learn About AI",
    excerpt:
      "AI literacy is no longer optional for any career path.",
    category: "AI",
    author: "Thabo Mokoena",
    authorRole: "Head of AI Research",
    date: "Jun 20, 2026",
    readTime: "7 min read",
    gradient: "from-violet-600 to-indigo-600",
    tags: ["AI", "Students", "Future Skills", "Technology"],
  },
];

const articleContent: Record<string, { html: string }> = {
  "how-ai-is-transforming-education-in-africa": {
    html: `
      <p class="text-lg text-slate-600 leading-relaxed mb-8">Across Africa, a quiet revolution is unfolding in classrooms, lecture halls, and online learning platforms. Artificial intelligence — once the domain of Silicon Valley labs — is now being deployed to solve some of the continent's most pressing educational challenges, from teacher shortages to unequal access to quality learning materials.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">The Current State of Education in Africa</h2>
      <p class="text-slate-600 leading-relaxed mb-4">Sub-Saharan Africa is home to the youngest population in the world, with over 60% of people under the age of 25. By 2030, an estimated 375 million young Africans will enter the workforce. Yet the education system is struggling to keep pace.</p>
      <ul class="list-disc list-inside text-slate-600 leading-relaxed mb-6 space-y-2">
        <li>Over 98 million children in sub-Saharan Africa lack access to basic education</li>
        <li>The pupil-to-teacher ratio in many countries exceeds 40:1</li>
        <li>Only 6% of students in low-income countries have internet access for learning</li>
        <li>Textbook shortages remain a critical barrier in rural communities</li>
      </ul>
      <p class="text-slate-600 leading-relaxed mb-6">These are not just statistics — they represent a generation of learners whose potential is constrained by systemic limitations. AI offers a pathway to bridge these gaps at scale.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">How AI is Being Applied</h2>
      <p class="text-slate-600 leading-relaxed mb-4">From personalised tutoring chatbots to automated content translation, AI applications in African education are diverse and growing rapidly.</p>

      <h3 class="text-xl font-semibold text-slate-900 mt-8 mb-3">Personalised Learning Platforms</h3>
      <p class="text-slate-600 leading-relaxed mb-6">AI-powered adaptive learning systems can assess a student's current knowledge level and adjust the difficulty, pace, and content of lessons in real time. This means a Grade 10 learner in Soweto and a learner in rural Limpopo can each receive a learning experience tailored to their needs — something that was previously only available through expensive private tutoring.</p>

      <div class="bg-indigo-50 border-l-4 border-indigo-600 rounded-r-xl p-6 my-8">
        <p class="text-slate-700 font-medium">Key Insight: Studies show that AI-driven adaptive learning can improve student performance by up to 30% compared to traditional one-size-fits-all approaches, particularly in mathematics and science.</p>
      </div>

      <h3 class="text-xl font-semibold text-slate-900 mt-8 mb-3">Language and Accessibility</h3>
      <p class="text-slate-600 leading-relaxed mb-6">Africa is home to over 2,000 languages. AI-powered translation and natural language processing tools are making educational content accessible in local languages for the first time. Projects like Google's AI-powered translation for African languages and locally developed solutions are breaking down language barriers that have long excluded millions of learners from quality education.</p>

      <h3 class="text-xl font-semibold text-slate-900 mt-8 mb-3">Automated Assessment and Feedback</h3>
      <p class="text-slate-600 leading-relaxed mb-6">One of the most time-consuming tasks for teachers is grading and providing feedback. AI systems can now automatically assess written responses, provide instant feedback on mathematics problems, and even evaluate coding assignments. This frees up teachers to focus on what they do best — inspiring and mentoring students.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">The Numbers That Matter</h2>
      <p class="text-slate-600 leading-relaxed mb-4">The impact of AI in African education is becoming measurable:</p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white text-center">
          <p class="text-3xl font-bold mb-1">30%</p>
          <p class="text-sm text-white/80">Improvement in learning outcomes with adaptive platforms</p>
        </div>
        <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white text-center">
          <p class="text-3xl font-bold mb-1">200+</p>
          <p class="text-sm text-white/80">EdTech startups operating across the continent</p>
        </div>
        <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white text-center">
          <p class="text-3xl font-bold mb-1">$1B+</p>
          <p class="text-sm text-white/80">Projected EdTech market value in Africa by 2027</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">Challenges and Considerations</h2>
      <p class="text-slate-600 leading-relaxed mb-4">Despite the promise, significant challenges remain. Data infrastructure across much of the continent is still developing, which limits the deployment of cloud-based AI solutions. There are also important questions about data privacy, algorithmic bias, and ensuring that AI tools are developed with — not just for — African communities.</p>
      <p class="text-slate-600 leading-relaxed mb-6">Furthermore, the digital divide means that the learners who could benefit most from AI-powered tools are often those with the least access to the devices and connectivity required to use them. Addressing this requires coordinated effort between governments, the private sector, and civil society.</p>

      <h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4">What This Means for the Future</h2>
      <p class="text-slate-600 leading-relaxed mb-6">The integration of AI into African education is not a question of if, but when and how. At The Walking Textbooks, we believe that the most impactful technology is that which is designed with local context in mind. Our approach combines cutting-edge AI research with a deep understanding of the South African education landscape to create solutions that are both innovative and practical.</p>
      <p class="text-slate-600 leading-relaxed mb-6">As we look ahead, the organisations and educators who embrace AI thoughtfully — as a tool to augment human teaching, not replace it — will be best positioned to prepare students for a rapidly evolving world.</p>

      <div class="bg-slate-50 rounded-2xl p-8 my-8 border border-slate-100">
        <h3 class="text-lg font-bold text-slate-900 mb-2">In Summary</h3>
        <p class="text-slate-600 leading-relaxed">AI is not a silver bullet for Africa's educational challenges, but it is a powerful lever. By personalising learning, breaking language barriers, and reducing administrative burden on teachers, AI can help unlock the continent's greatest asset: its young people. The Walking Textbooks is committed to being at the forefront of this transformation.</p>
      </div>
    `,
  },
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const post = allPosts.find((p) => p.slug === slug);
  const content = articleContent[slug];

  const [copied, setCopied] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");

  if (!post) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category) return -1;
      if (a.category !== post.category && b.category === post.category) return 1;
      return 0;
    })
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Article Header */}
      <section className={`relative bg-gradient-to-br ${post.gradient} py-16 px-4`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/20 mb-4">
              {post.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-3xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{post.author}</p>
                  <p className="text-white/60 text-xs">{post.authorRole}</p>
                </div>
              </div>
              <span className="text-white/40">·</span>
              <div className="flex items-center gap-1 text-white/70 text-sm">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-1 text-white/70 text-sm">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
                    "_blank"
                  )
                }
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() =>
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`,
                    "_blank"
                  )
                }
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="prose prose-lg prose-slate max-w-none
            prose-headings:font-bold prose-headings:text-slate-900
            prose-p:text-slate-600 prose-p:leading-relaxed
            prose-li:text-slate-600
            prose-strong:text-slate-900"
          dangerouslySetInnerHTML={{
            __html: content?.html ?? "<p>Full article content coming soon.</p>",
          }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-slate-100">
          <span className="text-sm font-medium text-slate-500 mr-1">Tags:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Related Posts */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rp, i) => (
              <motion.div
                key={rp.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group"
              >
                <Link href={`/blog/${rp.slug}`}>
                  <div className={`h-32 rounded-xl bg-gradient-to-br ${rp.gradient} mb-4 relative`}>
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
                      {rp.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-1">
                    {rp.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>{rp.author}</span>
                    <span>·</span>
                    <span>{rp.readTime}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Comments Section */}
        <section className="mt-16 pt-12 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-8">
            <MessageCircle className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-slate-900">Leave a Comment</h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCommentName("");
              setCommentEmail("");
              setCommentText("");
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={commentEmail}
                  onChange={(e) => setCommentEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Comment
              </label>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              Post Comment
            </button>
          </form>
        </section>

        {/* Bottom Nav */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>
      </div>
    </main>
  );
}
