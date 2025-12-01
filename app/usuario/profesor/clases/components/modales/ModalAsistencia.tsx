"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserCheck, Filter } from "lucide-react";
import type { Estudiante, Curso } from "../../types";

interface ModalAsistenciaProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  curso: Curso | null;
  fechaAsistencia: string;
  setFechaAsistencia: (fecha: string) => void;
  filtroFecha: string;
  setFiltroFecha: (fecha: string) => void;
  asistenciaEstudiantes: Estudiante[];
  setAsistenciaEstudiantes: React.Dispatch<React.SetStateAction<Estudiante[]>>;
  onGuardar: () => void;
}

export function ModalAsistencia({
  open,
  onOpenChange,
  curso,
  fechaAsistencia,
  setFechaAsistencia,
  filtroFecha,
  setFiltroFecha,
  asistenciaEstudiantes,
  setAsistenciaEstudiantes,
  onGuardar,
}: ModalAsistenciaProps) {
  const marcarAsistencia = (estudianteId: string, presente: boolean) => {
    setAsistenciaEstudiantes((prev) =>
      prev.map((est) =>
        est.id === estudianteId ? { ...est, presente } : est
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-green-600" />
            Tomar Asistencia - {curso?.nombre}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Filtros y fecha */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Fecha:</label>
              <input
                type="date"
                value={fechaAsistencia}
                onChange={(e) => setFechaAsistencia(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <label className="text-sm font-medium">Consultar fecha:</label>
              <input
                type="date"
                value={filtroFecha}
                onChange={(e) => setFiltroFecha(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
                placeholder="Filtrar por fecha"
              />
            </div>
            {filtroFecha && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFiltroFecha("")}
              >
                Limpiar filtro
              </Button>
            )}
          </div>

          {/* Lista de estudiantes */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">
              Lista de Estudiantes ({asistenciaEstudiantes.length})
            </h3>
            <div className="grid gap-3">
              {asistenciaEstudiantes.map((estudiante) => (
                <div
                  key={estudiante.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {(estudiante.nombre || estudiante.full_name || "")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">
                        {estudiante.nombre || estudiante.full_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ID: {estudiante.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`asistencia-${estudiante.id}`}
                          checked={estudiante.presente === true}
                          onChange={() =>
                            marcarAsistencia(estudiante.id, true)
                          }
                          className="text-green-600"
                        />
                        <span className="text-sm text-green-600 font-medium">
                          Presente
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`asistencia-${estudiante.id}`}
                          checked={estudiante.presente === false}
                          onChange={() =>
                            marcarAsistencia(estudiante.id, false)
                          }
                          className="text-red-600"
                        />
                        <span className="text-sm text-red-600 font-medium">
                          Ausente
                        </span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Observaciones..."
                      className="px-2 py-1 border rounded text-sm w-32"
                      value={estudiante.observaciones || ""}
                      onChange={(e) =>
                        setAsistenciaEstudiantes((prev) =>
                          prev.map((est) =>
                            est.id === estudiante.id
                              ? { ...est, observaciones: e.target.value }
                              : est
                          )
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen */}
          <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-6 text-sm">
              <span className="text-green-600 font-medium">
                Presentes:{" "}
                {asistenciaEstudiantes.filter((e) => e.presente === true).length}
              </span>
              <span className="text-red-600 font-medium">
                Ausentes:{" "}
                {
                  asistenciaEstudiantes.filter((e) => e.presente === false)
                    .length
                }
              </span>
              <span className="text-gray-600 font-medium">
                Sin marcar:{" "}
                {
                  asistenciaEstudiantes.filter(
                    (e) => e.presente === null || e.presente === undefined
                  ).length
                }
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button
                onClick={onGuardar}
                className="bg-green-600 hover:bg-green-700"
              >
                Guardar Asistencia
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
