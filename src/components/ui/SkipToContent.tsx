"use client";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-[var(--accent)] focus:text-[var(--accent-foreground)] focus:rounded-lg focus:font-semibold focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
}
