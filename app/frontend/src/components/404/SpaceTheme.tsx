'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { RocketIcon } from '@radix-ui/react-icons'

const spaceContent = {
  messages: [
    'Houston, we have a problem...',
    'The page you\'re looking for has drifted into deep space',
    'Mission Status: Page Not Found (404)',
    'Initiating return sequence to home base'
  ]
}

export default function SpaceTheme() {
  return (
    <div className="relative bg-dark/5 dark:bg-light/5 backdrop-blur-xl rounded-lg border border-dark/10 dark:border-light/10 overflow-hidden p-8">
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated stars */}
        {Array(50).fill(0).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0.1 + Math.random() * 0.5 }}
            animate={{
              opacity: [0.1 + Math.random() * 0.5, 0.5 + Math.random() * 0.5],
              scale: [1, 1.2],
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 2
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <RocketIcon className="w-24 h-24 mx-auto text-accent" />
        </motion.div>

        {spaceContent.messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={index === 0 ? "text-4xl font-bold text-accent" : "text-dark/60 dark:text-light/60"}
          >
            {message}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-light hover:bg-accent/90 transition-colors duration-300 group"
          >
            <RocketIcon className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
            <span>Return to Earth</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
} 