"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CloseSession } from "@/components/function/RedirectHomeRoll/CloseSession";
import { ManagmentStorage } from "@/components/Services/ManagmentStorage/ManagmentStorage";
import { createClient } from "@/lib/supabase/client";

const menuItems = [
  {
    title: "Panel Principal",
    url: "/usuario/profesor/",
    icon: Home,
  },
  {
    title: "Mis Clases",
    url: "/usuario/profesor/clases",
    icon: BookOpen,
  },
  {
    title: "Eventos",
    url: "/usuario/profesor/eventos",
    icon: MessageSquare,
  },
  {
    title: "Horario",
    url: "/usuario/profesor/horario",
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
];

export function AppSidebar() {
  const pathname = usePathname();
  const [userData, setUserData] = useState<{
    full_name: string;
    email: string;
    avatar: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id_User = ManagmentStorage.getItem("id_User");
        if (!id_User) {
          console.warn("No se encontró id_User en el almacenamiento local");
          return;
        }

        const supabase = await createClient();
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id_User)
          .single();

        if (error) {
          console.error("Error al obtener datos del usuario:", error);
          return;
        }

        setUserData(data);
      } catch (err) {
        console.error("Error general al recuperar datos del usuario:", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            {/* <BookOpen className="h-5 w-5" /> */}
          </div>
          <div>
            <h2 className="text-lg font-semibold">Portal Docente</h2>
            <p className="text-sm text-muted-foreground">
              Colegio Jaime Quijano
            </p>
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
                    <AvatarImage
                      src={
                        userData?.avatar ||
                        "/placeholder.svg?height=32&width=32"
                      }
                    />
                    <AvatarFallback>
                      {userData?.full_name
                        ? userData.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        : "DR"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">
                      {userData?.full_name || "Cargando..."}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {userData?.email || ""}
                    </span>
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
  );
}
