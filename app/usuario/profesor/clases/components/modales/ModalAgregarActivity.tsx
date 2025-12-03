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
import { Upload, FileText, Loader2, X, File, Image, Video, Music, FileArchive, FileSpreadsheet, Presentation, Calendar } from "lucide-react";
import { GroupHasActivityStore } from "@/Stores/groupHasActivityStore";
import { createClient } from "@/lib/supabase/client";

interface ModalAgregarActivityActivityProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupHasClassId: string;
  cycleId: string;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

// Función para obtener el icono según el tipo de archivo
const getFileIcon = (mimeType: string, fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();

  if (mimeType.startsWith('image/')) return Image;
  if (mimeType.startsWith('video/')) return Video;
  if (mimeType.startsWith('audio/')) return Music;
  if (ext === 'pdf') return FileText;
  if (['doc', 'docx'].includes(ext || '')) return FileText;
  if (['xls', 'xlsx'].includes(ext || '')) return FileSpreadsheet;
  if (['ppt', 'pptx'].includes(ext || '')) return Presentation;
  if (['zip', 'rar', '7z'].includes(ext || '')) return FileArchive;

  return File;
};

// Función para formatear el tamaño del archivo
const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export function ModalAgregarActivity({
  open,
  onOpenChange,
  groupHasClassId,
  cycleId,
}: ModalAgregarActivityActivityProps) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [limitDate, setLimitDate] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { addActivity } = GroupHasActivityStore();
  const supabase = createClient();

  const validateFile = (selectedFile: File): string | null => {
    if (selectedFile.size > MAX_FILE_SIZE) {
      return `El archivo es demasiado grande. Tamaño máximo: ${formatFileSize(MAX_FILE_SIZE)}`;
    }

    const allowedExtensions = [
      'pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'txt',
      'jpg', 'jpeg', 'png', 'gif', 'webp',
      'mp4', 'webm', 'mp3', 'wav',
      'zip', 'rar', '7z'
    ];

    const ext = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      return 'Formato de archivo no soportado';
    }

    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validationError = validateFile(selectedFile);
      if (validationError) {
        setError(validationError);
        return;
      }

      setFile(selectedFile);
      setError(null);
      if (!title) {
        const fileName = selectedFile.name.replace(/\.[^/.]+$/, "");
        setTitle(fileName);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const validationError = validateFile(droppedFile);
      if (validationError) {
        setError(validationError);
        return;
      }

      setFile(droppedFile);
      setError(null);
      if (!title) {
        const fileName = droppedFile.name.replace(/\.[^/.]+$/, "");
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
      setError("Debes seleccionar un archivo de actividad");
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substring(7)}.${fileExt}`;
      const filePath = `activities/${groupHasClassId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("course-activity")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw new Error(`Error al subir archivo: ${uploadError.message}`);
      }

      const newActivity = {
        id: crypto.randomUUID(),
        group_has_class_id: groupHasClassId,
        cycle_id: cycleId,
        title: title.trim(),
        description: "Actividad subida por el profesor",
        bucket: "course-activities",
        storage_path: filePath,
        original_name: file.name,
        mime_type: file.type || null,
        file_size: file.size,
        is_active: true,
        limit_date: limitDate ? new Date(limitDate).toISOString() : null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await addActivity(newActivity);

      setTitle("");
      setFile(null);
      setLimitDate("");
      setError(null);
      onOpenChange(false);
    } catch (err: any) {
      console.error("Error al agregar actividad:", err);
      setError(err.message || "Error al agregar la actividad");
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setFile(null);
    setLimitDate("");
    setError(null);
    setIsDragging(false);
    onOpenChange(false);
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Agregar Actividad
          </DialogTitle>
          <DialogDescription>
            Sube archivos o recursos relacionados con una actividad para tus
            estudiantes
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título de la actividad *</Label>
            <Input
              id="title"
              type="text"
              placeholder="Ej: Actividad de repaso - Unidad 2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={uploading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="limitDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Fecha límite de entrega (opcional)
            </Label>
            <Input
              id="limitDate"
              type="datetime-local"
              value={limitDate}
              onChange={(e) => setLimitDate(e.target.value)}
              disabled={uploading}
              className="cursor-pointer"
              min={new Date().toISOString().slice(0, 16)}
            />
            <p className="text-xs text-muted-foreground">
              Si no se establece, la actividad no tendrá fecha límite
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Archivo *</Label>
            {!file ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 cursor-pointer
                  ${isDragging
                    ? 'border-primary bg-primary/5 scale-[0.98]'
                    : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-accent/50'
                  }
                  ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif,.webp,.mp4,.webm,.mp3,.wav,.zip,.rar,.7z"
                />
                <div className="flex flex-col items-center justify-center gap-3 pointer-events-none">
                  <div className={`
                    p-3 rounded-full transition-all duration-200
                    ${isDragging ? 'bg-primary/20 scale-110' : 'bg-primary/10'}
                  `}>
                    <Upload className={`h-8 w-8 transition-colors ${isDragging ? 'text-primary' : 'text-primary/70'}`} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium mb-1">
                      {isDragging ? '¡Suelta el archivo aquí!' : 'Arrastra un archivo o haz clic para seleccionar'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Tamaño máximo: {formatFileSize(MAX_FILE_SIZE)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="group relative flex items-center justify-between p-4 border-2 border-primary/20 rounded-lg bg-primary/5 transition-all hover:border-primary/40">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {(() => {
                    const FileIcon = getFileIcon(file.type, file.name);
                    return (
                      <div className="flex-shrink-0 p-2 rounded-lg bg-background">
                        <FileIcon className="h-6 w-6 text-primary" />
                      </div>
                    );
                  })()}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={removeFile}
                  disabled={uploading}
                  className="flex-shrink-0 h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <FileText className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Formatos soportados:</strong> PDF, Word, PowerPoint, Excel, TXT, imágenes (JPG, PNG, GIF, WebP), videos (MP4, WebM), audio (MP3, WAV), archivos comprimidos (ZIP, RAR, 7Z)
              </p>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
              <X className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}

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
                  Agregar Actividad
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
