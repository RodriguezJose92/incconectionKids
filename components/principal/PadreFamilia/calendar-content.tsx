"use client"

import styles from './calendar-content.module.css'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Clock, MapPin, User, Plus, Filter, Download } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface CalendarContentProps {
    language: string
    activeStudent: any
}

const eventsData = [
    {
        id: 1,
        title: "Examen de Matemáticas",
        type: "exam",
        subject: "Matemáticas",
        date: new Date(2024, 2, 15),
        time: "08:00 - 09:30",
        location: "Aula 201",
        teacher: "Prof. García",
        description: "Examen sobre álgebra y geometría",
    },
    {
        id: 2,
        title: "Entrega de Ensayo",
        type: "assignment",
        subject: "Español",
        date: new Date(2024, 2, 18),
        time: "Antes de las 23:59",
        location: "Plataforma Virtual",
        teacher: "Prof. Martínez",
        description: "Ensayo sobre literatura colombiana",
    },
    {
        id: 3,
        title: "Feria de Ciencias",
        type: "event",
        subject: "General",
        date: new Date(2024, 2, 20),
        time: "09:00 - 15:00",
        location: "Gimnasio Principal",
        teacher: "Varios",
        description: "Presentación de proyectos científicos",
    },
    {
        id: 4,
        title: "Reunión de Padres",
        type: "meeting",
        subject: "General",
        date: new Date(2024, 2, 22),
        time: "18:00 - 20:00",
        location: "Auditorio",
        teacher: "Director Académico",
        description: "Reunión trimestral con padres de familia",
    },
]

const eventTypes = {
    exam: { label: "Examen", color: "bg-red-500", textColor: "text-red-700" },
    assignment: { label: "Tarea", color: "bg-blue-500", textColor: "text-blue-700" },
    event: { label: "Evento", color: "bg-green-500", textColor: "text-green-700" },
    meeting: { label: "Reunión", color: "bg-purple-500", textColor: "text-purple-700" },
}

export function CalendarContent({ language, activeStudent }: CalendarContentProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [selectedFilter, setSelectedFilter] = useState<string>("all")
    const isSpanish = language === "es"

    const filteredEvents = eventsData.filter((event) => {
        if (selectedFilter === "all") return true
        return event.type === selectedFilter
    })

    const getEventsForDate = (date: Date) => {
        return eventsData.filter((event) => event.date.toDateString() === date.toDateString())
    }

    const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 pt-0">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        {isSpanish ? "Calendario Académico" : "Academic Calendar"}
                    </h1>
                    <p className="text-muted-foreground">
                        {isSpanish
                            ? `Eventos y actividades de ${activeStudent.firstName}`
                            : `Events and activities for ${activeStudent.firstName}`}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        {isSpanish ? "Filtrar" : "Filter"}
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        {isSpanish ? "Exportar" : "Export"}
                    </Button>
                    <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        {isSpanish ? "Nuevo Evento" : "New Event"}
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Calendar */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5" />
                            {selectedDate && format(selectedDate, "MMMM yyyy", { locale: isSpanish ? es : undefined })}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={styles.calendarMobileContainer}>
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="rounded-md border"
                                locale={isSpanish ? es : undefined}
                                modifiers={{
                                    hasEvents: eventsData.map((event) => event.date),
                                }}
                                modifiersStyles={{
                                    hasEvents: {
                                        backgroundColor: "hsl(var(--primary))",
                                        color: "hsl(var(--primary-foreground))",
                                        fontWeight: "bold",
                                    },
                                }}
                            />

                            <img
                                src="https://scontent.fbog23-1.fna.fbcdn.net/v/t39.30808-6/515439926_10236350592563026_8584566536716367020_n.png?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=jr-UaLpOkIcQ7kNvwEQmKDV&_nc_oc=AdmmLnlvfYDdE5UowaOd1k7elYaxv-kBWcb3a-GoWJVs-3PmRGX24w4xfi_kCD74bg4&_nc_zt=23&_nc_ht=scontent.fbog23-1.fna&_nc_gid=t9mD83iXnRE49AKY-5CTzw&oh=00_AfUTCJikXC9cug0e-AcXxH4U5mUGn71MCdtI2YhQhb04rw&oe=689F65A6"
                                className={styles.calendarImage}
                            />
                        </div>


                    </CardContent>

                </Card>

                {/* Events for Selected Date */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">
                            {selectedDate
                                ? format(selectedDate, "d 'de' MMMM", { locale: isSpanish ? es : undefined })
                                : isSpanish
                                    ? "Selecciona una fecha"
                                    : "Select a date"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedDateEvents.length > 0 ? (
                            <div className="space-y-3">
                                {selectedDateEvents.map((event) => (
                                    <div key={event.id} className="p-3 border rounded-lg">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-semibold text-sm">{event.title}</h4>
                                            <Badge
                                                variant="secondary"
                                                className={`text-xs ${eventTypes[event.type as keyof typeof eventTypes].textColor}`}
                                            >
                                                {eventTypes[event.type as keyof typeof eventTypes].label}
                                            </Badge>
                                        </div>
                                        <div className="space-y-1 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-3 w-3" />
                                                <span>{event.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3 w-3" />
                                                <span>{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <User className="h-3 w-3" />
                                                <span>{event.teacher}</span>
                                            </div>
                                        </div>
                                        {event.description && <p className="text-xs text-muted-foreground mt-2">{event.description}</p>}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                {isSpanish ? "No hay eventos para esta fecha" : "No events for this date"}
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming Events */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        {isSpanish ? "Próximos Eventos" : "Upcoming Events"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {filteredEvents.slice(0, 6).map((event) => (
                            <div key={event.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold">{event.title}</h4>
                                    <Badge
                                        variant="secondary"
                                        className={`text-xs ${eventTypes[event.type as keyof typeof eventTypes].textColor}`}
                                    >
                                        {eventTypes[event.type as keyof typeof eventTypes].label}
                                    </Badge>
                                </div>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="h-3 w-3" />
                                        <span>{format(event.date, "d MMM yyyy", { locale: isSpanish ? es : undefined })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-3 w-3" />
                                        <span>{event.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-3 w-3" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                <p className="text-sm font-medium mt-2 text-primary">{event.subject}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
