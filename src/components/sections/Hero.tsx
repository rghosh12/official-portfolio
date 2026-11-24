import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { profile, experience, education } from "@/data/resume";
import { StripClock } from "@/components/ui/strip-clock";
import { InteractiveHoverLink } from "@/components/ui/interactive-hover-button";

/** "The University of Texas at Austin" → "UT Austin" etc., for compact rows. */
function shortOrg(org: string) {
  if (/Texas at Austin/i.test(org)) return "UT Austin";
  if (/Indian Institute of Science/i.test(org)) return "IISc";
  if (/Seattle University/i.test(org)) return "Seattle University";
  return org;
}

export function Hero() {
  const school = education[0];
  const current = experience.filter((e) => e.current).slice(0, 3);
  const city = profile.location.replace(/\s+\d{5}$/, "");

  return (
    <section id="home" className="px-6 sm:px-12 lg:px-24 pt-24 pb-16 lg:pt-28 lg:pb-24">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[minmax(0,1fr)_21rem] gap-12 lg:gap-16 items-start">
        {/* ── Intro ───────────────────────────────────────────── */}
        <div>
          <Image
            src="/images/profile.png"
            alt="Rupak Ghosh"
            width={96}
            height={96}
            priority
            className="mb-8 w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center border border-[var(--border-hover)]"
          />

          <h1 className="text-6xl sm:text-7xl font-[600] tracking-[-0.03em] leading-[0.95] text-[var(--text)]">
            Rupak
            <br />
            Ghosh
          </h1>

          <p className="mt-6 max-w-2xl text-[var(--text-secondary)] leading-relaxed">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
            <InteractiveHoverLink href="/projects" text="View Projects" variant="primary" />
            <InteractiveHoverLink href="/contact" text="Get in Touch" />
            <InteractiveHoverLink
              href={profile.linkedin}
              external
              text="View Résumé"
              icon={<Download size={16} aria-hidden="true" />}
              trailingIcon={<ArrowUpRight size={16} aria-hidden="true" />}
            />
          </div>
        </div>

        {/* ── Beside the name: local time + profile at a glance ── */}
        <aside className="flex flex-col gap-4 lg:pt-28" aria-label="At a glance">
          <StripClock
            timeZone="America/Los_Angeles"
            place={city}
            className="w-full [&_.strip-clock__face]:justify-center"
          />

          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5">
            <dl className="flex flex-col gap-5">
              <div>
                <dt className="flex items-center justify-between label-mono text-[var(--muted)] mb-2">
                  Currently
                  <Link
                    href="/experience"
                    className="inline-flex items-center gap-1 text-[var(--accent)] hover:text-[var(--text)] transition-colors"
                    style={{ textDecoration: "none" }}
                  >
                    Experience <ArrowUpRight size={12} aria-hidden="true" />
                  </Link>
                </dt>
                <dd>
                  <ul className="flex flex-col gap-2.5">
                    {current.map((role) => (
                      <li key={role.id} className="font-mono text-sm leading-snug">
                        <span className="text-[var(--text)]">{role.role.split(" — ")[0]}</span>
                        <span className="block text-xs text-[var(--muted)] mt-0.5">
                          {shortOrg(role.org)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>

              <div className="border-t border-[var(--border)] pt-4">
                <dt className="label-mono text-[var(--muted)] mb-2">Studying</dt>
                <dd className="font-mono text-sm leading-snug text-[var(--text)]">
                  {school.degree.replace("Bachelor of Science in", "B.S.")}
                  <span className="block text-xs text-[var(--muted)] mt-0.5">
                    Minor: {school.minors.join(", ")} · {school.graduation}
                  </span>
                </dd>
              </div>

            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
