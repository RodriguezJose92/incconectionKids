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
import { Edit, Loader2, FileText } from "lucide-react";
import {
  GroupHasMaterialStore,
  type GroupHasMaterial,
} from "@/Stores/groupHasMaterialStore";
import { Switch } from "@/components/ui/switch";

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
            <div className="p-3 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-blue-500" />
                <p className="text-sm font-medium text-muted-foreground">
                  Archivo actual:
                </p>
              </div>
              <p className="text-sm font-semibold">
                {material.original_name || "Sin nombre"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {material.mime_type || "Tipo desconocido"} •{" "}
                {material.file_size
                  ? `${(material.file_size / 1024).toFixed(2)} KB`
                  : "Tamaño desconocido"}
              </p>
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
