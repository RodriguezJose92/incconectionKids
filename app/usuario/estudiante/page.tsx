"use client"

import { useState } from "react"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  FileText,
  MessageSquare,
  Bell,
  Calendar,
  List,
  Dumbbell,
  HeartPulse,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Dashboard() {
  const [vistaEntregas, setVistaEntregas] = useState<"lista" | "calendario">("lista")
  const [periodoAcademico, setPeriodoAcademico] = useState("2024-1")
  const [bannerActual, setBannerActual] = useState(0)

  const cursosActivos = [
    {
      id: 1,
      nombre: "Anatomía Humana",
      profesor: "Dr. Juan Pérez",
      progreso: 80,
      color: "bg-red-500",
    },
    {
      id: 2,
      nombre: "Fisiología del Ejercicio",
      profesor: "Lic. Ana Gómez",
      progreso: 65,
      color: "bg-orange-500",
    },
    {
      id: 3,
      nombre: "Biomecánica Deportiva",
      profesor: "Ing. Carlos Ruiz",
      progreso: 70,
      color: "bg-yellow-500",
    },
  ]

  const proximasEntregas = [
    {
      curso: "Fisiología del Ejercicio",
      tarea: "Informe - Consumo de Oxígeno",
      fecha: "2024-01-26",
      prioridad: "alta",
    },
    {
      curso: "Anatomía Humana",
      tarea: "Examen Práctico - Sistema Muscular",
      fecha: "2024-01-29",
      prioridad: "media",
    },
    {
      curso: "Biomecánica Deportiva",
      tarea: "Análisis de Movimiento - Salto",
      fecha: "2024-01-31",
      prioridad: "baja",
    },
  ]

  const ultimasCalificaciones = [
    {
      curso: "Biomecánica Deportiva",
      actividad: "Informe - Análisis de la Marcha",
      nota: 4.6,
      fecha: "2024-01-16",
    },
    {
      curso: "Fisiología del Ejercicio",
      actividad: "Test de Lactato",
      nota: 4.3,
      fecha: "2024-01-13",
    },
    {
      curso: "Anatomía Humana",
      actividad: "Quiz - Sistema Óseo",
      nota: 3.9,
      fecha: "2024-01-11",
    },
  ]

  const notificaciones = [
    {
      tipo: "anuncio",
      titulo: "Cambio de horario - Biomecánica",
      mensaje: "La clase del 27 de enero se traslada al laboratorio",
      fecha: "Hace 3 horas",
      leido: false,
    },
    {
      tipo: "mensaje",
      titulo: "Recordatorio - Dr. Pérez",
      mensaje: "Entrega del informe de consumo de oxígeno",
      fecha: "Hace 6 horas",
      leido: false,
    },
    {
      tipo: "recordatorio",
      titulo: "Simulacro - Primeros Auxilios",
      mensaje: "No olvides confirmar tu asistencia",
      fecha: "Hace 1 día",
      leido: true,
    },
  ]

  const banners = [
    {
      id: 1,
      titulo: "Inscripciones Abiertas - Cursos de Verano",
      descripcion: "Aprovecha las vacaciones para adelantar materias",
      imagen: "/placeholder.svg?height=200&width=800&text=Cursos+de+Verano",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      enlace: "/inscripcion",
    },
    {
      id: 2,
      titulo: "Nueva Biblioteca Digital",
      descripcion: "Accede a miles de libros y recursos académicos",
      imagen: "/placeholder.svg?height=200&width=800&text=Biblioteca+Digital",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      enlace: "/biblioteca",
    },
    {
      id: 3,
      titulo: "Grupos de Interés 2024",
      descripcion: "Únete a actividades deportivas y culturales",
      imagen: "/placeholder.svg?height=200&width=800&text=Grupos+de+Interés",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      enlace: "/grupos-interes",
    },
  ]

  const siguienteBanner = () => {
    setBannerActual((prev) => (prev + 1) % banners.length)
  }

  const bannerAnterior = () => {
    setBannerActual((prev) => (prev - 1 + banners.length) % banners.length)
  }

  // Generar calendario mini para enero 2024
  const generarCalendarioMini = () => {
    const diasSemana = ["D", "L", "M", "M", "J", "V", "S"]
    const diasEnero = []

    // Días vacíos al inicio (enero 2024 empieza en lunes)
    for (let i = 0; i < 1; i++) {
      diasEnero.push(null)
    }

    // Días del mes
    for (let dia = 1; dia <= 31; dia++) {
      diasEnero.push(dia)
    }

    return { diasSemana, diasEnero }
  }

  const obtenerEntregasPorDia = (dia: number) => {
    const fechaBuscada = `2024-01-${String(dia).padStart(2, "0")}`
    return proximasEntregas.filter((entrega) => entrega.fecha === fechaBuscada)
  }

  const { diasSemana, diasEnero } = generarCalendarioMini()

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 flex-1">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Panel Principal</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2 px-4">
          <Select defaultValue="2024-1" value={periodoAcademico} onValueChange={setPeriodoAcademico}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período Académico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-1">2024-1 (Actual)</SelectItem>
              <SelectItem value="2023-2">2023-2</SelectItem>
              <SelectItem value="2023-1">2023-1</SelectItem>
              <SelectItem value="2022-2">2022-2</SelectItem>
              <SelectItem value="2022-1">2022-1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Bienvenida */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card className="md:col-span-3">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>MG</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">¡Bienvenido, María González!</CardTitle>
                  <CardDescription>Tienes 3 cursos activos y 2 evaluaciones pendientes</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Banners Publicitarios */}
        <div className="relative">
          {/* Vista Desktop - Rectangular */}
          <div className="hidden md:block">
            <Card className="overflow-hidden">
              <div className={`${banners[bannerActual].color} text-white relative`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{banners[bannerActual].titulo}</h3>
                      <p className="text-lg opacity-90 mb-4">{banners[bannerActual].descripcion}</p>
                      <Button variant="secondary" size="lg">
                        Ver más
                      </Button>
                    </div>
                    <div className="hidden lg:block">
                      <img
                        src={banners[bannerActual].imagen || "/placeholder.svg"}
                        alt={banners[bannerActual].titulo}
                        className="w-64 h-32 object-cover rounded-lg opacity-80"
                      />
                    </div>
                  </div>
                </CardContent>

                {/* Controles de navegación */}
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={bannerAnterior}
                    className="ml-2 text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={siguienteBanner}
                    className="mr-2 text-white hover:bg-white/20"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Indicadores */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setBannerActual(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === bannerActual ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Vista Mobile - Cuadrado */}
          <div className="md:hidden">
            <Card className="overflow-hidden">
              <div className={`${banners[bannerActual].color} text-white relative aspect-square`}>
                <CardContent className="p-4 h-full flex flex-col justify-center text-center">
                  <h3 className="text-xl font-bold mb-3">{banners[bannerActual].titulo}</h3>
                  <p className="text-sm opacity-90 mb-4">{banners[bannerActual].descripcion}</p>
                  <Button variant="secondary" size="sm" className="mx-auto">
                    Ver más
                  </Button>
                </CardContent>

                {/* Controles de navegación mobile */}
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={bannerAnterior}
                    className="ml-1 text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={siguienteBanner}
                    className="mr-1 text-white hover:bg-white/20"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Indicadores mobile */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setBannerActual(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === bannerActual ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Cursos Activos */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                Mis Cursos Activos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cursosActivos.map((curso) => (
                <div key={curso.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${curso.color}`} />
                    <div>
                      <h4 className="font-medium">{curso.nombre}</h4>
                      <p className="text-sm text-muted-foreground">{curso.profesor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{curso.progreso}%</div>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div className={`h-2 rounded-full ${curso.color}`} style={{ width: `${curso.progreso}%` }} />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                Ver todos los cursos
              </Button>
            </CardContent>
          </Card>

          {/* Próximas Entregas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Próximas Evaluaciones
                </CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant={vistaEntregas === "lista" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setVistaEntregas("lista")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={vistaEntregas === "calendario" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setVistaEntregas("calendario")}
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {vistaEntregas === "lista" ? (
                // Vista de Lista (existente)
                <>
                  {proximasEntregas.map((entrega, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{entrega.tarea}</p>
                          <p className="text-xs text-muted-foreground">{entrega.curso}</p>
                          <p className="text-xs">{entrega.fecha}</p>
                        </div>
                        <Badge
                          variant={
                            entrega.prioridad === "alta"
                              ? "destructive"
                              : entrega.prioridad === "media"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {entrega.prioridad}
                        </Badge>
                      </div>
                      {index < proximasEntregas.length - 1 && <Separator />}
                    </div>
                  ))}
                </>
              ) : (
                // Vista de Calendario Mini
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="font-medium">Enero 2024</h3>
                  </div>

                  {/* Encabezados de días */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {diasSemana.map((dia) => (
                      <div key={dia} className="text-xs font-medium text-muted-foreground p-1">
                        {dia}
                      </div>
                    ))}
                  </div>

                  {/* Días del calendario */}
                  <div className="grid grid-cols-7 gap-1">
                    {diasEnero.map((dia, index) => {
                      if (!dia) {
                        return <div key={index} className="p-1 h-8" />
                      }

                      const entregasDelDia = obtenerEntregasPorDia(dia)
                      const esHoy = dia === 15 // Simular día actual

                      return (
                        <div
                          key={dia}
                          className={`p-1 h-8 text-xs flex items-center justify-center rounded relative ${
                            esHoy ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-muted"
                          }`}
                        >
                          {dia}
                          {entregasDelDia.length > 0 && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Leyenda */}
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span>Evaluaciones pendientes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>Día actual</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Últimas Calificaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5" />
                Últimas Evaluaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ultimasCalificaciones.map((calificacion, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{calificacion.actividad}</p>
                    <p className="text-xs text-muted-foreground">{calificacion.curso}</p>
                    <p className="text-xs">{calificacion.fecha}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{calificacion.nota}</div>
                    <div className="text-xs text-muted-foreground">/ 5.0</div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                Ver todas las evaluaciones
              </Button>
            </CardContent>
          </Card>

          {/* Notificaciones Recientes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificaciones Recientes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notificaciones.map((notificacion, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${!notificacion.leido ? "bg-blue-50 border-blue-200" : ""}`}
                >
                  <div className="flex items-start gap-2">
                    {notificacion.tipo === "anuncio" && <FileText className="h-4 w-4 mt-0.5 text-blue-500" />}
                    {notificacion.tipo === "mensaje" && <MessageSquare className="h-4 w-4 mt-0.5 text-green-500" />}
                    {notificacion.tipo === "recordatorio" && <Clock className="h-4 w-4 mt-0.5 text-orange-500" />}
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{notificacion.titulo}</p>
                      <p className="text-xs text-muted-foreground">{notificacion.mensaje}</p>
                      <p className="text-xs text-muted-foreground">{notificacion.fecha}</p>
                    </div>
                    {!notificacion.leido && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full bg-transparent">
                Ver todas las notificaciones
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  )
}
