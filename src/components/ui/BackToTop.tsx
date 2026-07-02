'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-110 group"
      aria-label="Back to top"
    >
      <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
    </button>
  )
}
