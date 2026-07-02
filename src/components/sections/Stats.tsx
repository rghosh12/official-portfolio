"use client";

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

function StatCard({ icon, value, label, suffix = "", prefix = "" }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="text-5xl sm:text-6xl font-bold text-[var(--text)] mb-3 tabular-nums">
        {prefix}{value}{suffix}
      </div>
      <p className="text-sm text-[var(--muted)]">
        {label}
      </p>
    </div>
  );
}

export function Stats() {
  return (
    <section id="stats" className="px-6 sm:px-12 lg:px-24 py-32">
      <div className="max-w-[800px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <StatCard
            value={15}
            suffix="+"
            label="Projects"
          />
          <StatCard
            value={3}
            suffix="+"
            label="Years Experience"
          />
          <StatCard
            value={500}
            suffix="+"
            label="GitHub Contributions"
          />
          <StatCard
            value={8}
            suffix="+"
            label="Certifications"
          />
        </div>
      </div>
    </section>
  );
}
