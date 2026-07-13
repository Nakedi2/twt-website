"use client";

import React from "react";
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
} from "lucide-react";

const stats = [
  { label: "Total Blog Posts", value: 12, icon: FileText, color: "bg-blue-500" },
  { label: "Total Messages", value: 48, icon: Mail, color: "bg-purple-500" },
  { label: "Subscribers", value: 256, icon: Users, color: "bg-emerald-500" },
  { label: "Services", value: 5, icon: Briefcase, color: "bg-orange-500" },
];

const recentMessages = [
  {
    id: 1,
    name: "Thabo Molefe",
    email: "thabo.molefe@school.edu.za",
    subject: "Partnership inquiry for Gauteng schools",
    date: "2026-07-12",
    read: true,
  },
  {
    id: 2,
    name: "Naledi Dlamini",
    email: "naledi.d@university.ac.za",
    subject: "Student textbook access request",
    date: "2026-07-12",
    read: false,
  },
  {
    id: 3,
    name: "Sipho Ndlovu",
    email: "sipho.ndlovu@dept.gov.za",
    subject: "Department of Education collaboration",
    date: "2026-07-11",
    read: false,
  },
  {
    id: 4,
    name: "Lerato Mokoena",
    email: "lerato.m@ngo.org.za",
    subject: "Rural school outreach programme",
    date: "2026-07-10",
    read: true,
  },
  {
    id: 5,
    name: "Pieter van der Merwe",
    email: "pieter@techstartup.co.za",
    subject: "EdTech conference speaker invitation",
    date: "2026-07-09",
    read: true,
  },
];

const quickActions = [
  { label: "New Post", href: "/admin/posts", icon: PenLine, color: "bg-blue-500" },
  { label: "View Messages", href: "/admin/messages", icon: Eye, color: "bg-purple-500" },
  { label: "Manage Team", href: "/admin/team", icon: UserPlus, color: "bg-emerald-500" },
  { label: "Add Service", href: "/admin/services", icon: Plus, color: "bg-orange-500" },
];

export default function AdminDashboard() {
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
                    {stat.value}
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
        {/* Recent Messages */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Messages
            </h2>
            <Link
              href="/admin/messages"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                  <th className="px-5 py-3 font-medium">From</th>
                  <th className="px-5 py-3 font-medium">Subject</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-900 dark:text-white">{msg.name}</p>
                      <p className="text-xs text-gray-500">{msg.email}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-700 dark:text-gray-300 max-w-[200px] truncate">
                      {msg.subject}
                    </td>
                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {msg.date}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          msg.read
                            ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                            : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                        }`}
                      >
                        {msg.read ? "Read" : "Unread"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
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
      </div>
    </div>
  );
}
