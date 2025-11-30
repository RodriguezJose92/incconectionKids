"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Award, Edit, Save } from "lucide-react"
import { useState } from "react"

export default function MiPerfilPage() {
  const [editando, setEditando] = useState(false)
  const [perfil, setPerfil] = useState({
    nombre: "Dr. María Rodríguez",
    cargo: "Profesora Titular",
    departamento: "Ingeniería de Sistemas",
    email: "maria.rodriguez@universidad.edu",
    telefono: "+57 300 123 4567",
    oficina: "Edificio A - Oficina 301",
    fechaIngreso: "15 de Marzo, 2018",
    especialidades: ["Inteligencia Artificial", "Machine Learning", "Bases de Datos"],
    biografia:
      "Doctora en Ciencias de la Computación con más de 10 años de experiencia en investigación y docencia. Especializada en inteligencia artificial y aprendizaje automático.",
    educacion: [
      { titulo: "Doctorado en Ciencias de la Computación", institucion: "Universidad Nacional", año: "2015" },
      { titulo: "Maestría en Ingeniería de Sistemas", institucion: "Universidad de los Andes", año: "2010" },
      { titulo: "Ingeniería de Sistemas", institucion: "Universidad Javeriana", año: "2008" },
    ],
    publicaciones: 25,
    proyectos: 8,
    estudiantes: 156,
  })

  const handleGuardar = () => {
    setEditando(false)
    // Aquí se guardarían los cambios
  }

  return (
    <div className="flex-1 space-y-6 p-6 absolute w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
          <p className="text-muted-foreground">Información personal y académica</p>
        </div>
        <Button
          onClick={() => (editando ? handleGuardar() : setEditando(true))}
          className={editando ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {editando ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-2" />
              Editar Perfil
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información Personal */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-2xl">DR</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{perfil.nombre}</CardTitle>
              <p className="text-muted-foreground">{perfil.cargo}</p>
              <p className="text-sm text-muted-foreground">{perfil.departamento}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{perfil.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{perfil.telefono}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{perfil.oficina}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Desde {perfil.fechaIngreso}</span>
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Estadísticas Académicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Publicaciones</span>
                <Badge variant="secondary">{perfil.publicaciones}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Proyectos</span>
                <Badge variant="secondary">{perfil.proyectos}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Estudiantes</span>
                <Badge variant="secondary">{perfil.estudiantes}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información Detallada */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información Básica */}
          <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Básica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre Completo</label>
                  {editando ? (
                    <Input value={perfil.nombre} onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{perfil.nombre}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cargo</label>
                  {editando ? (
                    <Input value={perfil.cargo} onChange={(e) => setPerfil({ ...perfil, cargo: e.target.value })} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{perfil.cargo}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  {editando ? (
                    <Input value={perfil.email} onChange={(e) => setPerfil({ ...perfil, email: e.target.value })} />
                  ) : (
                    <p className="text-sm text-muted-foreground">{perfil.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Teléfono</label>
                  {editando ? (
                    <Input
                      value={perfil.telefono}
                      onChange={(e) => setPerfil({ ...perfil, telefono: e.target.value })}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{perfil.telefono}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Biografía</label>
                {editando ? (
                  <Textarea
                    value={perfil.biografia}
                    onChange={(e) => setPerfil({ ...perfil, biografia: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{perfil.biografia}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Especialidades */}
          <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Especialidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {perfil.especialidades.map((especialidad, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 dark:bg-blue-950/20">
                    {especialidad}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Educación */}
          <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Formación Académica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {perfil.educacion.map((edu, index) => (
                <div key={index} className="border-l-2 border-blue-200 dark:border-blue-800 pl-4">
                  <h4 className="font-medium">{edu.titulo}</h4>
                  <p className="text-sm text-muted-foreground">{edu.institucion}</p>
                  <p className="text-xs text-muted-foreground">{edu.año}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
