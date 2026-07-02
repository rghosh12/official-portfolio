"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollPosition, useActiveSection } from "@/hooks/useScroll";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Credentials" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY, scrollDirection } = useScrollPosition();
  const activeSection = useActiveSection();
  
  const scrolled = scrollY > 20;
  const shouldHide = scrollDirection === 'down' && scrollY > 400;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-black/60 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent",
        shouldHide && "-translate-y-full"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-24 flex items-center justify-between h-14">
        {/* Logo / Name */}
        <a
          href="#home"
          className="text-sm font-semibold text-white hover:text-blue-400 transition-colors"
        >
          RG
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-medium transition-all relative group",
                  isActive 
                    ? "text-white" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                {link.label}
                {/* Active indicator */}
                <span 
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </a>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer with slide animation */}
      <div
        className={cn(
          "md:hidden border-t border-white/10 bg-black/90 backdrop-blur-md transition-all duration-300",
          mobileOpen 
            ? "max-h-96 opacity-100" 
            : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <nav className="px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors flex items-center gap-2",
                  isActive 
                    ? "text-white" 
                    : "text-gray-400 hover:text-white"
                )}
              >
                {isActive && (
                  <span className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
