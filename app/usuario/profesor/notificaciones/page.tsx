"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertCircle, MessageSquare, Calendar, BookOpen } from "lucide-react"

export default function NotificacionesPage() {
  const notificaciones = [
    {
      id: "1",
      tipo: "mensaje",
      titulo: "Nuevo mensaje de Ana García",
      descripcion: "Consulta sobre el tema 5 de Matemáticas Avanzadas",
      fecha: "hace 2 horas",
      leida: false,
      icono: MessageSquare,
      color: "text-blue-500",
    },
    {
      id: "2",
      tipo: "entrega",
      titulo: "Nueva entrega recibida",
      descripcion: "Carlos López ha entregado la Tarea 3 de Cálculo Diferencial",
      fecha: "hace 4 horas",
      leida: false,
      icono: BookOpen,
      color: "text-green-500",
    },
    {
      id: "3",
      tipo: "recordatorio",
      titulo: "Recordatorio: Examen mañana",
      descripcion: "Examen parcial de Matemáticas Avanzadas programado para mañana a las 10:00 AM",
      fecha: "hace 6 horas",
      leida: true,
      icono: Calendar,
      color: "text-orange-500",
    },
    {
      id: "4",
      tipo: "sistema",
      titulo: "Calificaciones pendientes",
      descripcion: "Tienes 12 actividades pendientes por calificar en tus cursos",
      fecha: "hace 1 día",
      leida: true,
      icono: AlertCircle,
      color: "text-red-500",
    },
    {
      id: "5",
      tipo: "mensaje",
      titulo: "Nuevo mensaje de María Fernández",
      descripcion: "Pregunta sobre el proyecto final de Álgebra Lineal",
      fecha: "hace 1 día",
      leida: true,
      icono: MessageSquare,
      color: "text-blue-500",
    },
  ]

  const marcarComoLeida = (id: string) => {
    // Lógica para marcar como leída
    console.log(`Marcando notificación ${id} como leída`)
  }

  const marcarTodasComoLeidas = () => {
    // Lógica para marcar todas como leídas
    console.log("Marcando todas las notificaciones como leídas")
  }

  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notificaciones</h1>
          <p className="text-muted-foreground">
            {notificacionesNoLeidas > 0
              ? `Tienes ${notificacionesNoLeidas} notificaciones sin leer`
              : "Todas las notificaciones están al día"}
          </p>
        </div>
        {notificacionesNoLeidas > 0 && (
          <Button onClick={marcarTodasComoLeidas}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Marcar todas como leídas
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {notificaciones.map((notificacion) => {
          const IconoNotificacion = notificacion.icono

          return (
            <Card
              key={notificacion.id}
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                !notificacion.leida ? "border-l-4 border-l-primary bg-muted/30" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full bg-muted ${notificacion.color}`}>
                    <IconoNotificacion className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${!notificacion.leida ? "font-bold" : ""}`}>{notificacion.titulo}</h3>
                      <div className="flex items-center gap-2">
                        {!notificacion.leida && (
                          <Badge variant="default" className="text-xs">
                            Nueva
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">{notificacion.fecha}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{notificacion.descripcion}</p>
                    {!notificacion.leida && (
                      <Button size="sm" variant="outline" onClick={() => marcarComoLeida(notificacion.id)}>
                        Marcar como leída
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {notificaciones.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No hay notificaciones</h3>
            <p className="text-muted-foreground">Cuando tengas nuevas notificaciones, aparecerán aquí.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
