'use client'

import { useRef, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'scale-in'
  delay?: number
}

export function AnimatedSection({ 
  children, 
  className,
  animation = 'fade-up',
  delay = 0 
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { hasBeenInView } = useInView(ref, { threshold: 0.1 })

  const animations = {
    'fade-up': 'opacity-0 translate-y-8',
    'fade-in': 'opacity-0',
    'slide-left': 'opacity-0 -translate-x-8',
    'scale-in': 'opacity-0 scale-95',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        !hasBeenInView && animations[animation],
        hasBeenInView && 'opacity-100 translate-y-0 translate-x-0 scale-100',
        className
      )}
      style={{
        transitionDelay: hasBeenInView ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  )
}
