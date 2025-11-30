"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Users, Split, Plus, Search, MapPin, Clock, Settings, Eye } from "lucide-react"

// Datos de ejemplo de aulas
const aulasDisponibles = [
  {
    id: 1,
    nombre: "Aula 101",
    capacidad: 40,
    ubicacion: "Edificio A - Piso 1",
    tipo: "Aula Estándar",
    equipamiento: ["Proyector", "Pizarra Digital", "Audio"],
    estado: "Disponible",
  },
  {
    id: 2,
    nombre: "Laboratorio 201",
    capacidad: 25,
    ubicacion: "Edificio B - Piso 2",
    tipo: "Laboratorio",
    equipamiento: ["Computadores", "Proyector", "Equipos de Lab"],
    estado: "Ocupada",
  },
  {
    id: 3,
    nombre: "Auditorio Principal",
    capacidad: 150,
    ubicacion: "Edificio C - Planta Baja",
    tipo: "Auditorio",
    equipamiento: ["Sistema de Audio", "Proyector", "Iluminación"],
    estado: "Disponible",
  },
  {
    id: 4,
    nombre: "Aula 305",
    capacidad: 35,
    ubicacion: "Edificio A - Piso 3",
    tipo: "Aula Estándar",
    equipamiento: ["Proyector", "Pizarra"],
    estado: "Mantenimiento",
  },
]

