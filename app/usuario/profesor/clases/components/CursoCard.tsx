"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Calendar } from "lucide-react";
import type { Curso } from "../types";
import { DIAS_SEMANA_CORTO } from "../constants";

interface CursoCardProps {
  curso: Curso;
  onSelect: (cursoId: string) => void;
  isExpanded: boolean;
  onToggleExpand: (e: React.MouseEvent) => void;
}

export function CursoCard({
  curso,
  onSelect,
  isExpanded,
  onToggleExpand,
}: CursoCardProps) {
  return (
    <div className="space-y-2">
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <BookOpen className="h-8 w-8 text-primary" />
            <div className="flex flex-col items-end gap-1">
              <Badge variant="secondary">
                {curso.group?.course.name} Grupo {curso.grupo}
              </Badge>
              {curso.is_active !== undefined && (
                <Badge variant={curso.is_active ? "default" : "destructive"}>
                  {curso.is_active ? "Activo" : "Inactivo"}
                </Badge>
              )}
            </div>
          </div>
          {/* Nombre del curso principal */}
          {curso.course?.name ? (
            <CardTitle className="text-xl mt-3">
              {curso.course.name}
              {curso.course?.code && (
                <Badge variant="outline" className="ml-2 text-xs font-normal">
                  {curso.course.code}
                </Badge>
              )}
            </CardTitle>
          ) : (
            <CardTitle className="text-xl mt-3">
              {curso.group?.course.code} - {curso.nombre}
            </CardTitle>
          )}
          {/* Materia como subtítulo */}
          {curso.subject?.name && (
            <CardTitle className="mt-2 flex items-center gap-1 text-base text-muted-foreground">
              <span className="font-medium">Materia:</span> {curso.subject.name}
            </CardTitle>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{curso.cantidadEstudiantes} estudiantes</span>
            </div>
            {curso.classroom?.name && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Aula: {curso.classroom.name}</span>
              </div>
            )}
            {curso.group_class_schedule &&
            curso.group_class_schedule.length > 0 ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">Horarios:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {curso.group_class_schedule.map(
                    (schedule: any, index: number) => {
                      return (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          {DIAS_SEMANA_CORTO[schedule.day_of_week] || "N/A"}{" "}
                          {schedule.start_time?.substring(0, 5) || "N/A"}-
                          {schedule.end_time?.substring(0, 5) || "N/A"}
                        </Badge>
                      );
                    }
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                🕒 Horario no disponible
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => onSelect(curso.id)}>
              Acceder al Aula Virtual
            </Button>
            <Button variant="outline" size="icon" onClick={onToggleExpand}>
              <Users className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Acordeón de estudiantes */}
      {isExpanded && (
        <Card className="border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Lista de Estudiantes ({curso.cantidadEstudiantes})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {curso.estudiantes && curso.estudiantes.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {curso.estudiantes.map((estudiante: any) => (
                  <div
                    key={estudiante.id}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    {estudiante.avatar ? (
                      <img
                        src={estudiante.avatar}
                        alt={estudiante.full_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {estudiante.full_name
                            ?.split(" ")
                            .map((n: any) => n[0])
                            .join("")
                            .substring(0, 2)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {estudiante.full_name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {estudiante.email}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      ID: {estudiante.id}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p className="text-sm">No hay estudiantes inscritos</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
