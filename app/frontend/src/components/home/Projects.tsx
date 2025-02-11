'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { FiExternalLink, FiGithub, FiChevronLeft, FiChevronRight, FiImage, FiArrowRight } from 'react-icons/fi'
import Link from 'next/link'

// Improved interface based on schema
interface Project {
  id: string
  title: string
  subtitle?: string
  description: string
  imageUrl?: string
  demoUrl?: string
  githubUrl?: string
  tags: string[]
  technologies: string[]
  media: any[]
  featured: boolean
  order: number
  duration?: string
  startDate?: Date
  endDate?: Date
  status?: string
  role?: string
  teamSize?: number
  challenges: string[]
  highlights: string[]
  metrics?: {
    [key: string]: any
  }
  sections: Array<{
    title: string
    content: string
  }>
}

// Add API base URL constant
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProjects(Array.isArray(data.data) ? data.data : []);
      } catch (err: unknown) {
        console.error('Failed to fetch projects:', err);
        setError('Unable to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getVisibleProjects = () => {
    if (projects.length === 0) return [];
    
    // Calculate indices for visible projects including wrap-around
    const positions = [-1, 0, 1].map(offset => {
      let index = activeIndex + offset;
      
      // Handle wrap-around for both directions
      if (index < 0) {
        index = projects.length - Math.abs(index % projects.length);
      } else {
        index = index % projects.length;
      }
      
      return {
        project: projects[index],
        position: offset
      };
    });

    return positions;
  };

  const handleNavigation = async (direction: 'left' | 'right') => {
    if (projects.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(prev => {
      if (direction === 'left') {
        return (prev - 1 + projects.length) % projects.length;
      }
      return (prev + 1) % projects.length;
    });
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section id="projects" className="py-20 bg-light dark:bg-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-dark to-dark/80 dark:from-light dark:to-light/80 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : projects.length > 0 ? (
          <div className="relative max-w-6xl mx-auto h-[500px]">
            {/* Navigation Buttons */}
            <button
              onClick={() => handleNavigation('left')}
              disabled={isAnimating}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
              aria-label="Previous project"
            >
              <FiChevronLeft className="w-6 h-6 text-dark dark:text-light" />
            </button>
            <button
              onClick={() => handleNavigation('right')}
              disabled={isAnimating}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
              aria-label="Next project"
            >
              <FiChevronRight className="w-6 h-6 text-dark dark:text-light" />
            </button>

            {/* Projects Display */}
            <div 
              ref={containerRef} 
              className="relative h-full flex items-center justify-center perspective-[2000px]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {getVisibleProjects().map(({ project, position }) => {
                const xOffset = position * 350;
                const isCenter = position === 0;
                
                return (
                  <motion.div
                    key={project.id}
                    animate={{
                      x: xOffset,
                      scale: isCenter ? 1 : 0.8,
                      opacity: isCenter ? 1 : 0.6,
                      rotateY: position * -25,
                      zIndex: isCenter ? 10 : 0,
                      z: isCenter ? 0 : -200,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1], // Custom ease for smooth motion
                    }}
                    className="absolute w-[350px] bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {project.imageUrl ? (
                      <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden group">
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          priority={isCenter}
                        />
                      </div>
                    ) : (
                      <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group">
                        <FiImage className="w-12 h-12 text-gray-300 dark:text-gray-600 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-dark dark:text-light">
                          {project.title}
                        </h3>
                        {project.status && (
                          <span className="px-2 py-1 text-xs rounded-full bg-accent/10 text-accent">
                            {project.status}
                          </span>
                        )}
                      </div>
                      {project.subtitle && (
                        <p className="text-dark/60 dark:text-light/60 text-sm line-clamp-2 mb-3">
                          {project.subtitle}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies?.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-dark/5 dark:bg-light/5 text-dark/60 dark:text-light/60"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies?.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-dark/5 dark:bg-light/5 text-dark/60 dark:text-light/60">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        {project.duration && (
                          <span className="text-xs text-dark/60 dark:text-light/60 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {project.duration}
                          </span>
                        )}
                        {project.teamSize && (
                          <span className="text-xs text-dark/60 dark:text-light/60 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Team of {project.teamSize}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href={`/projects/${project.id}`}
                          className="flex-1 py-2 px-4 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors duration-300 text-center"
                        >
                          View Project
                        </a>
                        <div className="flex gap-2">
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg hover:bg-dark/5 dark:hover:bg-light/5 transition-colors duration-300"
                              aria-label="View Demo"
                            >
                              <FiExternalLink className="w-5 h-5 text-dark/70 dark:text-light/70" />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg hover:bg-dark/5 dark:hover:bg-light/5 transition-colors duration-300"
                              aria-label="View Code"
                            >
                              <FiGithub className="w-5 h-5 text-dark/70 dark:text-light/70" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-dark/60 dark:text-light/60 py-20">
            {error}
          </div>
        ) : (
          <div className="text-center text-dark/60 dark:text-light/60 py-20">
            No projects available at the moment.
          </div>
        )}

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-accent text-light hover:bg-accent/90 transition-all duration-300 hover:scale-105 group"
          >
            <span>View All Projects</span>
            <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 