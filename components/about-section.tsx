"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Award, Briefcase, Code2, Sparkles } from "lucide-react"

const stats = [
  { value: "8+", label: "Años de Experiencia", icon: Briefcase },
]

const experiences = [
  {
    period: "Junio 2020 - Actual",
    role: "Ingeniero de Aplicaciones Web (Contratista)",
    company: "Dirección Ejecutiva de Administración Judicial (DEAJ) - Rama Judicial",
    description:
      "Desarrollo, mantenimiento y evolución de aplicaciones web empresariales utilizando C#, ASP.NET MVC/Core y SQL Server. Implementación de arquitectura en capas y patrones de diseño para mejorar mantenibilidad y escalabilidad. Desarrollo y consumo de APIs REST y WebServices SOAP (JSON/XML). Optimización de consultas y procedimientos almacenados en SQL Server. Soporte y resolución de incidentes en producción garantizando continuidad operativa.",
    achievements:
      "Mejora en la estabilidad y rendimiento de aplicaciones institucionales. Reducción significativa en tiempos de respuesta mediante optimización SQL en procesos internos críticos.",
  },
  {
    period: "Abril 2018 - Diciembre 2019",
    role: "Analista de Desarrollo",
    company: "Nexarte",
    description:
      "Desarrollo de nuevas soluciones y mejoras evolutivas en aplicaciones web utilizando .NET (C#), SQL Server y HTML. Implementación de arquitectura MVC y consumo de WebServices para integraciones externas. Administración, instalación y soporte técnico de la plataforma Moodle.",
    achievements:
      "Participación en la evolución de aplicaciones web empresariales y soporte funcional de la plataforma Moodle.",
  },
  {
    period: "Agosto 2017 - Febrero 2018",
    role: "Developer Engineer Junior",
    company: "Digital Ware",
    description:
      "Desarrollo backend y soporte de aplicaciones Windows y Web creadas con GeneXus. Trabajo bajo metodología ágil Scrum. Desarrollo de soluciones utilizando SQL Server y .NET (C#, HTML).",
    achievements:
      "Reducción del 50% en los tiempos de entrega y devolución de objetos mediante el desarrollo de una aplicación web para la gestión de objetos entre desarrolladores y administradores.",
  },
];

const pdfPath = "/Rafael_David_Ochoa_Quijano_CV.pdf"

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Componente local para preview al hover
  function CVHoverPreview() {
    const [showPreview, setShowPreview] = useState(false)
    const [previewLoaded, setPreviewLoaded] = useState(false)
    const hoverTimeout = useRef<number | null>(null)
    const leaveTimeout = useRef<number | null>(null)

    const clearHoverTimeout = () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current)
        hoverTimeout.current = null
      }
    }
    const clearLeaveTimeout = () => {
      if (leaveTimeout.current) {
        clearTimeout(leaveTimeout.current)
        leaveTimeout.current = null
      }
    }

    useEffect(() => {
      return () => {
        clearHoverTimeout()
        clearLeaveTimeout()
      }
    }, [])

    const onLinkEnter = () => {
      clearLeaveTimeout()
      hoverTimeout.current = window.setTimeout(() => {
        setPreviewLoaded(true)
        setShowPreview(true)
      }, 300)
    }

    const onLinkLeave = () => {
      clearHoverTimeout()
      leaveTimeout.current = window.setTimeout(() => setShowPreview(false), 200)
    }

    const onPreviewEnter = () => {
      clearLeaveTimeout()
      setShowPreview(true)
    }
    const onPreviewLeave = () => {
      leaveTimeout.current = window.setTimeout(() => setShowPreview(false), 150)
    }

    return (
      <div className="mt-8">
        <h4 className="mb-3 text-sm font-medium">Ver CV</h4>

        <div className="mb-4 flex gap-3 items-start">
          <a
            href={pdfPath}
            download
            className="inline-block rounded-md bg-accent px-4 py-2 text-sm font-medium text-white"
          >
            Descargar CV (PDF)
          </a>

          <div className="relative inline-block">
            <a
              href={pdfPath}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-md border px-4 py-2 text-sm font-medium"
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
            >
              Abrir en nueva pestaña
            </a>

            {showPreview && (
              <div
                onMouseEnter={onPreviewEnter}
                onMouseLeave={onPreviewLeave}
                className="absolute z-50 mt-2 right-0 w-[360px] rounded border bg-background shadow-lg"
                style={{ height: 480, overflow: "hidden" }}
              >
                {!previewLoaded ? (
                  <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
                    Cargando vista previa…
                  </div>
                ) : (
                  <iframe
                    src={pdfPath + "#view=FitH"}
                    title="Preview CV"
                    className="w-full h-full"
                    frameBorder="0"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="about" className="relative py-32 px-6" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">Sobre mí</span>

            <div className="space-y-4 text-muted-foreground">
              <p>
                Ingeniero de Sistemas con más de 7 años de experiencia en el desarrollo y evolución de aplicaciones web
                empresariales, trabajando bajo arquitectura MVC y enfoque en capas. Especializado en C#, ASP.NET Core y
                SQL Server. Experiencia en análisis técnico, gestión de incidentes en producción, implementación de mejoras
                evolutivas y diseño de soluciones orientadas a la estabilidad y el rendimiento. Enfocado en buenas prácticas
                de desarrollo, mantenibilidad del código y mejora continua bajo metodología Scrum.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-accent" />
                  <div className="font-serif text-3xl font-medium">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Experience */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">
              Experiencia
            </span>
            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="group relative border-l-2 border-border pl-6 transition-colors hover:border-accent"
                >
                  <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-border transition-colors group-hover:bg-accent" />
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {exp.period}
                  </span>
                  <h3 className="mt-1 font-medium">{exp.role}</h3>
                  <h3 className="mt-1 font-medium">
                    <span className="text-accent">{exp.company}</span>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CV controls (visor embebido eliminado) */}
          <div className="mt-8 lg:col-span-2">
            <CVHoverPreview />
          </div>
        </div>
      </div>
    </section>
  )
}