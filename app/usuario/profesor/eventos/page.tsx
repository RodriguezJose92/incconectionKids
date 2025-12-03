"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Users,
  Upload,
} from "lucide-react";
import { categoriaEventos } from "./data";
import { EventStore, type Event } from "@/Stores/eventStore";
import { InstituteStore } from "@/Stores/InstituteStore";

type EventFormData = {
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  horaInicio: string;
  horaFin: string;
  ubicacion: string;
  categoria: string;
  imagen: string;
};

export default function EventsManagement() {
  const { events, addEvent, updateEvent, deleteEvent, loading } = EventStore();
  const { institute } = InstituteStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [isDeleteEventOpen, setIsDeleteEventOpen] = useState(false);
  const [isMassUploadOpen, setIsMassUploadOpen] = useState(false);
  const [eventForm, setEventForm] = useState<EventFormData>({
    titulo: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    horaInicio: "",
    horaFin: "",
    ubicacion: "",
    categoria: "",
    imagen: "",
  });

  const filteredEvents = events.filter((evento) => {
    const titulo = evento.title?.toLowerCase() || "";
    const categoria = evento.category?.toLowerCase() || "";
    const ubicacion = evento.location?.toLowerCase() || "";
    const fechaInicio = evento.start_at ? new Date(evento.start_at) : null;

    const matchesSearch =
      titulo.includes(searchTerm.toLowerCase()) ||
      categoria.includes(searchTerm.toLowerCase()) ||
      ubicacion.includes(searchTerm.toLowerCase());

    const matchesMonth =
      selectedMonth === "" ||
      (fechaInicio &&
        fechaInicio.getMonth() === Number.parseInt(selectedMonth));

    return matchesSearch && matchesMonth;
  });

  const getCategoryColor = (categoria?: string) => {
    const colors: { [key: string]: string } = {
      Académico: "bg-blue-100 text-blue-800",
      Cultural: "bg-purple-100 text-purple-800",
      Deportivo: "bg-green-100 text-green-800",
      Ceremonial: "bg-yellow-100 text-yellow-800",
      Administrativo: "bg-gray-100 text-gray-800",
    };
    return colors[categoria ?? ""] || "bg-gray-100 text-gray-800";
  };

  const getMonthOptions = () => {
    const months = [
      { value: "", label: "Todos los meses" },
      { value: "0", label: "Enero" },
      { value: "1", label: "Febrero" },
      { value: "2", label: "Marzo" },
      { value: "3", label: "Abril" },
      { value: "4", label: "Mayo" },
      { value: "5", label: "Junio" },
      { value: "6", label: "Julio" },
      { value: "7", label: "Agosto" },
      { value: "8", label: "Septiembre" },
      { value: "9", label: "Octubre" },
      { value: "10", label: "Noviembre" },
      { value: "11", label: "Diciembre" },
    ];
    return months;
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCreateEvent = async () => {
    // Validar campos requeridos
    if (
      !eventForm.titulo ||
      !eventForm.categoria ||
      !eventForm.fechaInicio ||
      !eventForm.fechaFin
    ) {
      alert(
        "Por favor completa al menos el título, categoría, fecha de inicio y fecha de fin"
      );
      return;
    }

    if (!institute.id) {
      alert(
        "No se encontró el ID del instituto. Por favor inicia sesión nuevamente."
      );
      return;
    }

    try {
      // Combinar fecha y hora para crear ISO strings
      const startDateTime = eventForm.horaInicio
        ? new Date(
            `${eventForm.fechaInicio}T${eventForm.horaInicio}:00`
          ).toISOString()
        : new Date(`${eventForm.fechaInicio}T00:00:00`).toISOString();

      const endDateTime = eventForm.horaFin
        ? new Date(
            `${eventForm.fechaFin}T${eventForm.horaFin}:00`
          ).toISOString()
        : new Date(`${eventForm.fechaFin}T23:59:59`).toISOString();

      const newEvent: Event = {
        id: crypto.randomUUID(),
        institute_id: institute.id,
        title: eventForm.titulo,
        description: eventForm.descripcion || null,
        category: eventForm.categoria || null,
        location: eventForm.ubicacion || null,
        start_at: startDateTime,
        end_at: endDateTime,
        is_all_day: !eventForm.horaInicio && !eventForm.horaFin,
        image_url: eventForm.imagen || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await addEvent(newEvent);

      // Limpiar el formulario
      setEventForm({
        titulo: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        horaInicio: "",
        horaFin: "",
        ubicacion: "",
        categoria: "",
        imagen: "",
      });

      // Cerrar el diálogo
      setIsCreateEventOpen(false);
    } catch (error) {
      console.error("Error al crear evento:", error);
      alert("Hubo un error al crear el evento. Por favor intenta de nuevo.");
    }
  };

  const handleUpdateEvent = async () => {
    if (!selectedEvent) {
      alert("No hay evento seleccionado para actualizar");
      return;
    }

    try {
      const updates: Partial<Event> = {
        title: selectedEvent.title,
        description: selectedEvent.description,
        category: selectedEvent.category,
        location: selectedEvent.location,
        start_at: selectedEvent.start_at,
        end_at: selectedEvent.end_at,
        image_url: selectedEvent.image_url,
        updated_at: new Date().toISOString(),
      };

      await updateEvent(selectedEvent.id, updates);

      // Cerrar el diálogo
      setIsEditEventOpen(false);
    } catch (error) {
      console.error("Error al actualizar evento:", error);
      alert(
        "Hubo un error al actualizar el evento. Por favor intenta de nuevo."
      );
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) {
      alert("No hay evento seleccionado para eliminar");
      return;
    }

    try {
      await deleteEvent(selectedEvent.id);

      // Cerrar el diálogo
      setIsDeleteEventOpen(false);

      // Seleccionar el primer evento de la lista después de eliminar
      if (events.length > 1) {
        setSelectedEvent(events[0]);
      }
    } catch (error) {
      console.error("Error al eliminar evento:", error);
      alert("Hubo un error al eliminar el evento. Por favor intenta de nuevo.");
    }
  };

  useEffect(() => {
    if (events.length > 0) {
      setSelectedEvent(events[0]);
    }
  }, [events]);

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Gestión de Eventos
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de información del evento seleccionado */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Información del Evento</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!selectedEvent ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="font-medium">No hay evento seleccionado</p>
                  <p className="text-sm mt-2">
                    Selecciona un evento de la lista para ver sus detalles
                  </p>
                </div>
              ) : (
                <>
                  <div className="aspect-square w-full max-w-sm mx-auto">
                    <img
                      src={selectedEvent.image_url || "/placeholder.svg"}
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {selectedEvent.title}
                      </h3>
                      <Badge
                        className={getCategoryColor(
                          selectedEvent.category || undefined
                        )}
                      >
                        {selectedEvent.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedEvent.description}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">Fecha de inicio:</span>
                        <span>{formatDate(selectedEvent.start_at)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-red-500" />
                        <span className="font-medium">Fecha de fin:</span>
                        <span>{formatDate(selectedEvent.end_at)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span className="font-medium">Horario:</span>
                        <span>
                          {formatTime(selectedEvent.start_at)} -{" "}
                          {formatTime(selectedEvent.end_at)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span className="font-medium">Ubicación:</span>
                        <span>{selectedEvent.location}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog
                        open={isEditEventOpen}
                        onOpenChange={setIsEditEventOpen}
                      >
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex-1">
                            <Edit className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Editar Evento Completo</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <label className="text-sm font-medium">
                                Título
                              </label>
                              <Input
                                defaultValue={selectedEvent.title}
                                onChange={(e) =>
                                  setSelectedEvent({
                                    ...selectedEvent,
                                    title: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="text-sm font-medium">
                                Descripción
                              </label>
                              <Textarea
                                defaultValue={selectedEvent.description || ""}
                                onChange={(e) =>
                                  setSelectedEvent({
                                    ...selectedEvent,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Fecha de Inicio
                              </label>
                              <Input
                                type="date"
                                defaultValue={
                                  selectedEvent.start_at?.split("T")[0]
                                }
                                onChange={(e) =>
                                  setSelectedEvent({
                                    ...selectedEvent,
                                    start_at: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Fecha de Fin
                              </label>
                              <Input
                                type="date"
                                defaultValue={
                                  selectedEvent.end_at?.split("T")[0]
                                }
                                onChange={(e) =>
                                  setSelectedEvent({
                                    ...selectedEvent,
                                    end_at: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Hora de Inicio
                              </label>
                              <Input
                                type="time"
                                defaultValue={
                                  selectedEvent.start_at
                                    ? new Date(selectedEvent.start_at)
                                        .toISOString()
                                        .split("T")[1]
                                        ?.slice(0, 5)
                                    : ""
                                }
                                onChange={(e) =>
                                  setSelectedEvent({
                                    ...selectedEvent,
                                    start_at: `${
                                      selectedEvent.start_at?.split("T")[0]
                                    }T${e.target.value}:00`,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Hora de Fin
                              </label>
                              <Input
                                type="time"
                                defaultValue={
                                  selectedEvent.end_at
                                    ? new Date(selectedEvent.end_at)
                                        .toISOString()
                                        .split("T")[1]
                                        ?.slice(0, 5)
                                    : ""
                                }
                                onChange={(e) =>
                                  setSelectedEvent({
                                    ...selectedEvent,
                                    end_at: `${
                                      selectedEvent.end_at?.split("T")[0]
                                    }T${e.target.value}:00`,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Ubicación
                              </label>
                              <Input
                                defaultValue={selectedEvent.location || ""}
                                onChange={(e) =>
                                  setSelectedEvent({
                                    ...selectedEvent,
                                    location: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">
                                Categoría
                              </label>
                              <select
                                defaultValue={selectedEvent.category || ""}
                                onChange={(e) =>
                                  setSelectedEvent({
                                    ...selectedEvent,
                                    category: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-input rounded-md"
                              >
                                <option value="">Seleccionar categoría</option>
                                {categoriaEventos.map((cat: any) => (
                                  <option key={cat} value={cat}>
                                    {cat}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-span-2">
                              <label className="text-sm font-medium">
                                URL de Imagen
                              </label>
                              <Input
                                defaultValue={selectedEvent.image_url || ""}
                                onChange={(e) =>
                                  setSelectedEvent({
                                    ...selectedEvent,
                                    image_url: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-span-2 flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => setIsEditEventOpen(false)}
                                disabled={loading}
                              >
                                Cancelar
                              </Button>
                              <Button
                                onClick={handleUpdateEvent}
                                disabled={loading}
                              >
                                {loading ? "Guardando..." : "Guardar Cambios"}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={isDeleteEventOpen}
                        onOpenChange={setIsDeleteEventOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="flex-1"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Eliminar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirmar Eliminación</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              ¿Estás seguro de que quieres eliminar el evento{" "}
                              <span className="font-semibold text-foreground">
                                "{selectedEvent?.title}"
                              </span>
                              ? Esta acción no se puede deshacer.
                            </p>
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => setIsDeleteEventOpen(false)}
                                disabled={loading}
                              >
                                Cancelar
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={handleDeleteEvent}
                                disabled={loading}
                              >
                                {loading ? "Eliminando..." : "Sí, Eliminar"}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Lista de eventos */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Lista de Eventos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="px-3 py-2 border border-input rounded-md text-sm"
                  >
                    {getMonthOptions().map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <Search className="w-4 h-4" />
                  <Input
                    placeholder="Buscar eventos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="font-medium">No se encontraron eventos</p>
                    <p className="text-sm mt-2">
                      {searchTerm || selectedMonth
                        ? "Intenta ajustar los filtros de búsqueda"
                        : "Crea tu primer evento usando el botón 'Nuevo Evento'"}
                    </p>
                  </div>
                ) : (
                  filteredEvents.map((evento) => (
                    <div
                      key={evento.id}
                      onClick={() => setSelectedEvent(evento)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedEvent?.id === evento.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{evento.title}</h4>
                            <Badge
                              className={getCategoryColor(
                                evento.category || undefined
                              )}
                            >
                              {evento.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {evento.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(evento.start_at)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatTime(evento.start_at)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{evento.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
