"use client";

import React, { useState } from "react";
import {
  Search,
  Trash2,
  Download,
  Users,
  UserPlus,
  Mail,
} from "lucide-react";

interface Subscriber {
  id: number;
  email: string;
  name: string;
  date: string;
  status: "active" | "unsubscribed";
}

const initialSubscribers: Subscriber[] = [
  { id: 1, email: "thabo.m@school.edu.za", name: "Thabo Molefe", date: "2026-07-10", status: "active" },
  { id: 2, email: "naledi.d@university.ac.za", name: "Naledi Dlamini", date: "2026-07-09", status: "active" },
  { id: 3, email: "sipho.ndlovu@dept.gov.za", name: "Sipho Ndlovu", date: "2026-07-08", status: "active" },
  { id: 4, email: "lerato.m@ngo.org.za", name: "Lerato Mokoena", date: "2026-07-07", status: "active" },
  { id: 5, email: "pieter@techstartup.co.za", name: "Pieter van der Merwe", date: "2026-07-06", status: "active" },
  { id: 6, email: "amahle.z@parentmail.co.za", name: "Amahle Zulu", date: "2026-07-05", status: "active" },
  { id: 7, email: "f.patel@research.ac.za", name: "Dr. Fatima Patel", date: "2026-07-04", status: "active" },
  { id: 8, email: "mandla.zwide@school.edu.za", name: "Mandla Zwide", date: "2026-07-03", status: "unsubscribed" },
  { id: 9, email: "zanele.k@edtech.org", name: "Zanele Khumalo", date: "2026-07-02", status: "active" },
  { id: 10, email: "james.nkosi@mamelodi.edu.za", name: "James Nkosi", date: "2026-07-01", status: "active" },
  { id: 11, email: "refilwe.m@wits.ac.za", name: "Refilwe Mabena", date: "2026-06-28", status: "active" },
  { id: 12, email: "david.o@afritech.co", name: "David Okafor", date: "2026-06-25", status: "active" },
  { id: 13, email: "carla.vdm@schools.co.za", name: "Carla van der Merwe", date: "2026-06-22", status: "unsubscribed" },
  { id: 14, email: "bongani.m@education.gov.za", name: "Bongani Mthethwa", date: "2026-06-20", status: "active" },
  { id: 15, email: "palesa.n@twt.co.za", name: "Palesa Nkosi", date: "2026-06-18", status: "active" },
];

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filtered = subscribers.filter(
    (s) =>
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = subscribers.filter((s) => s.status === "active").length;
  const thisMonth = subscribers.filter((s) => {
    const d = new Date(s.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const handleDelete = (id: number) => {
    setSubscribers(subscribers.filter((s) => s.id !== id));
    setDeleteConfirm(null);
  };

  const handleExport = () => {
    const headers = "Name,Email,Date,Status\n";
    const rows = filtered
      .map((s) => `"${s.name}","${s.email}","${s.date}","${s.status}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `twt-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

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

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex items-center gap-4">
          <div className="bg-emerald-500 p-3 rounded-xl">
            <Users size={22} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Subscribers</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{subscribers.length}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex items-center gap-4">
          <div className="bg-blue-500 p-3 rounded-xl">
            <UserPlus size={22} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">New This Month</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{thisMonth}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex items-center gap-4">
          <div className="bg-purple-500 p-3 rounded-xl">
            <Mail size={22} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeCount}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Subscribe Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900 dark:text-white">{sub.email}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{sub.name}</td>
                  <td className="px-5 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {sub.date}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sub.status === "active"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {sub.status === "active" ? "Active" : "Unsubscribed"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    {deleteConfirm === sub.id ? (
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleDelete(sub.id)}
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
                        onClick={() => setDeleteConfirm(sub.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-gray-500">
                    No subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
