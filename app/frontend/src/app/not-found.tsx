'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import theme components
const TerminalTheme = dynamic(() => import('@/components/404/TerminalTheme'), {
  loading: () => <div>Loading...</div>
})
const SpaceTheme = dynamic(() => import('@/components/404/SpaceTheme'), {
  loading: () => <div>Loading...</div>
})
const GameTheme = dynamic(() => import('@/components/404/GameTheme'), {
  loading: () => <div>Loading...</div>
})
const GlitchTheme = dynamic(() => import('@/components/404/GlitchTheme'), {
  loading: () => <div>Loading...</div>
})
const PortalTheme = dynamic(() => import('@/components/404/PortalTheme'), {
  loading: () => <div>Loading...</div>
})

const themes = [
  { component: TerminalTheme, name: 'Terminal' },
  { component: SpaceTheme, name: 'Space' },
  { component: GameTheme, name: 'Game' },
  { component: GlitchTheme, name: 'Glitch' },
  { component: PortalTheme, name: 'Portal' }
]

export default function NotFound() {
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null)

  useEffect(() => {
    // Randomly select a theme on mount
    const randomIndex = Math.floor(Math.random() * themes.length)
    setSelectedTheme(randomIndex)
  }, [])

  if (selectedTheme === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/50">
        <div className="w-full max-w-4xl p-4">
          <div className="animate-pulse flex justify-center items-center h-[600px] bg-dark/5 dark:bg-light/5 backdrop-blur-xl rounded-lg">
            <div className="text-dark/40 dark:text-light/40">Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  const Theme = themes[selectedTheme].component

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/50">
      <div className="w-full max-w-4xl p-4">
        <Theme />
      </div>
    </div>
  )
} 