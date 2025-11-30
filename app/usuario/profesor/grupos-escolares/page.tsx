"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, GraduationCap, Crown, Calendar, MapPin, BookOpen, Target, Settings } from "lucide-react"

// Datos de ejemplo para los grupos escolares
const gruposQueImparte = [
  {
    id: 1,
    nombre: "Matemáticas Avanzadas",
    codigo: "MAT-401",
    estudiantes: 28,
    semestre: "2024-1",
    aula: "Aula 205",
    horario: "Lun-Mie-Vie 10:00-11:30",
  },
  {
    id: 2,
    nombre: "Cálculo Diferencial",
    codigo: "MAT-201",
    estudiantes: 35,
    semestre: "2024-1",
    aula: "Aula 301",
    horario: "Mar-Jue 14:00-15:30",
  },
  {
    id: 3,
    nombre: "Estadística Aplicada",
    codigo: "EST-301",
    estudiantes: 22,
    semestre: "2024-1",
    aula: "Lab 102",
    horario: "Vie 16:00-18:00",
  },
]

const gruposQueDirige = [
  {
    id: 1,
    nombre: "Grupo de Investigación en Matemáticas",
    codigo: "GIM-2024",
    miembros: 8,
    tipo: "Investigación",
    proyecto: "Análisis de Algoritmos Cuánticos",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Semillero de Matemáticas Aplicadas",
    codigo: "SMA-2024",
    miembros: 12,
    tipo: "Semillero",
    proyecto: "Modelado Matemático en Ingeniería",
    estado: "Activo",
  },
]

