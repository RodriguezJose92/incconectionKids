"use client"

import {
    LayoutDashboard,
    GraduationCap,
    BookOpen,
    Calendar,
    Bell,
    User,
    FileText,
    CreditCard,
    Clock,
    Moon,
    Sun,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { AnimatedNavigation } from "./animated-navigation"

interface Student {
    id: string
    firstName: string
    lastName: string
    grade: string
    gradeEn: string
    section: string
    photo?: string
    status: "active" | "inactive"
    notifications: number
}

interface AppSidebarProps {
    onThemeToggle: () => void
    onLanguageChange: (language: string) => void
    currentLanguage: string
    activeSection: string
    onNavigationChange: (section: string) => void
    activeStudent: Student
}

export function AppSidebar({
    onThemeToggle,
    onLanguageChange,
    currentLanguage,
    activeSection,
    onNavigationChange,
    activeStudent,
}: AppSidebarProps) {
    const isSpanish = currentLanguage === "es"

    const navigationItems = [
        {
            id: "dashboard",
            icon: <LayoutDashboard className="h-5 w-5" />,
            titleEs: "Resumen General",
            titleEn: "General Overview",
        },
        {
            id: "grades",
            icon: <GraduationCap className="h-5 w-5" />,
            titleEs: "Calificaciones",
            titleEn: "Grades",
        },
        {
            id: "homework",
            icon: <BookOpen className="h-5 w-5" />,
            titleEs: "Tareas",
            titleEn: "Homework",
        },
        {
            id: "schedule",
            icon: <Clock className="h-5 w-5" />,
            titleEs: "Horarios",
            titleEn: "Schedule",
        },
        {
            id: "calendar",
            icon: <Calendar className="h-5 w-5" />,
            titleEs: "Calendario",
            titleEn: "Calendar",
        },
        {
            id: "payments",
            icon: <CreditCard className="h-5 w-5" />,
            titleEs: "Pagos",
            titleEn: "Payments",
        },
        {
            id: "notifications",
            icon: <Bell className="h-5 w-5" />,
            titleEs: "Notificaciones",
            titleEn: "Notifications",
        },
        {
            id: "profile",
            icon: <User className="h-5 w-5" />,
            titleEs: "Perfil",
            titleEn: "Profile",
        },
    ]

    return (
        <Sidebar className="border-r">
            <SidebarHeader className="border-b px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
                            <BookOpen className="h-4 w-4" />
                        </div>
                        <span className="text-lg font-bold">SHIFT LMS</span>
                    </div>
                    <SidebarTrigger className="md:hidden" />
                </div>

                {/* Información del estudiante activo en el sidebar */}
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={activeStudent.photo || "/placeholder.svg"}
                                alt={`${activeStudent.firstName} ${activeStudent.lastName}`}
                            />
                            <AvatarFallback className="text-xs">
                                {activeStudent.firstName[0]}
                                {activeStudent.lastName[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                                {activeStudent.firstName} {activeStudent.lastName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {isSpanish ? activeStudent.grade : activeStudent.gradeEn} - {activeStudent.section}
                            </p>
                        </div>
                        {activeStudent.notifications > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                                <span className="text-xs">{activeStudent.notifications}</span>
                            </Badge>
                        )}
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2">
                <div className="space-y-1 py-2">
                    <h2 className="px-4 text-xs font-semibold text-muted-foreground">
                        {isSpanish ? "Navegación" : "Navigation"}
                    </h2>
                    <SidebarMenu>
                        {/* Elementos de navegación estándar */}

                        {navigationItems.map((item, index) => (
                            /**@ts-ignore */
                            <AnimatedNavigation key={item.id} isVisible={true} delay={index * 0.05} direction="left">
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        isActive={activeSection === item.id}
                                        onClick={() => onNavigationChange(item.id)}
                                        className="w-full justify-start"
                                    >
                                        {item.icon}
                                        <span>{isSpanish ? item.titleEs : item.titleEn}</span>
                                        {/* Mostrar notificaciones específicas por sección si las hay */}
                                        {item.id === "notifications" && activeStudent.notifications > 0 && (
                                            <Badge
                                                variant="destructive"
                                                className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center"
                                            >
                                                <span className="text-xs">{activeStudent.notifications}</span>
                                            </Badge>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </AnimatedNavigation>
                        ))}

                        {/* Elemento de Procesos simple */}

                        {/*@ts-ignore*/}
                        <AnimatedNavigation isVisible={true} delay={navigationItems.length * 0.05} direction="left">
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    isActive={activeSection === "documents"}
                                    onClick={() => onNavigationChange("documents")}
                                    className="w-full justify-start"
                                >
                                    <FileText className="h-5 w-5" />
                                    <span>{isSpanish ? "Procesos" : "Processes"}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </AnimatedNavigation>
                    </SidebarMenu>
                </div>
            </SidebarContent>

            <SidebarFooter className="border-t p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4" />
                        </div>
                        <div className="text-sm">
                            <p className="font-medium">María González</p>
                            <p className="text-xs text-muted-foreground">{isSpanish ? "Madre de familia" : "Parent"}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <span className="font-bold">{currentLanguage.toUpperCase()}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onLanguageChange("es")}>Español</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onLanguageChange("en")}>English</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* Botón de tema siempre visible en el sidebar */}
                        <Button variant="ghost" size="icon" onClick={onThemeToggle} className="h-8 w-8">
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">{isSpanish ? "Cambiar tema" : "Toggle theme"}</span>
                        </Button>
                    </div>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
