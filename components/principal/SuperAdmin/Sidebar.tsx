"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Users,
  Calendar,
  HelpCircle,
  MessageSquare,
  School,
  Clock,
  Route,
  Brain,
  ShoppingCart,
  ChevronLeft,
  User,
  LogOut,
  Camera,
  Save,
  FileText,
  CreditCard,
  Book,
  BookCheck,
  CalendarCheck,
  Building,
} from "lucide-react";
import type { MenuItem } from "./types";
import { ManagmentStorage } from "@/components/Services/ManagmentStorage/ManagmentStorage";
import { goToPath } from "@/components/function/RedirectHomeRoll/GoToPath";
import { createClient } from "@/lib/supabase/client";

const menuItems: MenuItem[] = [
  { icon: Home, label: "Inicio", href: "/", id: "inicio" },
  { icon: Users, label: "Usuarios", href: "/usuarios", id: "usuarios" },
  { icon: Book, label: "Cursos", href: "/cursos", id: "cursos" },
  { icon: BookCheck, label: "Materias", href: "/materias", id: "materias" },
  {
    icon: CalendarCheck,
    label: "Periodo Académico",
    href: "/periodo-academico",
    id: "periodo-academico",
  },
  {
    icon: Building,
    label: "Ciclos",
    href: "/ciclos",
    id: "ciclos",
  },
  {
    icon: Calendar,
    label: "Gestión de eventos",
    href: "/eventos",
    id: "eventos",
  },
  {
    icon: HelpCircle,
    label: "Soporte y ayuda",
    href: "/soporte",
    id: "soporte",
  },
  {
    icon: MessageSquare,
    label: "Comunicación",
    href: "/comunicacion",
    id: "comunicacion",
  },
  { icon: School, label: "Aulas", href: "/aulas", id: "aulas" },
  { icon: Clock, label: "Horarios", href: "/horarios", id: "horarios" },
  { icon: Route, label: "Rutas", href: "/rutas", id: "rutas" },
  { icon: Brain, label: "Psicología", href: "/psicologia", id: "psicologia" },
  { icon: ShoppingCart, label: "Tienda", href: "/tienda", id: "tienda" },
  { icon: FileText, label: "Reportes", href: "/reportes", id: "reportes" },
  {
    icon: CreditCard,
    label: "Carnetización",
    href: "/carnetizacion",
    id: "carnetizacion",
  }, // Añadida nueva opción de carnetización
];

interface SidebarProps {
  isExpanded: boolean;
  isMobileMenuOpen: boolean;
  activeView: string;
  onMenuItemClick: (itemId: string) => void;
  onToggleExpanded: () => void;
  onCloseMobileMenu: () => void;
}

