"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A1628]"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex h-20 w-20 items-center justify-center rounded-2xl shadow-2xl shadow-[#6C3CE1]/30 overflow-hidden"
            >
              <img
                src="/logo.jpg"
                alt="TWT"
                className="h-20 w-20 object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <p className="text-lg font-semibold text-white">The Walking Textbooks</p>
              <p className="text-sm text-gray-400 mt-1">Loading your experience...</p>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
              className="w-48 h-0.5 rounded-full bg-gradient-to-r from-[#6C3CE1] via-[#00D4FF] to-[#6C3CE1] origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
