import { MapPin, Users, User, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { experience } from "@/data/resume";

const TYPE_COLORS: Record<string, string> = {
  Research: "accent",
  Technical: "accent",
  Academic: "default",
  Operations: "default",
  Leadership: "default",
};

export function Experience() {
  return (
    <section id="experience" className="px-6 sm:px-12 lg:px-24 py-20 border-b border-white/10">
      <div className="max-w-4xl">
        <AnimatedSection>
          <SectionHeading
            label="Work History"
            title="Experience"
            description="Research, technical, and leadership roles across four institutions in the US and India."
          />
        </AnimatedSection>

        <div className="relative pl-4">
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-50" />

          <div className="flex flex-col gap-8">
            {experience.map((exp, index) => (
              <AnimatedSection key={exp.id} delay={index * 100} animation="fade-up">
                <div className="relative">
                  {/* Timeline dot */}
                  <div
                    className={`absolute -left-[17px] top-2 w-2.5 h-2.5 rounded-full border-2 transition-all ${
                      exp.current
                        ? "bg-emerald-500 border-emerald-300"
                        : "bg-blue-500 border-blue-300"
                    }`}
                  />

                  <div className="glass-card rounded-xl p-5 hover:bg-white/5 transition-all border border-white/10 hover:border-white/20 group">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Briefcase size={18} className="text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-sm leading-snug">{exp.role}</h3>
                          <p className="text-blue-400 text-sm font-medium mt-0.5">{exp.org}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-xs text-gray-400">{exp.period}</span>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <MapPin size={11} />
                          {exp.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Tag variant={(TYPE_COLORS[exp.type] as "accent" | "default") ?? "default"}>
                            {exp.type}
                          </Tag>
                          {exp.current && (
                            <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-[10px] font-semibold border border-emerald-500/30">
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="flex flex-col gap-1.5">
                      {exp.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-400 leading-relaxed">
                          <span className="mt-2 w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* PI / Collaborators */}
                    {(exp.pi || exp.collaborators) && (
                      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-1.5">
                        {exp.pi && (
                          <p className="flex items-center gap-2 text-xs text-gray-400">
                            <User size={12} className="shrink-0 text-blue-400" />
                            <span className="font-medium text-white">PI:</span> {exp.pi}
                          </p>
                        )}
                        {exp.collaborators && (
                          <p className="flex items-center gap-2 text-xs text-gray-400">
                            <Users size={12} className="shrink-0 text-purple-400" />
                            <span className="font-medium text-white">Collaborators:</span>{" "}
                            {exp.collaborators}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
