"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="box-btn box-btn--icon pointer-events-none" aria-hidden="true" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="box-btn box-btn--icon group"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun
          size={18}
          className="text-[var(--accent)] group-hover:rotate-180 transition-transform duration-300"
        />
      ) : (
        <Moon
          size={18}
          className="text-[var(--accent)] group-hover:-rotate-90 transition-transform duration-300"
        />
      )}
    </button>
  );
}
