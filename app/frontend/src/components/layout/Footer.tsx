'use client'

import { motion } from 'framer-motion'
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon, ArrowUpIcon } from '@radix-ui/react-icons'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  }

  return (
    <footer className="w-full border-t border-dark/5 dark:border-light/5 bg-light/50 dark:bg-dark/50 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Back to Top Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="order-1 md:order-none p-2 rounded-lg bg-dark/5 dark:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10 transition-colors group"
              aria-label="Back to top"
            >
              <ArrowUpIcon className="h-5 w-5 transition-transform group-hover:-translate-y-1" />
            </motion.button>

            {/* Copyright */}
            <motion.div
              variants={itemVariants}
              className="order-3 md:order-none text-center md:text-left"
            >
              <p className="text-sm text-dark/60 dark:text-light/60">
                © {new Date().getFullYear()} Dominic Bonanni
              </p>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="order-2 md:order-none flex items-center space-x-2"
            >
              <motion.a
                href="mailto:your.email@example.com"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg text-dark/60 dark:text-light/60 hover:text-accent hover:bg-dark/5 dark:hover:bg-light/5 transition-all duration-300"
                aria-label="Email"
              >
                <EnvelopeClosedIcon className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://github.com/bonannidominic"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg text-dark/60 dark:text-light/60 hover:text-accent hover:bg-dark/5 dark:hover:bg-light/5 transition-all duration-300"
                aria-label="GitHub"
              >
                <GitHubLogoIcon className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/dominic-bonanni"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg text-dark/60 dark:text-light/60 hover:text-accent hover:bg-dark/5 dark:hover:bg-light/5 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedInLogoIcon className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
} 