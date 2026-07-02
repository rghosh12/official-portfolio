'use client'

import { useEffect, useState, RefObject } from 'react'

export function useInView(ref: RefObject<HTMLElement | null>, options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false)
  const [hasBeenInView, setHasBeenInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
      if (entry.isIntersecting) {
        setHasBeenInView(true)
      }
    }, options)

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, options])

  return { isInView, hasBeenInView }
}
