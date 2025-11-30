"use client"

import {
  Calendar,
  Home,
  MessageSquare,
  BookOpen,
  Bell,
  User,
  LogOut,
  Users,
  GraduationCap,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CloseSession } from "@/components/function/RedirectHomeRoll/CloseSession"

const menuItems = [
  {
    title: "Panel Principal",
    url: "/usuario/profesor/",
    icon: Home,
  },
  {
    title: "Mis Cursos",
    url: "/usuario/profesor/cursos",
    icon: BookOpen,
  },
  {
    title: "Comunicación",
    url: "/usuario/profesor/comunicacion",
    icon: MessageSquare,
  },
  {
    title: "Calendario",
    url: "/usuario/profesor/calendario",
    icon: Calendar,
  },
  {
    title: "Grupos Escolares",
    url: "/usuario/profesor/grupos-escolares",
    icon: Users,
  },
  {
    title: "Director de Grupo",
    url: "/usuario/profesor/director-grupo",
    icon: GraduationCap,
  },
  {
    title: "Separar Aulas",
    url: "/usuario/profesor/separar-aulas",
    icon: Building2,
  },
  {
    title: "Notificaciones",
    url: "/usuario/profesor/notificaciones",
    icon: Bell,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            {/* <BookOpen className="h-5 w-5" /> */}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Portal Docente</h2>
            <p className="text-sm text-muted-foreground">Colegio Jaime Quijano</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">Dr. María Rodríguez</span>
                    <span className="text-xs text-muted-foreground">Profesora Titular</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/usuario/profesor/mi-perfil">
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => CloseSession()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
