"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "Ecosistema Digital Judicial",
    description: "Desarrollo y soporte técnico de aplicaciones críticas para la Rama Judicial: Tutela en Línea, Demanda en Línea, Justicia XXI Web y Consulta Pública. Sistemas de alta disponibilidad para ciudadanos y funcionarios.",
    image: "/images/rama-judicial.jpg",
    tags: ["C#", "ASP.NET Core", "SQL Server", "WebServices"],
    liveUrl: "https://procesojudicial.ramajudicial.gov.co/TutelaEnLinea",
    githubUrl: null, 
    featured: true,
    isPrivate: true,
  },
  {
    title: "Core Administrativo Nexarte",
    description: "Sistema integral para la gestión de registros, control contable, recursos humanos, procesos de contratación y administración de hojas de vida para la compañía.",
    image: "/images/nexarte-web.jpg",
    tags: [".NET", "MVC", "SQL Server", "Moodle"],
    liveUrl: null,
    githubUrl: null,
    featured: false,
    isPrivate: true,
  },
  {
    title: "Soporte Hosvital y Mantenimiento GeneXus",
    description: "Mantenimiento y evolución del sistema Hosvital utilizando GeneXus, enfocado en la mejora de procesos de salud y soporte técnico especializado.",
    image: "/images/hosvital.jpg",
    tags: ["GeneXus", "SQL Server", ".NET", "Healthcare"],
    liveUrl: null,
    githubUrl: null,
    featured: false,
    isPrivate: true,
  },
  {
    title: "Gestor de Automatización DLL",
    description: "Arquitectura y desarrollo de una librería dinámica (DLL) en C# para la gestión de clases y métodos, evitando conflictos de concurrencia entre desarrolladores y optimizando el flujo de trabajo en un 50%.",
    image: "/images/dll-architecture.jpg",
    tags: ["C#", ".NET", "Architecture", "Optimization"],
    liveUrl: null,
    githubUrl: null,
    featured: true,
    isPrivate: true,
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
