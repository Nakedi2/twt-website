"use client";

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full rounded-xl px-4 py-2.5 text-sm
            bg-white dark:bg-white/5
            border transition-all duration-200
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-offset-0
            ${
              error
                ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                : "border-gray-300 dark:border-white/10 focus:ring-[#6C3CE1]/20 focus:border-[#6C3CE1]"
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`
            w-full rounded-xl px-4 py-2.5 text-sm
            bg-white dark:bg-white/5
            border transition-all duration-200
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-offset-0
            resize-none
            ${
              error
                ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                : "border-gray-300 dark:border-white/10 focus:ring-[#6C3CE1]/20 focus:border-[#6C3CE1]"
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-500">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
export default Input;
