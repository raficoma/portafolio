"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowUpRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "Ecosistema Rama Judicial",
    description: "Desarrollo y soporte técnico de aplicaciones críticas para la Rama Judicial: Tutela en Línea, Demanda en Línea, Justicia XXI Web, Consulta Pública y Firma Electrónica. Sistemas de alta disponibilidad para ciudadanos y funcionarios.",
    image: "/images/rama-judicial.jpg",
    tags: ["C#", "ASP.NET Core", "SQL Server", "WebServices"],
    liveUrls: [
      { label: "Tutela en Línea", url: "https://procesojudicial.ramajudicial.gov.co/TutelaEnLinea", image: "/images/tutela.jpg" },
      { label: "Demanda en Línea", url: "https://procesojudicial.ramajudicial.gov.co/DemandaEnLinea", image: "/images/demanda.jpg" },
      { label: "Justicia XXI Web", url: "https://procesojudicial.ramajudicial.gov.co/Justicia21/", image: "/images/justicia21.jpg" },
      { label: "Firma Electrónica", url: "https://firmaelectronica.ramajudicial.gov.co/FirmaElectronica/Firma", image: "/images/firma.jpg" },
    ],
  },
  {
    title: "Administrativo Nexarte",
    description: "Sistema integral para la gestión de registros, control contable, recursos humanos, procesos de contratación y administración de hojas de vida para la compañía.",
    image: "/images/nexarte-web.jpg",
    tags: [".NET", "MVC", "SQL Server", "Moodle"],
    liveUrls: [],
  },
  {
    title: "Soporte Hosvital (GeneXus)",
    description: "Mantenimiento y evolución del sistema Hosvital utilizando GeneXus, enfocado en la mejora de procesos de salud y soporte técnico especializado.",
    image: "/images/hosvital.jpg",
    tags: ["GeneXus", "SQL Server", ".NET", "Healthcare"],
    liveUrls: [
      { label: "Hosvital", url: "", image: "/images/hosvital.jpg" },
    ],
  },
  {
    title: "Gestor de Automatización DLL",
    description: "Arquitectura y desarrollo de una librería dinámica (DLL) en C# para la gestión de clases y métodos, evitando conflictos de concurrencia entre desarrolladores y optimizando el flujo de trabajo en un 50%.",
    image: "/images/dll-architecture.jpg",
    tags: ["C#", ".NET", "Architecture", "Optimization"],
    liveUrls: [],
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
            Historial Proyectos
          </span>
          <h2 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">Mis Trabajos</h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor-hover
            >

              <div className={`p-6`}>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="mb-2 font-serif text-2xl font-medium">{project.title}</h3>
                <p className="mb-6 text-muted-foreground">{project.description}</p>

                <div className="flex flex-wrap gap-4">
                  {project.liveUrls.map((link, index) => {
                    const hasUrl = Boolean(link.url)

                    return hasUrl ? (
                      <a
                        key={`live-url-${index}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-60 h-40 overflow-hidden rounded-md border bg-muted shadow-sm hover:shadow-md transition"
                      >
                        {link.image ? (
                          <img
                            src={link.image}
                            alt={link.label}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-muted" />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        <div className="relative z-10 flex h-full flex-col justify-end p-3 text-white">
                          <span className="text-sm font-medium">{link.label}</span>
                          <span className="text-xs opacity-80">Abrir en nueva pestaña</span>
                        </div>

                        <ArrowUpRight className="absolute right-2 top-2 h-4 w-4 text-white/90 opacity-90" />
                      </a>
                    ) : (
                      <div
                        key={`live-url-${index}`}
                        className="relative w-60 h-40 overflow-hidden rounded-md border border-dashed border-muted bg-muted/80 shadow-sm"
                      >
                        {link.image ? (
                          <img
                            src={link.image}
                            alt={link.label}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-muted" />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        <div className="relative z-10 flex h-full flex-col justify-end p-3 text-white">
                          <span className="text-sm font-medium">{link.label}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
