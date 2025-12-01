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
  FolderOpen,
} from "lucide-react";
import type { GroupHasMaterial } from "@/Stores/groupHasMaterialStore";

interface TabContenidoProps {
  materiales: GroupHasMaterial[];
  loading: boolean;
  onAbrirModal: (material: GroupHasMaterial) => void;
  onAbrirModalEdicion: (material: GroupHasMaterial) => void;
  onAbrirModalEliminacion: (material: GroupHasMaterial) => void;
  onAbrirModalAgregar: () => void;
}

export function TabContenido({
  materiales,
  loading,
  onAbrirModal,
  onAbrirModalEdicion,
  onAbrirModalEliminacion,
  onAbrirModalAgregar,
}: TabContenidoProps) {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Material del Curso</CardTitle>
            <CardDescription>
              Documentos, videos y recursos de aprendizaje
            </CardDescription>
          </div>
          <Button onClick={onAbrirModalAgregar}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar Contenido
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Cargando materiales...</p>
          </div>
        ) : materiales.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <div className="rounded-full bg-muted p-6">
              <FolderOpen className="h-16 w-16 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">
                No hay contenido disponible
              </h3>
              <p className="text-muted-foreground max-w-md">
                Aún no se han agregado materiales a este curso. Comienza
                agregando documentos, videos o recursos de aprendizaje para tus
                estudiantes.
              </p>
            </div>
            <Button onClick={onAbrirModalAgregar} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Agregar primer material
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {materiales.map(
              (material) => (
                console.log(material),
                (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <p className="font-medium">{material.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {material.mime_type || "Archivo"} •{" "}
                          {formatDate(material.created_at)} •{" "}
                          {formatFileSize(material.file_size)}
                        </p>
                        {material.original_name && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {material.original_name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onAbrirModal(material)}
                      >
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
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => onAbrirModalEdicion(material)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer text-destructive"
                            onClick={() => onAbrirModalEliminacion(material)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
