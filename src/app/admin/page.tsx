"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  FileText,
  Mail,
  Users,
  Briefcase,
  PenLine,
  Eye,
  UserPlus,
  Plus,
  Loader2,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: "Total Blog Posts", value: 0, icon: FileText, color: "bg-blue-500" },
    { label: "Total Messages", value: 0, icon: Mail, color: "bg-purple-500" },
    { label: "Subscribers", value: 0, icon: Users, color: "bg-emerald-500" },
    { label: "Services", value: 0, icon: Briefcase, color: "bg-orange-500" },
  ]);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("twt-admin-token");
    }
    return null;
  };

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const [blogRes, messagesRes, subscribersRes, servicesRes] = await Promise.allSettled([
        fetch("/api/blog?limit=1"),
        fetch("/api/messages", { headers }),
        fetch("/api/subscribers", { headers }),
        fetch("/api/services?limit=1"),
      ]);

      const newStats = [...stats];

      if (blogRes.status === "fulfilled" && blogRes.value.ok) {
        const data = await blogRes.value.json();
        newStats[0] = { ...newStats[0], value: data.pagination?.total || 0 };
      }

      if (messagesRes.status === "fulfilled" && messagesRes.value.ok) {
        const data = await messagesRes.value.json();
        newStats[1] = { ...newStats[1], value: (data.data || []).length };
      }

      if (subscribersRes.status === "fulfilled" && subscribersRes.value.ok) {
        const data = await subscribersRes.value.json();
        newStats[2] = { ...newStats[2], value: (data.data || []).length };
      }

      if (servicesRes.status === "fulfilled" && servicesRes.value.ok) {
        const data = await servicesRes.value.json();
        newStats[3] = { ...newStats[3], value: data.pagination?.total || (data.data || []).length };
      }

      setStats(newStats);
    } catch {
      // silently handle - keep default values
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const quickActions = [
    { label: "New Post", href: "/admin/posts", icon: PenLine, color: "bg-blue-500" },
    { label: "View Messages", href: "/admin/messages", icon: Eye, color: "bg-purple-500" },
    { label: "Manage Team", href: "/admin/team", icon: UserPlus, color: "bg-emerald-500" },
    { label: "Add Service", href: "/admin/services", icon: Plus, color: "bg-orange-500" },
  ];

  const today = new Date().toLocaleDateString("en-ZA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, Admin
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{today}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {loading ? (
                      <Loader2 size={24} className="animate-spin text-gray-300" />
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon size={22} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-500/5 transition-all"
                >
                  <div className={`${action.color} p-2.5 rounded-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Info
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Status</span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                Online
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Platform</span>
              <span className="text-gray-700 dark:text-gray-200 font-medium">Next.js 16</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Database</span>
              <span className="text-gray-700 dark:text-gray-200 font-medium">MongoDB Atlas</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Hosting</span>
              <span className="text-gray-700 dark:text-gray-200 font-medium">Vercel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
