'use client'

import Link from 'next/link'
import { MoonIcon, SunIcon, HamburgerMenuIcon, Cross2Icon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from '../common/Logo'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  if (!mounted) return null

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div 
          className={`relative rounded-2xl transition-all duration-300 ${
            scrolled
              ? 'bg-light/70 dark:bg-dark/70 shadow-lg dark:shadow-white/10'
              : 'bg-light/50 dark:bg-dark/50'
          } backdrop-blur-xl border border-light/10 dark:border-dark/10`}
        >
          {/* Desktop Navigation */}
          <nav className="flex items-center justify-between h-16 px-6">
            {/* Logo */}
            <Link 
              href="/" 
              className="relative group inline-flex items-center transition-all duration-300"
            >
              <div className="relative">
                <Logo />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent/5 via-blue-500/5 to-purple-500/5 rounded-lg -m-1"
                  whileHover={{ opacity: 0.8 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {['About', 'Projects', 'Blog', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg hover:bg-dark/5 dark:hover:bg-light/5 group"
                >
                  <span className="relative z-10 bg-gradient-to-r from-dark to-dark/80 dark:from-light dark:to-light/80 bg-clip-text text-transparent">
                    {item}
                  </span>
                  <span className="absolute inset-0 rounded-lg border border-transparent group-hover:border-dark/10 dark:group-hover:border-light/10 transition-colors duration-300" />
                </Link>
              ))}
              
              <div className="w-px h-6 bg-dark/10 dark:bg-light/10 mx-2" />
              
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg hover:bg-dark/5 dark:hover:bg-light/5 transition-all duration-300 group"
                aria-label="Toggle theme"
              >
                <div className="relative">
                  {theme === 'dark' ? (
                    <SunIcon className="h-5 w-5 text-dark dark:text-light transition-transform duration-300 group-hover:scale-110" />
                  ) : (
                    <MoonIcon className="h-5 w-5 text-dark dark:text-light transition-transform duration-300 group-hover:scale-110" />
                  )}
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-dark/5 dark:hover:bg-light/5 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <Cross2Icon className="h-5 w-5" />
              ) : (
                <HamburgerMenuIcon className="h-5 w-5" />
              )}
            </button>
          </nav>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen ? 'max-h-96 border-t border-dark/10 dark:border-light/10' : 'max-h-0'
            }`}
          >
            <nav className="px-6 py-4 flex flex-col space-y-2">
              {['About', 'Projects', 'Blog', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-dark/5 dark:hover:bg-light/5 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="bg-gradient-to-r from-dark to-dark/80 dark:from-light dark:to-light/80 bg-clip-text text-transparent">
                    {item}
                  </span>
                </Link>
              ))}
              
              <div className="w-full h-px bg-dark/10 dark:bg-light/10 my-2" />
              
              <button
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                  setIsMenuOpen(false)
                }}
                className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-dark/5 dark:hover:bg-light/5 transition-colors duration-300"
              >
                {theme === 'dark' ? (
                  <>
                    <SunIcon className="h-5 w-5 mr-2" />
                    <span className="bg-gradient-to-r from-dark to-dark/80 dark:from-light dark:to-light/80 bg-clip-text text-transparent">
                      Light Mode
                    </span>
                  </>
                ) : (
                  <>
                    <MoonIcon className="h-5 w-5 mr-2" />
                    <span className="bg-gradient-to-r from-dark to-dark/80 dark:from-light dark:to-light/80 bg-clip-text text-transparent">
                      Dark Mode
                    </span>
                  </>
                )}
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
} 