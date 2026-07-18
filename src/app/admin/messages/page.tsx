"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Trash2,
  Mail,
  MailOpen,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("twt-admin-token");
    }
    return null;
  };

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const token = getToken();
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch("/api/messages", { headers });
      if (res.ok) {
        const data = await res.json();
        setMessages(data.data || []);
      }
    } catch {
      // silently handle
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const filtered = messages.filter((m) => {
    const matchFilter =
      filter === "all" || (filter === "unread" && !m.read) || (filter === "read" && m.read);
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const toggleRead = async (id: string) => {
    try {
      const token = getToken();
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      await fetch("/api/messages", {
        method: "PUT",
        headers,
        body: JSON.stringify({ id }),
      });
      setMessages(
        messages.map((m) => (m._id === id ? { ...m, read: !m.read } : m))
      );
    } catch {
      // silently handle
    }
  };

  const handleDelete = (id: string) => {
    setMessages(messages.filter((m) => m._id !== id));
    setDeleteConfirm(null);
    if (expandedId === id) setExpandedId(null);
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                filter === f
                  ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Messages list */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {loading ? (
          <div className="px-5 py-12 text-center text-gray-500">
            <div className="inline-flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              Loading messages...
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((msg) => (
              <div key={msg._id}>
                <div
                  className={`px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${
                    !msg.read ? "bg-emerald-50/50 dark:bg-emerald-500/5" : ""
                  }`}
                  onClick={() => setExpandedId(expandedId === msg._id ? null : msg._id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="pt-1">
                      {!msg.read ? (
                        <Mail size={18} className="text-emerald-500" />
                      ) : (
                        <MailOpen size={18} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p
                          className={`text-sm font-semibold ${
                            !msg.read
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {msg.name}
                        </p>
                        <span className="text-xs text-gray-400">&lt;{msg.email}&gt;</span>
                        {!msg.read && (
                          <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p
                        className={`text-sm ${
                          !msg.read
                            ? "font-medium text-gray-900 dark:text-white"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {msg.subject}
                      </p>
                      {expandedId !== msg._id && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">{msg.message}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-gray-400 whitespace-nowrap">{formatDate(msg.createdAt)}</span>
                      {expandedId === msg._id ? (
                        <ChevronUp size={16} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded view */}
                {expandedId === msg._id && (
                  <div className="px-5 pb-4 pl-12">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                        {msg.message}
                      </p>
                      {msg.phone && (
                        <p className="text-xs text-gray-500 mt-2">Phone: {msg.phone}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRead(msg._id);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          msg.read
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                            : "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200"
                        }`}
                      >
                        {msg.read ? <Mail size={14} /> : <MailOpen size={14} />}
                        {msg.read ? "Mark as Unread" : "Mark as Read"}
                      </button>
                      {deleteConfirm === msg._id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(msg._id);
                            }}
                            className="px-3 py-1.5 bg-red-500 text-white text-xs rounded-lg font-medium"
                          >
                            Confirm Delete
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm(null);
                            }}
                            className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs rounded-lg font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirm(msg._id);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-xs font-medium transition-colors"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="px-5 py-12 text-center text-gray-500 text-sm">
                {loading ? "Loading..." : "No messages found."}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
