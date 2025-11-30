"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Users, Clock, MessageSquare, AlertCircle } from "lucide-react"
import { useEffect } from "react"

export default function Profesor() {
    const today = new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    const cursosActivos = [
        { nombre: "Matemáticas Avanzadas", estudiantes: 45, grupo: "A1" },
        { nombre: "Cálculo Diferencial", estudiantes: 38, grupo: "B2" },
        { nombre: "Álgebra Lineal", estudiantes: 52, grupo: "C1" },
    ]

    const actividadesPendientes = [
        { curso: "Matemáticas Avanzadas", actividad: "Examen Parcial", pendientes: 12, fecha: "2024-01-20" },
        { curso: "Cálculo Diferencial", actividad: "Tarea 3", pendientes: 8, fecha: "2024-01-18" },
        { curso: "Álgebra Lineal", actividad: "Proyecto Final", pendientes: 15, fecha: "2024-01-22" },
    ]

    const mensajesRecientes = [
        {
            estudiante: "Ana García",
            mensaje: "Consulta sobre el tema 5",
            curso: "Matemáticas Avanzadas",
            tiempo: "hace 2 horas",
        },
        {
            estudiante: "Carlos López",
            mensaje: "Solicitud de prórroga",
            curso: "Cálculo Diferencial",
            tiempo: "hace 4 horas",
        },
        { estudiante: "María Fernández", mensaje: "Duda sobre el proyecto", curso: "Álgebra Lineal", tiempo: "hace 1 día" },
    ]

    useEffect(() => {
        const sideBar = document.querySelector('[data-sidebar="sidebar"]')! as HTMLDivElement;
        sideBar.style.backgroundColor = 'transparent'
        sideBar.style.backdropFilter = 'blur(10px)'
    }, [])
    return (
        <div className="flex-1 space-y-6 p-6 absolute w-full">
            {/* Header de bienvenida */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">¡Bienvenida, Dr. María Rodríguez!</h1>
                <p className="text-muted-foreground capitalize">{today}</p>
            </div>

            {/* Tarjetas resumen */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{cursosActivos.length}</div>
                        <p className="text-xs text-muted-foreground">
                            {cursosActivos.reduce((acc, curso) => acc + curso.estudiantes, 0)} estudiantes totales
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Por Calificar</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {actividadesPendientes.reduce((acc, act) => acc + act.pendientes, 0)}
                        </div>
                        <p className="text-xs text-muted-foreground">{actividadesPendientes.length} actividades pendientes</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Mensajes</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mensajesRecientes.length}</div>
                        <p className="text-xs text-muted-foreground">Mensajes sin leer</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Estudiantes</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{cursosActivos.reduce((acc, curso) => acc + curso.estudiantes, 0)}</div>
                        <p className="text-xs text-muted-foreground">En todos los cursos</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Actividades por calificar */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-orange-500" />
                            Actividades por Calificar
                        </CardTitle>
                        <CardDescription>Tareas y exámenes pendientes de revisión</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {actividadesPendientes.map((actividad, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-1">
                                    <p className="font-medium">{actividad.actividad}</p>
                                    <p className="text-sm text-muted-foreground">{actividad.curso}</p>
                                    <p className="text-xs text-muted-foreground">Fecha límite: {actividad.fecha}</p>
                                </div>
                                <div className="text-right">
                                    <Badge variant="destructive">{actividad.pendientes}</Badge>
                                    <p className="text-xs text-muted-foreground mt-1">pendientes</p>
                                </div>
                            </div>
                        ))}
                        <Button className="w-full bg-transparent" variant="outline">
                            Ver Todas las Actividades
                        </Button>
                    </CardContent>
                </Card>

                {/* Mensajes recientes */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                            Mensajes Recientes
                        </CardTitle>
                        <CardDescription>Últimas consultas de estudiantes</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {mensajesRecientes.map((mensaje, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                    <AvatarFallback>
                                        {mensaje.estudiante
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <p className="font-medium text-sm">{mensaje.estudiante}</p>
                                        <p className="text-xs text-muted-foreground">{mensaje.tiempo}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{mensaje.mensaje}</p>
                                    <Badge variant="secondary" className="text-xs">
                                        {mensaje.curso}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                        <Button className="w-full bg-transparent" variant="outline">
                            Ver Todos los Mensajes
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Cursos activos */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-green-500" />
                        Mis Cursos Activos
                    </CardTitle>
                    <CardDescription>Acceso rápido a tus cursos del semestre actual</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        {cursosActivos.map((curso, index) => (
                            <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">{curso.nombre}</CardTitle>
                                    <CardDescription>Grupo {curso.grupo}</CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{curso.estudiantes} estudiantes</span>
                                        </div>
                                        <Button size="sm">Acceder</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
