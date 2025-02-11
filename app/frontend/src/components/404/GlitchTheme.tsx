'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CrossCircledIcon, ReloadIcon } from '@radix-ui/react-icons'
import { useState, useEffect } from 'react'

const glitchContent = {
  title: '404',
  messages: [
    'SYSTEM MALFUNCTION',
    'PAGE_NOT_FOUND.EXE',
    'CRITICAL_ERROR_DETECTED',
    'ATTEMPTING TO STABILIZE...'
  ]
}

export default function GlitchTheme() {
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative bg-dark/5 dark:bg-light/5 backdrop-blur-xl rounded-lg border border-dark/10 dark:border-light/10 overflow-hidden p-8">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-accent/5"
          animate={{
            opacity: glitchActive ? [0, 1, 0] : 0,
            x: glitchActive ? [-10, 10, -10] : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div className="relative z-10 text-center space-y-6">
        <motion.div
          className={`text-8xl font-bold text-accent ${glitchActive ? 'animate-glitch' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {glitchContent.title}
        </motion.div>

        <div className="space-y-4">
          {glitchContent.messages.map((message, index) => (
            <motion.div
              key={index}
              className={`text-dark/80 dark:text-light/80 font-mono ${glitchActive ? 'animate-glitch' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                textShadow: glitchActive ? '2px 2px var(--accent-color)' : 'none'
              }}
            >
              {message}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center gap-4 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="/"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-light hover:bg-accent/90 transition-colors duration-300 group ${glitchActive ? 'animate-glitch' : ''}`}
          >
            <CrossCircledIcon className="w-4 h-4" />
            <span>TERMINATE</span>
          </Link>
          <button
            onClick={() => window.location.reload()}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-accent text-accent hover:bg-accent/10 transition-colors duration-300 group ${glitchActive ? 'animate-glitch' : ''}`}
          >
            <ReloadIcon className="w-4 h-4" />
            <span>REBOOT</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
} 