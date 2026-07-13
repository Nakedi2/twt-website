"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, X, Loader2, Linkedin, Twitter } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  twitter: string;
  initials: string;
  gradient: string;
}

const gradients = [
  "from-emerald-400 to-teal-600",
  "from-blue-400 to-indigo-600",
  "from-purple-400 to-pink-600",
  "from-orange-400 to-red-600",
  "from-cyan-400 to-blue-600",
  "from-rose-400 to-purple-600",
];

const initialMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Nkosazana Mthembu",
    role: "Founder & CEO",
    bio: "Former educator with 15 years of experience in South African schools. PhD in Educational Technology from Wits University. Passionate about bridging the digital divide.",
    linkedin: "https://linkedin.com/in/nkosazana-mthembu",
    twitter: "https://twitter.com/nmthembu_twt",
    initials: "NM",
    gradient: gradients[0],
  },
  {
    id: 2,
    name: "Thabo Molefe",
    role: "Chief Technology Officer",
    bio: "Software engineer with expertise in offline-first applications and scalable systems. Previously at Takealot and Yoco. Holds a BSc Hons in Computer Science from UCT.",
    linkedin: "https://linkedin.com/in/thabo-molefe",
    twitter: "https://twitter.com/tmolefe_dev",
    initials: "TM",
    gradient: gradients[1],
  },
  {
    id: 3,
    name: "Naledi Dlamini",
    role: "Head of Content",
    bio: "Curriculum specialist with deep knowledge of CAPS and OBE frameworks. Leads a team of content creators producing multilingual educational materials across all 11 official languages.",
    linkedin: "https://linkedin.com/in/naledi-dlamini",
    twitter: "https://twitter.com/ndlamini_edu",
    initials: "ND",
    gradient: gradients[2],
  },
  {
    id: 4,
    name: "Sipho Ndlovu",
    role: "Head of Partnerships",
    bio: "Experienced in public-private partnerships in the education sector. Previously worked with the Department of Basic Education and multiple international NGOs.",
    linkedin: "https://linkedin.com/in/sipho-ndlovu",
    twitter: "",
    initials: "SN",
    gradient: gradients[3],
  },
  {
    id: 5,
    name: "Lerato Mokoena",
    role: "Lead Designer",
    bio: "UX/UI designer specialising in educational interfaces. Passionate about creating accessible, intuitive designs that work across all devices and connectivity levels.",
    linkedin: "https://linkedin.com/in/lerato-mokoena",
    twitter: "https://twitter.com/lerato_designs",
    initials: "LM",
    gradient: gradients[4],
  },
  {
    id: 6,
    name: "Pieter van der Merwe",
    role: "DevOps Engineer",
    bio: "Cloud infrastructure specialist focused on cost-effective, scalable deployments for African markets. Expert in AWS, containerisation, and CI/CD pipelines.",
    linkedin: "https://linkedin.com/in/pieter-vdm",
    twitter: "",
    initials: "PV",
    gradient: gradients[5],
  },
];

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    linkedin: "",
    twitter: "",
  });

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .filter((_, i, arr) => i === 0 || i === arr.length - 1)
      .join("")
      .toUpperCase();

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", role: "", bio: "", linkedin: "", twitter: "" });
    setShowModal(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({
      name: m.name,
      role: m.role,
      bio: m.bio,
      linkedin: m.linkedin,
      twitter: m.twitter,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const initials = getInitials(form.name);
      const gradient = gradients[Math.floor(Math.random() * gradients.length)];

      if (editing) {
        await fetch(`/api/team/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        setMembers(
          members.map((m) =>
            m.id === editing.id ? { ...m, ...form, initials } : m
          )
        );
      } else {
        const res = await fetch("/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        setMembers([
          ...members,
          { id: data?.id || Date.now(), ...form, initials, gradient },
        ]);
      }
      setShowModal(false);
    } catch {
      // handle silently
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team Members</h1>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          Add Member
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {members.map((m) => (
          <div
            key={m.id}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${m.gradient} flex items-center justify-center flex-shrink-0`}
              >
                <span className="text-white font-bold text-lg">{m.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white">{m.name}</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">{m.role}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-3">{m.bio}</p>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
              <div className="flex gap-2">
                {m.linkedin && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin size={16} />
                  </a>
                )}
                {m.twitter && (
                  <a
                    href={m.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-gray-400 hover:text-sky-500 transition-colors"
                  >
                    <Twitter size={16} />
                  </a>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEdit(m)}
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                {deleteConfirm === m.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded font-medium"
                    >
                      Delete
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
                    onClick={() => setDeleteConfirm(m.id)}
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
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {editing ? "Edit Member" : "Add Member"}
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
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={form.linkedin}
                  onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Twitter URL
                </label>
                <input
                  type="url"
                  value={form.twitter}
                  onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                  placeholder="https://twitter.com/..."
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
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
