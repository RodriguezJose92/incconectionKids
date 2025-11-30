"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, User, Calendar } from "lucide-react"
import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"

interface ScheduleContentProps {
    language: string
    activeStudent: any
}

const scheduleData = {
    monday: [
        { time: "08:00 - 08:45", subject: "Matemáticas", teacher: "Prof. García", room: "Aula 201", color: "bg-blue-500" },
        { time: "08:45 - 09:30", subject: "Español", teacher: "Prof. Martínez", room: "Aula 105", color: "bg-green-500" },
        { time: "09:30 - 10:15", subject: "Ciencias", teacher: "Prof. López", room: "Lab 1", color: "bg-purple-500" },
        { time: "10:15 - 10:30", subject: "Recreo", teacher: "", room: "Patio", color: "bg-gray-400" },
        {
            time: "10:30 - 11:15",
            subject: "Historia",
            teacher: "Prof. Rodríguez",
            room: "Aula 302",
            color: "bg-orange-500",
        },
        { time: "11:15 - 12:00", subject: "Inglés", teacher: "Prof. Smith", room: "Aula 205", color: "bg-red-500" },
    ],
    tuesday: [
        { time: "08:00 - 08:45", subject: "Inglés", teacher: "Prof. Smith", room: "Aula 205", color: "bg-red-500" },
        { time: "08:45 - 09:30", subject: "Matemáticas", teacher: "Prof. García", room: "Aula 201", color: "bg-blue-500" },
        {
            time: "09:30 - 10:15",
            subject: "Educación Física",
            teacher: "Prof. Torres",
            room: "Gimnasio",
            color: "bg-yellow-500",
        },
        { time: "10:15 - 10:30", subject: "Recreo", teacher: "", room: "Patio", color: "bg-gray-400" },
        { time: "10:30 - 11:15", subject: "Arte", teacher: "Prof. Morales", room: "Taller", color: "bg-pink-500" },
        { time: "11:15 - 12:00", subject: "Ciencias", teacher: "Prof. López", room: "Lab 1", color: "bg-purple-500" },
    ],
    wednesday: [
        { time: "08:00 - 08:45", subject: "Español", teacher: "Prof. Martínez", room: "Aula 105", color: "bg-green-500" },
        {
            time: "08:45 - 09:30",
            subject: "Historia",
            teacher: "Prof. Rodríguez",
            room: "Aula 302",
            color: "bg-orange-500",
        },
        { time: "09:30 - 10:15", subject: "Matemáticas", teacher: "Prof. García", room: "Aula 201", color: "bg-blue-500" },
        { time: "10:15 - 10:30", subject: "Recreo", teacher: "", room: "Patio", color: "bg-gray-400" },
        { time: "10:30 - 11:15", subject: "Música", teacher: "Prof. Vega", room: "Aula Música", color: "bg-indigo-500" },
        { time: "11:15 - 12:00", subject: "Inglés", teacher: "Prof. Smith", room: "Aula 205", color: "bg-red-500" },
    ],
    thursday: [
        { time: "08:00 - 08:45", subject: "Ciencias", teacher: "Prof. López", room: "Lab 1", color: "bg-purple-500" },
        { time: "08:45 - 09:30", subject: "Matemáticas", teacher: "Prof. García", room: "Aula 201", color: "bg-blue-500" },
        { time: "09:30 - 10:15", subject: "Español", teacher: "Prof. Martínez", room: "Aula 105", color: "bg-green-500" },
        { time: "10:15 - 10:30", subject: "Recreo", teacher: "", room: "Patio", color: "bg-gray-400" },
        {
            time: "10:30 - 11:15",
            subject: "Educación Física",
            teacher: "Prof. Torres",
            room: "Gimnasio",
            color: "bg-yellow-500",
        },
        {
            time: "11:15 - 12:00",
            subject: "Historia",
            teacher: "Prof. Rodríguez",
            room: "Aula 302",
            color: "bg-orange-500",
        },
    ],
    friday: [
        { time: "08:00 - 08:45", subject: "Arte", teacher: "Prof. Morales", room: "Taller", color: "bg-pink-500" },
        { time: "08:45 - 09:30", subject: "Inglés", teacher: "Prof. Smith", room: "Aula 205", color: "bg-red-500" },
        {
            time: "09:30 - 10:15",
            subject: "Historia",
            teacher: "Prof. Rodríguez",
            room: "Aula 302",
            color: "bg-orange-500",
        },
        { time: "10:15 - 10:30", subject: "Recreo", teacher: "", room: "Patio", color: "bg-gray-400" },
        { time: "10:30 - 11:15", subject: "Matemáticas", teacher: "Prof. García", room: "Aula 201", color: "bg-blue-500" },
        { time: "11:15 - 12:00", subject: "Música", teacher: "Prof. Vega", room: "Aula Música", color: "bg-indigo-500" },
    ],
}

const days = [
    { key: "monday", labelEs: "Lunes", labelEn: "Monday" },
    { key: "tuesday", labelEs: "Martes", labelEn: "Tuesday" },
    { key: "wednesday", labelEs: "Miércoles", labelEn: "Wednesday" },
    { key: "thursday", labelEs: "Jueves", labelEn: "Thursday" },
    { key: "friday", labelEs: "Viernes", labelEn: "Friday" },
]

export function ScheduleContent({ language, activeStudent }: ScheduleContentProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const tabsRef = useRef<HTMLDivElement>(null)

    const isSpanish = language === "es"

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Timeline principal
            const tl = gsap.timeline()

            // Header animation
            tl.fromTo(headerRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })

            // Tabs animation
            tl.fromTo(
                tabsRef.current,
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
                "-=0.4",
            )

            // Schedule cards stagger animation
            tl.fromTo(
                ".schedule-card",
                { opacity: 0, y: 30, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out",
                },
                "-=0.2",
            )
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 pt-0" ref={containerRef}>
            {/* Header */}
            <div className="flex items-center justify-between" ref={headerRef}>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                        {isSpanish ? "Horario de Clases" : "Class Schedule"}
                    </h1>
                    <p className="text-muted-foreground">
                        {isSpanish
                            ? `Horario semanal de ${activeStudent.firstName} - ${activeStudent.grade}`
                            : `Weekly schedule for ${activeStudent.firstName} - ${activeStudent.gradeEn}`}
                    </p>
                </div>
                <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    {isSpanish ? "Exportar" : "Export"}
                </Button>
            </div>

            {/* Schedule Grid */}
            <div className="grid gap-4" ref={tabsRef}>
                {days.map((day) => (
                    <Card key={day.key} className="schedule-card">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">{isSpanish ? day.labelEs : day.labelEn}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {scheduleData[day.key as keyof typeof scheduleData].map((class_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                                    >
                                        <div className={`w-1 h-12 rounded-full ${class_.color}`} />

                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium text-sm">{class_.time}</span>
                                            </div>

                                            <div className="font-semibold">{class_.subject}</div>

                                            {class_.teacher && (
                                                <div className="flex items-center gap-2 text-muted-foreground">
                                                    <User className="h-4 w-4" />
                                                    <span className="text-sm">{class_.teacher}</span>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <MapPin className="h-4 w-4" />
                                                <span className="text-sm">{class_.room}</span>
                                            </div>
                                        </div>

                                        {class_.subject !== "Recreo" && (
                                            <Badge variant="secondary" className="hidden md:flex">
                                                {isSpanish ? "Activa" : "Active"}
                                            </Badge>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