export default function SepararAulasPage() {
  const [busqueda, setBusqueda] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [modalSeparacion, setModalSeparacion] = useState(false)
  const [aulaSeleccionada, setAulaSeleccionada] = useState<any>(null)
  const [modalDetalles, setModalDetalles] = useState(false)

  // Filtrar aulas
  const aulasFiltradas = aulasDisponibles.filter((aula) => {
    const coincideBusqueda =
      aula.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      aula.ubicacion.toLowerCase().includes(busqueda.toLowerCase())
    const coincideTipo = filtroTipo === "todos" || aula.tipo === filtroTipo
    const coincideEstado = filtroEstado === "todos" || aula.estado === filtroEstado

    return coincideBusqueda && coincideTipo && coincideEstado
  })

  const abrirModalSeparacion = (aula: any) => {
    setAulaSeleccionada(aula)
    setModalSeparacion(true)
  }

  const abrirModalDetalles = (aula: any) => {
    setAulaSeleccionada(aula)
    setModalDetalles(true)
  }

  return (
    <div className="flex-1 space-y-6 p-6 absolute w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Separar Aulas</h1>
          <p className="text-muted-foreground">Gestiona la separación y asignación de espacios académicos</p>
        </div>
        <Button onClick={() => setModalSeparacion(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Separación
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Aulas</p>
                <p className="text-2xl font-bold">{aulasDisponibles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Disponibles</p>
                <p className="text-2xl font-bold">{aulasDisponibles.filter((a) => a.estado === "Disponible").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ocupadas</p>
                <p className="text-2xl font-bold">{aulasDisponibles.filter((a) => a.estado === "Ocupada").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <Settings className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mantenimiento</p>
                <p className="text-2xl font-bold">
                  {aulasDisponibles.filter((a) => a.estado === "Mantenimiento").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <Card className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o ubicación..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10 bg-white/50 dark:bg-gray-800/50"
                />
              </div>
            </div>
            <Select value={filtroTipo} onValueChange={setFiltroTipo}>
              <SelectTrigger className="w-full md:w-48 bg-white/50 dark:bg-gray-800/50">
                <SelectValue placeholder="Tipo de aula" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="Aula Estándar">Aula Estándar</SelectItem>
                <SelectItem value="Laboratorio">Laboratorio</SelectItem>
                <SelectItem value="Auditorio">Auditorio</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
              <SelectTrigger className="w-full md:w-48 bg-white/50 dark:bg-gray-800/50">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="Disponible">Disponible</SelectItem>
                <SelectItem value="Ocupada">Ocupada</SelectItem>
                <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de aulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aulasFiltradas.map((aula) => (
          <Card
            key={aula.id}
            className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30 hover:bg-white/70 dark:hover:bg-gray-900/70 transition-all duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  {aula.nombre}
                </CardTitle>
                <Badge
                  variant={
                    aula.estado === "Disponible" ? "default" : aula.estado === "Ocupada" ? "secondary" : "destructive"
                  }
                  className={
                    aula.estado === "Disponible"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : aula.estado === "Ocupada"
                        ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }
                >
                  {aula.estado}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {aula.ubicacion}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Capacidad</p>
                  <p className="font-medium flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {aula.capacidad} personas
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tipo</p>
                  <p className="font-medium">{aula.tipo}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Equipamiento</p>
                <div className="flex flex-wrap gap-1">
                  {aula.equipamiento.map((equipo, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {equipo}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => abrirModalDetalles(aula)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => abrirModalSeparacion(aula)}
                  disabled={aula.estado !== "Disponible"}
                >
                  <Split className="h-4 w-4 mr-1" />
                  Separar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal para separar aula */}
      <Dialog open={modalSeparacion} onOpenChange={setModalSeparacion}>
        <DialogContent className="max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 dark:border-gray-700/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Split className="h-5 w-5 text-blue-500" />
              Separar Aula - {aulaSeleccionada?.nombre}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha de Separación</label>
                <Input type="date" className="bg-white/50 dark:bg-gray-800/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Hora de Inicio</label>
                <Input type="time" className="bg-white/50 dark:bg-gray-800/50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Hora de Fin</label>
                <Input type="time" className="bg-white/50 dark:bg-gray-800/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Materia/Curso</label>
                <Select>
                  <SelectTrigger className="bg-white/50 dark:bg-gray-800/50">
                    <SelectValue placeholder="Seleccionar materia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matematicas">Matemáticas Avanzadas</SelectItem>
                    <SelectItem value="fisica">Física Cuántica</SelectItem>
                    <SelectItem value="quimica">Química Orgánica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Propósito de la Separación</label>
              <Textarea
                placeholder="Describe el motivo y actividades a realizar..."
                className="bg-white/50 dark:bg-gray-800/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Número de Estudiantes Esperados</label>
              <Input type="number" placeholder="ej: 25" className="bg-white/50 dark:bg-gray-800/50" />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setModalSeparacion(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setModalSeparacion(false)}>Confirmar Separación</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para ver detalles */}
      <Dialog open={modalDetalles} onOpenChange={setModalDetalles}>
        <DialogContent className="max-w-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 dark:border-gray-700/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-500" />
              Detalles del Aula - {aulaSeleccionada?.nombre}
            </DialogTitle>
          </DialogHeader>

          {aulaSeleccionada && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  <p className="font-medium">{aulaSeleccionada.ubicacion}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capacidad</p>
                  <p className="font-medium">{aulaSeleccionada.capacidad} personas</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Tipo de Aula</p>
                <p className="font-medium">{aulaSeleccionada.tipo}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Estado Actual</p>
                <Badge
                  variant={
                    aulaSeleccionada.estado === "Disponible"
                      ? "default"
                      : aulaSeleccionada.estado === "Ocupada"
                        ? "secondary"
                        : "destructive"
                  }
                  className={
                    aulaSeleccionada.estado === "Disponible"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : aulaSeleccionada.estado === "Ocupada"
                        ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  }
                >
                  {aulaSeleccionada.estado}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Equipamiento Disponible</p>
                <div className="flex flex-wrap gap-2">
                  {aulaSeleccionada.equipamiento.map((equipo: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {equipo}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setModalDetalles(false)}>
                  Cerrar
                </Button>
                {aulaSeleccionada.estado === "Disponible" && (
                  <Button
                    onClick={() => {
                      setModalDetalles(false)
                      abrirModalSeparacion(aulaSeleccionada)
                    }}
                  >
                    Separar Aula
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
