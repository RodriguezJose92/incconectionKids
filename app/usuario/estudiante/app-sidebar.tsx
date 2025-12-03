"use client"

import type * as React from "react"
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  User,
  BarChart3,
  ClipboardList,
  Library,
  CreditCard,
  Users,
  Award as IdCard,
  Bell,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data = {
  user: {
    name: "María González",
    email: "maria.gonzalez@universidad.edu",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  navMain: [
    {
      title: "Panel Principal",
      url: "/",
      icon: Home,
    },
    {
      title: "Mis Cursos",
      url: "/cursos",
      icon: BookOpen,
    },
    {
      title: "Calendario",
      url: "/calendario",
      icon: Calendar,
    },
    {
      title: "Pensum Académico",
      url: "/pensum",
      icon: BookOpen,
    },
    {
      title: "Inscripción Materias",
      url: "/inscripcion",
      icon: ClipboardList,
    },
    {
      title: "Registro Notas",
      url: "/registro-notas",
      icon: BarChart3,
    },
    {
      title: "Comunicaciones",
      url: "/comunicaciones",
      icon: MessageSquare,
    },
    {
      title: "Notificaciones",
      url: "/notificaciones",
      icon: Bell,
    },
    {
      title: "Biblioteca",
      url: "/biblioteca",
      icon: Library,
    },
    {
      title: "Grupos de Interés",
      url: "/grupos-interes",
      icon: Users,
    },
    {
      title: "Carnet Universitario",
      url: "/carnet",
      icon: IdCard,
    },
    {
      title: "Gestión de Pagos",
      url: "/pagos",
      icon: CreditCard,
    },
  ],
  navSecondary: [
    {
      title: "Perfil",
      url: "/perfil",
      icon: User,
    },
    {
      title: "Configuración",
      url: "/configuracion",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <GraduationCap className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Campus Virtual</span>
                  <span className="truncate text-xs">Universidad</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="sm">
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={data.user.avatar || "/placeholder.svg"} alt={data.user.name} />
                  <AvatarFallback className="rounded-lg">MG</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{data.user.name}</span>
                  <span className="truncate text-xs">{data.user.email}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
