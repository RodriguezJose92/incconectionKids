"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Calendar, Plus, Edit } from "lucide-react";
import { CycleStore, Cycle } from "@/Stores/cycleStore";
import { InstituteStore } from "@/Stores/InstituteStore";
import { PeriodAcademicStore } from "@/Stores/periodAcademicStore";

export function CycleManagement() {
  const { cycles, fetchCycles, addCycle, updateCycle, loading } = CycleStore();
  const { institute } = InstituteStore();
  const { periodos, fetchPeriodos } = PeriodAcademicStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriodFilter, setSelectedPeriodFilter] = useState<string>("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCycle, setNewCycle] = useState({
    name: "",
    description: "",
    academic_period_id: "",
    start_date: "",
    end_date: "",
    is_active: true,
  });
  const [selectedCycle, setSelectedCycle] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchCycles();
    fetchPeriodos();
  }, []);

  const filteredCycles = cycles.filter((c: Cycle) => {
    const matchesSearch =
      (c.name && c.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.description &&
        c.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPeriod =
      selectedPeriodFilter === "all" ||
      c.academic_period_id === selectedPeriodFilter;

    return matchesSearch && matchesPeriod;
  });

  const handleCreateCycle = async () => {
    if (!newCycle.name) {
      alert("Por favor ingresa el nombre del ciclo");
      return;
    }
    if (!newCycle.academic_period_id) {
      alert("Por favor ingresa el periodo académico");
      return;
    }
    await addCycle({
      id: crypto.randomUUID(),
      academic_period_id: newCycle.academic_period_id,
      name: newCycle.name,
      description: newCycle.description || "",
      start_date: newCycle.start_date,
      end_date: newCycle.end_date,
      is_active: newCycle.is_active,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setNewCycle({
      name: "",
      description: "",
      academic_period_id: "",
      start_date: "",
      end_date: "",
      is_active: true,
    });
    setIsCreateOpen(false);
  };

  const handleUpdateCycle = async () => {
    if (!selectedCycle) return;
    await updateCycle(selectedCycle.id, {
      name: selectedCycle.name,
      description: selectedCycle.description,
      academic_period_id: selectedCycle.academic_period_id,
      start_date: selectedCycle.start_date,
      end_date: selectedCycle.end_date,
      is_active: selectedCycle.is_active,
      updated_at: new Date().toISOString(),
    });
    setIsEditOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Gestión de Ciclos
        </h2>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nuevo Ciclo</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Lista de Ciclos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar ciclos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-full sm:w-64">
                <Select
                  value={selectedPeriodFilter}
                  onValueChange={setSelectedPeriodFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por periodo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los periodos</SelectItem>
                    {periodos.map((periodo) => (
                      <SelectItem key={periodo.id} value={periodo.id}>
                        {periodo.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCycles.length === 0 ? (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No se encontraron ciclos
                </div>
              ) : (
                filteredCycles.map((cycle: any) => (
                  <Card key={cycle.id}>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">
                          {cycle.name}
                        </h3>
                        <Badge
                          variant={cycle.is_active ? "default" : "secondary"}
                        >
                          {cycle.is_active ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Periodo académico:{" "}
                        {periodos.find((p) => p.id === cycle.academic_period_id)
                          ?.name || cycle.academic_period_id}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {cycle.start_date} - {cycle.end_date}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {cycle.description || "Sin descripción"}
                      </p>
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedCycle(cycle);
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle>Nuevo Ciclo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del ciclo</Label>
                <Input
                  id="nombre"
                  placeholder="Ej: Primer Ciclo"
                  value={newCycle.name}
                  onChange={(e) =>
                    setNewCycle({ ...newCycle, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="academic_period_id">Periodo académico</Label>
                <Select
                  value={newCycle.academic_period_id}
                  onValueChange={(value) =>
                    setNewCycle({ ...newCycle, academic_period_id: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un periodo académico" />
                  </SelectTrigger>
                  <SelectContent>
                    {periodos.map((periodo) => (
                      <SelectItem key={periodo.id} value={periodo.id}>
                        {periodo.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="start_date">Fecha de inicio</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={newCycle.start_date}
                  onChange={(e) =>
                    setNewCycle({ ...newCycle, start_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">Fecha de fin</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={newCycle.end_date}
                  onChange={(e) =>
                    setNewCycle({ ...newCycle, end_date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                  id="descripcion"
                  placeholder="Descripción (opcional)"
                  value={newCycle.description}
                  onChange={(e) =>
                    setNewCycle({
                      ...newCycle,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={newCycle.is_active}
                  onCheckedChange={(checked) =>
                    setNewCycle({ ...newCycle, is_active: checked })
                  }
                />
                <Label htmlFor="is_active">Ciclo activo</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreateCycle} disabled={loading}>
                  {loading ? "Creando..." : "Crear"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isEditOpen && selectedCycle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle>Editar Ciclo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nombre">Nombre del ciclo</Label>
                <Input
                  id="edit-nombre"
                  placeholder="Nombre del ciclo"
                  value={selectedCycle.name}
                  onChange={(e) =>
                    setSelectedCycle({
                      ...selectedCycle,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-academic_period_id">Periodo académico</Label>
                <Select
                  value={selectedCycle.academic_period_id}
                  onValueChange={(value) =>
                    setSelectedCycle({
                      ...selectedCycle,
                      academic_period_id: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un periodo académico" />
                  </SelectTrigger>
                  <SelectContent>
                    {periodos.map((periodo) => (
                      <SelectItem key={periodo.id} value={periodo.id}>
                        {periodo.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-start_date">Fecha de inicio</Label>
                <Input
                  id="edit-start_date"
                  type="date"
                  value={selectedCycle.start_date}
                  onChange={(e) =>
                    setSelectedCycle({
                      ...selectedCycle,
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
                  value={selectedCycle.end_date}
                  onChange={(e) =>
                    setSelectedCycle({
                      ...selectedCycle,
                      end_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-descripcion">Descripción</Label>
                <Input
                  id="edit-descripcion"
                  placeholder="Descripción"
                  value={selectedCycle.description}
                  onChange={(e) =>
                    setSelectedCycle({
                      ...selectedCycle,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-is_active"
                  checked={selectedCycle.is_active ?? true}
                  onCheckedChange={(checked) =>
                    setSelectedCycle({
                      ...selectedCycle,
                      is_active: checked,
                    })
                  }
                />
                <Label htmlFor="edit-is_active">Ciclo activo</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleUpdateCycle} disabled={loading}>
                  {loading ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}