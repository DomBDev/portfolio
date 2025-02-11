'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowRightIcon, GitHubLogoIcon, LinkedInLogoIcon, ChevronDownIcon, EnvelopeClosedIcon } from '@radix-ui/react-icons'

interface TypewriterTextProps {
  text: string
  delay?: number
  className?: string
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 0, className = "" }) => {
  const letters = Array.from(text)
  
  return (
    <div className={`inline-block ${className}`}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: delay + index * 0.03,
            ease: [0.215, 0.61, 0.355, 1]
          }}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  )
}

interface GlowingCardProps {
  children: React.ReactNode
  className?: string
}

const GlowingCard: React.FC<GlowingCardProps> = ({ children, className = "" }) => (
  <div className={`relative rounded-xl flex flex-col items-center justify-around overflow-hidden ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 animate-gradient-xy" />

    <div className="absolute inset-[1px] rounded-xl bg-light/90 dark:bg-dark/90 backdrop-blur-xl" />
    <div className="relative p-4 w-full h-full flex flex-col items-center justify-center">{children}</div>
  </div>
)

interface TechInfo {
  name: string
  icon: string
}

const TechStack = () => {
  const technologies: TechInfo[] = [
    {
      name: 'Python',
      icon: '🐍'
    },
    {
      name: 'Javascript',
      icon: '⚛️'
    },
    {
      name: 'TypeScript',
      icon: '🔷'
    },
    {
      name: 'AWS',
      icon: '☁️'
    },
    {
      name: 'PostgreSQL',
      icon: '🐘'
    },
    {
      name: '.NET',
      icon: '🎯'
    }
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {technologies.map((tech) => (
        <motion.div
          key={tech.name}
          className="group relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="flex items-center gap-2 p-3 rounded-lg bg-dark/5 dark:bg-light/5 border border-dark/5 dark:border-light/5">
            <span className="text-lg">{tech.icon}</span>
            <span className="text-sm font-medium text-dark/80 dark:text-light/80">{tech.name}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  
  // Smoother, more subtle scroll animation
  const y = useSpring(
    useTransform(scrollY, [0, 300], [0, -50]),
    { stiffness: 100, damping: 30, bounce: 0 }
  )
  
  const opacity = useSpring(
    useTransform(scrollY, [0, 300], [1, 0]),
    { stiffness: 100, damping: 30, bounce: 0 }
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-light dark:bg-dark py-20 sm:py-32"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,191,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
        
        {/* Animated Gradient Orbs with opacity pulses */}
        <motion.div
          className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full blur-[120px] animate-drift"
          animate={{
            opacity: [0.2, 0.15, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[120px] animate-drift-slow"
          animate={{
            opacity: [0.2, 0.15, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ y, opacity }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-cyan-500 dark:text-cyan-400 font-medium mb-4 tracking-wider"
            >
              FULL STACK DEVELOPER
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-dark to-dark/80 dark:from-light dark:to-light/80 bg-clip-text text-transparent">
              <TypewriterText text="Hey, I'm Dom." />
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <TypewriterText 
                text="I craft modern digital experiences with clean code and sleek design"
                delay={1}
                className="text-xl md:text-2xl text-dark/60 dark:text-light/60 leading-relaxed"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {/* Quick Stats */}
            <GlowingCard>
              <div className="flex flex-row gap-4 px-4 w-full justify-around items-center">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">3+</div>
                  <div className="text-sm text-dark/60 dark:text-light/60">Years Experience</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">50+</div>
                  <div className="text-sm text-dark/60 dark:text-light/60">Projects Completed</div>
                </div>
                <div className="text-center">
                  <motion.a
                    href="#contact"
                    className="inline-flex flex-col items-center group p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-300 ease-in-out"
                  >
                    <div className="transition-all duration-300 ease-in-out group-hover:translate-y-[-2px]">
                      <EnvelopeClosedIcon className="w-6 h-6 text-cyan-500 dark:text-cyan-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
                    </div>
                    <div className="text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-cyan-500">Get in Touch</div>
                  </motion.a>
                </div>
              </div>

            </GlowingCard>

            {/* Enhanced Tech Stack Preview */}
            <GlowingCard>
              <TechStack />
            </GlowingCard>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-dark/5 dark:hover:bg-light/5 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <GitHubLogoIcon className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-dark/5 dark:hover:bg-light/5 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <LinkedInLogoIcon className="w-5 h-5" />
              </motion.a>
            </div>
            <motion.a
              href="#projects"
              className="group btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Simplified Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ 
            y: [0, 8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-dark/40 dark:text-light/40 hover:text-dark/60 dark:hover:text-light/60 transition-colors"
        >
          <ChevronDownIcon className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  )
} 