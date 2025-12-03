"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Plus,
  Download,
  Eye,
  MoreVertical,
  Edit,
  Trash2,
  Loader2,
  ClipboardList,
  Calendar,
  Clock,
  AlertCircle,
  ClipboardCheck,
} from "lucide-react";
import type { GroupHasActivity } from "@/Stores/groupHasActivityStore";
import { CycleStore } from "@/Stores/cycleStore";

interface TabActividadesProps {
  actividades: GroupHasActivity[];
  loading: boolean;
  onAbrirModal: (actividad: GroupHasActivity) => void;
  onAbrirModalEdicion: (actividad: GroupHasActivity) => void;
  onAbrirModalEliminacion: (actividad: GroupHasActivity) => void;
  onAbrirModalAgregar: () => void;
  onVerEntregas?: (actividad: GroupHasActivity) => void;
}

export function TabActividades({
  actividades,
  loading,
  onAbrirModal,
  onAbrirModalEdicion,
  onAbrirModalEliminacion,
  onAbrirModalAgregar,
  onVerEntregas,
}: TabActividadesProps) {
  const { cycles } = CycleStore();

  // Función para obtener el nombre del ciclo por ID
  const getCycleName = (cycleId: string) => {
    const cycle = cycles.find((c) => c.id === cycleId);
    return cycle ? cycle.name : "Ciclo desconocido";
  };

  // Función para formatear el tamaño del archivo
  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Desconocido";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Función para formatear la fecha límite con hora
  const formatLimitDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Función para verificar el estado de la fecha límite
  const getLimitDateStatus = (limitDate: string | null) => {
    if (!limitDate) return null;

    const now = new Date();
    const limit = new Date(limitDate);
    const diffTime = limit.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffTime < 0) {
      return {
        status: "expired",
        text: "Vencida",
        color: "text-destructive",
        bgColor: "bg-destructive/10",
        icon: AlertCircle,
      };
    } else if (diffDays <= 2) {
      return {
        status: "urgent",
        text: "Próxima a vencer",
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-100 dark:bg-orange-950",
        icon: Clock,
      };
    } else {
      return {
        status: "active",
        text: "Activa",
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-100 dark:bg-green-950",
        icon: Calendar,
      };
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Actividades del Curso</CardTitle>
            <CardDescription>
              Tareas, exámenes y proyectos para los estudiantes
            </CardDescription>
          </div>
          <Button onClick={onAbrirModalAgregar}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Actividad
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Cargando actividades...</p>
          </div>
        ) : actividades.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="rounded-full bg-muted p-6">
              <ClipboardList className="h-16 w-16 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">
                No hay actividades disponibles
              </h3>
              <p className="text-muted-foreground max-w-md">
                Aún no se han creado actividades para este curso. Comienza
                agregando tareas, exámenes o proyectos para tus estudiantes.
              </p>
            </div>
            <Button onClick={onAbrirModalAgregar} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Agregar primera actividad
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {actividades.map((actividad) => (
              <div
                key={actividad.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="h-8 w-8 text-orange-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-lg">{actividad.title}</p>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          actividad.is_active
                            ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {actividad.is_active ? "Activa" : "Inactiva"}
                      </span>
                    </div>
                    {actividad.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {actividad.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>{actividad.mime_type || "Archivo"}</span>
                      <span>•</span>
                      <span>{formatDate(actividad.created_at)}</span>
                      <span>•</span>
                      <span>{formatFileSize(actividad.file_size)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      📅 <b>Periodo académico: </b>
                      {getCycleName(actividad.cycle_id)}
                    </p>
                    {actividad.original_name && (
                      <p className="text-xs text-muted-foreground mt-1">
                        📎 {actividad.original_name}
                      </p>
                    )}
                    {actividad.limit_date && (
                      <div className="mt-2">
                        {(() => {
                          const status = getLimitDateStatus(
                            actividad.limit_date
                          );
                          if (!status) return null;
                          const Icon = status.icon;
                          return (
                            <div
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${status.bgColor} ${status.color}`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              <span>
                                {status.text}:{" "}
                                {formatLimitDate(actividad.limit_date)}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAbrirModal(actividad)}
                    title="Ver actividad"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {}}
                    className="gap-2"
                    title="Ver entregas de estudiantes"
                  >
                    <ClipboardCheck className="h-4 w-4" />
                    <span className="hidden sm:inline">Entregas</span>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => onAbrirModalEdicion(actividad)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-destructive"
                        onClick={() => onAbrirModalEliminacion(actividad)}
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
        )}
      </CardContent>
    </Card>
  );
}
