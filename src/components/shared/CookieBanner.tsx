"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("twt-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("twt-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("twt-cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl bg-white dark:bg-[#0D1B2E] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#6C3CE1]/10 dark:bg-[#6C3CE1]/20">
                <Cookie className="h-5 w-5 text-[#6C3CE1]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  We use cookies to enhance your browsing experience, serve personalized
                  content, and analyze our traffic. By clicking &quot;Accept&quot;, you
                  consent to our use of cookies.
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDecline}
                >
                  Decline
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAccept}
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
