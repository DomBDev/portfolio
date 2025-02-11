'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiTerminal, FiRefreshCw } from 'react-icons/fi'
import { useState, useEffect, useRef } from 'react'

const terminalContent = [
  '> Initializing system...',
  '> ERROR 404: Page not found',
  '> Running diagnostics...',
  '> Location: undefined',
  '> Status: Missing resource',
  '> Attempting to recover...',
  '> Recovery failed',
  '> Suggested actions:',
  '  1. Return to home directory',
  '  2. Retry current path'
]

export default function TerminalTheme() {
  const [lines, setLines] = useState<string[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    let currentLine = 0
    const lineInterval = setInterval(() => {
      if (currentLine < terminalContent.length) {
        setLines(prev => [...prev, terminalContent[currentLine]])
        currentLine++
        
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
      } else {
        clearInterval(lineInterval)
      }
    }, 200)

    return () => clearInterval(lineInterval)
  }, [])

  return (
    <div className="relative bg-dark/5 dark:bg-light/5 backdrop-blur-xl rounded-lg border border-dark/10 dark:border-light/10 overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-dark/10 dark:bg-light/10">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-sm text-dark/60 dark:text-light/60 font-mono">
          system.exe
        </span>
      </div>

      {/* Terminal content */}
      <div
        ref={terminalRef}
        className="h-[400px] p-4 font-mono text-dark/80 dark:text-light/80 overflow-y-auto scrollbar-thin"
      >
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="whitespace-pre-wrap"
          >
            {line}
          </motion.div>
        ))}
        <span className={`inline-block w-3 h-5 bg-accent ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`} />
      </div>

      {/* Action buttons */}
      <motion.div
        className="flex justify-center gap-4 p-4 bg-dark/10 dark:bg-light/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-light hover:bg-accent/90 transition-colors duration-300 group"
        >
          <FiTerminal className="w-4 h-4" />
          <span>cd ~</span>
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-accent text-accent hover:bg-accent/10 transition-colors duration-300 group"
        >
          <FiRefreshCw className="w-4 h-4" />
          <span>retry</span>
        </button>
      </motion.div>
    </div>
  )
} 