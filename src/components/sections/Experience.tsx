import { MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { experience } from "@/data/resume";

export function Experience() {
  return (
    <section id="experience" className="px-6 sm:px-12 lg:px-24 py-32">
      <div className="max-w-[800px]">
        <div className="flex flex-col gap-12">
          {experience.map((exp, index) => (
            <AnimatedSection key={exp.id} delay={index * 100} animation="fade-up">
              <div>
                {/* Header */}
                <div className="mb-4">
                  <h3 className="font-semibold text-white text-base">{exp.role}</h3>
                  <p className="text-[var(--accent)] text-sm mt-1">{exp.org}</p>
                  <div className="flex items-center gap-3 text-xs text-[var(--muted)] mt-1">
                    <span>{exp.period}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={10} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="flex flex-col gap-2">
                  {exp.bullets.slice(0, 2).map((b, i) => (
                    <li key={i} className="text-sm text-gray-400 leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
