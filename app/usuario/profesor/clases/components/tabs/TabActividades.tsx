"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import type { Actividad } from "../../types";

interface TabActividadesProps {
  actividades: Actividad[];
  onNuevaActividad: () => void;
}

export function TabActividades({
  actividades,
  onNuevaActividad,
}: TabActividadesProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Actividades del Curso</CardTitle>
            <CardDescription>Tareas, exámenes y proyectos</CardDescription>
          </div>
          <Button onClick={onNuevaActividad}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Actividad
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actividades.map((actividad, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{actividad.nombre}</h3>
                    <p className="text-sm text-muted-foreground">
                      {actividad.tipo} • Fecha límite: {actividad.fechaLimite}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        actividad.entregas === actividad.total
                          ? "default"
                          : "secondary"
                      }
                    >
                      {actividad.entregas}/{actividad.total} entregas
                    </Badge>
                    <div className="mt-2">
                      <Button size="sm">Revisar Entregas</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
