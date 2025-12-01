"use client";

import { useState } from "react";
import { useCursos } from "./hooks/useCursos";
import { CursoCard } from "./components/CursoCard";
import { CursoDetalle } from "./components/CursoDetalle";

export default function CursosPage() {
  const { cursos, loading, error } = useCursos();
  const [cursoSeleccionado, setCursoSeleccionado] = useState<string | null>(
    null
  );
  const [cursoExpandido, setCursoExpandido] = useState<string | null>(null);

  // Si hay un curso seleccionado, mostrar la vista detallada
  if (cursoSeleccionado) {
    const curso = cursos.find((c) => c.id === cursoSeleccionado);

    if (!curso) {
      return (
        <div className="flex-1 p-6">
          <div className="text-center">
            <p className="text-muted-foreground">Curso no encontrado</p>
            <button
              onClick={() => setCursoSeleccionado(null)}
              className="mt-4 text-primary hover:underline"
            >
              Volver a Mis Cursos
            </button>
          </div>
        </div>
      );
    }

    return (
      <CursoDetalle curso={curso} onVolver={() => setCursoSeleccionado(null)} />
    );
  }

  // Vista principal: lista de cursos
  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mis Clases</h1>
        <p className="text-muted-foreground">
          Gestiona tus clases del periodo actual
        </p>
      </div>

      {loading && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Cargando cursos...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">
            Error al cargar cursos: {error.message}
          </p>
        </div>
      )}

      {!loading && !error && cursos.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No hay cursos disponibles</p>
        </div>
      )}

      {!loading && !error && cursos.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cursos.map((curso) => (
            <CursoCard
              key={curso.id}
              curso={curso}
              onSelect={setCursoSeleccionado}
              isExpanded={cursoExpandido === curso.id}
              onToggleExpand={(e) => {
                e.stopPropagation();
                setCursoExpandido(
                  cursoExpandido === curso.id ? null : curso.id
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
