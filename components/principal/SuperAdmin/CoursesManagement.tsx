"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Search,
  Plus,
  Edit,
  BookOpen,
  Users,
  Eye,
  Check,
  ChevronsUpDown,
  UserCircle,
  ChevronDown,
} from "lucide-react";
import { InstituteStore } from "@/Stores/InstituteStore";
import { CoursesStore } from "@/Stores/coursesStore";
import { GroupsStore } from "@/Stores/groupsStore";
import { ProfilesStore } from "@/Stores/profilesStore";
import { PeriodAcademicStore } from "@/Stores/periodAcademicStore";
import { GroupHasStudentsStore } from "@/Stores/groupHasStudentsStore";
import { EstudenteEnrrolledStore } from "@/Stores/studentEnrolledStore";
import { GroupHasParentStore } from "@/Stores/groupHasParentStore";
import { ParentEnrolledStore } from "@/Stores/parentEnrolledStore";
import { ParentHasStudentStore } from "@/Stores/ParentHasStudentStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CoursesManagement() {
  const { courses, fetchCourses, addCourse, updateCourse, loading } =
    CoursesStore();
  const {
    groups,
    fetchGroups,
    addGroup,
    updateGroup,
    loading: groupLoading,
  } = GroupsStore();
  const { profiles, fetchProfiles } = ProfilesStore();
  const { institute } = InstituteStore();
  const { periodos, fetchPeriodos } = PeriodAcademicStore();
  const {
    groupHasStudents,
    fetchGroupHasStudents,
    addGroupHasStudent,
    loading: studentsLoading,
  } = GroupHasStudentsStore();
  const { enrolled: studentEnrolled, fetchEnrolled: fetchStudentEnrolled } =
    EstudenteEnrrolledStore();
  const {
    groupHasParents,
    fetchGroupHasParents,
    addGroupHasParent,
    loading: parentsLoading,
  } = GroupHasParentStore();
  const { enrolled: parentEnrolled, fetchEnrolled: fetchParentEnrolled } =
    ParentEnrolledStore();
  const { relations: parentHasStudent, fetchRelations: fetchParentHasStudent } =
    ParentHasStudentStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriodId, setFilterPeriodId] = useState<string>("todos");
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
  const [isViewGroupsOpen, setIsViewGroupsOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);
  const [isViewStudentsOpen, setIsViewStudentsOpen] = useState(false);
  const [isLinkStudentOpen, setIsLinkStudentOpen] = useState(false);
  const [isViewParentsOpen, setIsViewParentsOpen] = useState(false);
  const [isLinkParentOpen, setIsLinkParentOpen] = useState(false);
  const [isDirectorPopoverOpen, setIsDirectorPopoverOpen] = useState(false);
  const [isEditDirectorPopoverOpen, setIsEditDirectorPopoverOpen] =
    useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [selectedGroupForStudents, setSelectedGroupForStudents] =
    useState<any>(null);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedGroupForParents, setSelectedGroupForParents] =
    useState<any>(null);
  const [selectedParentId, setSelectedParentId] = useState("");
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(
    null
  );
  const [newGroup, setNewGroup] = useState({
    name: "",
    year: new Date().getFullYear(),
    max_students: 0,
    director_id: "",
  });
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    education_level: "",
    grade_number: 0,
    max_students: 0,
    description: "",
    is_active: true,
  });

  useEffect(() => {
    fetchCourses();
    fetchGroups();
    fetchProfiles();
    fetchPeriodos();
    fetchGroupHasStudents();
    fetchStudentEnrolled();
    fetchParentHasStudent();
  }, []);

  // Resetear filtro cuando se abra el diálogo de grupos
  useEffect(() => {
    if (isViewGroupsOpen) {
      setFilterPeriodId("todos");
    }
  }, [isViewGroupsOpen]);

  // Resetear acordeón cuando se cierre el diálogo de estudiantes
  useEffect(() => {
    if (!isViewStudentsOpen) {
      setExpandedStudentId(null);
    }
  }, [isViewStudentsOpen]);

  // Función helper para obtener el año del periodo académico
  const getPeriodYear = (periodId: string): number | null => {
    const period = periodos.find((p) => p.id === periodId);
    if (!period) return null;
    const startDate = new Date(period.start_date);
    return startDate.getFullYear();
  };

  // Función para obtener la información del padre de un estudiante
  const getParentInfo = (studentUserId: string) => {
    // Buscar en parent_has_student usando el student_id (que es el user_id del estudiante)
    const parentRelation = parentHasStudent.find(
      (relation) => relation.student_id === studentUserId
    );

    if (!parentRelation) {
      return null;
    }

    // Buscar el perfil del padre usando parent_id
    const parentProfile = profiles.find(
      (profile) => profile.id === parentRelation.parent_id
    );

    return parentProfile;
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.code &&
        course.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (course.education_level &&
        course.education_level.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateCourse = async () => {
    if (!newCourse.name || !newCourse.max_students) {
      alert("Por favor completa los campos requeridos.");
      return;
    }

    if (!institute.id) {
      alert(
        "No se encontró el ID del instituto. Por favor inicia sesión nuevamente."
      );
      return;
    }

    try {
      const course = {
        id: crypto.randomUUID(),
        institute_id: institute.id,
        name: newCourse.name,
        code: newCourse.code || null,
        education_level: newCourse.education_level || null,
        grade_number: newCourse.grade_number || null,
        max_students: newCourse.max_students,
        description: newCourse.description || null,
        is_active: newCourse.is_active,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await addCourse(course);
      setNewCourse({
        name: "",
        code: "",
        education_level: "",
        grade_number: 0,
        max_students: 0,
        description: "",
        is_active: true,
      });
      setIsCreateCourseOpen(false);
    } catch (error) {
      console.error("Error al crear curso:", error);
      alert("Hubo un error al crear el curso. Por favor intenta de nuevo.");
    }
  };

  const handleUpdateCourse = async () => {
    if (!selectedCourse) {
      alert("No hay curso seleccionado para actualizar");
      return;
    }

    try {
      const updates = {
        name: selectedCourse.name,
        code: selectedCourse.code,
        education_level: selectedCourse.education_level,
        grade_number: selectedCourse.grade_number,
        max_students: selectedCourse.max_students,
        description: selectedCourse.description,
        is_active: selectedCourse.is_active,
        updated_at: new Date().toISOString(),
      };

      await updateCourse(selectedCourse.id, updates);
      setIsEditCourseOpen(false);
    } catch (error) {
      console.error("Error al actualizar curso:", error);
      alert(
        "Hubo un error al actualizar el curso. Por favor intenta de nuevo."
      );
    }
  };

  const handleCreateGroup = async () => {
    if (!newGroup.name || !newGroup.year) {
      alert("Por favor completa los campos requeridos (nombre y año).");
      return;
    }

    if (!selectedCourse) {
      alert("No hay curso seleccionado.");
      return;
    }

    try {
      const group = {
        id: crypto.randomUUID(),
        course_id: selectedCourse.id,
        name: newGroup.name,
        year: newGroup.year,
        max_students: newGroup.max_students || null,
        director_id: newGroup.director_id || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await addGroup(group);
      setNewGroup({
        name: "",
        year: new Date().getFullYear(),
        max_students: 0,
        director_id: "",
      });
      setIsCreateGroupOpen(false);
    } catch (error) {
      console.error("Error al crear grupo:", error);
      alert("Hubo un error al crear el grupo. Por favor intenta de nuevo.");
    }
  };

  const handleUpdateGroup = async () => {
    if (!selectedGroup) {
      alert("No hay grupo seleccionado para actualizar");
      return;
    }

    if (!selectedGroup.name || !selectedGroup.year) {
      alert("Por favor completa los campos requeridos (nombre y año).");
      return;
    }

    try {
      const updates = {
        name: selectedGroup.name,
        year: selectedGroup.year,
        max_students: selectedGroup.max_students || null,
        director_id: selectedGroup.director_id || null,
        updated_at: new Date().toISOString(),
      };

      await updateGroup(selectedGroup.id, updates);
      setIsEditGroupOpen(false);
    } catch (error) {
      console.error("Error al actualizar grupo:", error);
      alert(
        "Hubo un error al actualizar el grupo. Por favor intenta de nuevo."
      );
    }
  };

  const handleLinkStudent = async () => {
    if (!selectedStudentId) {
      alert("Por favor selecciona un estudiante.");
      return;
    }

    if (!selectedGroupForStudents) {
      alert("No hay grupo seleccionado.");
      return;
    }

    // Verificar si el estudiante ya está asignado al grupo
    const alreadyAssigned = groupHasStudents.some(
      (ghs) =>
        ghs.group_id === selectedGroupForStudents.id &&
        ghs.student_enrolled_id === selectedStudentId
    );

    if (alreadyAssigned) {
      alert("Este estudiante ya está asignado a este grupo.");
      return;
    }

    try {
      const newAssignment = {
        id: crypto.randomUUID(),
        group_id: selectedGroupForStudents.id,
        student_enrolled_id: selectedStudentId, // ID del enrolled
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await addGroupHasStudent(newAssignment);
      setSelectedStudentId("");
      setIsLinkStudentOpen(false);
    } catch (error) {
      console.error("Error al vincular estudiante:", error);
      alert(
        "Hubo un error al vincular el estudiante. Por favor intenta de nuevo."
      );
    }
  };

  const handleLinkParent = async () => {
    if (!selectedParentId) {
      alert("Por favor selecciona un padre.");
      return;
    }

    if (!selectedGroupForParents) {
      alert("No hay grupo seleccionado.");
      return;
    }

    // Verificar si el padre ya está asignado al grupo
    const alreadyAssigned = groupHasParents.some(
      (ghp) =>
        ghp.group_id === selectedGroupForParents.id &&
        ghp.parent_enrolled_id === selectedParentId
    );

    if (alreadyAssigned) {
      alert("Este padre ya está asignado a este grupo.");
      return;
    }

    try {
      const newAssignment = {
        id: crypto.randomUUID(),
        group_id: selectedGroupForParents.id,
        parent_enrolled_id: selectedParentId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await addGroupHasParent(newAssignment);
      setSelectedParentId("");
      setIsLinkParentOpen(false);
    } catch (error) {
      console.error("Error al vincular padre:", error);
      alert("Hubo un error al vincular el padre. Por favor intenta de nuevo.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Gestión de Cursos
        </h2>
        <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nuevo Curso</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Curso</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nombre del Curso</Label>
                  <Input
                    placeholder="Ej: Primero"
                    value={newCourse.name}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Código</Label>
                  <Input
                    placeholder="Ej: PRI-01"
                    value={newCourse.code}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, code: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Nivel Educativo</Label>
                  <Input
                    placeholder="Ej: Primaria"
                    value={newCourse.education_level}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        education_level: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Número de Grado</Label>
                  <Input
                    type="number"
                    placeholder="Ej: 1"
                    value={newCourse.grade_number}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        grade_number: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Máximo de Estudiantes</Label>
                  <Input
                    type="number"
                    placeholder="Ej: 30"
                    value={newCourse.max_students}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        max_students: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Descripción</Label>
                  <Input
                    placeholder="Descripción del curso"
                    value={newCourse.description}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateCourseOpen(false)}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreateCourse} disabled={loading}>
                  {loading ? "Creando..." : "Crear Curso"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Lista de Cursos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar cursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.length === 0 ? (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-40" />
                  <p>No se encontraron cursos</p>
                </div>
              ) : (
                filteredCourses.map((course) => (
                  <Card key={course.id}>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground">
                          {course.name}
                        </h3>
                        <Badge
                          variant={course.is_active ? "default" : "secondary"}
                        >
                          {course.is_active ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {course.description || "Sin descripción"}
                      </p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>
                          <strong>Código:</strong> {course.code || "N/A"}
                        </p>
                        <p>
                          <strong>Nivel:</strong>{" "}
                          {course.education_level || "N/A"}
                        </p>
                        <p>
                          <strong>Grado:</strong> {course.grade_number || "N/A"}
                        </p>
                        <p>
                          <strong>Máx. Estudiantes:</strong>{" "}
                          {course.max_students}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedCourse(course);
                            setIsViewGroupsOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Grupos
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedCourse(course);
                            setIsEditCourseOpen(true);
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

      <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Curso</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nombre del Curso</Label>
                  <Input
                    value={selectedCourse.name}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Código</Label>
                  <Input
                    value={selectedCourse.code || ""}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        code: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Nivel Educativo</Label>
                  <Input
                    value={selectedCourse.education_level || ""}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        education_level: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Número de Grado</Label>
                  <Input
                    type="number"
                    value={selectedCourse.grade_number || 0}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        grade_number: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Máximo de Estudiantes</Label>
                  <Input
                    type="number"
                    value={selectedCourse.max_students}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        max_students: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Descripción</Label>
                  <Input
                    value={selectedCourse.description || ""}
                    onChange={(e) =>
                      setSelectedCourse({
                        ...selectedCourse,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditCourseOpen(false)}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button onClick={handleUpdateCourse} disabled={loading}>
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isViewGroupsOpen} onOpenChange={setIsViewGroupsOpen}>
        <DialogContent className="w-[100%] max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Grupos del Curso: {selectedCourse?.name}</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4">
              <div className="flex justify-between items-center gap-3">
                <Select
                  value={filterPeriodId}
                  onValueChange={setFilterPeriodId}
                >
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Filtrar por periodo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los periodos</SelectItem>
                    {periodos.map((period) => (
                      <SelectItem key={period.id} value={period.id}>
                        {period.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Dialog
                  open={isCreateGroupOpen}
                  onOpenChange={setIsCreateGroupOpen}
                >
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Crear Grupo</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Crear Nuevo Grupo</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Nombre del Grupo</Label>
                        <Input
                          placeholder="Ej: A, B, C"
                          value={newGroup.name}
                          onChange={(e) =>
                            setNewGroup({ ...newGroup, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Periodo Académico</Label>
                        <Select
                          value={newGroup.year as any}
                          onValueChange={(periodId) => {
                            setNewGroup({
                              ...newGroup,
                              year: periodId as any,
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione su periodo académico por favor" />
                          </SelectTrigger>
                          <SelectContent>
                            {periodos.map((period) => (
                              <SelectItem key={period.id} value={period.id}>
                                {period.name} ({getPeriodYear(period.id)})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Director (opcional)</Label>
                        <Popover
                          open={isDirectorPopoverOpen}
                          onOpenChange={setIsDirectorPopoverOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={isDirectorPopoverOpen}
                              className="w-full justify-between"
                            >
                              {newGroup.director_id
                                ? profiles.find(
                                    (p) => p.id === newGroup.director_id
                                  )?.full_name ||
                                  profiles.find(
                                    (p) => p.id === newGroup.director_id
                                  )?.email ||
                                  "Director seleccionado"
                                : "Seleccionar director"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Buscar director..." />
                              <CommandList>
                                <CommandEmpty>
                                  No se encontró ningún director.
                                </CommandEmpty>
                                <CommandGroup>
                                  <CommandItem
                                    value=""
                                    onSelect={() => {
                                      setNewGroup({
                                        ...newGroup,
                                        director_id: "",
                                      });
                                      setIsDirectorPopoverOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={`mr-2 h-4 w-4 ${
                                        newGroup.director_id === ""
                                          ? "opacity-100"
                                          : "opacity-0"
                                      }`}
                                    />
                                    Sin director
                                  </CommandItem>
                                  {profiles.map((profile) => (
                                    <CommandItem
                                      key={profile.id}
                                      value={`${profile.full_name || ""} ${
                                        profile.email || ""
                                      } ${profile.id}`}
                                      onSelect={() => {
                                        setNewGroup({
                                          ...newGroup,
                                          director_id: profile.id,
                                        });
                                        setIsDirectorPopoverOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={`mr-2 h-4 w-4 ${
                                          newGroup.director_id === profile.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
                                      />
                                      <div className="flex flex-col">
                                        <span className="font-medium">
                                          {profile.full_name || "Sin nombre"}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          {profile.email || profile.id}
                                        </span>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>
                          Capacidad Máxima de Estudiantes (opcional)
                        </Label>
                        <Input
                          type="number"
                          placeholder="Ej: 30"
                          value={newGroup.max_students}
                          onChange={(e) =>
                            setNewGroup({
                              ...newGroup,
                              max_students: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsCreateGroupOpen(false)}
                          disabled={groupLoading}
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={handleCreateGroup}
                          disabled={groupLoading}
                        >
                          {groupLoading ? "Creando..." : "Crear Grupo"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups
                  .filter((group) => {
                    // Filtrar por curso
                    if (group.course_id !== selectedCourse.id) return false;

                    // Filtrar por periodo académico (comparar UUID directamente)
                    if (filterPeriodId !== "todos") {
                      if (group.year !== (filterPeriodId as any)) {
                        return false;
                      }
                    }

                    return true;
                  })
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((group) => {
                    const studentsInGroup = groupHasStudents.filter(
                      (ghs) => ghs.group_id === group.id
                    ).length;
                    const capacityPercentage = group.max_students
                      ? (studentsInGroup / group.max_students) * 100
                      : 0;

                    return (
                      <Card
                        key={group.id}
                        className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 hover:border-l-blue-600"
                      >
                        <CardContent className="p-5">
                          <div className="space-y-4">
                            {/* Header del Grupo */}
                            <div className="flex items-start justify-between pb-3 border-b">
                              <div className="space-y-1">
                                <h4 className="font-bold text-xl text-foreground flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                                      {group.name}
                                    </span>
                                  </div>
                                  Grupo {group.name}
                                </h4>
                                <p className="text-xs text-muted-foreground">
                                  ID: {group.id.slice(0, 8)}...
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {periodos.find(
                                  (p) => p.id === (group.year as any)
                                )?.name || `Año ${group.year}`}
                              </Badge>
                            </div>

                            {/* Información Principal */}
                            <div className="space-y-3">
                              {/* Director */}
                              <div className="flex items-start space-x-3 p-2 rounded-md bg-muted/40 hover:bg-muted/60 transition-colors">
                                <UserCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-muted-foreground">
                                    Director
                                  </p>
                                  <p className="text-sm font-semibold truncate">
                                    {group.director_id
                                      ? profiles.find(
                                          (p) => p.id === group.director_id
                                        )?.full_name ||
                                        profiles.find(
                                          (p) => p.id === group.director_id
                                        )?.email ||
                                        "No asignado"
                                      : "No asignado"}
                                  </p>
                                </div>
                              </div>

                              {/* Capacidad */}
                              <div className="flex items-start space-x-3 p-2 rounded-md bg-muted/40 hover:bg-muted/60 transition-colors">
                                <Users className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <p className="text-xs font-medium text-muted-foreground">
                                    Capacidad
                                  </p>
                                  <div className="space-y-1.5">
                                    <p className="text-sm font-semibold">
                                      {studentsInGroup} /{" "}
                                      {group.max_students || "∞"} estudiantes
                                    </p>
                                    {group.max_students && (
                                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                        <div
                                          className={`h-1.5 rounded-full transition-all ${
                                            capacityPercentage >= 90
                                              ? "bg-red-500"
                                              : capacityPercentage >= 70
                                              ? "bg-yellow-500"
                                              : "bg-green-500"
                                          }`}
                                          style={{
                                            width: `${Math.min(
                                              capacityPercentage,
                                              100
                                            )}%`,
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Botones de Acción */}
                            <div className="grid grid-cols-3 gap-2 pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950 transition-all"
                                onClick={() => {
                                  setSelectedGroup(group);
                                  setIsEditGroupOpen(true);
                                }}
                              >
                                <Edit className="w-4 h-4 text-blue-600" />
                                <span className="text-xs">Editar</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-950 transition-all"
                                onClick={() => {
                                  setSelectedGroupForStudents(group);
                                  setIsViewStudentsOpen(true);
                                }}
                              >
                                <Users className="w-4 h-4 text-green-600" />
                                <span className="text-xs">Estudiantes</span>
                              </Button>
                              {/* <Button
                                variant="outline"
                                size="sm"
                                className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-950 transition-all"
                                onClick={() => {
                                  setSelectedGroupForParents(group);
                                  setIsViewParentsOpen(true);
                                }}
                              >
                                <UserCircle className="w-4 h-4 text-purple-600" />
                                <span className="text-xs">Padres</span>
                              </Button> */}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                {groups.filter((group) => {
                  // Filtrar por curso
                  if (group.course_id !== selectedCourse.id) return false;

                  // Filtrar por periodo académico (comparar UUID directamente)
                  if (filterPeriodId !== "todos") {
                    if (group.year !== (filterPeriodId as any)) {
                      return false;
                    }
                  }

                  return true;
                }).length === 0 && (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">
                      {filterPeriodId !== "todos"
                        ? "No se encontraron grupos para este periodo académico"
                        : "Este curso aún no tiene grupos asignados"}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsViewGroupsOpen(false)}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditGroupOpen} onOpenChange={setIsEditGroupOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Grupo</DialogTitle>
          </DialogHeader>
          {selectedGroup && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre del Grupo</Label>
                <Input
                  placeholder="Ej: A, B, C"
                  value={selectedGroup.name}
                  onChange={(e) =>
                    setSelectedGroup({ ...selectedGroup, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Periodo Académico</Label>
                <Select
                  value={selectedGroup.year as any}
                  onValueChange={(periodId) => {
                    setSelectedGroup({
                      ...selectedGroup,
                      year: periodId as any,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione su periodo académico por favor" />
                  </SelectTrigger>
                  <SelectContent>
                    {periodos.map(
                      (period) => (
                        console.log(period),
                        (
                          <SelectItem key={period.id} value={period.id}>
                            {period.name}
                          </SelectItem>
                        )
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Director (opcional)</Label>
                <Popover
                  open={isEditDirectorPopoverOpen}
                  onOpenChange={setIsEditDirectorPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isEditDirectorPopoverOpen}
                      className="w-full justify-between"
                    >
                      {selectedGroup.director_id
                        ? profiles.find(
                            (p) => p.id === selectedGroup.director_id
                          )?.full_name ||
                          profiles.find(
                            (p) => p.id === selectedGroup.director_id
                          )?.email ||
                          "Director seleccionado"
                        : "Seleccionar director"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar director..." />
                      <CommandList>
                        <CommandEmpty>
                          No se encontró ningún director.
                        </CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value=""
                            onSelect={() => {
                              setSelectedGroup({
                                ...selectedGroup,
                                director_id: "",
                              });
                              setIsEditDirectorPopoverOpen(false);
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                selectedGroup.director_id === ""
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                            Sin director
                          </CommandItem>
                          {profiles.map((profile) => (
                            <CommandItem
                              key={profile.id}
                              value={`${profile.full_name || ""} ${
                                profile.email || ""
                              } ${profile.id}`}
                              onSelect={() => {
                                setSelectedGroup({
                                  ...selectedGroup,
                                  director_id: profile.id,
                                });
                                setIsEditDirectorPopoverOpen(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  selectedGroup.director_id === profile.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              <div className="flex flex-col">
                                <span className="font-medium">
                                  {profile.full_name || "Sin nombre"}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {profile.email || profile.id}
                                </span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Capacidad Máxima de Estudiantes (opcional)</Label>
                <Input
                  type="number"
                  placeholder="Ej: 30"
                  value={selectedGroup.max_students || 0}
                  onChange={(e) =>
                    setSelectedGroup({
                      ...selectedGroup,
                      max_students: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsEditGroupOpen(false)}
                  disabled={groupLoading}
                >
                  Cancelar
                </Button>
                <Button onClick={handleUpdateGroup} disabled={groupLoading}>
                  {groupLoading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isViewStudentsOpen} onOpenChange={setIsViewStudentsOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between my-4">
              <DialogTitle>
                Estudiantes del Grupo: {selectedGroupForStudents?.name}
              </DialogTitle>
              <Dialog
                open={isLinkStudentOpen}
                onOpenChange={setIsLinkStudentOpen}
              >
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Vincular Estudiante</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Vincular Estudiante al Grupo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Seleccionar Estudiante</Label>
                      <Select
                        value={selectedStudentId}
                        onValueChange={setSelectedStudentId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un estudiante" />
                        </SelectTrigger>
                        <SelectContent>
                          {studentEnrolled.length === 0 ? (
                            <div className="p-2 text-sm text-muted-foreground text-center">
                              No hay estudiantes matriculados
                            </div>
                          ) : (
                            (() => {
                              const availableStudents = studentEnrolled.filter(
                                (enrolled) => {
                                  console.log(enrolled);
                                  // Filtrar solo estudiantes que NO estén ya asignados al grupo
                                  const isAlreadyAssigned =
                                    groupHasStudents.some(
                                      (ghs) =>
                                        ghs.group_id ===
                                          selectedGroupForStudents?.id &&
                                        ghs.student_enrolled_id === enrolled.id
                                    );
                                  return (
                                    !isAlreadyAssigned && enrolled.is_active
                                  );
                                }
                              );

                              if (availableStudents.length === 0) {
                                return (
                                  <div className="p-2 text-sm text-muted-foreground text-center">
                                    No hay estudiantes disponibles para vincular
                                  </div>
                                );
                              }

                              return availableStudents.map((enrolled) => {
                                const profile = profiles.find(
                                  (p) => p.id === enrolled.user_id
                                );
                                return (
                                  <SelectItem
                                    key={enrolled.id}
                                    value={enrolled.id}
                                  >
                                    {profile?.full_name || "Sin nombre"} -{" "}
                                    {profile?.email || enrolled.user_id}
                                  </SelectItem>
                                );
                              });
                            })()
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsLinkStudentOpen(false);
                          setSelectedStudentId("");
                        }}
                        disabled={studentsLoading}
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleLinkStudent}
                        disabled={studentsLoading}
                      >
                        {studentsLoading ? "Vinculando..." : "Vincular"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </DialogHeader>
          {selectedGroupForStudents && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>
                  <strong>Curso:</strong>{" "}
                  {courses.find(
                    (c) => c.id === selectedGroupForStudents.course_id
                  )?.name || "N/A"}
                </p>
                <p>
                  <strong>Periodo:</strong>{" "}
                  {periodos.find(
                    (p) => p.id === (selectedGroupForStudents.year as any)
                  )?.name || `Año ${selectedGroupForStudents.year}`}
                </p>
              </div>
              <div className="border rounded-lg joseestuvoaqui">
                {(() => {
                  console.log("=== DEBUG INFO ===");
                  console.log(
                    "selectedGroupForStudents.id:",
                    selectedGroupForStudents.id
                  );
                  console.log(
                    "Total groupHasStudents:",
                    groupHasStudents.length
                  );
                  console.log("groupHasStudents:", groupHasStudents);
                  const filtered = groupHasStudents.filter(
                    (ghs) => ghs.group_id === selectedGroupForStudents.id
                  );
                  console.log("Filtered by group_id:", filtered);
                  const filteredActive = groupHasStudents.filter(
                    (ghs) => ghs.group_id === selectedGroupForStudents.id
                  );
                  console.log(
                    "Filtered by group_id AND is_active:",
                    filteredActive
                  );
                  console.log("studentEnrolled:", studentEnrolled);
                  console.log("profiles:", profiles);

                  // Verificar la relación completa
                  filteredActive.forEach((ghs) => {
                    const enrolled = studentEnrolled.find(
                      (e) => e.id === ghs.student_enrolled_id
                    );
                    console.log(
                      `Student Enrolled ID: ${ghs.student_enrolled_id}`
                    );
                    console.log(`Enrolled found:`, enrolled);
                    if (enrolled) {
                      const student = profiles.find(
                        (p) => p.id === enrolled.user_id
                      );
                      console.log(`Profile found:`, student);
                    }
                  });

                  return null; // No mostrar nada en la UI
                })()}
                {groupHasStudents.filter(
                  (ghs) => ghs.group_id === selectedGroupForStudents.id
                ).length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="w-16 h-16 mx-auto mb-4 opacity-40" />
                    <p className="font-medium">No hay estudiantes asignados</p>
                    <p className="text-sm mt-2">
                      Este grupo aún no tiene estudiantes inscritos
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {groupHasStudents
                      .filter(
                        (ghs) => ghs.group_id === selectedGroupForStudents.id
                        // Temporalmente sin filtrar por is_active
                      )
                      .map((ghs) => {
                        // Buscar primero en studentEnrolled
                        const enrolled = studentEnrolled.find(
                          (e) => e.id === ghs.student_enrolled_id
                        );
                        // Luego buscar en profiles usando user_id
                        const student = enrolled
                          ? profiles.find((p) => p.id === enrolled.user_id)
                          : null;

                        // Obtener información del padre
                        const parentInfo = enrolled
                          ? getParentInfo(enrolled.user_id)
                          : null;

                        console.log("Enrolled:", enrolled);
                        console.log("Student found:", student);
                        console.log("Parent info:", parentInfo);

                        const isExpanded = expandedStudentId === ghs.id;

                        return (
                          <div
                            key={ghs.id}
                            className="p-4 hover:bg-muted/50 transition-colors border-b last:border-b-0"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-medium">
                                  {student?.full_name || "Nombre no disponible"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {student?.email || ghs.student_enrolled_id}
                                </p>
                              </div>
                              <Badge variant="default">Activo</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Inscrito en el grupo
                            </p>

                            {/* Botón para expandir información del padre */}
                            <div className="mt-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-between hover:bg-purple-50 dark:hover:bg-purple-950/20"
                                onClick={() =>
                                  setExpandedStudentId(
                                    isExpanded ? null : ghs.id
                                  )
                                }
                              >
                                <div className="flex items-center gap-2">
                                  <UserCircle className="w-4 h-4 text-purple-500" />
                                  <span className="text-sm font-medium">
                                    Ver Padre/Tutor
                                  </span>
                                </div>
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform duration-200 ${
                                    isExpanded ? "rotate-180" : ""
                                  }`}
                                />
                              </Button>

                              {/* Acordeón con información del padre */}
                              <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                  isExpanded
                                    ? "max-h-40 opacity-100 mt-2"
                                    : "max-h-0 opacity-0"
                                }`}
                              >
                                <div className="p-3 bg-purple-50/50 dark:bg-purple-950/10 rounded-md border border-purple-200 dark:border-purple-900">
                                  {parentInfo ? (
                                    <div className="space-y-2">
                                      <div>
                                        <p className="text-xs font-medium text-muted-foreground">
                                          Nombre:
                                        </p>
                                        <p className="text-sm font-semibold">
                                          {parentInfo.full_name || "Sin nombre"}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-xs font-medium text-muted-foreground">
                                          Correo:
                                        </p>
                                        <p className="text-sm">
                                          {parentInfo.email || "Sin correo"}
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-center py-2">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        Sin padre asignado
                                      </Badge>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Total de estudiantes:{" "}
                  <strong>
                    {
                      groupHasStudents.filter(
                        (ghs) => ghs.group_id === selectedGroupForStudents.id
                        // Temporalmente sin filtrar por is_active
                      ).length
                    }
                  </strong>
                  {selectedGroupForStudents.max_students && (
                    <span>
                      {" "}
                      / {selectedGroupForStudents.max_students} (capacidad
                      máxima)
                    </span>
                  )}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsViewStudentsOpen(false)}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isViewParentsOpen} onOpenChange={setIsViewParentsOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between my-4">
              <DialogTitle>
                Padres del Grupo: {selectedGroupForParents?.name}
              </DialogTitle>
              <Dialog
                open={isLinkParentOpen}
                onOpenChange={setIsLinkParentOpen}
              >
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Vincular Padre</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Vincular Padre al Grupo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Seleccionar Padre</Label>
                      <Select
                        value={selectedParentId}
                        onValueChange={setSelectedParentId}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un padre" />
                        </SelectTrigger>
                        <SelectContent>
                          {parentEnrolled.length === 0 ? (
                            <div className="p-2 text-sm text-muted-foreground text-center">
                              No hay padres matriculados
                            </div>
                          ) : (
                            (() => {
                              const availableParents = parentEnrolled.filter(
                                (enrolled) => {
                                  const isAlreadyAssigned =
                                    groupHasParents.some(
                                      (ghp) =>
                                        ghp.group_id ===
                                          selectedGroupForParents?.id &&
                                        ghp.parent_enrolled_id === enrolled.id
                                    );
                                  return (
                                    !isAlreadyAssigned && enrolled.is_active
                                  );
                                }
                              );

                              if (availableParents.length === 0) {
                                return (
                                  <div className="p-2 text-sm text-muted-foreground text-center">
                                    No hay padres disponibles para vincular
                                  </div>
                                );
                              }

                              return availableParents.map((enrolled) => {
                                const profile = profiles.find(
                                  (p) => p.id === enrolled.user_id
                                );
                                return (
                                  <SelectItem
                                    key={enrolled.id}
                                    value={enrolled.id}
                                  >
                                    {profile?.full_name || "Sin nombre"} -{" "}
                                    {profile?.email || enrolled.user_id}
                                  </SelectItem>
                                );
                              });
                            })()
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsLinkParentOpen(false);
                          setSelectedParentId("");
                        }}
                        disabled={parentsLoading}
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleLinkParent}
                        disabled={parentsLoading}
                      >
                        {parentsLoading ? "Vinculando..." : "Vincular"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </DialogHeader>
          {selectedGroupForParents && (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>
                  <strong>Curso:</strong>{" "}
                  {courses.find(
                    (c) => c.id === selectedGroupForParents.course_id
                  )?.name || "N/A"}
                </p>
                <p>
                  <strong>Periodo:</strong>{" "}
                  {periodos.find(
                    (p) => p.id === (selectedGroupForParents.year as any)
                  )?.name || `Año ${selectedGroupForParents.year}`}
                </p>
              </div>
              <div className="border rounded-lg">
                {groupHasParents.filter(
                  (ghp) => ghp.group_id === selectedGroupForParents.id
                ).length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <UserCircle className="w-16 h-16 mx-auto mb-4 opacity-40" />
                    <p className="font-medium">No hay padres asignados</p>
                    <p className="text-sm mt-2">
                      Este grupo aún no tiene padres inscritos
                    </p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {groupHasParents
                      .filter(
                        (ghp) => ghp.group_id === selectedGroupForParents.id
                      )
                      .map((ghp) => {
                        const enrolled = parentEnrolled.find(
                          (e) => e.id === ghp.parent_enrolled_id
                        );
                        const parent = enrolled
                          ? profiles.find((p) => p.id === enrolled.user_id)
                          : null;
                        return (
                          <div
                            key={ghp.id}
                            className="p-4 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-medium">
                                  {parent?.full_name || "Nombre no disponible"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {parent?.email || ghp.parent_enrolled_id}
                                </p>
                              </div>
                              <Badge variant="default">Activo</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Inscrito en el grupo
                            </p>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Total de padres:{" "}
                  <strong>
                    {
                      groupHasParents.filter(
                        (ghp) => ghp.group_id === selectedGroupForParents.id
                      ).length
                    }
                  </strong>
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsViewParentsOpen(false)}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
