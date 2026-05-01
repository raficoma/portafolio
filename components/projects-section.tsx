"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "Nebula Dashboard",
    description: "A modern analytics dashboard with real-time data visualization and AI-powered insights.",
    image: "/modern-dark-analytics-dashboard-ui-design.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind", "D3.js"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Prisma Studio",
    description: "Visual database browser for the modern stack with intuitive data management.",
    image: "/minimal-database-management-interface-design.jpg",
    tags: ["React", "Electron", "Prisma", "GraphQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Flux Design System",
    description: "A comprehensive design system with 50+ components built for enterprise scale.",
    image: "/design-system-component-library-showcase.jpg",
    tags: ["React", "Storybook", "Figma", "CSS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    title: "Echo AI",
    description: "Voice-first AI assistant with natural language processing capabilities.",
    image: "/ai-voice-assistant-interface-minimal-dark.jpg",
    tags: ["Python", "FastAPI", "OpenAI", "WebRTC"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
]

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="relative py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            Selected Work
          </span>
          <h2 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">Featured Projects</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl bg-card ${
                project.featured ? "md:col-span-2 md:grid md:grid-cols-2 md:gap-8" : ""
              }`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor-hover
            >
              <div className={`relative overflow-hidden ${project.featured ? "" : "aspect-[4/3]"}`}>
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className={`w-full object-cover transition-transform duration-700 ${
                    project.featured ? "h-80 md:h-full" : "h-full"
                  }`}
                  animate={{
                    scale: hoveredIndex === i ? 1.05 : 1,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className={`p-6 ${project.featured ? "flex flex-col justify-center" : ""}`}>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="mb-2 font-serif text-2xl font-medium">{project.title}</h3>
                <p className="mb-6 text-muted-foreground">{project.description}</p>

                <div className="flex gap-3">
                  <Button size="sm" className="group/btn" asChild>
                    <a href={project.liveUrl}>
                      View Project
                      <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.githubUrl}>
                      <Github className="mr-1 h-3 w-3" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              View All Projects on GitHub
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
