"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Code, Database, Layers, Zap, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Desarrollo Backend",
    description:
      "Creación de lógica de negocio robusta y escalable utilizando el ecosistema avanzado de Microsoft .NET.",
    features: [
      "ASP.NET Core & C#",
      "Arquitecturas MVC y N-Capas",
      "APIs REST & WebServices",
      "Librerías Reutilizables"
    ],
  },
  {
    icon: Database,
    title: "Ingeniería de Datos",
    description:
      "Especialista en el diseño, gestión y optimización de bases de datos relacionales de alto rendimiento.",
    features: [
      "SQL Server & Oracle",
      "Stored Procedures & T-SQL",
      "Procesos ETL (SSIS/SSRS)",
      "Optimización de Consultas"
    ],
  },
  {
    icon: Layers,
    title: "Arquitectura y Software Empresarial",
    description:
      "Diseño de soluciones e implementación de sistemas de misión crítica bajo arquitecturas robustas y escalables.",
    features: [
      "Arquitectura N-Capas y MVC",
      "Desarrollo con GeneXus",
      "Componentes DevExpress",
      "Soporte a Aplicaciones Críticas"
    ],
  },
  {
    icon: Zap,
    title: "Consultoría y Agilidad",
    description:
      "Mejora del rendimiento de aplicaciones críticas y soporte técnico de nivel profesional.",
    features: [
      "Reducción de tiempos de entrega",
      "Mantenimiento de Apps Web",
      "Soporte a Sistemas Críticos",
      "Calidad de Código y Mejora Continua"
    ],
  },
]

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" className="relative py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">Soluciones técnicas y arquitectura de software</span>
          <h2 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">Áreas de Especialidad</h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor-hover
            >
              <motion.div
                className="absolute inset-0 bg-accent/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-xl bg-accent/10 p-3">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>

                <h3 className="mb-3 font-serif text-xl font-medium">{service.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <ArrowRight className="h-3 w-3 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
