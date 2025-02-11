'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ReloadIcon, HomeIcon } from '@radix-ui/react-icons'
import { useState, useEffect } from 'react'

const gameContent = {
  title: 'GAME OVER',
  subtitle: '404 ERROR ENCOUNTERED',
  message: 'THE PAGE YOU SEEK IS IN ANOTHER CASTLE',
  lives: 'LIVES REMAINING: 0',
  score: 'SCORE: 404',
  hint: 'PRESS START TO CONTINUE'
}

export default function GameTheme() {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative font-mono bg-dark/5 dark:bg-light/5 backdrop-blur-xl rounded-lg border-4 border-dark/10 dark:border-light/10 overflow-hidden p-8">
      {/* Pixel art decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {Array(20).fill(0).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-6">
        <motion.div
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold text-accent tracking-widest"
        >
          {gameContent.title}
        </motion.div>

        {Object.entries(gameContent).slice(1).map(([key, text], index) => (
          <motion.div
            key={key}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-dark/80 dark:text-light/80 tracking-wider"
          >
            {text}{key === 'hint' && showCursor ? '_' : ''}
          </motion.div>
        ))}

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4 pt-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-light hover:bg-accent/90 transition-colors duration-300 group"
          >
            <HomeIcon className="w-4 h-4" />
            <span>START</span>
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-accent text-accent hover:bg-accent/10 transition-colors duration-300 group"
          >
            <ReloadIcon className="w-4 h-4" />
            <span>CONTINUE?</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
} 