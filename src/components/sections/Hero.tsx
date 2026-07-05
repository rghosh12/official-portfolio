import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/resume";
import { HeroSidebar } from "@/components/sections/HeroSidebar";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-[85vh] flex items-center px-6 sm:px-12 lg:px-24 py-24"
    >
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-16 items-center">
        {/* Left: identity */}
        <div>
          <div className="mb-6">
            <Image
              src="/images/profile.png"
              alt="Rupak Ghosh"
              width={160}
              height={160}
              priority
              className="w-40 h-40 rounded-full object-cover object-[center_20%] border border-[var(--border)] shadow-lg shadow-black/20"
            />
          </div>

          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tighter mb-6 leading-[0.95]">
            Rupak<br />Ghosh
          </h1>

          {/* CTAs — labels now match their destinations */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-semibold transition-colors"
            >
              View Projects
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text)] text-sm font-semibold transition-colors"
            >
              Get in Touch
            </Link>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] text-[var(--muted)] hover:text-[var(--text)] text-sm font-semibold transition-colors"
            >
              <Download size={16} />
              View Résumé
            </a>
          </div>

          <div className="flex flex-col gap-1.5 mb-8 text-sm">
            <a
              href={`mailto:${profile.emailAlt}`}
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              <span className="text-[var(--text-secondary)]">Personal:</span>{" "}
              {profile.emailAlt}
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              <span className="text-[var(--text-secondary)]">Professional:</span>{" "}
              {profile.email}
            </a>
          </div>

          {/* Inline credibility links */}
          <div className="flex items-center gap-5 text-[var(--muted)]">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-[var(--accent)] transition-colors"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-[var(--accent)] transition-colors"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-sm hover:text-[var(--accent)] transition-colors"
            >
              <Mail size={16} /> Email
            </a>
          </div>
        </div>

        <HeroSidebar />
      </div>
    </section>
  );
}
