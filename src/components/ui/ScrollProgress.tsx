'use client'

import { useScrollProgress } from '@/hooks/useScroll'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150 shadow-lg shadow-blue-500/50"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
