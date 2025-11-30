"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Users,
  FileText,
  ClipboardList,
  MessageSquare,
  BarChart3,
  Plus,
  Download,
  Eye,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Library,
  Play,
  Presentation,
  X,
  UserCheck,
  Filter,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CursosPage() {
  const cursos = [
    {
      id: "1",
      nombre: "Matemáticas Avanzadas",
      grupo: "A1",
      horario: "Lunes y Miércoles 8:00-10:00",
      estudiantes: 45,
      descripcion: "Curso avanzado de matemáticas para ingeniería",
    },
    {
      id: "2",
      nombre: "Cálculo Diferencial",
      grupo: "B2",
      horario: "Martes y Jueves 10:00-12:00",
      estudiantes: 38,
      descripcion: "Fundamentos del cálculo diferencial",
    },
    {
      id: "3",
      nombre: "Álgebra Lineal",
      grupo: "C1",
      horario: "Viernes 14:00-18:00",
      estudiantes: 52,
      descripcion: "Álgebra lineal aplicada",
    },
  ]

  const estudiantes = [
    { id: "001", nombre: "Ana García", email: "ana.garcia@universidad.edu", promedio: 8.5 },
    { id: "002", nombre: "Carlos López", email: "carlos.lopez@universidad.edu", promedio: 7.8 },
    { id: "003", nombre: "María Fernández", email: "maria.fernandez@universidad.edu", promedio: 9.2 },
    { id: "004", nombre: "José Martínez", email: "jose.martinez@universidad.edu", promedio: 6.9 },
  ]

  const contenidos = [
    { tipo: "Documento", nombre: "Syllabus del Curso", fecha: "2024-01-15", tamaño: "2.3 MB" },
    { tipo: "Video", nombre: "Clase 1: Introducción", fecha: "2024-01-16", tamaño: "45 MB" },
    { tipo: "Presentación", nombre: "Tema 2: Derivadas", fecha: "2024-01-18", tamaño: "5.1 MB" },
    { tipo: "Documento", nombre: "Ejercicios Prácticos", fecha: "2024-01-20", tamaño: "1.8 MB" },
  ]

  const actividades = [
    { nombre: "Tarea 1", tipo: "Tarea", fechaLimite: "2024-01-25", entregas: 35, total: 45 },
    { nombre: "Examen Parcial", tipo: "Examen", fechaLimite: "2024-02-01", entregas: 42, total: 45 },
    { nombre: "Proyecto Final", tipo: "Proyecto", fechaLimite: "2024-02-15", entregas: 28, total: 45 },
  ]

  const periodos = [
    { id: "1", nombre: "Período 1", fechas: "Enero - Marzo" },
    { id: "2", nombre: "Período 2", fechas: "Abril - Junio" },
    { id: "3", nombre: "Período 3", fechas: "Julio - Septiembre" },
    { id: "4", nombre: "Período 4", fechas: "Octubre - Diciembre" },
  ]

  const materialesDidacticos = [
    {
      id: 1,
      titulo: "Introducción a la Programación",
      descripcion: "Conceptos básicos de programación y algoritmos",
      categoria: "Documento",
      duracion: "2 horas",
    },
    {
      id: 2,
      titulo: "Estructuras de Datos",
      descripcion: "Explicación visual de arrays, listas y árboles",
      categoria: "Video",
      duracion: "1.5 horas",
    },
    {
      id: 3,
      titulo: "Bases de Datos Relacionales",
      descripcion: "Fundamentos de SQL y diseño de bases de datos",
      categoria: "Presentación",
      duracion: "3 horas",
    },
  ]

  const [modalAsistencia, setModalAsistencia] = useState(false)
  const [fechaAsistencia, setFechaAsistencia] = useState(new Date().toISOString().split("T")[0])
  const [filtroFecha, setFiltroFecha] = useState("")
  const [asistenciaEstudiantes, setAsistenciaEstudiantes] = useState(
    estudiantes.map((est) => ({ ...est, presente: false, observaciones: "" })),
  )

  const [cursoSeleccionado, setCursoSeleccionado] = useState<string | null>(null)
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("1")
  const [modalAbierto, setModalAbierto] = useState(false)
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState<any>(null)
  const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false)
  const [contenidoEditando, setContenidoEditando] = useState<any>(null)
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null)
  const [modalEliminacionAbierto, setModalEliminacionAbierto] = useState(false)
  const [contenidoAEliminar, setContenidoAEliminar] = useState<any>(null)
  const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false)
  const [nuevoContenido, setNuevoContenido] = useState<any>({
    nombre: "",
    tipo: "Documento",
    fecha: new Date().toISOString().split("T")[0],
    descripcion: "",
    estado: "Activo",
    etiquetas: "",
  })
  const [archivoNuevo, setArchivoNuevo] = useState<File | null>(null)

  const [modalNuevoTema, setModalNuevoTema] = useState(false)
  const [modalDiscusion, setModalDiscusion] = useState(false)
  const [foroSeleccionado, setForoSeleccionado] = useState<any>(null)
  const [nuevoTema, setNuevoTema] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
  })

  const [modalImportarFuentes, setModalImportarFuentes] = useState(false)
  const [materialSeleccionado, setMaterialSeleccionado] = useState<any>(null)

  const [modalNuevaActividad, setModalNuevaActividad] = useState(false)
  const [nuevaActividad, setNuevaActividad] = useState({
    nombre: "",
    tipo: "",
    descripcion: "",
    fechaLimite: "",
    puntos: "",
    instrucciones: "",
  })
  const [archivoNuevaActividad, setArchivoNuevaActividad] = useState<File | null>(null)

  const abrirModal = (contenido: any) => {
    setContenidoSeleccionado(contenido)
    setModalAbierto(true)
  }

  const abrirModalEdicion = (contenido: any) => {
    setContenidoEditando(contenido)
    setModalEdicionAbierto(true)
  }

  const manejarSubidaArchivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = event.target.files?.[0]
    if (archivo) {
      setArchivoSeleccionado(archivo)
      // Actualizar automáticamente el nombre y tamaño
      setContenidoEditando({
        ...contenidoEditando,
        nombre: archivo.name,
        tamaño: `${(archivo.size / 1024 / 1024).toFixed(2)} MB`,
      })
    }
  }

  const manejarSubidaArchivoNuevo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = event.target.files?.[0]
    if (archivo) {
      setArchivoNuevo(archivo)
      // Actualizar automáticamente el nombre
      setNuevoContenido({
        ...nuevoContenido,
        nombre: archivo.name,
      })
    }
  }

  const abrirModalAgregar = () => {
    setModalAgregarAbierto(true)
  }

  const importarMaterial = (material: any) => {
    setNuevoContenido({
      ...nuevoContenido,
      nombre: material.nombre,
      tipo: material.tipo,
      descripcion: material.descripcion,
      etiquetas: material.etiquetas,
    })
    setModalImportarFuentes(false)
  }

  const guardarNuevoContenido = () => {
    // Aquí iría la lógica para guardar el nuevo contenido y subir el archivo
    console.log("Guardando nuevo contenido:", nuevoContenido)
    if (archivoNuevo) {
      console.log("Subiendo archivo:", archivoNuevo)
      // Lógica para subir el archivo al servidor
    }
    setModalAgregarAbierto(false)
    setNuevoContenido({
      nombre: "",
      tipo: "Documento",
      fecha: new Date().toISOString().split("T")[0],
      descripcion: "",
      estado: "Activo",
      etiquetas: "",
    })
    setArchivoNuevo(null)
  }

  const abrirModalEliminacion = (contenido: any) => {
    setContenidoAEliminar(contenido)
    setModalEliminacionAbierto(true)
  }

  const confirmarEliminacion = () => {
    // Aquí iría la lógica para eliminar el contenido del servidor
    console.log("Eliminando contenido:", contenidoAEliminar)
    // Lógica para eliminar del array de contenidos
    setModalEliminacionAbierto(false)
    setContenidoAEliminar(null)
  }

  const guardarEdicion = () => {
    // Aquí iría la lógica para guardar la edición del contenido y subir el archivo si es necesario
    console.log("Guardando edición del contenido:", contenidoEditando)
    if (archivoSeleccionado) {
      console.log("Subiendo archivo:", archivoSeleccionado)
      // Lógica para subir el archivo al servidor
    }
    setModalEdicionAbierto(false)
    setArchivoSeleccionado(null)
  }

  const abrirDiscusion = (foro: any) => {
    setForoSeleccionado(foro)
    setModalDiscusion(true)
  }

  const crearNuevoTema = () => {
    console.log("Creando nuevo tema:", nuevoTema)
    setModalNuevoTema(false)
    setNuevoTema({ titulo: "", descripcion: "", categoria: "" })
  }

  const abrirModalAsistencia = () => {
    setAsistenciaEstudiantes(estudiantes.map((est) => ({ ...est, presente: false, observaciones: "" })))
    setModalAsistencia(true)
  }

  const marcarAsistencia = (estudianteId: number, presente: boolean) => {
    setAsistenciaEstudiantes((prev) => prev.map((est) => (parseInt(est.id) === estudianteId ? { ...est, presente } : est)))
  }

  const guardarAsistencia = () => {
    console.log("Guardando asistencia:", { fecha: fechaAsistencia, estudiantes: asistenciaEstudiantes })
    setModalAsistencia(false)
  }

  if (cursoSeleccionado) {
    const curso = cursos.find((c) => c.id === cursoSeleccionado)

    return (
      <div className="flex-1 space-y-6 p-6 absolute w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{curso?.nombre}</h1>
            <p className="text-muted-foreground">
              Grupo {curso?.grupo} • {curso?.horario}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Período:</label>
              <select
                value={periodoSeleccionado}
                onChange={(e) => setPeriodoSeleccionado(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                {periodos.map((periodo) => (
                  <option key={periodo.id} value={periodo.id}>
                    {periodo.nombre} ({periodo.fechas})
                  </option>
                ))}
              </select>
            </div>
            <Button onClick={abrirModalAsistencia} className="bg-green-600 hover:bg-green-700">
              <UserCheck className="h-4 w-4 mr-2" />
              Tomar Asistencia
            </Button>
            <Button variant="outline" onClick={() => setCursoSeleccionado(null)}>
              Volver a Mis Cursos
            </Button>
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg">
          <h2 className="font-semibold text-lg mb-2">{periodos.find((p) => p.id === periodoSeleccionado)?.nombre}</h2>
          <p className="text-muted-foreground text-sm">
            Planificación académica para {periodos.find((p) => p.id === periodoSeleccionado)?.fechas}
          </p>
        </div>

        <Tabs defaultValue="contenido" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="contenido" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Contenido
            </TabsTrigger>
            <TabsTrigger value="actividades" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Actividades
            </TabsTrigger>
            <TabsTrigger value="estudiantes" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Estudiantes
            </TabsTrigger>
            <TabsTrigger value="calificaciones" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Calificaciones
            </TabsTrigger>
            <TabsTrigger value="foros" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Foros
            </TabsTrigger>
            <TabsTrigger value="planificacion" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Planificación
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contenido" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Material del Curso</CardTitle>
                    <CardDescription>Documentos, videos y recursos de aprendizaje</CardDescription>
                  </div>
                  <Button onClick={abrirModalAgregar}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Contenido
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contenidos.map((contenido, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <div>
                          <p className="font-medium">{contenido.nombre}</p>
                          <p className="text-sm text-muted-foreground">
                            {contenido.tipo} • {contenido.fecha} • {contenido.tamaño}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => abrirModal(contenido)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer" onClick={() => abrirModalEdicion(contenido)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer text-destructive"
                              onClick={() => abrirModalEliminacion(contenido)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actividades" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Actividades del Curso</CardTitle>
                    <CardDescription>Tareas, exámenes y proyectos</CardDescription>
                  </div>
                  <Button onClick={() => setModalNuevaActividad(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nueva Actividad
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {actividades.map((actividad, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{actividad.nombre}</h3>
                            <p className="text-sm text-muted-foreground">
                              {actividad.tipo} • Fecha límite: {actividad.fechaLimite}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={actividad.entregas === actividad.total ? "default" : "secondary"}>
                              {actividad.entregas}/{actividad.total} entregas
                            </Badge>
                            <div className="mt-2">
                              <Button size="sm">Revisar Entregas</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="estudiantes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Estudiantes</CardTitle>
                <CardDescription>{estudiantes.length} estudiantes inscritos</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Promedio</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estudiantes.map((estudiante) => (
                      <TableRow key={estudiante.id}>
                        <TableCell>{estudiante.id}</TableCell>
                        <TableCell className="font-medium">{estudiante.nombre}</TableCell>
                        <TableCell>{estudiante.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              estudiante.promedio >= 8
                                ? "default"
                                : estudiante.promedio >= 7
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {estudiante.promedio}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            Ver Perfil
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calificaciones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tabla de Calificaciones</CardTitle>
                <CardDescription>Calificaciones por actividad y estudiante</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estudiante</TableHead>
                      <TableHead>Tarea 1</TableHead>
                      <TableHead>Examen Parcial</TableHead>
                      <TableHead>Proyecto Final</TableHead>
                      <TableHead>Promedio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {estudiantes.map((estudiante) => (
                      <TableRow key={estudiante.id}>
                        <TableCell className="font-medium">{estudiante.nombre}</TableCell>
                        <TableCell>
                          <Input className="w-16" defaultValue="8.5" />
                        </TableCell>
                        <TableCell>
                          <Input className="w-16" defaultValue="7.8" />
                        </TableCell>
                        <TableCell>
                          <Input className="w-16" defaultValue="9.0" />
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{estudiante.promedio}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button>Guardar Calificaciones</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="foros" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Foros de Discusión</CardTitle>
                    <CardDescription>Espacios de debate y consultas</CardDescription>
                  </div>
                  <Button onClick={() => setModalNuevoTema(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Tema
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Dudas sobre el Examen Parcial</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Espacio para resolver dudas sobre el próximo examen parcial
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>12 mensajes</span>
                        <span>Último: hace 2 horas</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          abrirDiscusion({
                            titulo: "Dudas sobre el Examen Parcial",
                            descripcion: "Espacio para resolver dudas sobre el próximo examen parcial",
                            mensajes: 12,
                            ultimo: "hace 2 horas",
                            hilos: [
                              {
                                id: 1,
                                autor: "María González",
                                mensaje: "¿El examen incluirá todo el contenido visto hasta ahora?",
                                fecha: "hace 2 horas",
                                respuestas: 3,
                              },
                              {
                                id: 2,
                                autor: "Carlos Rodríguez",
                                mensaje: "¿Podrían aclarar el tema de las ecuaciones diferenciales?",
                                fecha: "hace 4 horas",
                                respuestas: 5,
                              },
                              {
                                id: 3,
                                autor: "Ana Martínez",
                                mensaje: "¿Habrá preguntas de opción múltiple o solo desarrollo?",
                                fecha: "hace 6 horas",
                                respuestas: 2,
                              },
                            ],
                          })
                        }
                      >
                        Ver Discusión
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Recursos Adicionales</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Compartir y discutir recursos adicionales para el curso
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>8 mensajes</span>
                        <span>Último: hace 1 día</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          abrirDiscusion({
                            titulo: "Recursos Adicionales",
                            descripcion: "Compartir y discutir recursos adicionales para el curso",
                            mensajes: 8,
                            ultimo: "hace 1 día",
                            hilos: [
                              {
                                id: 1,
                                autor: "Prof. García",
                                mensaje: "Les comparto este video explicativo sobre el tema 3",
                                fecha: "hace 1 día",
                                respuestas: 4,
                              },
                              {
                                id: 2,
                                autor: "Luis Pérez",
                                mensaje: "Encontré este artículo muy útil para complementar la clase",
                                fecha: "hace 2 días",
                                respuestas: 2,
                              },
                              {
                                id: 3,
                                autor: "Sofia López",
                                mensaje: "¿Alguien tiene más ejercicios de práctica?",
                                fecha: "hace 3 días",
                                respuestas: 6,
                              },
                            ],
                          })
                        }
                      >
                        Ver Discusión
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="planificacion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Planificación del {periodos.find((p) => p.id === periodoSeleccionado)?.nombre}</CardTitle>
                <CardDescription>
                  Organiza tus clases y actividades para {periodos.find((p) => p.id === periodoSeleccionado)?.fechas}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Clases Programadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">Semana 1-4: Fundamentos</span>
                          <Badge variant="outline">4 clases</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">Semana 5-8: Desarrollo</span>
                          <Badge variant="outline">4 clases</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">Semana 9-12: Aplicación</span>
                          <Badge variant="outline">4 clases</Badge>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-transparent" size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Clase
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Evaluaciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">Examen Parcial 1</span>
                          <Badge variant="secondary">Semana 6</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">Proyecto Intermedio</span>
                          <Badge variant="secondary">Semana 9</Badge>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">Examen Final</span>
                          <Badge variant="secondary">Semana 12</Badge>
                        </div>
                      </div>
                      <Button className="w-full mt-4 bg-transparent" size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Evaluación
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Cronograma Semanal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {Array.from({ length: 12 }, (_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span className="font-medium">Semana {i + 1}</span>
                            <p className="text-sm text-muted-foreground">
                              Tema: {i < 4 ? "Fundamentos" : i < 8 ? "Desarrollo" : "Aplicación"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={i < 4 ? "default" : i < 8 ? "secondary" : "outline"}>
                              {i < 4 ? "Básico" : i < 8 ? "Intermedio" : "Avanzado"}
                            </Badge>
                            <Button size="sm" variant="ghost">
                              Editar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Modal para ver contenido */}
        <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                {contenidoSeleccionado?.nombre}
              </DialogTitle>
              <DialogDescription>
                {contenidoSeleccionado?.tipo} • {contenidoSeleccionado?.fecha} • {contenidoSeleccionado?.tamaño}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Tipo de Archivo</h4>
                  <p className="font-medium">{contenidoSeleccionado?.tipo}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Fecha de Subida</h4>
                  <p className="font-medium">{contenidoSeleccionado?.fecha}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Tamaño</h4>
                  <p className="font-medium">{contenidoSeleccionado?.tamaño}</p>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Estado</h4>
                  <Badge variant="default">Activo</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Vista Previa del Contenido</h4>
                <div className="border rounded-lg p-6 bg-white min-h-[300px]">
                  {contenidoSeleccionado?.tipo === "Documento" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">📄 {contenidoSeleccionado?.nombre}</h3>
                      <div className="prose max-w-none">
                        <p>
                          Este es el contenido del documento. Aquí se mostraría el texto completo del archivo PDF o
                          documento.
                        </p>
                        <h4>Objetivos del Curso:</h4>
                        <ul>
                          <li>Comprender los conceptos fundamentales</li>
                          <li>Aplicar teorías en casos prácticos</li>
                          <li>Desarrollar habilidades analíticas</li>
                        </ul>
                        <h4>Metodología:</h4>
                        <p>
                          El curso se desarrollará mediante clases magistrales, talleres prácticos y proyectos
                          colaborativos.
                        </p>
                      </div>
                    </div>
                  )}

                  {contenidoSeleccionado?.tipo === "Video" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">🎥 {contenidoSeleccionado?.nombre}</h3>
                      <div className="bg-gray-100 rounded-lg p-8 text-center">
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                        <p className="text-gray-600">Video de introducción al curso</p>
                        <p className="text-sm text-gray-500 mt-2">Duración: 15:30 minutos</p>
                        <Button className="mt-4">Reproducir Video</Button>
                      </div>
                    </div>
                  )}

                  {contenidoSeleccionado?.tipo === "Presentación" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">📊 {contenidoSeleccionado?.nombre}</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((slide) => (
                          <div key={slide} className="border rounded-lg p-4 bg-gray-50 text-center">
                            <div className="w-full h-20 bg-blue-100 rounded mb-2 flex items-center justify-center">
                              <span className="text-blue-600 font-medium">Slide {slide}</span>
                            </div>
                            <p className="text-xs text-gray-600">Diapositiva {slide}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          Vista Completa
                        </Button>
                        <Button size="sm">Descargar PPT</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setModalAbierto(false)}>
                  Cerrar
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Modal para editar contenido */}
        <Dialog open={modalEdicionAbierto} onOpenChange={setModalEdicionAbierto}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5 text-blue-500" />
                Editar Contenido
              </DialogTitle>
              <DialogDescription>Modifica la información del contenido seleccionado</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre del Archivo</label>
                <Input
                  value={contenidoEditando?.nombre || ""}
                  onChange={(e) => setContenidoEditando({ ...contenidoEditando, nombre: e.target.value })}
                  placeholder="Ingresa el nombre del archivo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo</label>
                  <select
                    value={contenidoEditando?.tipo || ""}
                    onChange={(e) => setContenidoEditando({ ...contenidoEditando, tipo: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Documento">Documento</option>
                    <option value="Video">Video</option>
                    <option value="Presentación">Presentación</option>
                    <option value="Audio">Audio</option>
                    <option value="Imagen">Imagen</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha</label>
                  <Input
                    type="date"
                    value={contenidoEditando?.fecha || ""}
                    onChange={(e) => setContenidoEditando({ ...contenidoEditando, fecha: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descripción</label>
                <textarea
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  value={contenidoEditando?.descripcion || "Descripción del contenido..."}
                  onChange={(e) => setContenidoEditando({ ...contenidoEditando, descripcion: e.target.value })}
                  placeholder="Describe el contenido del archivo"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Subir Nuevo Archivo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={manejarSubidaArchivo}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.jpg,.png,.gif"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Plus className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Haz clic para subir un archivo</p>
                        <p className="text-xs text-gray-500">o arrastra y suelta aquí</p>
                      </div>
                      <p className="text-xs text-gray-400">PDF, DOC, PPT, MP4, JPG hasta 50MB</p>
                    </div>
                  </label>
                </div>

                {archivoSeleccionado && (
                  <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-900">{archivoSeleccionado.name}</p>
                      <p className="text-xs text-green-600">{(archivoSeleccionado.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setArchivoSeleccionado(null)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estado</label>
                  <select
                    value={contenidoEditando?.estado || "Activo"}
                    onChange={(e) => setContenidoEditando({ ...contenidoEditando, estado: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Borrador">Borrador</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Etiquetas</label>
                <Input
                  value={contenidoEditando?.etiquetas || ""}
                  onChange={(e) => setContenidoEditando({ ...contenidoEditando, etiquetas: e.target.value })}
                  placeholder="Separadas por comas: matemáticas, teoría, práctica"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setModalEdicionAbierto(false)}>
                Cancelar
              </Button>
              <Button onClick={guardarEdicion}>
                <Edit className="h-4 w-4 mr-2" />
                Guardar Cambios
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        {/* Modal para confirmar eliminación */}
        <Dialog open={modalEliminacionAbierto} onOpenChange={setModalEliminacionAbierto}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-red-500" />
                Confirmar Eliminación
              </DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar este contenido? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="font-medium text-red-900">{contenidoAEliminar?.nombre}</p>
                    <p className="text-sm text-red-600">
                      {contenidoAEliminar?.tipo} • {contenidoAEliminar?.fecha}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setModalEliminacionAbierto(false)}>
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={confirmarEliminacion}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar Definitivamente
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal para agregar nuevo contenido */}
        <Dialog open={modalAgregarAbierto} onOpenChange={setModalAgregarAbierto}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-500" />
                Agregar Nuevo Contenido
              </DialogTitle>
              <DialogDescription>Sube un nuevo archivo o importa desde fuentes didácticas</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sección de subir archivo */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subir Archivo *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors h-48 flex flex-col justify-center">
                    <input
                      type="file"
                      id="file-upload-nuevo"
                      className="hidden"
                      onChange={manejarSubidaArchivoNuevo}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi,.jpg,.png,.gif"
                    />
                    <label htmlFor="file-upload-nuevo" className="cursor-pointer">
                      <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Plus className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Haz clic para subir un archivo</p>
                          <p className="text-xs text-gray-500">o arrastra y suelta aquí</p>
                        </div>
                        <p className="text-xs text-gray-400">PDF, DOC, PPT, MP4, JPG hasta 50MB</p>
                      </div>
                    </label>
                  </div>

                  {archivoNuevo && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <FileText className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900">{archivoNuevo.name}</p>
                        <p className="text-xs text-green-600">{(archivoNuevo.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setArchivoNuevo(null)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Importar Fuentes</label>
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors h-48 flex flex-col justify-center">
                    <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Materiales Didácticos</p>
                        <p className="text-xs text-gray-500">Accede a nuestra biblioteca de recursos</p>
                      </div>
                      <Button onClick={() => setModalImportarFuentes(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Library className="h-4 w-4 mr-2" />
                        Importar Fuentes
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre del Archivo</label>
                <Input
                  value={nuevoContenido.nombre}
                  onChange={(e) => setNuevoContenido({ ...nuevoContenido, nombre: e.target.value })}
                  placeholder="Ingresa el nombre del archivo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo</label>
                  <select
                    value={nuevoContenido.tipo}
                    onChange={(e) => setNuevoContenido({ ...nuevoContenido, tipo: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Documento">Documento</option>
                    <option value="Video">Video</option>
                    <option value="Presentación">Presentación</option>
                    <option value="Audio">Audio</option>
                    <option value="Imagen">Imagen</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha</label>
                  <Input
                    type="date"
                    value={nuevoContenido.fecha}
                    onChange={(e) => setNuevoContenido({ ...nuevoContenido, fecha: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descripción</label>
                <textarea
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  value={nuevoContenido.descripcion}
                  onChange={(e) => setNuevoContenido({ ...nuevoContenido, descripcion: e.target.value })}
                  placeholder="Describe el contenido del archivo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Estado</label>
                  <select
                    value={nuevoContenido.estado}
                    onChange={(e) => setNuevoContenido({ ...nuevoContenido, estado: e.target.value })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                    <option value="Borrador">Borrador</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Etiquetas</label>
                  <Input
                    value={nuevoContenido.etiquetas}
                    onChange={(e) => setNuevoContenido({ ...nuevoContenido, etiquetas: e.target.value })}
                    placeholder="Separadas por comas"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setModalAgregarAbierto(false)}>
                Cancelar
              </Button>
              <Button onClick={guardarNuevoContenido} disabled={!archivoNuevo}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Contenido
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal para importar fuentes */}
        <Dialog open={modalImportarFuentes} onOpenChange={setModalImportarFuentes}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Library className="h-5 w-5 text-blue-500" />
                Biblioteca de Materiales Didácticos
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materialesDidacticos.map((material, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{material.titulo}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{material.descripcion}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {material.categoria}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{material.duracion}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="text-xs h-7 bg-transparent">
                            Probar
                          </Button>
                          <Button
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => {
                              setNuevoContenido({
                                ...nuevoContenido,
                                titulo: material.titulo,
                                descripcion: material.descripcion,
                                tipo: material.categoria,
                              })
                              setModalImportarFuentes(false)
                            }}
                          >
                            Importar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal para nueva actividad */}
        <Dialog open={modalNuevaActividad} onOpenChange={setModalNuevaActividad}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-green-500" />
                Nueva Actividad
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Campos básicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre de la Actividad *</label>
                  <Input
                    value={nuevaActividad.nombre}
                    onChange={(e) => setNuevaActividad({ ...nuevaActividad, nombre: e.target.value })}
                    placeholder="ej: Ensayo sobre la Revolución Industrial"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Actividad *</label>
                  <Select
                    value={nuevaActividad.tipo}
                    onValueChange={(value) => setNuevaActividad({ ...nuevaActividad, tipo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tarea">Tarea</SelectItem>
                      <SelectItem value="examen">Examen</SelectItem>
                      <SelectItem value="proyecto">Proyecto</SelectItem>
                      <SelectItem value="ensayo">Ensayo</SelectItem>
                      <SelectItem value="presentacion">Presentación</SelectItem>
                      <SelectItem value="laboratorio">Laboratorio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha Límite *</label>
                  <Input
                    type="datetime-local"
                    value={nuevaActividad.fechaLimite}
                    onChange={(e) => setNuevaActividad({ ...nuevaActividad, fechaLimite: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Puntos/Calificación</label>
                  <Input
                    value={nuevaActividad.puntos}
                    onChange={(e) => setNuevaActividad({ ...nuevaActividad, puntos: e.target.value })}
                    placeholder="ej: 100 puntos"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descripción</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
                  value={nuevaActividad.descripcion}
                  onChange={(e) => setNuevaActividad({ ...nuevaActividad, descripcion: e.target.value })}
                  placeholder="Descripción breve de la actividad..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Instrucciones Detalladas</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md resize-none h-32"
                  value={nuevaActividad.instrucciones}
                  onChange={(e) => setNuevaActividad({ ...nuevaActividad, instrucciones: e.target.value })}
                  placeholder="Instrucciones detalladas para completar la actividad..."
                />
              </div>

              {/* Sección de archivos e importar fuentes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Subir archivo */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subir Material de Apoyo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors min-h-[160px] flex flex-col justify-center">
                    <input
                      type="file"
                      className="hidden"
                      id="archivo-actividad"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.png,.mp4,.mp3"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          setArchivoNuevaActividad(file)
                        }
                      }}
                    />
                    <label htmlFor="archivo-actividad" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                          <Plus className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Haz clic para subir</p>
                          <p className="text-xs text-muted-foreground">o arrastra y suelta aquí</p>
                        </div>
                      </div>
                    </label>
                    {archivoNuevaActividad && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">{archivoNuevaActividad.name}</span>
                          </div>
                          <Button size="sm" variant="ghost" onClick={() => setArchivoNuevaActividad(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Importar fuentes */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Importar desde Biblioteca</label>
                  <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors min-h-[160px] flex items-center justify-center">
                    <Button
                      variant="outline"
                      className="w-full h-full flex flex-col gap-2 border-none bg-transparent"
                      onClick={() => setModalImportarFuentes(true)}
                    >
                      <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                        <Library className="h-6 w-6 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Importar Fuentes</p>
                        <p className="text-xs text-muted-foreground">Biblioteca de materiales didácticos</p>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setModalNuevaActividad(false)}>
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    // Aquí iría la lógica para guardar la nueva actividad
                    console.log("Nueva actividad:", nuevaActividad)
                    console.log("Archivo:", archivoNuevaActividad)
                    setModalNuevaActividad(false)
                    // Resetear formulario
                    setNuevaActividad({
                      nombre: "",
                      tipo: "",
                      descripcion: "",
                      fechaLimite: "",
                      puntos: "",
                      instrucciones: "",
                    })
                    setArchivoNuevaActividad(null)
                  }}
                  disabled={!nuevaActividad.nombre || !nuevaActividad.tipo || !nuevaActividad.fechaLimite}
                >
                  Crear Actividad
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={modalImportarFuentes} onOpenChange={setModalImportarFuentes}>
          <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Library className="h-5 w-5 text-blue-500" />
                Biblioteca de Materiales Didácticos
              </DialogTitle>
              <DialogDescription>Selecciona un material para importar a tu curso</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Filtros */}
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" variant="outline">
                  Todos
                </Button>
                <Button size="sm" variant="outline">
                  Documentos
                </Button>
                <Button size="sm" variant="outline">
                  Videos
                </Button>
                <Button size="sm" variant="outline">
                  Presentaciones
                </Button>
                <Button size="sm" variant="outline">
                  Ejercicios
                </Button>
              </div>

              {/* Lista de materiales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {[
                  {
                    id: 1,
                    nombre: "Introducción a la Programación",
                    tipo: "Documento",
                    descripcion: "Conceptos básicos de programación y algoritmos",
                    etiquetas: "programación, algoritmos, básico",
                    autor: "Dr. García",
                    descargas: 1250,
                  },
                  {
                    id: 2,
                    nombre: "Estructuras de Datos",
                    tipo: "Video",
                    descripcion: "Explicación visual de arrays, listas y árboles",
                    etiquetas: "estructuras, datos, arrays",
                    autor: "Prof. Martínez",
                    descargas: 890,
                  },
                  {
                    id: 3,
                    nombre: "Bases de Datos Relacionales",
                    tipo: "Presentación",
                    descripcion: "Fundamentos de SQL y diseño de bases de datos",
                    etiquetas: "sql, bases de datos, relacional",
                    autor: "Dra. López",
                    descargas: 2100,
                  },
                  {
                    id: 4,
                    nombre: "Ejercicios de Lógica",
                    tipo: "Documento",
                    descripción: "Problemas prácticos para desarrollar pensamiento lógico",
                    etiquetas: "lógica, ejercicios, práctica",
                    autor: "Prof. Rodríguez",
                    descargas: 750,
                  },
                ].map((material) => (
                  <Card key={material.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {material.tipo === "Video" && <Play className="h-5 w-5 text-blue-600" />}
                          {material.tipo === "Documento" && <FileText className="h-5 w-5 text-blue-600" />}
                          {material.tipo === "Presentación" && <Presentation className="h-5 w-5 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{material.nombre}</h4>
                          <p className="text-xs text-gray-600 mt-1">{material.descripcion}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>{material.autor}</span>
                            <span>{material.descargas} descargas</span>
                          </div>
                          <div className="flex gap-1 mt-2">
                            {material.etiquetas.split(", ").map((etiqueta, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded">
                                {etiqueta}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-1" />
                          Probar
                        </Button>
                        <Button size="sm" className="flex-1" onClick={() => importarMaterial(material)}>
                          <Download className="h-4 w-4 mr-1" />
                          Importar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setModalImportarFuentes(false)}>
                Cerrar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={modalAsistencia} onOpenChange={setModalAsistencia}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-green-600" />
                Tomar Asistencia - {curso?.nombre}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Filtros y fecha */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Fecha:</label>
                  <input
                    type="date"
                    value={fechaAsistencia}
                    onChange={(e) => setFechaAsistencia(e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <label className="text-sm font-medium">Consultar fecha:</label>
                  <input
                    type="date"
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                    placeholder="Filtrar por fecha"
                  />
                </div>
                {filtroFecha && (
                  <Button variant="outline" size="sm" onClick={() => setFiltroFecha("")}>
                    Limpiar filtro
                  </Button>
                )}
              </div>

              {/* Lista de estudiantes */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Lista de Estudiantes ({asistenciaEstudiantes.length})</h3>
                <div className="grid gap-3">
                  {asistenciaEstudiantes.map((estudiante) => (
                    <div
                      key={estudiante.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {estudiante.nombre
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{estudiante.nombre}</p>
                          <p className="text-sm text-muted-foreground">ID: {estudiante.id}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`asistencia-${estudiante.id}`}
                              checked={estudiante.presente === true}
                              onChange={() => marcarAsistencia(parseInt(estudiante.id), true)}
                              className="text-green-600"
                            />
                            <span className="text-sm text-green-600 font-medium">Presente</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`asistencia-${estudiante.id}`}
                              checked={estudiante.presente === false}
                              onChange={() => marcarAsistencia(parseInt(estudiante.id), false)}
                              className="text-red-600"
                            />
                            <span className="text-sm text-red-600 font-medium">Ausente</span>
                          </label>
                        </div>
                        <input
                          type="text"
                          placeholder="Observaciones..."
                          className="px-2 py-1 border rounded text-sm w-32"
                          value={estudiante.observaciones || ""}
                          onChange={(e) =>
                            setAsistenciaEstudiantes((prev) =>
                              prev.map((est) =>
                                est.id === estudiante.id ? { ...est, observaciones: e.target.value } : est,
                              ),
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen */}
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-6 text-sm">
                  <span className="text-green-600 font-medium">
                    Presentes: {asistenciaEstudiantes.filter((e) => e.presente === true).length}
                  </span>
                  <span className="text-red-600 font-medium">
                    Ausentes: {asistenciaEstudiantes.filter((e) => e.presente === false).length}
                  </span>
                  <span className="text-gray-600 font-medium">
                    Sin marcar:{" "}
                    {asistenciaEstudiantes.filter((e) => e.presente === null || e.presente === undefined).length}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setModalAsistencia(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={guardarAsistencia} className="bg-green-600 hover:bg-green-700">
                    Guardar Asistencia
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mis Cursos</h1>
        <p className="text-muted-foreground">Gestiona tus cursos del semestre actual</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cursos.map((curso) => (
          <Card key={curso.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <BookOpen className="h-8 w-8 text-primary" />
                <Badge variant="secondary">Grupo {curso.grupo}</Badge>
              </div>
              <CardTitle className="text-xl">{curso.nombre}</CardTitle>
              <CardDescription>{curso.descripcion}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{curso.estudiantes} estudiantes</span>
                </div>
                <p className="text-sm text-muted-foreground">{curso.horario}</p>
              </div>
              <Button className="w-full" onClick={() => setCursoSeleccionado(curso.id)}>
                Acceder al Aula Virtual
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
