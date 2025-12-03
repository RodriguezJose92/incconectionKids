"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Edit,
  Loader2,
  FileText,
  Image,
  Video,
  Music,
  FileArchive,
  File,
} from "lucide-react";
import {
  GroupHasMaterialStore,
  type GroupHasMaterial,
} from "@/Stores/groupHasMaterialStore";
import { Switch } from "@/components/ui/switch";
import { PeriodAcademicStore } from "@/Stores/periodAcademicStore";
import { CycleStore } from "@/Stores/cycleStore";

interface ModalEditarMaterialProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: GroupHasMaterial | null;
}

export function ModalEditarMaterial({
  open,
  onOpenChange,
  material,
}: ModalEditarMaterialProps) {
  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { updateMaterial } = GroupHasMaterialStore();
  const { periodos, fetchPeriodos } = PeriodAcademicStore();
  const { cycles, fetchCycles } = CycleStore();

  // Función para obtener el ícono según el tipo de archivo
  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith("image/")) {
      return <Image className="h-8 w-8 text-blue-500" />;
    } else if (mimeType.startsWith("video/")) {
      return <Video className="h-8 w-8 text-purple-500" />;
    } else if (mimeType.startsWith("audio/")) {
      return <Music className="h-8 w-8 text-green-500" />;
    } else if (
      mimeType.includes("zip") ||
      mimeType.includes("rar") ||
      mimeType.includes("compressed")
    ) {
      return <FileArchive className="h-8 w-8 text-orange-500" />;
    } else if (mimeType.includes("pdf")) {
      return <FileText className="h-8 w-8 text-red-500" />;
    } else if (
      mimeType.includes("word") ||
      mimeType.includes("document") ||
      mimeType.includes("presentation") ||
      mimeType.includes("spreadsheet")
    ) {
      return <FileText className="h-8 w-8 text-blue-600" />;
    }
    return <File className="h-8 w-8 text-gray-500" />;
  };

  // Función para formatear el tamaño del archivo
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Obtener el nombre del periodo académico
  const getPeriodoName = () => {
    if (!material?.academic_period_id) return "No especificado";
    const periodo = periodos.find((p) => p.id === material.academic_period_id);
    return periodo?.name || "Periodo no encontrado";
  };

  // Obtener el nombre del ciclo académico
  const getCycloName = () => {
    if (!material?.cycle_id) return "No especificado";
    const ciclo = cycles.find((c) => c.id === material.cycle_id);
    return ciclo?.name || "Ciclo no encontrado";
  };

  // Cargar periodos y ciclos al abrir el modal
  useEffect(() => {
    if (open) {
      fetchPeriodos();
      fetchCycles();
    }
  }, [open, fetchPeriodos, fetchCycles]);

  // Cargar los datos del material cuando se abre el modal
  useEffect(() => {
    if (open && material) {
      setTitle(material.title);
      setIsActive(material.is_active);
      setError(null);
    }
  }, [open, material]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("El título es requerido");
      return;
    }

    if (!material) {
      setError("No hay material seleccionado");
      return;
    }

    setUpdating(true);

    try {
      await updateMaterial(material.id, {
        title: title.trim(),
        is_active: isActive,
        updated_at: new Date().toISOString(),
      });

      // Cerrar modal
      onOpenChange(false);
    } catch (err: any) {
      console.error("Error al actualizar material:", err);
      setError(err.message || "Error al actualizar el material");
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-primary" />
            Editar Material
          </DialogTitle>
          <DialogDescription>
            Modifica la información del material
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Información del archivo (solo lectura) */}
          {material && (
            <div className="space-y-2">
              <Label>Archivo (no modificable)</Label>
              <div className="flex items-start gap-4 p-4 border-2 border-muted rounded-lg bg-muted/30">
                <div className="flex-shrink-0 mt-1">
                  {getFileIcon(material.mime_type || "")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {material.original_name || "Sin nombre"}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {material.file_size
                        ? formatFileSize(material.file_size)
                        : "Tamaño desconocido"}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      {material.mime_type || "Tipo desconocido"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Periodo Académico y Ciclo (solo lectura) */}
          {material && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Periodo Académico</Label>
                <div className="p-3 border rounded-lg bg-muted/20">
                  <p className="text-sm font-medium">{getPeriodoName()}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Ciclo Académico</Label>
                <div className="p-3 border rounded-lg bg-muted/20">
                  <p className="text-sm font-medium">{getCycloName()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título del material *</Label>
            <Input
              id="title"
              type="text"
              placeholder="Ej: Guía de estudio - Capítulo 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={updating}
              required
            />
          </div>

          {/* Estado activo/inactivo */}
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-0.5">
              <Label htmlFor="is_active">Material activo</Label>
              <p className="text-xs text-muted-foreground">
                Los materiales inactivos no serán visibles para los estudiantes
              </p>
            </div>
            <Switch
              id="is_active"
              checked={isActive}
              onCheckedChange={setIsActive}
              disabled={updating}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={updating}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={updating}>
              {updating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Actualizando...
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Guardar Cambios
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
