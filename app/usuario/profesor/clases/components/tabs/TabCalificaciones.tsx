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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Estudiante } from "../../types";

interface TabCalificacionesProps {
  estudiantes: Estudiante[];
}

export function TabCalificaciones({ estudiantes }: TabCalificacionesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tabla de Calificaciones</CardTitle>
        <CardDescription>
          Calificaciones por actividad y estudiante
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Estudiante</TableHead>
              <TableHead>Tarea 1</TableHead>
              <TableHead>Examen Parcial</TableHead>
              <TableHead>Proyecto Final</TableHead>
              <TableHead>Promedio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {estudiantes.map((estudiante) => (
              <TableRow key={estudiante.id}>
                <TableCell className="font-medium">
                  {estudiante.nombre || estudiante.full_name}
                </TableCell>
                <TableCell>
                  <Input className="w-16" defaultValue="8.5" />
                </TableCell>
                <TableCell>
                  <Input className="w-16" defaultValue="7.8" />
                </TableCell>
                <TableCell>
                  <Input className="w-16" defaultValue="9.0" />
                </TableCell>
                <TableCell>
                  <Badge variant="default">{estudiante.promedio || "N/A"}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Button>Guardar Calificaciones</Button>
        </div>
      </CardContent>
    </Card>
  );
}
