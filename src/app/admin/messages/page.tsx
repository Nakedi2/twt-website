"use client";

import React, { useState } from "react";
import {
  Search,
  Trash2,
  Mail,
  MailOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    name: "Thabo Molefe",
    email: "thabo.molefe@school.edu.za",
    subject: "Partnership inquiry for Gauteng schools",
    body: "Good day TWT team,\n\nI am the principal of Rivonia Primary School in Johannesburg. We have been following your work with great interest and would like to explore a potential partnership to bring your digital textbooks to our Grade 4-7 learners.\n\nWe currently have 15 computer labs across our school network and believe TWT's platform would be an excellent fit for our digital transformation strategy.\n\nCould we arrange a meeting to discuss this further?\n\nKind regards,\nThabo Molefe",
    date: "2026-07-12",
    read: true,
  },
  {
    id: 2,
    name: "Naledi Dlamini",
    email: "naledi.d@university.ac.za",
    subject: "Student textbook access request",
    body: "Hi there,\n\nI am a final-year BEd student at the University of Johannesburg. My dissertation focuses on the impact of digital learning tools in township schools, and I would love to use your platform as a case study.\n\nWould it be possible to get temporary access for research purposes? I can provide my supervisor's contact details for verification.\n\nThank you,\nNaledi Dlamini",
    date: "2026-07-12",
    read: false,
  },
  {
    id: 3,
    name: "Sipho Ndlovu",
    email: "sipho.ndlovu@dept.gov.za",
    subject: "Department of Education collaboration",
    body: "Dear The Walking Textbooks,\n\nThe Eastern Cape Department of Education would like to invite TWT to participate in our Digital Schools Initiative for 2026/2027.\n\nWe are looking for innovative EdTech partners to help us equip 500 rural schools with digital learning materials. Your offline-first approach aligns perfectly with our infrastructure constraints.\n\nPlease let us know your availability for a presentation to our procurement committee.\n\nRegards,\nSipho Ndlovu\nDirector: ICT in Education",
    date: "2026-07-11",
    read: false,
  },
  {
    id: 4,
    name: "Lerato Mokoena",
    email: "lerato.m@ngo.org.za",
    subject: "Rural school outreach programme",
    body: "Hello TWT,\n\nI run a small NGO called Hope for Education based in Polokwane. We work with 12 rural schools in the Limpopo province and have been struggling to provide adequate learning materials.\n\nYour mission resonates deeply with our own. Would TWT be open to a collaborative outreach programme where we could jointly serve these communities?\n\nLooking forward to hearing from you.\n\nWarm regards,\nLerato Mokoena",
    date: "2026-07-10",
    read: true,
  },
  {
    id: 5,
    name: "Pieter van der Merwe",
    email: "pieter@techstartup.co.za",
    subject: "EdTech conference speaker invitation",
    body: "Hi TWT Team,\n\nI am the organiser of EdTech Africa 2026, taking place in Cape Town this September. We would be honoured to have Dr. Mthembu as a keynote speaker.\n\nThe conference attracts over 500 education leaders and technology innovators from across the continent. We believe TWT's story would inspire many attendees.\n\nPlease find the speaker invitation attached. Travel and accommodation will be covered.\n\nBest regards,\nPieter van der Merwe\nConference Director, EdTech Africa",
    date: "2026-07-09",
    read: true,
  },
  {
    id: 6,
    name: "Amahle Zulu",
    email: "amahle.z@parentmail.co.za",
    subject: "Parent gratitude and feedback",
    body: "To whoever reads this,\n\nI am a mother of three from Umlazi, Durban. My children have been using the TWT app for the past term and I cannot tell you how much of a difference it has made.\n\nMy eldest, who was struggling with maths, has already improved her marks significantly. The fact that they can access everything offline is a blessing since we don't always have data.\n\nThank you for caring about our children's education.\n\nGod bless,\nAmahle Zulu",
    date: "2026-07-08",
    read: true,
  },
  {
    id: 7,
    name: "Dr. Fatima Patel",
    email: "f.patel@research.ac.za",
    subject: "Research collaboration on multilingual EdTech",
    body: "Dear Colleagues,\n\nI am a researcher at the Cape Peninsula University of Technology specialising in multilingual education technology. I have been studying TWT's approach to content delivery in multiple South African languages.\n\nI would love to discuss a formal research collaboration. We have funding available through the NRF and believe a joint study could yield significant findings.\n\nKind regards,\nDr. Fatima Patel\nDepartment of Language Technology",
    date: "2026-07-07",
    read: false,
  },
  {
    id: 8,
    name: "Mandla Zwide",
    email: "mandla.zwide@school.edu.za",
    subject: "Technical support request",
    body: "Hi support,\n\nWe are experiencing issues with the offline sync on our school tablets. Some learners are not seeing the latest content updates after connecting to WiFi.\n\nWe have 120 tablets running Android 12. Could you please advise on how to resolve this?\n\nSchool: Thembelihle High School, East London\n\nThanks,\nMandla Zwide\nIT Coordinator",
    date: "2026-07-06",
    read: true,
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filtered = messages.filter((m) => {
    const matchFilter =
      filter === "all" || (filter === "unread" && !m.read) || (filter === "read" && m.read);
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const toggleRead = (id: number) => {
    setMessages(
      messages.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
    );
  };

  const handleDelete = (id: number) => {
    setMessages(messages.filter((m) => m.id !== id));
    setDeleteConfirm(null);
    if (expandedId === id) setExpandedId(null);
  };

  const unreadCount = messages.filter((m) => !m.read).length;

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
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {filtered.map((msg) => (
            <div key={msg.id}>
              <div
                className={`px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer ${
                  !msg.read ? "bg-emerald-50/50 dark:bg-emerald-500/5" : ""
                }`}
                onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)}
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
                    {expandedId !== msg.id && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{msg.body}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400 whitespace-nowrap">{msg.date}</span>
                    {expandedId === msg.id ? (
                      <ChevronUp size={16} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded view */}
              {expandedId === msg.id && (
                <div className="px-5 pb-4 pl-12">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {msg.body}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRead(msg.id);
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
                    {deleteConfirm === msg.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(msg.id);
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
                          setDeleteConfirm(msg.id);
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
              No messages found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
