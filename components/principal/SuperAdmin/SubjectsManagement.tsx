"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, BookOpen, Plus, Edit } from "lucide-react";
import { MateriasStore } from "@/Stores/materiasStore";
import { InstituteStore } from "@/Stores/InstituteStore";

export function SubjectsManagement() {
  const { materias, fetchMaterias, addMateria, updateMateria, loading } =
    MateriasStore();
  const { institute } = InstituteStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newMateria, setNewMateria] = useState({
    name: "",
    description: "",
    code: "",
    is_active: true,
  });
  const [selectedMateria, setSelectedMateria] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchMaterias();
  }, []);

  const filteredMaterias = materias.filter(
    (m: any) =>
      (m.name && m.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (m.description &&
        m.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateMateria = async () => {
    if (!newMateria.name) {
      alert("Por favor ingresa el nombre de la materia");
      return;
    }

    if (!institute.id) {
      alert(
        "No se encontró el ID del instituto. Por favor inicia sesión nuevamente."
      );
      return;
    }

    await addMateria({
      id: crypto.randomUUID(),
      institute_id: institute.id,
      code:
        newMateria.code || newMateria.name.toLowerCase().replace(/\s+/g, "-"),
      name: newMateria.name,
      description: newMateria.description || "",
      is_active: newMateria.is_active,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setNewMateria({ name: "", description: "", code: "", is_active: true });
    setIsCreateOpen(false);
  };

  const handleUpdateMateria = async () => {
    if (!selectedMateria) return;
    await updateMateria(selectedMateria.id, {
      name: selectedMateria.name,
      description: selectedMateria.description,
      code: selectedMateria.code,
      is_active: selectedMateria.is_active,
      updated_at: new Date().toISOString(),
    });
    setIsEditOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Gestión de Materias
        </h2>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Materia</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Lista de Materias</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar materias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMaterias.length === 0 ? (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  No se encontraron materias
                </div>
              ) : (
                filteredMaterias.map((materia: any) => (
                  <Card key={materia.id}>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">
                          {materia.name}
                        </h3>
                        <Badge
                          variant={materia.is_active ? "default" : "secondary"}
                        >
                          {materia.is_active ? "Activa" : "Inactiva"}
                        </Badge>
                      </div>
                      {materia.code && (
                        <p className="text-xs text-muted-foreground font-mono">
                          Código: {materia.code}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {materia.description || "Sin descripción"}
                      </p>
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedMateria(materia);
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
              <CardTitle>Nueva Materia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre de la materia</Label>
                <Input
                  id="nombre"
                  placeholder="Ej: Matemáticas"
                  value={newMateria.name}
                  onChange={(e) =>
                    setNewMateria({ ...newMateria, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Código</Label>
                <Input
                  id="code"
                  placeholder="Ej: MAT-101 (opcional)"
                  value={newMateria.code}
                  onChange={(e) =>
                    setNewMateria({ ...newMateria, code: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                  id="descripcion"
                  placeholder="Descripción (opcional)"
                  value={newMateria.description}
                  onChange={(e) =>
                    setNewMateria({
                      ...newMateria,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={newMateria.is_active}
                  onCheckedChange={(checked) =>
                    setNewMateria({ ...newMateria, is_active: checked })
                  }
                />
                <Label htmlFor="is_active">Materia activa</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreateMateria} disabled={loading}>
                  {loading ? "Creando..." : "Crear"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isEditOpen && selectedMateria && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle>Editar Materia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nombre">Nombre de la materia</Label>
                <Input
                  id="edit-nombre"
                  placeholder="Nombre de la materia"
                  value={selectedMateria.name}
                  onChange={(e) =>
                    setSelectedMateria({
                      ...selectedMateria,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-code">Código</Label>
                <Input
                  id="edit-code"
                  placeholder="Código"
                  value={selectedMateria.code || ""}
                  onChange={(e) =>
                    setSelectedMateria({
                      ...selectedMateria,
                      code: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-descripcion">Descripción</Label>
                <Input
                  id="edit-descripcion"
                  placeholder="Descripción"
                  value={selectedMateria.description}
                  onChange={(e) =>
                    setSelectedMateria({
                      ...selectedMateria,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-is_active"
                  checked={selectedMateria.is_active ?? true}
                  onCheckedChange={(checked) =>
                    setSelectedMateria({
                      ...selectedMateria,
                      is_active: checked,
                    })
                  }
                />
                <Label htmlFor="edit-is_active">Materia activa</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleUpdateMateria} disabled={loading}>
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
