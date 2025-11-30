"use client"

import './index.css'
import * as React from "react"
import { AnimatedNavigation } from "@/components/principal/PadreFamilia/animated-navigation"
import { DashboardContent } from "@/components/principal/PadreFamilia/dashboard-content"
import { GradesContent } from "@/components/principal/PadreFamilia/grades-content"
import { ScheduleContent } from "@/components/principal/PadreFamilia/shedule-content"
import { CalendarContent } from "@/components/principal/PadreFamilia/calendar-content"
import { NotificationsContent } from "@/components/principal/PadreFamilia/notifications-content"
import { ProfileContent } from "@/components/principal/PadreFamilia/profile-content"
import { DocumentsContent } from "@/components/principal/PadreFamilia/documents-content"
import { HomeworkContent } from "@/components/principal/PadreFamilia/homework-content"
import { PaymentsContent } from "@/components/principal/PadreFamilia/payments-content"
import { StudentSelector, type Student } from "@/components/principal/PadreFamilia/student-selector"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

// Datos de ejemplo de estudiantes
const studentsData: Student[] = [
    {
        id: "S001",
        firstName: "Sofía",
        lastName: "González",
        grade: "5° Grado",
        gradeEn: "5th Grade",
        section: "A",
        photo: "/placeholder.svg?height=40&width=40&text=SG",
        status: "active",
        notifications: 3,
    },
    {
        id: "S002",
        firstName: "Diego",
        lastName: "González",
        grade: "3° Grado",
        gradeEn: "3rd Grade",
        section: "B",
        photo: "/placeholder.svg?height=40&width=40&text=DG",
        status: "active",
        notifications: 1,
    },
    {
        id: "S003",
        firstName: "Isabella",
        lastName: "González",
        grade: "1° Grado",
        gradeEn: "1st Grade",
        section: "C",
        photo: "/placeholder.svg?height=40&width=40&text=IG",
        status: "active" as const,
        notifications: 0,
    },
]

export default function PadreFamilia() {
    const [theme, setTheme] = React.useState<"light" | "dark">("light")
    const [language, setLanguage] = React.useState("es")
    const [activeSection, setActiveSection] = React.useState("dashboard")
    const [activeStudent, setActiveStudent] = React.useState<Student>(studentsData[0])
    const [sidebarOpen, setSidebarOpen] = React.useState(true)

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark"
        setTheme(newTheme)
        document.documentElement.classList.toggle("dark", newTheme === "dark")
    }

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang)
    }

    const handleNavigationChange = (section: string) => {
        setActiveSection(section)
    }

    const handleStudentChange = (student: (typeof studentsData)[0]) => {
        setActiveStudent(student)
        console.log(`Cambiando a estudiante: ${student.firstName} ${student.lastName}`)
    }

    // Aplicar tema inicial
    React.useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
    }, [])

    // Escuchar eventos de navegación desde otros componentes
    React.useEffect(() => {
        const handleNavigationEvent = (event: CustomEvent) => {
            setActiveSection(event.detail)
        }

        window.addEventListener("navigate-to-section", handleNavigationEvent as EventListener)

        return () => {
            window.removeEventListener("navigate-to-section", handleNavigationEvent as EventListener)
        }
    }, [])

    const isSpanish = language === "es"

    const renderContent = () => {
        const commonProps = {
            language,
            activeStudent,
        }

        switch (activeSection) {
            case "grades":
                return <GradesContent currentLanguage={language} activeStudent={activeStudent} />
            case "homework":
                return <HomeworkContent {...commonProps} />
            case "schedule":
                return <ScheduleContent {...commonProps} />
            case "calendar":
                return <CalendarContent {...commonProps} />
            case "payments":
                return <PaymentsContent {...commonProps} />
            case "notifications":
                return <NotificationsContent {...commonProps} />
            case "profile":
                return <ProfileContent {...commonProps} />
            case "documents":
                return <DocumentsContent {...commonProps} />
            default:
                return <DashboardContent {...commonProps} />
        }
    }

    return (
        <div className={theme}>
            <div className="flex min-h-screen bg-[#ffffff00] backdrop-blur-lg h-full custom-scrollbar">
                {/* Sidebar */}
                <div className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300  bg-[#ffffff00] overflow-hidden`}>
                    <div className="w-64">
                        <div className="p-4 ">
                            <h1 className="text-xl font-bold">Colegio Jaime Quijano Caballero</h1>
                            <p className="text-sm text-muted-foreground">
                                {isSpanish ? "Perfil acudiente" : "Parent Profile"}
                            </p>
                        </div>

                        <AnimatedNavigation
                            activeSection={activeSection}
                            onNavigationChange={handleNavigationChange}
                            language={language}
                        />

                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <header className="bg--[#ffffff00] p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button variant="outline" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </Button>
                                <h2 className="text-2xl font-semibold">
                                    {activeSection === "dashboard" && (isSpanish ? "Panel Principal" : "Dashboard")}
                                    {activeSection === "grades" && (isSpanish ? "Calificaciones" : "Grades")}
                                    {activeSection === "homework" && (isSpanish ? "Tareas" : "Homework")}
                                    {activeSection === "schedule" && (isSpanish ? "Horarios" : "Schedule")}
                                    {activeSection === "calendar" && (isSpanish ? "Calendario" : "Calendar")}
                                    {activeSection === "payments" && (isSpanish ? "Pagos" : "Payments")}
                                    {activeSection === "notifications" && (isSpanish ? "Notificaciones" : "Notifications")}
                                    {activeSection === "profile" && (isSpanish ? "Perfil" : "Profile")}
                                    {activeSection === "documents" && (isSpanish ? "Documentos" : "Documents")}
                                </h2>
                            </div>

                            <div className="flex items-center gap-4">
                                <StudentSelector
                                    students={studentsData}
                                    activeStudent={activeStudent}
                                    onStudentChange={handleStudentChange}
                                    language={language}
                                />

                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <main className="flex-1 overflow-auto">{renderContent()}</main>
                </div>
            </div>
        </div>
    )
}