export default function GruposEscolaresPage() {
  const [modalAbierto, setModalAbierto] = useState(false)
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<any>(null)
  const [tipoGrupo, setTipoGrupo] = useState<"imparte" | "dirige">("imparte")

  const abrirModal = (grupo: any, tipo: "imparte" | "dirige") => {
    setGrupoSeleccionado(grupo)
    setTipoGrupo(tipo)
    setModalAbierto(true)
  }

  return (
    <div className="flex-1 space-y-6 p-6 absolute w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Grupos Escolares</h1>
          <p className="text-muted-foreground">Gestiona los grupos académicos en los que participas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna 1: Grupos que imparte */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-lg border border-white/20 dark:border-gray-700/30 shadow-lg">
            <div className="p-2 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full">
              <GraduationCap className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Grupos que Imparto</h2>
            <Badge className="bg-gray-200/80 hover:bg-gray-300/80 text-gray-800 dark:bg-gray-700/80 dark:text-gray-200 backdrop-blur-sm">
              {gruposQueImparte.length}
            </Badge>
          </div>

          <div className="space-y-4">
            {gruposQueImparte.map((grupo) => (
              <Card
                key={grupo.id}
                className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 overflow-hidden"
              >
                <CardHeader className="pb-3 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gray-200/10 dark:bg-gray-700/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="flex items-start justify-between relative z-10">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {grupo.nombre}
                      </CardTitle>
                      <CardDescription className="font-mono text-sm bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-sm px-2 py-1 rounded-md inline-block">
                        {grupo.codigo}
                      </CardDescription>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-gray-300/60 text-gray-700 dark:border-gray-600/60 dark:text-gray-300 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm"
                    >
                      {grupo.semestre}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-2 bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg">
                      <div className="p-1 bg-gray-200/80 dark:bg-gray-700/80 rounded-full">
                        <Users className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Estudiantes</p>
                        <p className="font-semibold text-gray-700 dark:text-gray-300">{grupo.estudiantes}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg">
                      <div className="p-1 bg-gray-200/80 dark:bg-gray-700/80 rounded-full">
                        <MapPin className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Aula</p>
                        <p className="font-semibold text-gray-700 dark:text-gray-300">{grupo.aula}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-200/30 dark:border-gray-700/30">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{grupo.horario}</span>
                  </div>
                  <Button
                    onClick={() => abrirModal(grupo, "imparte")}
                    className="w-full bg-gray-200/80 hover:bg-gray-300/80 text-gray-800 dark:bg-gray-700/80 dark:hover:bg-gray-600/80 dark:text-gray-200 backdrop-blur-sm border border-gray-300/30 dark:border-gray-600/30"
                    variant="outline"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Gestionar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Columna 2: Grupos que dirige */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-lg border border-white/20 dark:border-gray-700/30 shadow-lg">
            <div className="p-2 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full">
              <Crown className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Grupos que Dirijo</h2>
            <Badge className="bg-gray-200/80 hover:bg-gray-300/80 text-gray-800 dark:bg-gray-700/80 dark:text-gray-200 backdrop-blur-sm">
              {gruposQueDirige.length}
            </Badge>
          </div>

          <div className="space-y-4">
            {gruposQueDirige.map((grupo) => (
              <Card
                key={grupo.id}
                className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/20 dark:border-gray-700/30 overflow-hidden"
              >
                <CardHeader className="pb-3 relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gray-200/10 dark:bg-gray-700/10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="flex items-start justify-between relative z-10">
                    <div className="space-y-1">
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                        {grupo.nombre}
                      </CardTitle>
                      <CardDescription className="font-mono text-sm bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-sm px-2 py-1 rounded-md inline-block">
                        {grupo.codigo}
                      </CardDescription>
                    </div>
                    <Badge
                      className={
                        grupo.estado === "Activo"
                          ? "bg-green-200/80 hover:bg-green-300/80 text-green-800 dark:bg-green-800/60 dark:text-green-200 backdrop-blur-sm shadow-lg"
                          : "bg-gray-200/80 hover:bg-gray-300/80 text-gray-800 dark:bg-gray-700/80 dark:text-gray-200 backdrop-blur-sm"
                      }
                    >
                      {grupo.estado}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 p-2 bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg">
                      <div className="p-1 bg-gray-200/80 dark:bg-gray-700/80 rounded-full">
                        <Users className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Miembros</p>
                        <p className="font-semibold text-gray-700 dark:text-gray-300">{grupo.miembros}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-gray-50/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg">
                      <div className="p-1 bg-gray-200/80 dark:bg-gray-700/80 rounded-full">
                        <BookOpen className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Tipo</p>
                        <p className="font-semibold text-gray-700 dark:text-gray-300">{grupo.tipo}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-lg border border-gray-200/30 dark:border-gray-700/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">Proyecto Actual</p>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{grupo.proyecto}</p>
                  </div>
                  <Button
                    onClick={() => abrirModal(grupo, "dirige")}
                    className="w-full bg-gray-200/80 hover:bg-gray-300/80 text-gray-800 dark:bg-gray-700/80 dark:hover:bg-gray-600/80 dark:text-gray-200 backdrop-blur-sm border border-gray-300/30 dark:border-gray-600/30"
                    variant="outline"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Gestionar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
        <DialogContent className="max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 dark:border-gray-700/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              Gestionar Grupo: {grupoSeleccionado?.nombre}
            </DialogTitle>
            <DialogDescription>Administra la información y configuración del grupo seleccionado</DialogDescription>
          </DialogHeader>

          {grupoSeleccionado && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre del Grupo</Label>
                  <Input
                    id="nombre"
                    defaultValue={grupoSeleccionado.nombre}
                    className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código</Label>
                  <Input
                    id="codigo"
                    defaultValue={grupoSeleccionado.codigo}
                    className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="periodo">Período Académico</Label>
                <Select defaultValue="periodo-1">
                  <SelectTrigger className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 dark:border-gray-700/30">
                    <SelectValue placeholder="Selecciona el período académico" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 dark:border-gray-700/30">
                    <SelectItem value="periodo-1">Período 1</SelectItem>
                    <SelectItem value="periodo-2">Período 2</SelectItem>
                    <SelectItem value="periodo-3">Período 3</SelectItem>
                    <SelectItem value="periodo-4">Período 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {tipoGrupo === "imparte" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="estudiantes">Número de Estudiantes</Label>
                    <Input
                      id="estudiantes"
                      type="number"
                      defaultValue={grupoSeleccionado.estudiantes}
                      className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aula">Aula</Label>
                    <Input
                      id="aula"
                      defaultValue={grupoSeleccionado.aula}
                      className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="horario">Horario</Label>
                    <Input
                      id="horario"
                      defaultValue={grupoSeleccionado.horario}
                      className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="miembros">Número de Miembros</Label>
                      <Input
                        id="miembros"
                        type="number"
                        defaultValue={grupoSeleccionado.miembros}
                        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo de Grupo</Label>
                      <Input
                        id="tipo"
                        defaultValue={grupoSeleccionado.tipo}
                        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proyecto">Proyecto Actual</Label>
                    <Textarea
                      id="proyecto"
                      defaultValue={grupoSeleccionado.proyecto}
                      className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200/30 dark:border-gray-700/30">
                <Button
                  variant="outline"
                  onClick={() => setModalAbierto(false)}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => setModalAbierto(false)}
                  className="bg-gray-200/80 hover:bg-gray-300/80 text-gray-800 dark:bg-gray-700/80 dark:hover:bg-gray-600/80 dark:text-gray-200 backdrop-blur-sm"
                >
                  Guardar Cambios
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
