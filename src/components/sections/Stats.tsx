"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Briefcase, Award, GitBranch } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref };
}

function StatCard({ icon, value, label, suffix = "", prefix = "" }: StatCardProps) {
  const { count, ref } = useCountUp(value);

  return (
    <div
      ref={ref}
      className="group relative bg-[var(--surface-2)] border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--accent)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]"
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-hover)]/10 border border-[var(--accent)]/20 group-hover:scale-110 transition-transform duration-300">
          <span className="text-[var(--accent)] block">{icon}</span>
        </div>
        
        <div>
          <div className="text-4xl sm:text-5xl font-bold text-[var(--text)] mb-2 tabular-nums">
            {prefix}{count}{suffix}
          </div>
          <p className="text-sm sm:text-base text-[var(--muted)] font-medium">
            {label}
          </p>
        </div>
      </div>

      {/* Glow effect on hover - Refined */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent)]/0 via-[var(--accent-hover)]/0 to-[var(--accent-light)]/0 group-hover:from-[var(--accent)]/5 group-hover:via-[var(--accent-hover)]/5 group-hover:to-[var(--accent-light)]/5 transition-all duration-500 pointer-events-none" />
    </div>
  );
}

export function Stats() {
  return (
    <section id="stats" className="px-6 sm:px-12 lg:px-24 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="By The Numbers"
          title="Impact & Achievements"
          description="Quantifying my journey in software development and research"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <StatCard
            icon={<Code2 size={32} />}
            value={15}
            suffix="+"
            label="Projects Completed"
          />
          <StatCard
            icon={<Briefcase size={32} />}
            value={3}
            suffix="+"
            label="Years Experience"
          />
          <StatCard
            icon={<GitBranch size={32} />}
            value={500}
            suffix="+"
            label="GitHub Contributions"
          />
          <StatCard
            icon={<Award size={32} />}
            value={8}
            suffix="+"
            label="Certifications"
          />
        </div>
      </div>
    </section>
  );
}
