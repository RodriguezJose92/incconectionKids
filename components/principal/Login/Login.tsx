"use client";

import "./index.css";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { toast } from "sonner";
import { ManagmentStorage } from "@/components/Services/ManagmentStorage/ManagmentStorage";
import { createClient } from "@/lib/supabase/client";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { UserInfoStore } from "@/Stores/UserInfoStore";

export default function Login() {
  const supabase = createClient();
  const cardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  /** Función para obtener roles del usuario y redirigir según el rol */
  const getRolesAndRedirect = async (userId: string) => {
    try {
      // Obtener los roles del usuario desde la base de datos
      const { data: profileRoles, error: profileError } = await supabase
        .from("profiles_roles")
        .select("role_id")
        .eq("user_id", userId);

      if (profileError) {
        console.error("Error al obtener roles:", profileError);
        toast.error("Acceso denegado", {
          description: "No se pudo verificar los permisos de tu cuenta. Por favor, contacta con el administrador.",
          duration: 5000,
        });
        await supabase.auth.signOut();
        return;
      }

      // Si no tiene roles asignados
      if (!profileRoles || profileRoles.length === 0) {
        console.error("Error al obtener roles , no tiene asignado");
        toast.error("Acceso denegado", {
          description: "Tu cuenta no tiene roles asignados. Por favor, contacta con el administrador para obtener los permisos necesarios.",
          duration: 6000,
        });
        await supabase.auth.signOut();
        return;
      }

      // Obtener información detallada de los roles
      const roleIds = profileRoles.map((pr) => pr.role_id);
      const { data: roles, error: rolesError } = await supabase
        .from("roles")
        .select("name")
        .in("id", roleIds);

      if (rolesError) {
        console.error("Error al obtener nombres de roles:", rolesError);
        toast.error("Acceso denegado", {
          description: "No se pudo cargar la información de tus permisos. Por favor, intenta nuevamente más tarde.",
          duration: 5000,
        });
        await supabase.auth.signOut();
        return;
      }

      // Guardar roles en el store
      const roleNames = roles.map((role) => role.name);
      UserInfoStore.getState().setRoles(roleNames);

      // Redirigir según el rol disponible en la tabla
      if (roleNames.includes("super-admin")) {
        router.push("/usuario/super-admin");
      } else if (roleNames.includes("tienda")) {
        router.push("/usuario/tienda");
      } else if (roleNames.includes("padre-familia")) {
        router.push("/usuario/padre-familia");
      } else if (roleNames.includes("psicologia")) {
        router.push("/usuario/psicologia");
      } else if (roleNames.includes("profesor")) {
        router.push("/usuario/profesor");
      } else if (roleNames.includes("estudiante")) {
        router.push("/usuario/estudiante");
      } else if (roleNames.includes("ruta")) {
        router.push("/usuario/ruta");
      } else {
        router.push("/"); // Ruta por defecto
      }
    } catch (error) {
      console.error("Error en getRolesAndRedirect:", error);
      toast.error("Error al iniciar sesión", {
        description: "Ocurrió un problema al procesar tu información. Por favor, intenta nuevamente.",
        duration: 5000,
      });
      await supabase.auth.signOut();
      router.push("/");
    }
  };

  /** Si tuviesemos que verificar label inputs con correo y contraseña */
  const verifyUsersLogin = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    const emailInput =
      (document.getElementById("email") as HTMLInputElement)?.value ?? "";
    const passwordInput =
      (document.getElementById("password") as HTMLInputElement)?.value ?? "";

    const email = emailInput.trim().toLowerCase();
    const password = passwordInput.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Ingresa un correo válido");
      setLoading(false);
      return;
    }
    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Error en las credenciales o usuario no encontrado");
        console.error(error);
        setLoading(false);
        return;
      }

      if (data?.user) {
        // Guardar en ManagementStorage (legacy)
        ManagmentStorage.setItem("id_User", data.user.id);
        ManagmentStorage.setItem("email", data.user.email);

        // Guardar usuario en UserInfoStore
        UserInfoStore.getState().setUser(data.user);

        // Obtener roles del usuario y redirigir
        await getRolesAndRedirect(data.user.id);
      }
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  /** Si queremos autenticar al usuario con Google */
  const signInAuth = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/autorizacion`,
          scopes: "https://www.googleapis.com/auth/calendar.events",
          queryParams: {
            // Fuerza el selector SIEMPRE
            prompt: "consent select_account",

            // para refresh_token
            access_type: "offline",

            // (Opcional) restringe/sugiere tu dominio educativo:
            hd: "colegiojaimequijano.edu.co",
          },
        },
      });
      if (error) throw error;
    } catch (err) {
      setLoading(false);
      console.error(err);
      // aquí podrías mostrar un toast/alert
    }
  };

  /** Que se ejecuta en el montaje del componente  */
  useEffect(() => {
    /** Efecto visual animación entrada  */
    if (cardRef.current) {
      // Desde opacity 0 y x = -50px
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 2.5,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <section
      aria-label="Acceso a la plataforma educativa Incconection Kids"
      className={cn(
        "w-full px-4 py-6 mx-auto",
        "sm:max-w-md",
        "motion-safe:animate-[fadeIn_0.5s_ease-out]"
      )}
      ref={cardRef}
    >
      <Card className="border-0 shadow-lg backdrop-blur-sm colorCardLogin">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <img
              src="/logos/logoIncconectionKids.png"
              alt="Logo de la institución"
              className="logoIncconection w-24 h-auto" // ajusta tamaño del logo
            />
            <span className="sr-only">{"Logo de la institución"}</span>
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-white text-shadow-2xs">
              {"Accede a tu cuenta"}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-white text-shadow-2xs">
              {"Bienvenido a tu plataforma educativa"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" aria-describedby="form-ayuda" onSubmit={verifyUsersLogin}>
            {/* Campos de correo y contraseña */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                className="bg-white/90 border-white/20 focus:border-white focus:ring-white/20"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-white text-sm font-medium"
              >
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-white/90 border-white/20 focus:border-white focus:ring-white/20 pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors focus:outline-none disabled:opacity-50"
                  disabled={loading}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Botón de iniciar sesión con correo y contraseña */}
            <Button
              type="submit"
              aria-label="Iniciar sesión con correo y contraseña"
              className={cn(
                "w-full py-3",
                "bg-primary text-white",
                "border border-primary shadow-sm",
                "rounded-md",
                "hover:bg-primary/90 hover:shadow-md",
                "active:scale-[0.99]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                "transition-all duration-200 ease-out cursor-pointer"
              )}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span className="ml-2">Iniciando sesión…</span>
                </span>
              ) : (
                "Iniciar sesión"
              )}
            </Button>

            {/* Separador */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-white">
                  O continúa con
                </span>
              </div>
            </div>

            {/* Botón de Google */}
            <Button
              type="button"
              aria-label="Ingresar con tu cuenta educativa Google"
              className={cn(
                "w-full py-3",
                "bg-white text-[#3c4043]",
                "border border-[#dadce0] shadow-sm",
                "rounded-md",
                "hover:bg-neutral-50 hover:shadow-md",
                "active:scale-[0.99]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20",
                "transition-all duration-200 ease-out cursor-pointer"
              )}
              onClick={signInAuth}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 text-[#3c4043]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span className="ml-2">Conectando con Google…</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <FcGoogle className="h-5 w-5" />
                  Iniciar con cuenta de la institución
                </span>
              )}
            </Button>
          </form>

          {/* <p id="form-ayuda" className="mt-6 text-center text-sm text-white">
            <Link
              href="/recuperar-contraseña"
              className="transition-colors hover:text-white"
            >
              {"No he podido ingresar"}
            </Link>
          </p> */}
        </CardContent>
      </Card>
    </section>
  );
}
//
