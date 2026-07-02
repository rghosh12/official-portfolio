import { profile } from "@/data/resume";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center px-6 sm:px-12 lg:px-24 py-32"
    >
      <div className="max-w-[900px]">
        {/* Bold, minimal name - no gradients, no decoration */}
        <h1 className="text-7xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-12 leading-[0.9]">
          Rupak<br />Ghosh
        </h1>

        {/* Role - simple and clear */}
        <p className="text-xl sm:text-2xl text-[var(--muted)] mb-16 max-w-[600px] leading-relaxed">
          Cell & Molecular Biology researcher exploring the intersection of wet lab science and computational analysis.
        </p>

        {/* Single CTA - clear action path */}
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm uppercase tracking-wider text-[var(--text)] hover:text-[var(--accent)] transition-colors border-b-2 border-[var(--text)] hover:border-[var(--accent)] pb-1"
        >
          View Work →
        </a>
      </div>
    </section>
  );
}
