"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, MapPin, Send, CheckCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""
  const fieldsValid = name.trim() && email.trim() && message.trim()

  const handleWhatsAppClick = () => {
    if (!fieldsValid) {
      setErrorMessage("Por favor completa todos los campos.")
      return
    }
    const text = encodeURIComponent(
      `Hola, quiero contactarte desde tu portafolio.\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    )
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${text}`
    try {
      window.open(url, "_blank")
    } catch (err) {
      console.warn("No se pudo abrir WhatsApp:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (!response.ok) {
        const errorResponse = await response.json().catch(() => ({ error: "Error al enviar el mensaje." }))
        throw new Error(errorResponse.error || "Error al enviar el mensaje.")
      }

      const sentName = name
      const sentEmail = email
      const sentMessage = message

      setIsSubmitted(true)
      setName("")
      setEmail("")
      setMessage("")
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error al enviar el mensaje.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-block text-sm font-medium uppercase tracking-widest text-accent">Contáctame</span>
            <h2 className="mb-6 font-serif text-4xl font-medium leading-tight tracking-tight md:text-5xl">
              Convirtiendo necesidades de negocio en software de calidad
            </h2>
            <p className="mb-10 text-muted-foreground">
              Puedes escribirme por correo electrónico o a través de mis redes sociales.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Correo</div>
                  <a href="mailto:raficoma@gmail.com" className="font-medium hover:text-accent">
                    raficoma@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Ubicación</div>
                  <span className="font-medium">Bogotá, Colombia</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                    <CheckCircle className="h-8 w-8 text-accent" />
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Input
                        id="name"
                        value={name}
                        placeholder="Nombre"
                        required
                        className="bg-background"
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        placeholder="email@example.com"
                        required
                        className="bg-background"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      id="message"
                      value={message}
                      placeholder="Mensaje..."
                      rows={5}
                      required
                      className="resize-none bg-background"
                      onChange={(event) => setMessage(event.target.value)}
                    />
                  </div>

                  {errorMessage ? (
                    <p className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                      {errorMessage}
                    </p>
                  ) : null}

                  <div className="grid gap-3 sm:grid-cols-2">
                    {/* <Button type="submit" size="lg" disabled={isLoading || !fieldsValid}>
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <motion.span
                            className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" /> Enviar Correo
                        </span>
                      )}
                    </Button> */}
                    {whatsappNumber ? (
                      <Button
                        type="button"
                        variant="secondary"
                        size="lg"
                        disabled={!fieldsValid}
                        onClick={handleWhatsAppClick}
                      >
                        <span className="flex items-center gap-2">
                          <Phone className="h-4 w-4" /> Enviar WhatsApp
                        </span>
                      </Button>
                    ) : null}
                  </div>

                  <p className="pt-3 text-xs text-muted-foreground">
                    {!fieldsValid
                      ? "Completa todos los campos para habilitar los botones de envío."
                      : whatsappNumber
                        ? "Elige tu método de contacto."
                        : "Configura NEXT_PUBLIC_WHATSAPP_NUMBER para habilitar WhatsApp."}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
