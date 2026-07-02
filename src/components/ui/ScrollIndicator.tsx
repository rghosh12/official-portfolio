'use client'

import { ChevronDown } from 'lucide-react'

export function ScrollIndicator() {
  const scrollToContent = () => {
    const firstSection = document.querySelector('#education')
    firstSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToContent}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors group animate-bounce"
      aria-label="Scroll down"
    >
      <span className="text-xs font-medium">Scroll</span>
      <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-1">
        <ChevronDown size={14} className="animate-pulse" />
      </div>
    </button>
  )
}
