"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  GraduationCap,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"

// Datos de ejemplo de estudiantes
const estudiantes = [
  {
    id: 1,
    nombre: "Ana García Martínez",
    codigo: "2024001",
    edad: 16,
    telefono: "+57 300 123 4567",
    email: "ana.garcia@estudiante.edu.co",
    direccion: "Calle 45 #12-34, Bogotá",
    acudiente: "María Martínez",
    telefonoAcudiente: "+57 301 234 5678",
    promedio: 4.2,
    asistencia: 95,
    estado: "Activo",
    observaciones: "Estudiante destacada en matemáticas",
  },
  {
    id: 2,
    nombre: "Carlos Rodríguez López",
    codigo: "2024002",
    edad: 17,
    telefono: "+57 302 345 6789",
    email: "carlos.rodriguez@estudiante.edu.co",
    direccion: "Carrera 30 #25-67, Bogotá",
    acudiente: "Luis Rodríguez",
    telefonoAcudiente: "+57 303 456 7890",
    promedio: 3.8,
    asistencia: 88,
    estado: "Activo",
    observaciones: "Buen rendimiento en ciencias",
  },
  {
    id: 3,
    nombre: "Sofía Hernández Ruiz",
    codigo: "2024003",
    edad: 16,
    telefono: "+57 304 567 8901",
    email: "sofia.hernandez@estudiante.edu.co",
    direccion: "Avenida 68 #40-12, Bogotá",
    acudiente: "Carmen Ruiz",
    telefonoAcudiente: "+57 305 678 9012",
    promedio: 4.5,
    asistencia: 98,
    estado: "Activo",
    observaciones: "Excelente liderazgo y participación",
  },
  {
    id: 4,
    nombre: "Diego Morales Castro",
    codigo: "2024004",
    edad: 17,
    telefono: "+57 306 789 0123",
    email: "diego.morales@estudiante.edu.co",
    direccion: "Calle 80 #15-28, Bogotá",
    acudiente: "Ana Castro",
    telefonoAcudiente: "+57 307 890 1234",
    promedio: 3.5,
    asistencia: 82,
    estado: "En seguimiento",
    observaciones: "Requiere apoyo en lengua castellana",
  },
  {
    id: 5,
    nombre: "Valentina Torres Jiménez",
    codigo: "2024005",
    edad: 16,
    telefono: "+57 308 901 2345",
    email: "valentina.torres@estudiante.edu.co",
    direccion: "Carrera 50 #35-90, Bogotá",
    acudiente: "Pedro Jiménez",
    telefonoAcudiente: "+57 309 012 3456",
    promedio: 4.0,
    asistencia: 92,
    estado: "Activo",
    observaciones: "Destacada en actividades artísticas",
  },
  {
    id: 6,
    nombre: "Andrés Vargas Peña",
    codigo: "2024006",
    edad: 17,
    telefono: "+57 310 123 4567",
    email: "andres.vargas@estudiante.edu.co",
    direccion: "Calle 100 #20-45, Bogotá",
    acudiente: "Gloria Peña",
    telefonoAcudiente: "+57 311 234 5678",
    promedio: 3.9,
    asistencia: 90,
    estado: "Activo",
    observaciones: "Buen desempeño deportivo",
  },
]

