import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleProjects = [
  {
    title: "Portfolio Website",
    subtitle: "Personal Portfolio & Project Showcase",
    description: "A modern, responsive portfolio website built with Next.js and TypeScript, featuring project showcases, smooth animations, and a minimal UI/UX design.",
    imageUrl: "/images/projects/portfolio.jpg",
    demoUrl: "https://yourportfolio.com",  // Update with your real URL
    githubUrl: "https://github.com/yourusername/portfolio",
    tags: JSON.stringify(["Featured", "Full Stack", "Web"]),
    technologies: JSON.stringify(["Next.js", "TypeScript", "Tailwind CSS", "Vercel"]),
    media: JSON.stringify([]),
    featured: true,
    order: 1,
    duration: "Ongoing",
    startDate: new Date("2023-01-01"),
    endDate: null,
    status: "Completed",
    role: "Full Stack Developer",
    teamSize: 1,
    challenges: JSON.stringify([
      "Optimizing performance and accessibility",
      "Ensuring smooth animations without layout shifts",
      "Implementing a CMS-like project showcase"
    ]),
    highlights: JSON.stringify([
      "Achieved 100% Lighthouse performance score",
      "Built a modular and reusable component library",
      "Designed a seamless dark mode experience"
    ]),
    metrics: JSON.stringify({
      performance: 100,
      accessibility: 100,
      seo: 100
    }),
    sections: JSON.stringify([
      {
        title: "Features",
        content: "Dark mode, smooth animations, project showcase, blog integration"
      }
    ])
  },
  {
    title: "Swatch Sense",
    subtitle: "AI-Powered Color Palette Generator",
    description: "A web application that intelligently generates color palettes based on user input and image analysis, built with React and Python.",
    imageUrl: "/images/projects/swatchsense.jpg",
    demoUrl: "https://swatchsense.com",
    githubUrl: "https://github.com/yourusername/swatchsense",
    tags: JSON.stringify(["Featured", "AI", "Design Tool"]),
    technologies: JSON.stringify(["React", "Flask", "Tailwind CSS", "OpenAI API"]),
    media: JSON.stringify([]),
    featured: true,
    order: 2,
    duration: "3 months",
    startDate: new Date("2023-07-01"),
    endDate: new Date("2023-10-01"),
    status: "Completed",
    role: "Full Stack Developer",
    teamSize: 1,
    challenges: JSON.stringify([
      "Implementing AI-based color recognition",
      "Ensuring smooth user interactions with real-time feedback",
      "Optimizing performance for large image processing"
    ]),
    highlights: JSON.stringify([
      "Developed a responsive and intuitive UI",
      "Integrated AI for color analysis",
      "Gained positive user feedback in early testing"
    ]),
    metrics: JSON.stringify({
      users: 5000,
      palettesGenerated: "50K+"
    }),
    sections: JSON.stringify([
      {
        title: "Key Features",
        content: "AI-powered color extraction, manual palette adjustments, export options"
      }
    ])
  },
  {
    title: "Noctis Echo",
    subtitle: "P2P Encrypted Real-Time Chat App",
    description: "A real-time, end-to-end encrypted peer-to-peer chat application with a focus on security and privacy.",
    imageUrl: "/images/projects/noctis-echo.jpg",
    demoUrl: "https://noctis-echo.pages.dev/",
    githubUrl: "https://github.com/yourusername/noctis-echo",
    tags: JSON.stringify(["Featured", "Security", "Real-time"]),
    technologies: JSON.stringify(["React", "WebRTC", "Socket.io", "Node.js", "TypeScript"]),
    media: JSON.stringify([]),
    featured: true,
    order: 3,
    duration: "4 months",
    startDate: new Date("2023-04-01"),
    endDate: new Date("2023-08-01"),
    status: "Completed",
    role: "Full Stack Developer",
    teamSize: 1,
    challenges: JSON.stringify([
      "Implementing end-to-end encryption",
      "Ensuring low-latency real-time communication",
      "Building a scalable P2P architecture"
    ]),
    highlights: JSON.stringify([
      "Implemented E2E encryption for all messages",
      "Achieved sub-100ms latency in real-time chat",
      "Built a fully decentralized communication system"
    ]),
    metrics: JSON.stringify({
      users: 1000,
      messagesSent: "100K+"
    }),
    sections: JSON.stringify([
      {
        title: "Security Features",
        content: "End-to-end encryption, peer-to-peer communication, zero data storage"
      }
    ])
  },
  {
    title: "AccreFi (WIP)",
    subtitle: "Personal Finance Management App",
    description: "A modern finance management web application that helps users track income, expenses, and investments with advanced security measures.",
    imageUrl: "/images/projects/accrefi.jpg",
    demoUrl: null,
    githubUrl: null,
    tags: JSON.stringify(["Finance", "Security", "Full Stack"]),
    technologies: JSON.stringify(["Next.js", "NestJS", "PostgreSQL", "Prisma", "TypeScript"]),
    media: JSON.stringify([]),
    featured: false,
    order: 4,
    duration: "In Progress",
    startDate: new Date("2024-01-01"),
    endDate: null,
    status: "In Development",
    role: "Full Stack Developer",
    teamSize: 1,
    challenges: JSON.stringify([
      "Ensuring financial data security and encryption",
      "Building an intuitive UI for budgeting and tracking",
      "Optimizing backend for large-scale data handling"
    ]),
    highlights: JSON.stringify([
      "Developed a secure authentication system",
      "Built a responsive financial dashboard"
    ]),
    metrics: JSON.stringify({
      users: 0,
      transactionsTracked: 0
    }),
    sections: JSON.stringify([
      {
        title: "Key Features",
        content: "Budget tracking, automated expense categorization, secure authentication"
      }
    ])
  },
  {
    title: "InsightLoop (Concept)",
    subtitle: "Automated News & Article Summarization",
    description: "An AI-powered platform that curates and summarizes news articles to provide quick, digestible insights.",
    imageUrl: "/images/projects/insightloop.jpg",
    demoUrl: null,
    githubUrl: null,
    tags: JSON.stringify(["AI", "News", "Automation"]),
    technologies: JSON.stringify(["Next.js", "Flask", "OpenAI API", "PostgreSQL"]),
    media: JSON.stringify([]),
    featured: false,
    order: 5,
    duration: "Concept Phase",
    startDate: null,
    endDate: null,
    status: "Idea",
    role: "Concept Designer",
    teamSize: 1,
    challenges: JSON.stringify([
      "Ensuring accurate and unbiased AI summarization",
      "Optimizing performance for real-time article processing"
    ]),
    highlights: JSON.stringify([
      "Exploring AI-powered summarization models",
      "Researching integration with RSS and API news sources"
    ]),
    metrics: JSON.stringify({}),
    sections: JSON.stringify([
      {
        title: "Planned Features",
        content: "AI-generated summaries, personalized news feeds, multilingual support"
      }
    ])
  }
]

async function main() {
  console.log('Start seeding...')
  
  // Clear existing projects
  await prisma.project.deleteMany()
  
  // Create new projects
  for (const project of sampleProjects) {
    const createdProject = await prisma.project.create({
      data: project
    })
    console.log(`Created project with id: ${createdProject.id}`)
  }
  
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
