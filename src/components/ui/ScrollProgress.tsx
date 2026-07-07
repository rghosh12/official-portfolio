'use client'

import { useScrollProgress } from '@/hooks/useScroll'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[var(--accent-light)] via-[var(--accent)] to-[var(--accent-hover)] transition-all duration-150 shadow-lg shadow-[var(--accent)]/30"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
