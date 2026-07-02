'use client'

import { usePathname } from 'next/navigation'
import { StarfieldBackground } from './starfield-background'

export function ConditionalStarfield() {
  const pathname = usePathname()
  
  // Don't show starfield on landing page
  if (pathname === '/landing') {
    return null
  }
  
  return <StarfieldBackground />
}
