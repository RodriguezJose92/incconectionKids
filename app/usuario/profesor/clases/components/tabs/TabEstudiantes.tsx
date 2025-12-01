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
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import type { Curso } from "../../types";

interface TabEstudiantesProps {
  curso: Curso;
}

export function TabEstudiantes({ curso }: TabEstudiantesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Estudiantes</CardTitle>
        <CardDescription>
          {curso?.cantidadEstudiantes || 0} estudiantes inscritos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {curso?.estudiantes && curso.estudiantes.length > 0 ? (
              curso.estudiantes.map((estudiante: any) => (
                <TableRow key={estudiante.id}>
                  <TableCell>{estudiante.id}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {estudiante.avatar ? (
                        <img
                          src={estudiante.avatar}
                          alt={estudiante.full_name}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-600">
                            {estudiante.full_name
                              ?.split(" ")
                              .map((n: any) => n[0])
                              .join("")
                              .substring(0, 2)}
                          </span>
                        </div>
                      )}
                      <span>{estudiante.full_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{estudiante.email}</TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {estudiante.user_id}
                    </code>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      Ver Perfil
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  No hay estudiantes inscritos en este curso
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