export default function DirectorGrupoPage() {
  const [busqueda, setBusqueda] = useState("")
  const [filtroEstado, setFiltroEstado] = useState("Todos") // Agregado estado para filtro
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null)

  const estudiantesFiltrados = estudiantes.filter((estudiante) => {
    const coincideBusqueda =
      estudiante.nombre.toLowerCase().includes(busqueda.toLowerCase()) || estudiante.codigo.includes(busqueda)

    const coincideEstado = filtroEstado === "Todos" || estudiante.estado === filtroEstado

    return coincideBusqueda && coincideEstado
  })

  const getConteoEstado = (estado: string) => {
    if (estado === "Todos") return estudiantes.length
    return estudiantes.filter((e) => e.estado === estado).length
  }

  const getPromedioColor = (promedio: number) => {
    if (promedio >= 4.0) return "text-green-600 dark:text-green-400"
    if (promedio >= 3.5) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getPromedioIcon = (promedio: number) => {
    if (promedio >= 4.0) return <TrendingUp className="h-4 w-4" />
    if (promedio >= 3.5) return <Minus className="h-4 w-4" />
    return <TrendingDown className="h-4 w-4" />
  }

  const getEstadoBadge = (estado: string) => {
    const variants = {
      Activo: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "En seguimiento": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      "Atención especial": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      Inactivo: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    }
    //@ts-ignore
    return variants[estado] || variants["Activo"]
  }

  return (
    <div className="flex-1 space-y-6 p-6 absolute w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            Director de Grupo
          </h1>
          <p className="text-muted-foreground mt-2">Gestiona y supervisa a los estudiantes de tu grupo - Grado 11°A</p>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{estudiantes.length}</p>
                <p className="text-sm text-muted-foreground">Total Estudiantes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.0</p>
                <p className="text-sm text-muted-foreground">Promedio Grupo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">91%</p>
                <p className="text-sm text-muted-foreground">Asistencia</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <BookOpen className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">En Seguimiento</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de búsqueda */}
      <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar estudiante por nombre o código..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground self-center">Filtrar por estado:</span>
              {["Todos", "Activo", "En seguimiento", "Atención especial", "Inactivo"].map((estado) => (
                <Button
                  key={estado}
                  variant={filtroEstado === estado ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFiltroEstado(estado)}
                  className={`
                    ${filtroEstado === estado
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0"
                      : "bg-white/50 dark:bg-gray-800/50 border-white/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-gray-800/80"
                    }
                  `}
                >
                  {estado}
                  <Badge variant="secondary" className="ml-2 bg-white/20 text-current border-0">
                    {getConteoEstado(estado)}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de estudiantes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {estudiantesFiltrados.map((estudiante) => (
          <Card
            key={estudiante.id}
            className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`/placeholder.svg?height=48&width=48&text=${estudiante.nombre.split(" ")[0][0]}${estudiante.nombre.split(" ")[1][0]}`}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {estudiante.nombre.split(" ")[0][0]}
                      {estudiante.nombre.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{estudiante.nombre}</CardTitle>
                    <p className="text-sm text-muted-foreground">Código: {estudiante.codigo}</p>
                  </div>
                </div>
                <Badge className={`${getEstadoBadge(estudiante.estado)} border-0`}>{estudiante.estado}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Información académica */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded ${getPromedioColor(estudiante.promedio)}`}>
                    {getPromedioIcon(estudiante.promedio)}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Promedio</p>
                    <p className={`font-semibold ${getPromedioColor(estudiante.promedio)}`}>{estudiante.promedio}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Asistencia</p>
                    <p className="font-semibold">{estudiante.asistencia}%</p>
                  </div>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="space-y-2 pt-2 border-t border-white/20 dark:border-gray-700/30">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{estudiante.telefono}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{estudiante.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="truncate">{estudiante.direccion}</span>
                </div>
              </div>

              {/* Acudiente */}
              <div className="pt-2 border-t border-white/20 dark:border-gray-700/30">
                <p className="text-sm font-medium text-muted-foreground mb-1">Acudiente</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{estudiante.acudiente}</span>
                  <span className="text-sm text-muted-foreground">{estudiante.telefonoAcudiente}</span>
                </div>
              </div>

              {/* Observaciones */}
              {estudiante.observaciones && (
                <div className="pt-2 border-t border-white/20 dark:border-gray-700/30">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Observaciones</p>
                  <p className="text-sm bg-gray-50 dark:bg-gray-800/50 p-2 rounded-md">{estudiante.observaciones}</p>
                </div>
              )}

              {/* Botón de acción */}
              <Button
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                //@ts-ignore
                onClick={() => setEstudianteSeleccionado(estudiante)}
              >
                Ver Perfil Completo
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {estudiantesFiltrados.length === 0 && (
        <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
          <CardContent className="p-8 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron estudiantes</h3>
            <p className="text-muted-foreground">No hay estudiantes que coincidan con tu búsqueda.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
