"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MessageSquare, Clock, AlertCircle, Plus, Send } from "lucide-react"
import { ticketsList, tiposTicket, estadosTicket, prioridadesTicket } from "./data"

export default function SupportManagement() {
  const [tickets, setTickets] = useState(ticketsList)
  const [selectedTicket, setSelectedTicket] = useState(tickets[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState("todos")
  const [filterTipo, setFilterTipo] = useState("todos")
  const [newResponse, setNewResponse] = useState("")
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false)
  const [newTicket, setNewTicket] = useState({
    titulo: "",
    descripcion: "",
    usuario: "",
    correo: "",
    tipo: "",
    prioridad: "Media",
  })

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEstado = filterEstado === "todos" || ticket.estado === filterEstado
    const matchesTipo = filterTipo === "todos" || ticket.tipo === filterTipo
    return matchesSearch && matchesEstado && matchesTipo
  })

  const getEstadoBadgeColor = (estado: string) => {
    switch (estado) {
      case "Abierto":
        return "bg-red-100 text-red-800"
      case "En proceso":
        return "bg-yellow-100 text-yellow-800"
      case "Resuelto":
        return "bg-green-100 text-green-800"
      case "Cerrado":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPrioridadBadgeColor = (prioridad: string) => {
    switch (prioridad) {
      case "Urgente":
        return "bg-red-500 text-white"
      case "Alta":
        return "bg-orange-500 text-white"
      case "Media":
        return "bg-blue-500 text-white"
      case "Baja":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const handleSendResponse = () => {
    if (!newResponse.trim()) return

    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedTicket.id) {
        const updatedTicket = {
          ...ticket,
          respuestas: [
            ...ticket.respuestas,
            {
              id: ticket.respuestas.length + 1,
              autor: "Administrador",
              mensaje: newResponse,
              fecha: new Date().toLocaleString(),
            },
          ],
          fechaActualizacion: new Date().toISOString().split("T")[0],
          estado: ticket.estado === "Abierto" ? "En proceso" : ticket.estado,
        }
        setSelectedTicket(updatedTicket)
        return updatedTicket
      }
      return ticket
    })

    setTickets(updatedTickets)
    setNewResponse("")
  }

  const handleCreateTicket = () => {
    if (!newTicket.titulo || !newTicket.descripcion || !newTicket.usuario || !newTicket.correo || !newTicket.tipo)
      return

    const ticket = {
      id: tickets.length + 1,
      ...newTicket,
      estado: "Abierto",
      fechaCreacion: new Date().toISOString().split("T")[0],
      fechaActualizacion: new Date().toISOString().split("T")[0],
      respuestas: [],
    }

    setTickets([ticket, ...tickets])
    setNewTicket({
      titulo: "",
      descripcion: "",
      usuario: "",
      correo: "",
      tipo: "",
      prioridad: "Media",
    })
    setIsNewTicketOpen(false)
  }

  const handleChangeStatus = (newStatus: string) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedTicket.id) {
        const updatedTicket = {
          ...ticket,
          estado: newStatus,
          fechaActualizacion: new Date().toISOString().split("T")[0],
        }
        setSelectedTicket(updatedTicket)
        return updatedTicket
      }
      return ticket
    })
    setTickets(updatedTickets)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Soporte y Ayuda</h2>
        <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nuevo Ticket</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Ticket</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Título</label>
                <Input
                  value={newTicket.titulo}
                  onChange={(e) => setNewTicket({ ...newTicket, titulo: e.target.value })}
                  placeholder="Título del ticket"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Usuario</label>
                <Input
                  value={newTicket.usuario}
                  onChange={(e) => setNewTicket({ ...newTicket, usuario: e.target.value })}
                  placeholder="Nombre del usuario"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Correo</label>
                <Input
                  value={newTicket.correo}
                  onChange={(e) => setNewTicket({ ...newTicket, correo: e.target.value })}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Tipo</label>
                  <Select value={newTicket.tipo} onValueChange={(value) => setNewTicket({ ...newTicket, tipo: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposTicket.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Prioridad</label>
                  <Select
                    value={newTicket.prioridad}
                    onValueChange={(value) => setNewTicket({ ...newTicket, prioridad: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {prioridadesTicket.map((prioridad) => (
                        <SelectItem key={prioridad} value={prioridad}>
                          {prioridad}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Descripción</label>
                <Textarea
                  value={newTicket.descripcion}
                  onChange={(e) => setNewTicket({ ...newTicket, descripcion: e.target.value })}
                  placeholder="Describe el problema o consulta..."
                  rows={3}
                />
              </div>
              <Button onClick={handleCreateTicket} className="w-full">
                Crear Ticket
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de tickets */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Tickets de Soporte</span>
              </CardTitle>
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Select value={filterEstado} onValueChange={setFilterEstado}>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los estados</SelectItem>
                      {estadosTicket.map((estado) => (
                        <SelectItem key={estado} value={estado}>
                          {estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={filterTipo} onValueChange={setFilterTipo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los tipos</SelectItem>
                      {tiposTicket.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedTicket.id === ticket.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm line-clamp-2">{ticket.titulo}</h4>
                      <Badge className={`text-xs ${getPrioridadBadgeColor(ticket.prioridad)}`}>
                        {ticket.prioridad}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{ticket.usuario}</span>
                      <Badge className={`text-xs ${getEstadoBadgeColor(ticket.estado)}`}>{ticket.estado}</Badge>
                    </div>
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {ticket.fechaCreacion}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detalle del ticket */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Ticket #{selectedTicket.id}</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Select value={selectedTicket.estado} onValueChange={handleChangeStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {estadosTicket.map((estado) => (
                        <SelectItem key={estado} value={estado}>
                          {estado}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{selectedTicket.titulo}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Por: {selectedTicket.usuario}</span>
                  <span>•</span>
                  <span>{selectedTicket.correo}</span>
                  <span>•</span>
                  <Badge className={`${getPrioridadBadgeColor(selectedTicket.prioridad)}`}>
                    {selectedTicket.prioridad}
                  </Badge>
                  <Badge variant="outline">{selectedTicket.tipo}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm">{selectedTicket.descripcion}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    Creado el {selectedTicket.fechaCreacion}
                  </div>
                </div>

                {/* Historial de respuestas */}
                <div className="space-y-3">
                  <h4 className="font-medium">Historial de Respuestas</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedTicket.respuestas.map((respuesta) => (
                      <div key={respuesta.id} className="flex space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {respuesta.autor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-white border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">{respuesta.autor}</span>
                              <span className="text-xs text-gray-500">{respuesta.fecha}</span>
                            </div>
                            <p className="text-sm">{respuesta.mensaje}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nueva respuesta */}
                <div className="space-y-3">
                  <h4 className="font-medium">Responder</h4>
                  <div className="space-y-2">
                    <Textarea
                      value={newResponse}
                      onChange={(e) => setNewResponse(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      rows={3}
                    />
                    <Button onClick={handleSendResponse} className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Enviar Respuesta</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
