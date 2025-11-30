"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Send, Plus, Megaphone, Search } from "lucide-react"

export default function ComunicacionPage() {
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState<string | null>(null)

  const mensajes = [
    {
      id: "1",
      estudiante: "Ana García",
      curso: "Matemáticas Avanzadas",
      asunto: "Consulta sobre el tema 5",
      mensaje:
        "Profesora, tengo dudas sobre la aplicación de derivadas en el tema 5. ¿Podría explicarme nuevamente el ejercicio 3.2?",
      fecha: "2024-01-20 14:30",
      leido: false,
    },
    {
      id: "2",
      estudiante: "Carlos López",
      curso: "Cálculo Diferencial",
      asunto: "Solicitud de prórroga",
      mensaje:
        "Buenos días profesora, por motivos de salud no podré entregar la tarea en la fecha establecida. ¿Sería posible una extensión?",
      fecha: "2024-01-20 10:15",
      leido: true,
    },
    {
      id: "3",
      estudiante: "María Fernández",
      curso: "Álgebra Lineal",
      asunto: "Duda sobre el proyecto final",
      mensaje: "Hola profesora, ¿el proyecto final debe incluir la implementación en software o solo la parte teórica?",
      fecha: "2024-01-19 16:45",
      leido: false,
    },
  ]

  const anuncios = [
    {
      id: "1",
      titulo: "Cambio de horario - Examen Parcial",
      contenido:
        "El examen parcial de Matemáticas Avanzadas se realizará el viernes 25 de enero a las 10:00 AM en el aula 205.",
      curso: "Matemáticas Avanzadas",
      fecha: "2024-01-18",
      activo: true,
    },
    {
      id: "2",
      titulo: "Material adicional disponible",
      contenido: "Se ha subido material adicional para el tema de integrales en la sección de contenido del curso.",
      curso: "Cálculo Diferencial",
      fecha: "2024-01-17",
      activo: true,
    },
  ]

  if (mensajeSeleccionado) {
    const mensaje = mensajes.find((m) => m.id === mensajeSeleccionado)

    return (
      <div className="flex-1 space-y-6 p-6 absolute w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Mensaje de {mensaje?.estudiante}</h1>
          <Button variant="outline" onClick={() => setMensajeSeleccionado(null)}>
            Volver a Mensajes
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>
                      {mensaje?.estudiante
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle>{mensaje?.asunto}</CardTitle>
                    <CardDescription>
                      De: {mensaje?.estudiante} • {mensaje?.fecha}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{mensaje?.curso}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p>{mensaje?.mensaje}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Responder</h3>
                  <Textarea placeholder="Escribe tu respuesta aquí..." className="min-h-[120px]" />
                  <div className="flex gap-2">
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Respuesta
                    </Button>
                    <Button variant="outline">Guardar Borrador</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Información del Estudiante</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>
                      {mensaje?.estudiante
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{mensaje?.estudiante}</p>
                    <p className="text-sm text-muted-foreground">Estudiante</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Curso:</strong> {mensaje?.curso}
                  </p>
                  <p className="text-sm">
                    <strong>Email:</strong> {mensaje?.estudiante.toLowerCase().replace(" ", ".")}@universidad.edu
                  </p>
                  <p className="text-sm">
                    <strong>Promedio:</strong> 8.5
                  </p>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Ver Perfil Completo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Comunicación</h1>
        <p className="text-muted-foreground">Gestiona mensajes y anuncios para tus estudiantes</p>
      </div>

      <Tabs defaultValue="mensajes" className="space-y-4">
        <TabsList>
          <TabsTrigger value="mensajes" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Mensajes
          </TabsTrigger>
          <TabsTrigger value="anuncios" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            Anuncios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mensajes" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar mensajes..." className="pl-10" />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Mensaje
            </Button>
          </div>

          <div className="grid gap-4">
            {mensajes.map((mensaje) => (
              <Card
                key={mensaje.id}
                className={`cursor-pointer hover:shadow-md transition-shadow ${!mensaje.leido ? "border-l-4 border-l-primary" : ""}`}
                onClick={() => setMensajeSeleccionado(mensaje.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>
                        {mensaje.estudiante
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${!mensaje.leido ? "font-bold" : ""}`}>{mensaje.asunto}</h3>
                        <div className="flex items-center gap-2">
                          {!mensaje.leido && (
                            <Badge variant="default" className="text-xs">
                              Nuevo
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">{mensaje.fecha}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        De: {mensaje.estudiante} • {mensaje.curso}
                      </p>
                      <p className="text-sm line-clamp-2">{mensaje.mensaje}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="anuncios" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Anuncios Activos</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Crear Anuncio
            </Button>
          </div>

          <div className="grid gap-4">
            {anuncios.map((anuncio) => (
              <Card key={anuncio.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{anuncio.titulo}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{anuncio.curso}</Badge>
                      <Badge variant={anuncio.activo ? "default" : "outline"}>
                        {anuncio.activo ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>Publicado el {anuncio.fecha}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{anuncio.contenido}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Editar
                    </Button>
                    <Button size="sm" variant="outline">
                      {anuncio.activo ? "Desactivar" : "Activar"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Crear Nuevo Anuncio</CardTitle>
              <CardDescription>Envía un anuncio a todos los estudiantes de un curso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Título del Anuncio</label>
                <Input placeholder="Ingresa el título del anuncio" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Curso</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Seleccionar curso</option>
                  <option>Matemáticas Avanzadas</option>
                  <option>Cálculo Diferencial</option>
                  <option>Álgebra Lineal</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contenido</label>
                <Textarea placeholder="Escribe el contenido del anuncio..." className="min-h-[100px]" />
              </div>
              <Button>
                <Megaphone className="h-4 w-4 mr-2" />
                Publicar Anuncio
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
