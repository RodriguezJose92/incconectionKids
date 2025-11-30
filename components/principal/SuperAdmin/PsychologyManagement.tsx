"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
// } from "recharts"
import { Search, Plus, Brain, FileText, Calendar, User, Users, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { registrosPsicologia, motivosPsicologia, psicologos } from "./data"

export default function PsychologyManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateRecordOpen, setIsCreateRecordOpen] = useState(false)
  const [newRecord, setNewRecord] = useState({
    estudiante: "",
    grado: "",
    edad: "",
    motivo: "",
    descripcion: "",
    psicologo: "",
  })

  const filteredRecords = registrosPsicologia.filter(
    (record) =>
      record.estudiante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.estudiante.grado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.motivo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getEstadoBadgeColor = (estado: string) => {
    switch (estado) {
      case "En tratamiento":
        return "bg-blue-100 text-blue-800"
      case "Seguimiento":
        return "bg-yellow-100 text-yellow-800"
      case "Alta":
        return "bg-green-100 text-green-800"
      case "Remitido":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCreateRecord = () => {
    console.log("Creando nuevo registro psicológico:", newRecord)
    setIsCreateRecordOpen(false)
    setNewRecord({
      estudiante: "",
      grado: "",
      edad: "",
      motivo: "",
      descripcion: "",
      psicologo: "",
    })
  }

  const estadosData = [
    {
      name: "En tratamiento",
      value: registrosPsicologia.filter((r) => r.estado === "En tratamiento").length,
      color: "#3b82f6",
    },
    {
      name: "Seguimiento",
      value: registrosPsicologia.filter((r) => r.estado === "Seguimiento").length,
      color: "#eab308",
    },
    { name: "Alta", value: registrosPsicologia.filter((r) => r.estado === "Alta").length, color: "#22c55e" },
    { name: "Remitido", value: registrosPsicologia.filter((r) => r.estado === "Remitido").length, color: "#a855f7" },
  ]

  const tendenciaData = [
    { mes: "Ene", casos: 12 },
    { mes: "Feb", casos: 15 },
    { mes: "Mar", casos: 18 },
    { mes: "Abr", casos: 22 },
    { mes: "May", casos: 19 },
    { mes: "Jun", casos: 25 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Gestión de Psicología</h2>
        <Dialog open={isCreateRecordOpen} onOpenChange={setIsCreateRecordOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nuevo Registro</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Registro Psicológico</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="estudiante">Nombre del Estudiante</Label>
                <Input
                  id="estudiante"
                  value={newRecord.estudiante}
                  onChange={(e) => setNewRecord({ ...newRecord, estudiante: e.target.value })}
                  placeholder="Nombre completo"
                />
              </div>
              <div>
                <Label htmlFor="grado">Grado</Label>
                <Input
                  id="grado"
                  value={newRecord.grado}
                  onChange={(e) => setNewRecord({ ...newRecord, grado: e.target.value })}
                  placeholder="Ej: 8°A"
                />
              </div>
              <div>
                <Label htmlFor="edad">Edad</Label>
                <Input
                  id="edad"
                  type="number"
                  value={newRecord.edad}
                  onChange={(e) => setNewRecord({ ...newRecord, edad: e.target.value })}
                  placeholder="Edad del estudiante"
                />
              </div>
              <div>
                <Label htmlFor="psicologo">Psicólogo Asignado</Label>
                <Select
                  value={newRecord.psicologo}
                  onValueChange={(value) => setNewRecord({ ...newRecord, psicologo: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar psicólogo" />
                  </SelectTrigger>
                  <SelectContent>
                    {psicologos.map((psicologo) => (
                      <SelectItem key={psicologo} value={psicologo}>
                        {psicologo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="motivo">Motivo de Consulta</Label>
                <Input
                  id="motivo"
                  value={newRecord.motivo}
                  onChange={(e) => setNewRecord({ ...newRecord, motivo: e.target.value })}
                  placeholder="Ej: Ansiedad académica"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={newRecord.descripcion}
                  onChange={(e) => setNewRecord({ ...newRecord, descripcion: e.target.value })}
                  placeholder="Descripción detallada del caso"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsCreateRecordOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateRecord}>Crear Registro</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Métricas principales - ahora más prominentes */}
        <div className="xl:col-span-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{registrosPsicologia.length}</div>
                    <div className="text-sm text-muted-foreground">Total Casos</div>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-green-600">
                      {registrosPsicologia.filter((r) => r.estado === "Alta").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Casos Cerrados</div>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-yellow-600">
                      {registrosPsicologia.filter((r) => r.estado === "En tratamiento").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Casos Activos</div>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600">
                      {registrosPsicologia.filter((r) => r.estado === "Seguimiento").length}
                    </div>
                    <div className="text-sm text-muted-foreground">En Seguimiento</div>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <AlertCircle className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Gráficas principales - mejor distribución */}
        <div className="xl:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Motivos Más Comunes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* <ResponsiveContainer width="100%" height={350}>
                <BarChart data={motivosPsicologia} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="motivo" type="category" width={120} fontSize={11} />
                  <Tooltip />
                  <Bar dataKey="cantidad" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer> */}
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-2 space-y-6">
          {/* Gráfica de distribución de estados */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Distribución de Estados</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={estadosData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {estadosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer> */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {estadosData.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">({item.value})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tendencia mensual */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tendencia de Nuevos Casos</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <ResponsiveContainer width="100%" height={200}>
                <LineChart data={tendenciaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="casos"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer> */}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lista de registros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Registros Psicológicos</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por estudiante, grado o motivo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No se encontraron registros que coincidan con la búsqueda
              </div>
            ) : (
              filteredRecords.map((record) => (
                <div key={record.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={record.estudiante.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          <User className="w-6 h-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{record.estudiante.nombre}</h3>
                          <Badge variant="outline">{record.estudiante.grado}</Badge>
                          <Badge className={getEstadoBadgeColor(record.estado)}>{record.estado}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          <strong>Motivo:</strong> {record.motivo}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">{record.descripcion}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                          <div>
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Ingreso: {record.fechaIngreso}
                          </div>
                          <div>
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Última: {record.ultimaConsulta}
                          </div>
                          <div>Sesiones: {record.numeroSesiones}</div>
                          <div>{record.psicologo}</div>
                        </div>
                        {record.proximaCita && (
                          <div className="mt-2 text-xs text-blue-600">
                            <Calendar className="w-3 h-3 inline mr-1" />
                            Próxima cita: {record.proximaCita}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
