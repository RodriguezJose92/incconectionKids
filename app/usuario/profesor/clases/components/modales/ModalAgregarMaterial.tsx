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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileText,
  Loader2,
  X,
  Image,
  Video,
  Music,
  FileArchive,
  File,
} from "lucide-react";
import { GroupHasMaterialStore } from "@/Stores/groupHasMaterialStore";
import { PeriodAcademicStore } from "@/Stores/periodAcademicStore";
import { CycleStore } from "@/Stores/cycleStore";
import { createClient } from "@/lib/supabase/client";

interface ModalAgregarMaterialProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupHasClassId: string;
  cycleId?: string; // ✅ Added to accept cycleId from parent
}

export function ModalAgregarMaterial({
  open,
  onOpenChange,
  groupHasClassId,
  cycleId, // ✅ Destructure cycleId from props
}: ModalAgregarMaterialProps) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [periodoAcademicoId, setPeriodoAcademicoId] = useState("");
  const [cicloAcademicoId, setCicloAcademicoId] = useState(cycleId || ""); // ✅ Initialize with passed cycleId
  const [isDragging, setIsDragging] = useState(false);

  const { addMaterial } = GroupHasMaterialStore();
  const { periodos, fetchPeriodos } = PeriodAcademicStore();
  const { cycles, fetchCyclesByAcademicPeriod } = CycleStore();
  const supabase = createClient();

  // Cargar periodos académicos al abrir el modal
  useEffect(() => {
    if (open) {
      fetchPeriodos();
    }
  }, [open, fetchPeriodos]);

  // Cargar ciclos cuando se selecciona un periodo académico
  useEffect(() => {
    if (periodoAcademicoId) {
      fetchCyclesByAcademicPeriod(periodoAcademicoId);
      setCicloAcademicoId(""); // Reset ciclo cuando cambia el periodo
    }
  }, [periodoAcademicoId, fetchCyclesByAcademicPeriod]);

  // Filtrar solo los periodos y ciclos activos
  const periodosActivos = periodos.filter((periodo) => periodo.is_active);
  const ciclosActivos = cycles.filter((ciclo) => ciclo.is_active);

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

  // Funciones para drag & drop
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
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

    if (!periodoAcademicoId) {
      setError("Debes seleccionar un periodo académico");
      return;
    }

    if (!cicloAcademicoId) {
      setError("Debes seleccionar un ciclo académico");
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
        cycle_id: cicloAcademicoId,
        academic_period_id: periodoAcademicoId,
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
      setPeriodoAcademicoId("");
      setCicloAcademicoId("");
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
    setPeriodoAcademicoId("");
    setCicloAcademicoId("");
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

          {/* Periodo Académico */}
          <div className="space-y-2">
            <Label htmlFor="periodo">Periodo Académico *</Label>
            <Select
              value={periodoAcademicoId}
              onValueChange={setPeriodoAcademicoId}
              disabled={uploading}
            >
              <SelectTrigger id="periodo">
                <SelectValue placeholder="Selecciona un periodo académico" />
              </SelectTrigger>
              <SelectContent>
                {periodosActivos.length === 0 ? (
                  <div className="py-2 px-2 text-sm text-muted-foreground">
                    No hay periodos académicos activos
                  </div>
                ) : (
                  periodosActivos.map((periodo) => (
                    <SelectItem key={periodo.id} value={periodo.id}>
                      {periodo.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Ciclo Académico */}
          <div className="space-y-2">
            <Label htmlFor="ciclo">Ciclo Académico *</Label>
            <Select
              value={cicloAcademicoId}
              onValueChange={setCicloAcademicoId}
              disabled={uploading || !periodoAcademicoId}
            >
              <SelectTrigger id="ciclo">
                <SelectValue placeholder="Selecciona un ciclo académico" />
              </SelectTrigger>
              <SelectContent>
                {!periodoAcademicoId ? (
                  <div className="py-2 px-2 text-sm text-muted-foreground">
                    Primero selecciona un periodo académico
                  </div>
                ) : ciclosActivos.length === 0 ? (
                  <div className="py-2 px-2 text-sm text-muted-foreground">
                    No hay ciclos académicos activos para este periodo
                  </div>
                ) : (
                  ciclosActivos.map((ciclo) => (
                    <SelectItem key={ciclo.id} value={ciclo.id}>
                      {ciclo.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Archivo */}
          <div className="space-y-2">
            <Label htmlFor="file">Archivo *</Label>
            {!file ? (
              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                  relative border-2 border-dashed rounded-lg p-8
                  transition-all duration-200 ease-in-out
                  ${
                    isDragging
                      ? "border-primary bg-primary/5 scale-[1.02]"
                      : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
                  }
                  ${
                    uploading
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }
                `}
              >
                <Input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.mp3,.zip,.rar"
                />
                <div className="flex flex-col items-center justify-center gap-3 pointer-events-none">
                  <div
                    className={`
                    p-4 rounded-full transition-all duration-200
                    ${isDragging ? "bg-primary/20 scale-110" : "bg-muted/50"}
                  `}
                  >
                    <Upload
                      className={`h-8 w-8 transition-colors ${
                        isDragging ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="text-center">
                    <p
                      className={`text-sm font-medium transition-colors ${
                        isDragging ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {isDragging
                        ? "Suelta el archivo aquí"
                        : "Arrastra y suelta tu archivo aquí"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      o haz clic para seleccionar
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                    <span className="text-xs px-2 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      PDF
                    </span>
                    <span className="text-xs px-2 py-1 rounded-md bg-green-500/10 text-green-600 dark:text-green-400">
                      Word
                    </span>
                    <span className="text-xs px-2 py-1 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400">
                      Excel
                    </span>
                    <span className="text-xs px-2 py-1 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      Imágenes
                    </span>
                    <span className="text-xs px-2 py-1 rounded-md bg-pink-500/10 text-pink-600 dark:text-pink-400">
                      Videos
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <div className="flex items-start gap-4 p-4 border-2 border-primary/20 rounded-lg bg-primary/5 transition-all hover:bg-primary/10">
                  <div className="flex-shrink-0 mt-1">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {file.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                        Listo para subir
                      </span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={removeFile}
                    disabled={uploading}
                    className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
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
