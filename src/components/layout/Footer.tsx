import { profile } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] backdrop-blur-md px-6 sm:px-12 lg:px-24 py-8" role="contentinfo">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[var(--text)]">{profile.name}</p>
          <p className="text-xs text-[var(--muted)] mt-0.5">
            {profile.location} · {profile.email}
          </p>
        </div>
        <nav className="flex items-center gap-5" aria-label="Footer navigation">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            aria-label="LinkedIn profile"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            aria-label="GitHub profile"
          >
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            aria-label="Send email"
          >
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
