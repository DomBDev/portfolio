/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        light: 'hsl(var(--light))',
        dark: 'hsl(var(--dark))',
        accent: 'hsl(var(--accent))',
        'card-light': 'hsl(var(--card-light))',
        'card-dark': 'hsl(var(--card-dark))',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        'space-grotesk': ['var(--font-space-grotesk)'],
      },
    },
  },
  plugins: [],
} 