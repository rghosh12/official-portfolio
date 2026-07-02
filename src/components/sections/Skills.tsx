'use client'

import { useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { skills } from '@/data/skills'
import { ChevronDown } from 'lucide-react'

const categories = {
  languages: { label: 'Languages', color: 'blue' },
  frontend: { label: 'Frontend', color: 'purple' },
  aiDevelopment: { label: 'AI Development', color: 'indigo' },
  backend: { label: 'Backend', color: 'emerald' },
  database: { label: 'Database', color: 'cyan' },
  awsServices: { label: 'AWS Services', color: 'amber' },
} as const

type Category = keyof typeof skills

export function Skills() {
  const [openCategories, setOpenCategories] = useState<Set<Category>>(new Set(['languages']))

  const toggleCategory = (category: Category) => {
    const newOpen = new Set(openCategories)
    if (newOpen.has(category)) {
      newOpen.delete(category)
    } else {
      newOpen.add(category)
    }
    setOpenCategories(newOpen)
  }

  return (
    <section id="skills" className="px-6 sm:px-12 lg:px-24 py-20 border-b border-white/10">
      <div className="max-w-6xl">
        <AnimatedSection>
          <SectionHeading
            label="Expertise"
            title="Skills & Technologies"
            description="Technical proficiencies across research, development, and data science."
          />
        </AnimatedSection>

        <div className="space-y-4 mt-8">
          {Object.entries(categories).map(([key, { label }], categoryIndex) => {
            const category = key as Category
            const isOpen = openCategories.has(category)
            const categorySkills = skills[category]

            return (
              <AnimatedSection key={key} delay={categoryIndex * 50}>
                <div className="glass-card rounded-xl overflow-hidden border border-white/10">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="text-lg font-medium text-indigo-300">{label}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="p-5 pt-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {categorySkills.map((skill, skillIndex) => (
                        <div
                          key={skill.name}
                          className="group relative bg-[#1a1f35]/50 backdrop-blur-sm border border-white/5 rounded-lg p-4 hover:border-indigo-500/30 hover:bg-white/5 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10"
                          style={{
                            transitionDelay: isOpen ? `${skillIndex * 30}ms` : '0ms',
                          }}
                        >
                          <div className="flex flex-col items-center justify-center gap-3">
                            <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
                              {skill.icon}
                            </div>
                            <span className="text-sm font-medium text-gray-300 text-center">
                              {skill.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
