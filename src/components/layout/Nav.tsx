"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/hooks/useScroll";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/education", label: "Education" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/fun", label: "Fun" },
  { href: "/contact", label: "Contact" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY, scrollDirection } = useScrollPosition();

  const scrolled = scrollY > 20;
  const shouldHide = scrollDirection === "down" && scrollY > 400;

  return (
    <header
      className={cn(
        // header-earth: the header keeps its earth palette under the site theme
        "header-earth fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--surface)] backdrop-blur-md border-b border-[var(--border)] shadow-lg shadow-black/20"
          : "bg-[var(--page-bg)] border-b border-transparent",
        shouldHide && "-translate-y-full"
      )}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-24 flex items-center justify-between h-14">
        <Link
          href="/"
          className="text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
          aria-label="Rupak Ghosh - Home"
        >
          RG
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = isActivePath(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-xs font-medium transition-all relative group",
                    isActive
                      ? "text-[var(--text)]"
                      : "text-[var(--muted)] hover:text-[var(--text)]"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] transition-all",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="box-btn box-btn--icon"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "md:hidden border-t border-[var(--border)] bg-[var(--surface)] backdrop-blur-md transition-all duration-300",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="px-6 py-4 flex flex-col gap-4" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => {
            const isActive = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors flex items-center gap-2",
                  isActive
                    ? "text-[var(--text)]"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                )}
              >
                {isActive && (
                  <span
                    className="w-1 h-4 bg-gradient-to-b from-[var(--accent)] to-[var(--accent-hover)] rounded-full"
                    aria-hidden="true"
                  />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
