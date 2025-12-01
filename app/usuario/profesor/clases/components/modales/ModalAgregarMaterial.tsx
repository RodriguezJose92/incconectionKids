"use client";

import { useState } from "react";
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
import { Upload, FileText, Loader2, X } from "lucide-react";
import { GroupHasMaterialStore } from "@/Stores/groupHasMaterialStore";
import { createClient } from "@/lib/supabase/client";

interface ModalAgregarMaterialProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupHasClassId: string;
  cycleId: string;
}

export function ModalAgregarMaterial({
  open,
  onOpenChange,
  groupHasClassId,
  cycleId,
}: ModalAgregarMaterialProps) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addMaterial } = GroupHasMaterialStore();
  const supabase = createClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!title) {
        // Si no hay título, usar el nombre del archivo sin extensión
        const fileName = selectedFile.name.replace(/\.[^/.]+$/, "");
        setTitle(fileName);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("El título es requerido");
      return;
    }

    if (!file) {
      setError("Debes seleccionar un archivo");
      return;
    }

    setUploading(true);

    try {
      // Generar un nombre único para el archivo
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;
      const filePath = `materials/${groupHasClassId}/${fileName}`;

      // Subir archivo a Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("course-materials")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw new Error(`Error al subir archivo: ${uploadError.message}`);
      }

      // Crear el registro del material
      const newMaterial = {
        id: crypto.randomUUID(),
        group_has_class_id: groupHasClassId,
        cycle_id: cycleId,
        title: title.trim(),
        bucket: "course-materials",
        storage_path: filePath,
        original_name: file.name,
        mime_type: file.type || null,
        file_size: file.size,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await addMaterial(newMaterial);

      // Limpiar y cerrar
      setTitle("");
      setFile(null);
      setError(null);
      onOpenChange(false);
    } catch (err: any) {
      console.error("Error al agregar material:", err);
      setError(err.message || "Error al agregar el material");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setFile(null);
    setError(null);
    onOpenChange(false);
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Agregar Material
          </DialogTitle>
          <DialogDescription>
            Sube documentos, videos o recursos de aprendizaje para tus
            estudiantes
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título del material *</Label>
            <Input
              id="title"
              type="text"
              placeholder="Ej: Guía de estudio - Capítulo 1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={uploading}
              required
            />
          </div>

          {/* Archivo */}
          <div className="space-y-2">
            <Label htmlFor="file">Archivo *</Label>
            {!file ? (
              <div className="relative">
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="cursor-pointer"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.mp3,.zip,.rar"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="text-sm text-muted-foreground">
                    Haz clic para seleccionar un archivo
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={removeFile}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Formatos soportados: PDF, Word, PowerPoint, Excel, imágenes,
              videos, audio, ZIP
            </p>
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
              disabled={uploading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Subiendo...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Agregar Material
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
