"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-300 hover:scale-105 group min-w-[48px] min-h-[48px] flex items-center justify-center"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun
          size={20}
          className="text-[var(--accent)] group-hover:rotate-180 transition-transform duration-500"
        />
      ) : (
        <Moon
          size={20}
          className="text-[var(--accent)] group-hover:-rotate-90 transition-transform duration-500"
        />
      )}
    </button>
  );
}
