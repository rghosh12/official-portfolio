'use client'

import { useState } from 'react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ChevronDown } from 'lucide-react'

export type ResolvedIcon = { title: string; hex: string; path: string } | null

export type SkillCategory = {
  key: string
  label: string
  items: { name: string; icon: ResolvedIcon; image?: string }[]
}

function monogram(name: string) {
  const cleaned = name.replace(/[^A-Za-z0-9 ]/g, '')
  const parts = cleaned.split(' ').filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return cleaned.slice(0, 2).toUpperCase()
}

export function SkillsAccordion({
  categories,
  compact = false,
}: {
  categories: SkillCategory[]
  compact?: boolean
}) {
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
    <div className={compact ? 'space-y-3' : 'space-y-4 mt-8'}>
      {categories.map((category, categoryIndex) => {
        const isOpen = openKeys.has(category.key)

        const content = (
          <div className="bg-[var(--surface-2)] rounded-xl overflow-hidden border border-[var(--border)]">
            <button
              onClick={() => toggle(category.key)}
              className={`w-full flex items-center justify-between text-left hover:bg-white/5 transition-colors ${
                compact ? 'p-3' : 'p-5'
              }`}
              aria-expanded={isOpen}
            >
              <span
                className={`font-semibold text-[var(--accent)] ${
                  compact ? 'text-sm' : 'text-base'
                }`}
              >
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
              <div
                className={`${
                  compact ? 'p-3 pt-0 grid grid-cols-2 gap-2' : 'p-5 pt-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'
                }`}
              >
                {category.items.map((skill) => (
                  <div
                    key={skill.name}
                    className={`group relative bg-[var(--surface)] border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition-colors duration-300 ${
                      compact ? 'p-2' : 'p-4'
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div
                        className={`flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 ${
                          compact ? 'w-8 h-8' : 'w-11 h-11'
                        }`}
                      >
                        {skill.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={skill.image}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        ) : skill.icon ? (
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
                          <span
                            className={`rounded-lg bg-[var(--accent)]/12 text-[var(--accent)] font-bold flex items-center justify-center ${
                              compact ? 'w-8 h-8 text-xs' : 'w-11 h-11 text-sm'
                            }`}
                          >
                            {monogram(skill.name)}
                          </span>
                        )}
                      </div>
                      <span
                        className={`font-medium text-[var(--text-secondary)] text-center ${
                          compact ? 'text-[11px] leading-tight' : 'text-sm'
                        }`}
                      >
                        {skill.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

        return compact ? (
          <div key={category.key}>{content}</div>
        ) : (
          <AnimatedSection key={category.key} delay={categoryIndex * 40}>
            {content}
          </AnimatedSection>
        )
      })}
    </div>
  )
}
