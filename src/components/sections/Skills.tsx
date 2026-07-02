'use client'

import { useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { skills } from '@/data/skills'
import { Code2, Layers, FlaskConical, Wrench } from 'lucide-react'

const categories = {
  languages: { label: 'Languages', icon: Code2, color: 'blue' },
  frameworks: { label: 'Frameworks', icon: Layers, color: 'purple' },
  research: { label: 'Research', icon: FlaskConical, color: 'emerald' },
  tools: { label: 'Tools', icon: Wrench, color: 'amber' },
} as const

type Category = keyof typeof skills

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<Category>('languages')

  const colorClasses = {
    blue: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
      fill: 'bg-blue-500',
      glow: 'shadow-blue-500/50',
    },
    purple: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      fill: 'bg-purple-500',
      glow: 'shadow-purple-500/50',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      fill: 'bg-emerald-500',
      glow: 'shadow-emerald-500/50',
    },
    amber: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      fill: 'bg-amber-500',
      glow: 'shadow-amber-500/50',
    },
  }

  const currentColor = colorClasses[categories[activeCategory].color]
  const currentSkills = skills[activeCategory]

  return (
    <section id="skills" className="px-6 sm:px-12 lg:px-24 py-20 border-b border-white/10">
      <div className="max-w-4xl">
        <AnimatedSection>
          <SectionHeading
            label="Expertise"
            title="Skills & Technologies"
            description="Technical proficiencies across research, development, and data science."
          />
        </AnimatedSection>

        {/* Category Tabs */}
        <AnimatedSection delay={100}>
          <div className="flex flex-wrap gap-3 mb-8">
            {Object.entries(categories).map(([key, { label, icon: Icon, color }]) => {
              const isActive = activeCategory === key
              const colors = colorClasses[color]
              
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key as Category)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-300 border
                    ${isActive 
                      ? `${colors.bg} ${colors.text} ${colors.border} shadow-lg ${colors.glow}` 
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
                    }
                  `}
                >
                  <Icon size={16} />
                  {label}
                </button>
              )
            })}
          </div>
        </AnimatedSection>

        {/* Skills Grid */}
        <div className="grid gap-4">
          {currentSkills.map((skill, index) => (
            <AnimatedSection key={skill.name} delay={index * 50} animation="slide-left">
              <div className="glass-card p-4 rounded-lg hover:bg-white/5 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-medium text-white">{skill.name}</span>
                  </div>
                  <span className={`text-sm font-semibold ${currentColor.text}`}>
                    {skill.level}%
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 ${currentColor.fill} rounded-full transition-all duration-300 ease-out ${currentColor.glow} shadow-lg`}
                    style={{
                      width: `${skill.level}%`,
                      transitionDelay: `${index * 50}ms`,
                    }}
                  />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Summary Stats */}
        <AnimatedSection delay={400}>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {skills.languages.length + skills.frameworks.length}
              </div>
              <div className="text-xs text-gray-400">Languages & Frameworks</div>
            </div>
            <div className="glass-card p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-1">
                {skills.research.length}
              </div>
              <div className="text-xs text-gray-400">Research Tools</div>
            </div>
            <div className="glass-card p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-amber-400 mb-1">
                {skills.tools.length}
              </div>
              <div className="text-xs text-gray-400">Dev Tools</div>
            </div>
            <div className="glass-card p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {Object.values(skills).flat().length}
              </div>
              <div className="text-xs text-gray-400">Total Skills</div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
