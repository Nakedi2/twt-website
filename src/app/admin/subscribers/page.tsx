"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Trash2,
  Download,
  Users,
  UserPlus,
  Mail,
  Loader2,
} from "lucide-react";

interface Subscriber {
  _id: string;
  email: string;
  subscribed: boolean;
  createdAt: string;
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("twt-admin-token") : null;
      const res = await fetch("/api/subscribers", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      setSubscribers(data.data || []);
    } catch { /* silent */ } finally {
      setLoading(false);
    }
  };

  const filtered = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = subscribers.filter((s) => s.subscribed).length;
  const thisMonth = subscribers.filter((s) => {
    const d = new Date(s.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const handleDelete = async (id: string) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("twt-admin-token") : null;
      await fetch(`/api/subscribers/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      await fetchSubscribers();
    } catch { /* silent */ }
    setDeleteConfirm(null);
  };

  const handleExport = () => {
    const headers = "Email,Subscribed,Date\n";
    const rows = filtered
      .map((s) => `"${s.email}","${s.subscribed}","${s.createdAt}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `twt-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subscribers</h1>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex items-center gap-4">
          <div className="bg-emerald-500 p-3 rounded-xl"><Users size={22} className="text-white" /></div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Subscribers</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{subscribers.length}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex items-center gap-4">
          <div className="bg-blue-500 p-3 rounded-xl"><UserPlus size={22} className="text-white" /></div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">New This Month</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{thisMonth}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex items-center gap-4">
          <div className="bg-purple-500 p-3 rounded-xl"><Mail size={22} className="text-white" /></div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeCount}</p>
          </div>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Subscribe Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <tr
                  key={sub._id}
                  className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900 dark:text-white">{sub.email}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      sub.subscribed
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}>
                      {sub.subscribed ? "Active" : "Unsubscribed"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {deleteConfirm === sub._id ? (
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleDelete(sub._id)} className="px-2 py-1 bg-red-500 text-white text-xs rounded font-medium">Delete</button>
                        <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs rounded font-medium">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(sub._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-gray-500">No subscribers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
