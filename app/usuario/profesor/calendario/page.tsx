"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react"

export default function CalendarioPage() {
  const [vistaActual, setVistaActual] = useState("mensual")
  const [fechaActual, setFechaActual] = useState(new Date(2024, 0, 1)) // Enero 2024

  const eventos = [
    {
      id: "1",
      titulo: "Clase - Matemáticas Avanzadas",
      tipo: "clase",
      curso: "Matemáticas Avanzadas",
      fecha: "2024-01-22",
      hora: "08:00 - 10:00",
      aula: "Aula 205",
      descripcion: "Tema: Derivadas parciales",
    },
    {
      id: "2",
      titulo: "Examen Parcial - Cálculo Diferencial",
      tipo: "examen",
      curso: "Cálculo Diferencial",
      fecha: "2024-01-25",
      hora: "10:00 - 12:00",
      aula: "Aula 301",
      descripcion: "Examen parcial del primer corte",
    },
    {
      id: "3",
      titulo: "Asesoría Académica",
      tipo: "asesoria",
      curso: "General",
      fecha: "2024-01-23",
      hora: "14:00 - 16:00",
      aula: "Oficina 102",
      descripcion: "Asesorías individuales para estudiantes",
    },
    {
      id: "4",
      titulo: "Entrega Proyecto Final",
      tipo: "entrega",
      curso: "Álgebra Lineal",
      fecha: "2024-01-30",
      hora: "23:59",
      aula: "Virtual",
      descripcion: "Fecha límite para entrega del proyecto final",
    },
    {
      id: "5",
      titulo: "Clase - Álgebra Lineal",
      tipo: "clase",
      curso: "Álgebra Lineal",
      fecha: "2024-01-26",
      hora: "14:00 - 18:00",
      aula: "Aula 150",
      descripcion: "Tema: Sistemas de ecuaciones lineales",
    },
  ]

  const obtenerColorTipo = (tipo: string) => {
    switch (tipo) {
      case "clase":
        return "bg-blue-500"
      case "examen":
        return "bg-red-500"
      case "asesoria":
        return "bg-green-500"
      case "entrega":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  const obtenerEventosDelDia = (dia: number) => {
    const fechaBuscada = `2024-01-${dia.toString().padStart(2, "0")}`
    return eventos.filter((evento) => evento.fecha === fechaBuscada)
  }

  const diasDelMes = Array.from({ length: 31 }, (_, i) => i + 1)
  const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  return (
    <div className="flex-1 space-y-6 p-6 absolute w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendario Académico</h1>
          <p className="text-muted-foreground">Gestiona tus clases, asesorías y fechas importantes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium px-4">Enero 2024</span>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={vistaActual} onValueChange={setVistaActual} className="space-y-4">
        <TabsList>
          <TabsTrigger value="mensual">Vista Mensual</TabsTrigger>
          <TabsTrigger value="semanal">Vista Semanal</TabsTrigger>
          <TabsTrigger value="lista">Lista de Eventos</TabsTrigger>
        </TabsList>

        <TabsContent value="mensual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Enero 2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {diasSemana.map((dia) => (
                  <div key={dia} className="p-2 text-center font-medium text-muted-foreground">
                    {dia}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {/* Espacios vacíos para el inicio del mes */}
                {Array.from({ length: 1 }, (_, i) => (
                  <div key={`empty-${i}`} className="p-2 h-24"></div>
                ))}

                {diasDelMes.map((dia) => {
                  const eventosDelDia = obtenerEventosDelDia(dia)
                  return (
                    <div key={dia} className="p-2 h-24 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="font-medium text-sm mb-1">{dia}</div>
                      <div className="space-y-1">
                        {eventosDelDia.slice(0, 2).map((evento) => (
                          <div
                            key={evento.id}
                            className={`text-xs p-1 rounded text-white truncate ${obtenerColorTipo(evento.tipo)}`}
                          >
                            {evento.titulo}
                          </div>
                        ))}
                        {eventosDelDia.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{eventosDelDia.length - 2} más</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="semanal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Semana del 22 - 28 de Enero, 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-4">
                <div className="font-medium">Hora</div>
                {diasSemana.slice(1).map((dia) => (
                  <div key={dia} className="font-medium text-center">
                    {dia}
                  </div>
                ))}

                {Array.from({ length: 12 }, (_, i) => {
                  const hora = i + 8 // Desde las 8:00
                  return (
                    <div key={hora} className="contents">
                      <div className="text-sm text-muted-foreground py-2">{hora}:00</div>
                      {diasSemana.slice(1).map((dia, diaIndex) => {
                        const eventoEnHora = eventos.find(
                          (evento) =>
                            evento.fecha === `2024-01-${22 + diaIndex}` &&
                            evento.hora.startsWith(hora.toString().padStart(2, "0")),
                        )

                        return (
                          <div key={`${dia}-${hora}`} className="border rounded p-2 min-h-[60px]">
                            {eventoEnHora && (
                              <div className={`p-2 rounded text-white text-xs ${obtenerColorTipo(eventoEnHora.tipo)}`}>
                                <div className="font-medium">{eventoEnHora.curso}</div>
                                <div>{eventoEnHora.aula}</div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lista" className="space-y-4">
          <div className="grid gap-4">
            {eventos.map((evento) => (
              <Card key={evento.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-4 h-4 rounded-full ${obtenerColorTipo(evento.tipo)} mt-1`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{evento.titulo}</h3>
                        <Badge variant="secondary">{evento.tipo}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{evento.fecha}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{evento.hora}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{evento.aula}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{evento.curso}</span>
                        </div>
                      </div>
                      <p className="text-sm mt-2">{evento.descripcion}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Leyenda de colores */}
      <Card>
        <CardHeader>
          <CardTitle>Leyenda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-sm">Clases</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm">Exámenes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm">Asesorías</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-sm">Entregas</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
