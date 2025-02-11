'use client'

import { motion } from 'framer-motion'

export default function Logo() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      }
    }
  }

  const fillVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.5,
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.svg
      width="64"
      height="44"
      viewBox="-2 4 64 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transform transition-colors duration-300"
    >
      {/* Gradient Definitions */}
      <defs>
        <linearGradient id="strokeGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0891B2" /> {/* cyan-600 */}
          <stop offset="100%" stopColor="#0284C7" /> {/* sky-600 */}
        </linearGradient>
        <linearGradient id="strokeGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" /> {/* cyan-400 */}
          <stop offset="100%" stopColor="#38BDF8" /> {/* sky-400 */}
        </linearGradient>
        <linearGradient id="fillGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0891B2" stopOpacity="0.1" /> {/* cyan-600 */}
          <stop offset="50%" stopColor="#0284C7" stopOpacity="0.05" /> {/* sky-600 */}
          <stop offset="100%" stopColor="#0891B2" stopOpacity="0.1" /> {/* cyan-600 */}
        </linearGradient>
        <linearGradient id="fillGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.2" /> {/* cyan-400 */}
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.1" /> {/* sky-400 */}
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.2" /> {/* cyan-400 */}
        </linearGradient>
        {/* Mask for the fill */}
        <mask id="logoMask">
          <path
            d="M28 9L18 9C-1 9 -1 36 18 36L28 36L28 9Z
               M24 14L18 14C5 14 4 30 18 31L24 31L24 14Z
               M30 9L47 9C57 9 57 22 49 22C57 22 57 36 47 36L30 36L30 32L47 32C52 32 52 25 47 25L30 25L30 19L47 19C52 19 52 13 47 13L30 13L30 9Z"
            fill="white"
          />
        </mask>
      </defs>

      {/* Animated gradient fill background */}
      <motion.rect
        x="-2"
        y="4"
        width="64"
        height="40"
        fill="url(#fillGradientLight)"
        className="dark:fill-[url(#fillGradientDark)]"
        mask="url(#logoMask)"
        variants={fillVariants}
        initial="hidden"
        animate="visible"
      />

      {/* Main paths with cohesive gradient strokes */}
      <motion.path
        d="M28 9L18 9C-1 9 -1 36 18 36L28 36L28 9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        stroke="url(#strokeGradientLight)"
        className="dark:stroke-[url(#strokeGradientDark)]"
      />
      <motion.path
        d="M24 14L18 14C5 14 4 30 18 31L24 31L24 14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        stroke="url(#strokeGradientLight)"
        className="dark:stroke-[url(#strokeGradientDark)] opacity-70"
      />
      <motion.path
        d="M30 9L47 9C57 9 57 22 49 22C57 22 57 36 47 36L30 36L30 32L47 32C52 32 52 25 47 25L30 25L30 19L47 19C52 19 52 13 47 13L30 13L30 9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
        stroke="url(#strokeGradientLight)"
        className="dark:stroke-[url(#strokeGradientDark)]"
      />
      
      {/* Glow effect */}
      <motion.path
        d="M28 9L18 9C-1 9 -1 36 18 36L28 36L28 9"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-cyan-600/10 dark:stroke-cyan-400/20 blur-[4px]"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.path
        d="M30 9L47 9C57 9 57 22 49 22C57 22 57 36 47 36L30 36L30 32L47 32C52 32 52 25 47 25L30 25L30 19L47 19C52 19 52 13 47 13L30 13L30 9"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-cyan-600/10 dark:stroke-cyan-400/20 blur-[4px]"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      />
    </motion.svg>
  )
} 