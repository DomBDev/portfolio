'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitHubLogoIcon, LinkedInLogoIcon, EnvelopeClosedIcon, ChatBubbleIcon, Cross2Icon, PaperPlaneIcon, PersonIcon, FileTextIcon } from '@radix-ui/react-icons'
import * as Popover from '@radix-ui/react-popover'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Dom's AI assistant. How can I help you today?"
    }
  ])
  const [currentMessage, setCurrentMessage] = useState('')
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return

    const newMessage: ChatMessage = {
      role: 'user',
      content: currentMessage
    }

    setMessages(prev => [...prev, newMessage])
    setCurrentMessage('')

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Thanks for your message! I'll make sure Dom gets this right away. In the meantime, feel free to check out his projects or connect on LinkedIn!"
      }])
    }, 1000)
  }

  return (
    <section id="contact" className="relative py-20 bg-light dark:bg-dark overflow-hidden">
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
          className="relative z-10 max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative inline-block"
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-dark to-dark/80 dark:from-light dark:to-light/80 bg-clip-text text-transparent relative z-10"
              >
                Let's Connect
              </motion.h2>
              
              {/* Animated background glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -inset-x-6 -inset-y-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-xl rounded-full z-0"
              />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form / Chat Toggle */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="p-8 rounded-2xl bg-light/50 dark:bg-dark/50 backdrop-blur-sm border border-dark/5 dark:border-light/5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-dark to-dark/80 dark:from-light dark:to-light/80 bg-clip-text text-transparent">
                    {showChat ? 'Chat with AI Assistant' : 'Send a Message'}
                  </h3>
                  <button
                    onClick={() => setShowChat(!showChat)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark/5 dark:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10 transition-colors text-sm font-medium"
                  >
                    {showChat ? (
                      <>
                        <EnvelopeClosedIcon className="w-4 h-4" />
                        Switch to Form
                      </>
                    ) : (
                      <>
                        <ChatBubbleIcon className="w-4 h-4" />
                        Switch to Chat
                      </>
                    )}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {showChat ? (
                    <motion.div
                      key="chat"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-[400px] flex flex-col"
                    >
                      <div 
                        ref={chatContainerRef}
                        className="flex-1 mb-4 space-y-4 overflow-y-auto scroll-smooth"
                      >
                        {messages.map((message, index) => (
                          <div
                            key={index}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.role === 'user'
                                  ? 'bg-accent text-light'
                                  : 'bg-dark/5 dark:bg-light/5'
                              }`}
                            >
                              {message.content}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 rounded-lg bg-light dark:bg-dark border border-dark/10 dark:border-light/10 focus:border-accent dark:focus:border-accent outline-none"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="p-2 rounded-lg bg-accent text-light hover:bg-accent/90 transition-colors"
                        >
                          <PaperPlaneIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-dark/80 dark:text-light/80">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg bg-light dark:bg-dark border border-dark/10 dark:border-light/10 focus:border-accent dark:focus:border-accent outline-none transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-dark/80 dark:text-light/80">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg bg-light dark:bg-dark border border-dark/10 dark:border-light/10 focus:border-accent dark:focus:border-accent outline-none transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-dark/80 dark:text-light/80">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 rounded-lg bg-light dark:bg-dark border border-dark/10 dark:border-light/10 focus:border-accent dark:focus:border-accent outline-none transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-dark/80 dark:text-light/80">Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full px-4 py-2 rounded-lg bg-light dark:bg-dark border border-dark/10 dark:border-light/10 focus:border-accent dark:focus:border-accent outline-none transition-colors resize-none"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-dark to-dark/90 dark:from-light dark:to-light/90 text-light dark:text-dark font-medium transition-all duration-300 disabled:opacity-50 relative group overflow-hidden"
                      >
                        <span className="relative z-10">
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bottom-4 left-4 right-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-center"
                    >
                      Message sent successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Quick Links */}
              <div className="p-8 rounded-2xl bg-light/50 dark:bg-dark/50 backdrop-blur-sm border border-dark/5 dark:border-light/5">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-dark to-dark/80 dark:from-light dark:to-light/80 bg-clip-text text-transparent">
                  Quick Links
                </h3>
                
                <div className="space-y-4">
                  <a
                    href="mailto:your.email@example.com"
                    className="flex items-center gap-4 p-4 rounded-lg bg-dark/5 dark:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10 transition-all duration-300 ease-in-out group"
                  >
                    <div className="p-2 rounded-lg bg-dark/10 dark:bg-light/10 transition-all duration-300 ease-in-out group-hover:bg-accent group-hover:text-light">
                      <EnvelopeClosedIcon className="w-5 h-5" />
                    </div>
                    <div className="transition-all duration-300 ease-in-out group-hover:translate-x-1">
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-dark/60 dark:text-light/60">your.email@example.com</div>
                    </div>
                  </a>
                  
                  <a
                    href="https://github.com/bonannidominic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-dark/5 dark:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10 transition-all duration-300 ease-in-out group"
                  >
                    <div className="p-2 rounded-lg bg-dark/10 dark:bg-light/10 transition-all duration-300 ease-in-out group-hover:bg-accent group-hover:text-light">
                      <GitHubLogoIcon className="w-5 h-5" />
                    </div>
                    <div className="transition-all duration-300 ease-in-out group-hover:translate-x-1">
                      <div className="text-sm font-medium">GitHub</div>
                      <div className="text-dark/60 dark:text-light/60">@bonannidominic</div>
                    </div>
                  </a>
                  
                  <a
                    href="https://linkedin.com/in/dominic-bonanni"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-dark/5 dark:bg-light/5 hover:bg-dark/10 dark:hover:bg-light/10 transition-all duration-300 ease-in-out group"
                  >
                    <div className="p-2 rounded-lg bg-dark/10 dark:bg-light/10 transition-all duration-300 ease-in-out group-hover:bg-accent group-hover:text-light">
                      <LinkedInLogoIcon className="w-5 h-5" />
                    </div>
                    <div className="transition-all duration-300 ease-in-out group-hover:translate-x-1">
                      <div className="text-sm font-medium">LinkedIn</div>
                      <div className="text-dark/60 dark:text-light/60">Dominic Bonanni</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Resume Download */}
              <motion.div
                className="p-8 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-dark/5 dark:border-light/5 text-center"
              >
                <FileTextIcon className="w-8 h-8 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Download Resume</h3>
                <p className="text-dark/60 dark:text-light/60 mb-4">
                  Get a detailed look at my experience and skills
                </p>
                <a
                  href="/path-to-resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-dark dark:bg-light text-light dark:text-dark hover:bg-accent dark:hover:bg-accent transition-all duration-300 ease-in-out group"
                >
                  <span className="transition-all duration-300 ease-in-out group-hover:translate-x-1">Download CV</span>
                  <PaperPlaneIcon className="w-4 h-4 transition-all duration-300 ease-in-out group-hover:translate-x-1" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 