export function Sidebar({
  isExpanded,
  isMobileMenuOpen,
  activeView,
  onMenuItemClick,
  onToggleExpanded,
  onCloseMobileMenu,
}: SidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    nombre: "Juan Carlos",
    apellido: "Rodríguez",
    correo: "admin@colegio.edu.co",
    telefono: "+57 300 123 4567",
    rol: "Super Administrador",
    avatar: "",
  });

  // Cargar datos del usuario desde Supabase
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // Obtener el UUID del usuario desde localStorage
        const userId = ManagmentStorage.getItem<string>("id_User");

        if (!userId) {
          console.log("No se encontró id_User en el storage");
          return;
        }

        // Crear cliente de Supabase
        const supabase = createClient();

        // Consultar el perfil del usuario
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, email, avatar_url")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error al cargar el perfil:", error);
          return;
        }

        if (data) {
          // Extraer nombre y apellido del full_name
          const nameParts = data.full_name?.split(" ") || ["", ""];
          const nombre = nameParts[0] || "Usuario";
          const apellido = nameParts.slice(1).join(" ") || "";

          // Actualizar el estado con los datos del usuario
          setUserProfile((prev) => ({
            ...prev,
            nombre,
            apellido,
            correo: data.email || prev.correo,
            avatar: data.avatar_url || "",
          }));
        }
      } catch (error) {
        console.error("Error al cargar el perfil del usuario:", error);
      }
    };

    loadUserProfile();
  }, []);

  const handleProfileChange = (field: string, value: string) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Aquí iría la lógica para guardar el perfil
  };

  const handleLogout = () => {
    // Limpiar localStorage
    ManagmentStorage.clear();

    // Limpiar todas las cookies
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    });

    // Redirigir a la página de inicio
    goToPath("/");
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-[#ffffff33] border-r border-sidebar-border transition-all duration-300 flex flex-col h-full backdrop-blur-lg",
          isExpanded ? "w-64" : "w-16",
          "hidden lg:flex"
        )}
      >
        {/* Header del sidebar */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {isExpanded && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLpK3lgpIB-dL_wjjIpeVJuZc3VCRGPB30eA&s"
                  alt="logo Jaime Quijano"
                  className="size-[20px]"
                />
              </div>
              <span className="font-semibold text-sidebar-foreground">
                Jaime Quijano
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpanded}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronLeft
              className={cn(
                "w-4 h-4 transition-transform",
                !isExpanded && "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-2 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <div
                  onClick={() => onMenuItemClick(item.id)}
                  className={cn(
                    "w-full flex items-center justify-start rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                    activeView === item.id
                      ? "bg-blue-950 text-white border-0"
                      : "text-sidebar-foreground hover:bg-blue-950 hover:text-white hover:border-0"
                  )}
                  style={{
                    background: activeView === item.id ? "#172554" : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (activeView !== item.id) {
                      e.currentTarget.style.background = "#172554";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeView !== item.id) {
                      e.currentTarget.style.background = "";
                    }
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  {isExpanded && <span className="ml-3">{item.label}</span>}
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón de cerrar sesión */}
        <div className="p-2 border-t border-sidebar-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center text-red-600 hover:text-red-700 hover:bg-red-50",
              !isExpanded && "justify-center px-2"
            )}
          >
            <LogOut className="w-4 h-4" />
            {isExpanded && <span className="ml-3">Cerrar sesión</span>}
          </Button>
        </div>

        {/* Footer del sidebar */}
        {isExpanded && (
          <div className="p-4 border-t border-sidebar-border">
            <div
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center space-x-3 cursor-pointer hover:bg-sidebar-accent rounded-lg p-2 transition-colors"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {userProfile.nombre.charAt(0)}
                  {userProfile.apellido.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-sidebar-foreground truncate">
                  {userProfile.correo}
                </div>
                <div className="text-xs text-sidebar-foreground/60 truncate">
                  {userProfile.rol}
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 flex flex-col lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header del sidebar móvil */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <School className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">
              Colegio Admin
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCloseMobileMenu}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Navegación móvil */}
        <nav className="flex-1 p-2 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <div
                  onClick={() => {
                    onMenuItemClick(item.id);
                    onCloseMobileMenu();
                  }}
                  className={cn(
                    "w-full flex items-center justify-start rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer",
                    activeView === item.id
                      ? "bg-blue-950 text-white border-0"
                      : "text-sidebar-foreground hover:bg-blue-950 hover:text-white hover:border-0"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="ml-3">{item.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer del sidebar móvil */}
        <div className="p-4 border-t border-sidebar-border">
          <div
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center space-x-3 cursor-pointer hover:bg-sidebar-accent rounded-lg p-2 transition-colors"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {userProfile.nombre.charAt(0)}
                {userProfile.apellido.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-sidebar-foreground truncate">
                {userProfile.correo}
              </div>
              <div className="text-xs text-sidebar-foreground/60 truncate">
                {userProfile.rol}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Perfil de Usuario</span>
              </div>
              <div className="flex space-x-2">
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    Editar
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={handleSaveProfile}>
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                  </>
                )}
              </div>
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Edita tu información personal"
                : "Información de tu perfil"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="w-20 h-20">
                <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {userProfile.nombre.charAt(0)}
                  {userProfile.apellido.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <Camera className="w-4 h-4" />
                  <span>Cambiar foto</span>
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={userProfile.nombre}
                  onChange={(e) =>
                    handleProfileChange("nombre", e.target.value)
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  value={userProfile.apellido}
                  onChange={(e) =>
                    handleProfileChange("apellido", e.target.value)
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="correo">Correo electrónico</Label>
                <Input
                  id="correo"
                  type="email"
                  value={userProfile.correo}
                  onChange={(e) =>
                    handleProfileChange("correo", e.target.value)
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={userProfile.telefono}
                  onChange={(e) =>
                    handleProfileChange("telefono", e.target.value)
                  }
                  disabled={!isEditing}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rol">Rol</Label>
                <Input
                  id="rol"
                  value={userProfile.rol}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseMobileMenu}
        />
      )}
    </>
  );
}
