"use client";

import React, { useEffect, useState } from "react";
import { PeriodAcademicStore } from "@/Stores/periodAcademicStore";
import { InstituteStore } from "@/Stores/InstituteStore";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar, Plus, Edit, CalendarDays } from "lucide-react";

const PeriodAcademicManagement: React.FC = () => {
  const { periodos, loading, error, fetchPeriodos, addPeriodo, updatePeriodo } =
    PeriodAcademicStore();
  const { institute } = InstituteStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPeriodo, setSelectedPeriodo] = useState<any>(null);
  const [newPeriodo, setNewPeriodo] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    is_active: true,
  });

  useEffect(() => {
    fetchPeriodos();
  }, [fetchPeriodos]);

  const handleCreatePeriodo = async () => {
    if (!newPeriodo.name || !newPeriodo.start_date || !newPeriodo.end_date) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    if (!institute.id) {
      alert(
        "No se encontró el ID del instituto. Por favor inicia sesión nuevamente."
      );
      return;
    }

    await addPeriodo({
      id: crypto.randomUUID(),
      institute_id: institute.id,
      name: newPeriodo.name,
      description: newPeriodo.description || null,
      start_date: newPeriodo.start_date,
      end_date: newPeriodo.end_date,
      is_active: newPeriodo.is_active,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setNewPeriodo({
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      is_active: true,
    });
    setIsCreateOpen(false);
  };

  const handleUpdatePeriodo = async () => {
    if (!selectedPeriodo) return;
    await updatePeriodo(selectedPeriodo.id, {
      name: selectedPeriodo.name,
      description: selectedPeriodo.description,
      start_date: selectedPeriodo.start_date,
      end_date: selectedPeriodo.end_date,
      is_active: selectedPeriodo.is_active,
      updated_at: new Date().toISOString(),
    });
    setIsEditOpen(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Gestión de Períodos Académicos
        </h2>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Período</span>
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded">
          Error: {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarDays className="w-5 h-5" />
            <span>Lista de Períodos Académicos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : periodos.length === 0 ? (
            <div className="text-center py-12">
              <CalendarDays className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                No hay períodos académicos registrados
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsCreateOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear primer período
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {periodos.map((periodo) => (
                <Card
                  key={periodo.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground text-lg">
                        {periodo.name}
                      </h3>
                      <Badge
                        variant={periodo.is_active ? "default" : "secondary"}
                      >
                        {periodo.is_active ? "Activo" : "Inactivo"}
                      </Badge>
                    </div>
                    {periodo.description && (
                      <p className="text-sm text-muted-foreground">
                        {periodo.description}
                      </p>
                    )}
                    <div className="space-y-2 pt-2 border-t">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Inicio:</span>
                        <span className="ml-2 font-medium">
                          {formatDate(periodo.start_date)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Fin:</span>
                        <span className="ml-2 font-medium">
                          {formatDate(periodo.end_date)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedPeriodo(periodo);
                          setIsEditOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal crear período */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle>Nuevo Período Académico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del período *</Label>
                <Input
                  id="name"
                  placeholder="Ej: 2024-1, Primer Semestre 2024"
                  value={newPeriodo.name}
                  onChange={(e) =>
                    setNewPeriodo({ ...newPeriodo, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Input
                  id="description"
                  placeholder="Descripción (opcional)"
                  value={newPeriodo.description}
                  onChange={(e) =>
                    setNewPeriodo({
                      ...newPeriodo,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="start_date">Fecha de inicio *</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={newPeriodo.start_date}
                  onChange={(e) =>
                    setNewPeriodo({
                      ...newPeriodo,
                      start_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">Fecha de fin *</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={newPeriodo.end_date}
                  onChange={(e) =>
                    setNewPeriodo({ ...newPeriodo, end_date: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={newPeriodo.is_active}
                  onCheckedChange={(checked) =>
                    setNewPeriodo({ ...newPeriodo, is_active: checked })
                  }
                />
                <Label htmlFor="is_active">Período activo</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreatePeriodo} disabled={loading}>
                  {loading ? "Creando..." : "Crear"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal editar período */}
      {isEditOpen && selectedPeriodo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle>Editar Período Académico</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nombre del período</Label>
                <Input
                  id="edit-name"
                  placeholder="Nombre del período"
                  value={selectedPeriodo.name}
                  onChange={(e) =>
                    setSelectedPeriodo({
                      ...selectedPeriodo,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Input
                  id="edit-description"
                  placeholder="Descripción"
                  value={selectedPeriodo.description || ""}
                  onChange={(e) =>
                    setSelectedPeriodo({
                      ...selectedPeriodo,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-start_date">Fecha de inicio</Label>
                <Input
                  id="edit-start_date"
                  type="date"
                  value={selectedPeriodo.start_date}
                  onChange={(e) =>
                    setSelectedPeriodo({
                      ...selectedPeriodo,
                      start_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-end_date">Fecha de fin</Label>
                <Input
                  id="edit-end_date"
                  type="date"
                  value={selectedPeriodo.end_date}
                  onChange={(e) =>
                    setSelectedPeriodo({
                      ...selectedPeriodo,
                      end_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-is_active"
                  checked={selectedPeriodo.is_active ?? true}
                  onCheckedChange={(checked) =>
                    setSelectedPeriodo({
                      ...selectedPeriodo,
                      is_active: checked,
                    })
                  }
                />
                <Label htmlFor="edit-is_active">Período activo</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleUpdatePeriodo} disabled={loading}>
                  {loading ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PeriodAcademicManagement;
