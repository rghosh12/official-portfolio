'use client'

import { useState } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ChevronDown } from 'lucide-react'

export type ResolvedIcon = { title: string; hex: string; path: string } | null

export type SkillCategory = {
  key: string
  label: string
  items: { name: string; icon: ResolvedIcon }[]
}

function monogram(name: string) {
  const cleaned = name.replace(/[^A-Za-z0-9 ]/g, '')
  const parts = cleaned.split(' ').filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return cleaned.slice(0, 2).toUpperCase()
}

export function SkillsAccordion({ categories }: { categories: SkillCategory[] }) {
  // Every category starts expanded — recruiters see the full stack without clicking.
  const [openKeys, setOpenKeys] = useState<Set<string>>(
    new Set(categories.map((c) => c.key))
  )

  const toggle = (key: string) => {
    const next = new Set(openKeys)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    setOpenKeys(next)
  }

  return (
    <div className="space-y-4 mt-8">
      {categories.map((category, categoryIndex) => {
        const isOpen = openKeys.has(category.key)

        return (
          <AnimatedSection key={category.key} delay={categoryIndex * 40}>
            <div className="bg-[var(--surface-2)] rounded-xl overflow-hidden border border-[var(--border)]">
              <button
                onClick={() => toggle(category.key)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-base font-semibold text-[var(--accent)]">
                  {category.label}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[var(--muted)] transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {category.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--accent)] transition-colors duration-300"
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-11 h-11 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                          {skill.icon ? (
                            <svg
                              role="img"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-full h-full"
                              fill="currentColor"
                              style={{ color: `#${skill.icon.hex}` }}
                            >
                              <title>{skill.icon.title}</title>
                              <path d={skill.icon.path} />
                            </svg>
                          ) : (
                            <span className="w-11 h-11 rounded-lg bg-[var(--accent)]/12 text-[var(--accent)] text-sm font-bold flex items-center justify-center">
                              {monogram(skill.name)}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-[var(--text-secondary)] text-center">
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
  )
}
