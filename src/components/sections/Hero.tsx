import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/resume";

const primaryInterests = [
  "Computational Neuroscience",
  "Neural Networks and Deep Learning (BioLLMs)",
];

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-[85vh] flex items-center px-6 sm:px-12 lg:px-24 py-24"
    >
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-16 items-center">
        {/* Left: identity */}
        <div>
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tighter mb-6 leading-[0.95]">
            Rupak<br />Ghosh
          </h1>

          <p className="text-lg sm:text-xl text-[var(--muted)] mb-8 max-w-[560px] leading-relaxed">
            Computational neuroscience &amp; machine-learning researcher bridging
            wet-lab biology and code — building simulations of neural systems,
            cancer dynamics, and the tools that make research reproducible.
          </p>

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

        {/* Right: focus card — fills the fold intentionally */}
        <div className="hidden lg:block">
          <div className="bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl p-7">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--muted)] mb-5">
              Primary Interests
            </p>
            <ul className="flex flex-col gap-4">
              {primaryInterests.map((area) => (
                <li key={area} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  <span className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {area}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-7 pt-6 border-t border-[var(--border)] grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">3</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">Research papers read</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--text)]">3</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">Countries visited</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
