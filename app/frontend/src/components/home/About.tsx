'use client'

import { motion } from 'framer-motion'
import { CodeIcon, RocketIcon, HeartIcon, ArrowRightIcon } from '@radix-ui/react-icons'

const highlights = [
  {
    icon: <CodeIcon className="w-5 h-5" />,
    title: "Software Engineer",
    description: "Building scalable solutions with clean, efficient code"
  },
  {
    icon: <RocketIcon className="w-5 h-5" />,
    title: "Full Stack Developer",
    description: "Crafting end-to-end applications with modern tech"
  },
  {
    icon: <HeartIcon className="w-5 h-5" />,
    title: "Problem Solver",
    description: "Creating practical, high-impact solutions"
  }
]

const keyAreas = [
  "Backend Development & API Design",
  "Frontend Architecture & UI/UX",
  "Database Optimization & Security",
  "Cloud Infrastructure & DevOps"
]

export default function About() {
  return (
    <section id="about" className="relative py-20 bg-light dark:bg-dark overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,191,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
        
        {/* Animated Gradient Orbs */}
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
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[120px] animate-drift-slow"
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

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto space-y-6"
        >
          {/* Section Title with Animated Underline */}
          <div className="relative text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative inline-block"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-dark to-dark/80 dark:from-light dark:to-light/80 bg-clip-text text-transparent relative z-10"
              >
                About Me
              </motion.h2>
              
              {/* Animated background glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -inset-x-6 -inset-y-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-xl rounded-full z-0"
              />
              
              {/* Animated underline with gradient and glow */}
              <div className="relative">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transform origin-left"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-sm transform origin-left"
                />
              </div>
            </motion.div>
          </div>

          {/* Brief Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-lg text-dark/80 dark:text-light/80 leading-relaxed">
              Software engineer focused on building scalable applications with clean, efficient code. 
              Passionate about creating innovative solutions that make a real impact.
            </p>
          </motion.div>

          {/* Highlight Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-6 bg-light/50 dark:bg-dark/50 backdrop-blur-sm rounded-lg border border-dark/5 dark:border-light/5">
                  <div className="text-accent mb-3 transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-dark to-dark/90 dark:from-light dark:to-light/90 bg-clip-text text-transparent">{item.title}</h3>
                  <p className="text-sm text-dark/60 dark:text-light/60">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Areas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {keyAreas.map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative p-4 rounded-lg bg-light/50 dark:bg-dark/50 backdrop-blur-sm border border-dark/5 dark:border-light/5 text-center">
                  <p className="text-sm font-medium bg-gradient-to-r from-dark to-dark/80 dark:from-light dark:to-light/80 bg-clip-text text-transparent">{area}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Learn More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <motion.a
              href="/about"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-dark to-dark/90 dark:from-light dark:to-light/90 text-light dark:text-dark font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Learn More About Me</span>
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 