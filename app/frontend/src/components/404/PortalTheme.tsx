'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MagicWandIcon, ReloadIcon } from '@radix-ui/react-icons'
import { useState, useEffect } from 'react'

const portalContent = {
  title: '404',
  subtitle: 'DIMENSIONAL ANOMALY DETECTED',
  messages: [
    'The page you seek exists in another dimension',
    'Reality breach detected at coordinates 4.0.4',
    'Initiating interdimensional portal sequence...'
  ]
}

export default function PortalTheme() {
  const [portalActive, setPortalActive] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setPortalActive(true), 1000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="relative bg-dark/5 dark:bg-light/5 backdrop-blur-xl rounded-lg border border-dark/10 dark:border-light/10 overflow-hidden p-8">
      {/* Portal effect */}
      <AnimatePresence>
        {portalActive && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent animate-drift-slow" />
            {Array(3).fill(0).map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-4 border-accent/30 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.2],
                  opacity: [0, 0.5, 0],
                  rotate: [0, 180]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-8xl font-bold text-accent"
        >
          {portalContent.title}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold text-dark/80 dark:text-light/80"
        >
          {portalContent.subtitle}
        </motion.div>

        <div className="space-y-4">
          {portalContent.messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.2 }}
              className="text-dark/60 dark:text-light/60"
            >
              {message}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center gap-4 pt-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-light hover:bg-accent/90 transition-colors duration-300 group"
          >
            <MagicWandIcon className="w-4 h-4 transition-transform group-hover:rotate-12" />
            <span>Return to Reality</span>
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-accent text-accent hover:bg-accent/10 transition-colors duration-300 group"
          >
            <ReloadIcon className="w-4 h-4" />
            <span>Try Another Dimension</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
} 