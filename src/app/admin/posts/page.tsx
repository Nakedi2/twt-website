"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Loader2,
  Tag,
} from "lucide-react";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  status: "published" | "draft";
  featured: boolean;
}

const categories = [
  "EdTech",
  "Digital Literacy",
  "STEM Education",
  "Rural Education",
  "Policy",
  "Case Studies",
];

const initialPosts: Post[] = [
  {
    id: 1,
    title: "Bridging the Digital Divide in South African Schools",
    slug: "bridging-digital-divide-sa-schools",
    excerpt: "How TWT is bringing digital learning tools to underserved communities.",
    content:
      "South Africa faces a significant digital divide between urban and rural schools. Through our innovative offline-first platform, TWT has reached over 50 rural schools across Limpopo and Eastern Cape...",
    category: "Digital Literacy",
    tags: ["digital divide", "rural schools", "South Africa"],
    author: "Dr. Nkosazana Mthembu",
    date: "2026-07-10",
    status: "published",
    featured: true,
  },
  {
    id: 2,
    title: "STEM Education: Building Tomorrow's Innovators",
    slug: "stem-education-building-innovators",
    excerpt: "A look at how interactive digital textbooks transform STEM learning.",
    content:
      "Traditional textbook approaches to STEM subjects often fail to engage students. Our interactive platform combines simulations, quizzes, and real-world South African case studies...",
    category: "STEM Education",
    tags: ["STEM", "innovation", "textbooks"],
    author: "Thabo Molefe",
    date: "2026-07-08",
    status: "published",
    featured: false,
  },
  {
    id: 3,
    title: "New Partnership with Gauteng Department of Education",
    slug: "gauteng-department-partnership",
    excerpt: "TWT secures major partnership to digitise learning materials in Gauteng.",
    content:
      "We are thrilled to announce a landmark partnership with the Gauteng Department of Education to provide digital textbooks to over 200 schools...",
    category: "Policy",
    tags: ["partnership", "Gauteng", "government"],
    author: "Dr. Nkosazana Mthembu",
    date: "2026-07-05",
    status: "published",
    featured: true,
  },
  {
    id: 4,
    title: "Offline-First Design: Why It Matters for Africa",
    slug: "offline-first-design-africa",
    excerpt: "Our engineering approach to ensuring access without reliable internet.",
    content:
      "Reliable internet remains a luxury in many parts of Africa. Our offline-first architecture ensures that students can access all learning materials...",
    category: "EdTech",
    tags: ["offline", "architecture", "Africa"],
    author: "Lerato Mokoena",
    date: "2026-07-03",
    status: "draft",
    featured: false,
  },
  {
    id: 5,
    title: "Case Study: Mamelodi Secondary School Transformation",
    slug: "mamelodi-secondary-case-study",
    excerpt: "How one school in Pretoria achieved a 40% improvement in pass rates.",
    content:
      "Mamelodi Secondary School in Tshwane adopted TWT's platform in 2025. Within one academic year, the school saw dramatic improvements...",
    category: "Case Studies",
    tags: ["case study", "Mamelodi", "results"],
    author: "Sipho Ndlovu",
    date: "2026-06-28",
    status: "published",
    featured: false,
  },
  {
    id: 6,
    title: "The Future of Afrikaans and Zulu Digital Content",
    slug: "multilingual-digital-content",
    excerpt: "Developing quality educational content in South African languages.",
    content:
      "Language should never be a barrier to education. TWT is committed to producing high-quality digital textbooks in all 11 official South African languages...",
    category: "Digital Literacy",
    tags: ["languages", "Afrikaans", "Zulu", "localisation"],
    author: "Naledi Dlamini",
    date: "2026-06-25",
    status: "draft",
    featured: false,
  },
];

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: categories[0],
    tags: "",
    featured: false,
    status: "draft" as "published" | "draft",
  });

  const filtered = posts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === "All" || p.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const openCreate = () => {
    setEditingPost(null);
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: categories[0],
      tags: "",
      featured: false,
      status: "draft",
    });
    setShowModal(true);
  };

  const openEdit = (post: Post) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags.join(", "),
      featured: post.featured,
      status: post.status,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (editingPost) {
        await fetch(`/api/posts/${editingPost.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        setPosts(
          posts.map((p) =>
            p.id === editingPost.id
              ? { ...p, ...payload, date: p.date }
              : p
          )
        );
      } else {
        const res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const newPost = await res.json();
        setPosts([
          {
            id: newPost?.id || Date.now(),
            ...payload,
            author: "Admin User",
            date: new Date().toISOString().split("T")[0],
          },
          ...posts,
        ]);
      }
      setShowModal(false);
    } catch {
      // silently handle
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          New Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Author</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900 dark:text-white">{post.title}</p>
                      {post.featured && (
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 text-xs rounded font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{post.category}</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{post.author}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {post.date}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.status === "published"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {post.status === "published" ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(post)}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      {deleteConfirm === post.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded font-medium"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs rounded font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(post.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-500">
                    No posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editingPost ? "Edit Post" : "New Post"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                      slug: editingPost?.slug || generateSlug(e.target.value),
                    })
                  }
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Excerpt
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tags
                  </label>
                  <div className="relative">
                    <Tag
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={form.tags}
                      onChange={(e) => setForm({ ...form, tags: e.target.value })}
                      placeholder="Comma-separated"
                      className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.status === "published"}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.checked ? "published" : "draft" })
                    }
                    className="w-4 h-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Published</span>
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {editingPost ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
