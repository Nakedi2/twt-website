"use client";

import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Loader2,
  GripVertical,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  subcategories: string[];
  order: number;
}

const initialServices: Service[] = [
  {
    id: 1,
    title: "Digital Textbooks",
    slug: "digital-textbooks",
    description:
      "Interactive, curriculum-aligned digital textbooks for South African learners from Grade R to Grade 12.",
    icon: "BookOpen",
    features: [
      "Offline access",
      "Interactive quizzes",
      "Multi-language support",
      "Curriculum-aligned",
    ],
    subcategories: ["Primary School", "High School", "TVET Colleges"],
    order: 1,
  },
  {
    id: 2,
    title: "Teacher Training",
    slug: "teacher-training",
    description:
      "Comprehensive professional development programmes for educators embracing digital transformation.",
    icon: "GraduationCap",
    features: [
      "Workshop facilitation",
      "Online certification",
      "Ongoing mentorship",
      "Resource library",
    ],
    subcategories: ["Digital Literacy", "Integration Workshops", "Advanced EdTech"],
    order: 2,
  },
  {
    id: 3,
    title: "School Infrastructure",
    slug: "school-infrastructure",
    description:
      "End-to-end solutions for equipping schools with the technology needed for digital learning.",
    icon: "Building",
    features: [
      "Device provisioning",
      "Network setup",
      "Technical support",
      "Maintenance plans",
    ],
    subcategories: ["Hardware", "Networking", "Support"],
    order: 3,
  },
  {
    id: 4,
    title: "Research & Analytics",
    slug: "research-analytics",
    description:
      "Data-driven insights to improve educational outcomes across South African schools.",
    icon: "BarChart3",
    features: [
      "Learning analytics",
      "Impact reports",
      "Policy recommendations",
      "Benchmark studies",
    ],
    subcategories: ["Impact Assessment", "Policy Research", "Data Analytics"],
    order: 4,
  },
  {
    id: 5,
    title: "Community Outreach",
    slug: "community-outreach",
    description:
      "Grassroots programmes bringing digital education to underserved communities across all nine provinces.",
    icon: "Heart",
    features: [
      "Mobile learning units",
      "Community workshops",
      "Parent engagement",
      "After-school programmes",
    ],
    subcategories: ["Mobile Units", "Workshops", "After-School"],
    order: 5,
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    icon: "BookOpen",
    features: [] as string[],
    subcategories: [] as string[],
    order: 0,
  });
  const [featureInput, setFeatureInput] = useState("");
  const [subInput, setSubInput] = useState("");

  const openCreate = () => {
    setEditing(null);
    setForm({
      title: "",
      slug: "",
      description: "",
      icon: "BookOpen",
      features: [],
      subcategories: [],
      order: services.length + 1,
    });
    setFeatureInput("");
    setSubInput("");
    setShowModal(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({
      title: s.title,
      slug: s.slug,
      description: s.description,
      icon: s.icon,
      features: [...s.features],
      subcategories: [...s.subcategories],
      order: s.order,
    });
    setFeatureInput("");
    setSubInput("");
    setShowModal(true);
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setForm({ ...form, features: [...form.features, featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (i: number) => {
    setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });
  };

  const addSubcategory = () => {
    if (subInput.trim()) {
      setForm({ ...form, subcategories: [...form.subcategories, subInput.trim()] });
      setSubInput("");
    }
  };

  const removeSubcategory = (i: number) => {
    setForm({
      ...form,
      subcategories: form.subcategories.filter((_, idx) => idx !== i),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await fetch(`/api/services/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setServices(services.map((s) => (s.id === editing.id ? { ...s, ...form } : s)));
      } else {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        setServices([...services, { id: data?.id || Date.now(), ...form }]);
      }
      setShowModal(false);
    } catch {
      // handle silently
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
    setDeleteConfirm(null);
  };

  const moveOrder = (id: number, direction: "up" | "down") => {
    const idx = services.findIndex((s) => s.id === id);
    if (idx === -1) return;
    const swapped = [...services];
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= swapped.length) return;
    [swapped[idx].order, swapped[swapIdx].order] = [swapped[swapIdx].order, swapped[idx].order];
    [swapped[idx], swapped[swapIdx]] = [swapped[swapIdx], swapped[idx]];
    setServices(swapped);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services</h1>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      {/* Services list */}
      <div className="space-y-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-1 pt-1">
                <button
                  onClick={() => moveOrder(service.id, "up")}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  disabled={service.order === 1}
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  onClick={() => moveOrder(service.id, "down")}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  disabled={service.order === services.length}
                >
                  <ArrowDown size={16} />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                    #{service.order}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.features.map((f, i) => (
                    <span
                      key={i}
                      className="text-xs bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                {service.subcategories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {service.subcategories.map((sub, i) => (
                      <span
                        key={i}
                        className="text-xs bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEdit(service)}
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                {deleteConfirm === service.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded font-medium"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs rounded font-medium"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(service.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editing ? "Edit Service" : "Add Service"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                        slug: form.title
                          .toLowerCase()
                          .replace(/[^a-z0-9\s-]/g, "")
                          .replace(/\s+/g, "-"),
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
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Icon Name
                  </label>
                  <input
                    type="text"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Features
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    placeholder="Add a feature"
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.features.map((f, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full"
                    >
                      {f}
                      <button type="button" onClick={() => removeFeature(i)} className="hover:text-red-500">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Subcategories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subcategories
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={subInput}
                    onChange={(e) => setSubInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSubcategory())}
                    placeholder="Add a subcategory"
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <button
                    type="button"
                    onClick={addSubcategory}
                    className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.subcategories.map((s, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => removeSubcategory(i)}
                        className="hover:text-red-500"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  {editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
