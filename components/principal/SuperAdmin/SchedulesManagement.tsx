"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Clock,
  Search,
  Filter,
  Calendar,
  Users,
  BookOpen,
  MapPin,
} from "lucide-react";
import { GroupHasClassStore } from "@/Stores/GroupHasClassStore";
import { GroupClassScheduleStore } from "@/Stores/GroupClassScheduleStore";
import { TeacherEnrrolledStore } from "@/Stores/teacherEnrolledStore";
import { ProfilesStore } from "@/Stores/profilesStore";
import { MateriasStore } from "@/Stores/materiasStore";
import { GroupsStore } from "@/Stores/groupsStore";
import { ClassroomsStore } from "@/Stores/ClassroomsStore";
import { CoursesStore } from "@/Stores/coursesStore";
import { PeriodAcademicStore } from "@/Stores/periodAcademicStore";

export function SchedulesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfesor, setSelectedProfesor] = useState(
    "Todos los profesores"
  );
  const [selectedMateria, setSelectedMateria] = useState("Todas las materias");
  const [selectedDia, setSelectedDia] = useState("Todos los días");
  const [selectedCurso, setSelectedCurso] = useState("Todos los cursos");
  const [selectedGrupo, setSelectedGrupo] = useState("Todos los grupos");
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");

  // Estado para el modal de crear/editar clase
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingScheduleId, setEditingScheduleId] = useState<string | null>(
    null
  );
  const [editingClassId, setEditingClassId] = useState<string | null>(null);

  // Estados para el formulario de crear/editar clase
  const [formData, setFormData] = useState({
    className: "",
    subjectId: "",
    teacherId: "",
    courseId: "",
    groupId: "",
    classroomId: "",
  });

  // Estados para manejar múltiples horarios
  const [schedules, setSchedules] = useState<
    Array<{
      id?: string; // Para edición
      dayOfWeek: string;
      startTime: string;
      endTime: string;
    }>
  >([]);

  // Estado temporal para agregar un nuevo horario
  const [tempSchedule, setTempSchedule] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
  });

  // Consultar los stores
  const { groupHasClasses, fetchGroupHasClasses } = GroupHasClassStore();
  const { groupClassSchedules, fetchGroupClassSchedules } =
    GroupClassScheduleStore();
  const { enrolled: teachersEnrolled, fetchEnrolled: fetchTeachersEnrolled } =
    TeacherEnrrolledStore();
  const { profiles, fetchProfiles } = ProfilesStore();
  const { materias: materiasData, fetchMaterias } = MateriasStore();
  const { groups: groupsData, fetchGroups } = GroupsStore();
  const { classrooms: classroomsData, fetchClassrooms } = ClassroomsStore();
  const { courses: coursesData, fetchCourses } = CoursesStore();
  const { periodos, fetchPeriodos } = PeriodAcademicStore();
  const { addGroupHasClass, updateGroupHasClass } = GroupHasClassStore();
  const { addGroupClassSchedule, updateGroupClassSchedule } =
    GroupClassScheduleStore();

  // Función para agregar un horario a la lista
  const handleAddSchedule = () => {
    if (!tempSchedule.dayOfWeek || !tempSchedule.startTime || !tempSchedule.endTime) {
      alert("Por favor completa todos los campos del horario");
      return;
    }

    setSchedules([...schedules, { ...tempSchedule }]);
    setTempSchedule({ dayOfWeek: "", startTime: "", endTime: "" });
  };

  // Función para eliminar un horario de la lista
  const handleRemoveSchedule = (index: number) => {
    setSchedules(schedules.filter((_, i) => i !== index));
  };

  // Función para abrir el modal en modo edición
  const handleEditClick = (horario: any) => {
    // Llenar el formulario con los datos existentes
    const group = groupsData.find((g) => g.id === horario.group_id);

    setFormData({
      className: horario.class_name,
      subjectId: horario.subject_id || "",
      teacherId: horario.teacher_id || "",
      courseId: group?.course_id || "",
      groupId: horario.group_id || "",
      classroomId: horario.classroom_id || "",
    });

    // Cargar todos los horarios de esta clase
    const classSchedules = groupClassSchedules
      .filter((s) => s.group_class_id === horario.class_id)
      .map((s) => ({
        id: s.id,
        dayOfWeek: s.day_of_week.toString(),
        startTime: s.start_time.substring(0, 5),
        endTime: s.end_time.substring(0, 5),
      }));

    setSchedules(classSchedules);
    setEditingScheduleId(horario.id);
    setEditingClassId(horario.class_id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Función para crear o actualizar clase y horario
  const handleCreateOrUpdateClass = async () => {
    try {
      // Validar que todos los campos estén completos
      if (
        !formData.className ||
        !formData.subjectId ||
        !formData.teacherId ||
        !formData.groupId ||
        !formData.classroomId
      ) {
        alert("Por favor completa todos los campos de la clase");
        return;
      }

      // Validar que haya al menos un horario
      if (schedules.length === 0) {
        alert("Por favor agrega al menos un horario para la clase");
        return;
      }

      // Obtener el período académico activo
      const activePeriod = periodos.find((p) => p.is_active);
      if (!activePeriod) {
        alert(
          "No hay un período académico activo. Por favor activa uno primero."
        );
        return;
      }
      const academicPeriodId = activePeriod.id;

      if (isEditing && editingClassId) {
        // MODO EDICIÓN
        // 1. Actualizar group_has_class
        await updateGroupHasClass(editingClassId, {
          name: formData.className,
          teacher_enrolled_id: formData.teacherId,
          classroom_id: formData.classroomId,
          subject_id: formData.subjectId,
          group_id: formData.groupId,
          updated_at: new Date().toISOString(),
        });

        // 2. Actualizar o crear los horarios
        for (const schedule of schedules) {
          if (schedule.id) {
            // Actualizar horario existente
            await updateGroupClassSchedule(schedule.id, {
              day_of_week: parseInt(schedule.dayOfWeek),
              start_time: schedule.startTime + ":00",
              end_time: schedule.endTime + ":00",
              classroom_id: formData.classroomId,
              updated_at: new Date().toISOString(),
            });
          } else {
            // Crear nuevo horario
            const newSchedule = {
              id: crypto.randomUUID(),
              group_class_id: editingClassId,
              day_of_week: parseInt(schedule.dayOfWeek),
              start_time: schedule.startTime + ":00",
              end_time: schedule.endTime + ":00",
              classroom_id: formData.classroomId,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };
            await addGroupClassSchedule(newSchedule);
          }
        }

        alert("Clase actualizada exitosamente");
      } else {
        // MODO CREACIÓN
        // 1. Crear el group_has_class
        const newGroupClass = {
          id: crypto.randomUUID(),
          name: formData.className,
          teacher_enrolled_id: formData.teacherId,
          classroom_id: formData.classroomId,
          subject_id: formData.subjectId,
          group_id: formData.groupId,
          academic_period_id: academicPeriodId,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        await addGroupHasClass(newGroupClass);

        // 2. Crear todos los horarios
        for (const schedule of schedules) {
          const newSchedule = {
            id: crypto.randomUUID(),
            group_class_id: newGroupClass.id,
            day_of_week: parseInt(schedule.dayOfWeek),
            start_time: schedule.startTime + ":00",
            end_time: schedule.endTime + ":00",
            classroom_id: formData.classroomId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          await addGroupClassSchedule(newSchedule);
        }

        alert("Clase creada exitosamente con múltiples horarios");
      }

      // 3. Recargar los datos
      await fetchGroupHasClasses();
      await fetchGroupClassSchedules();
      setDataLoaded(true);

      // 4. Limpiar el formulario y cerrar el modal
      setFormData({
        className: "",
        subjectId: "",
        teacherId: "",
        courseId: "",
        groupId: "",
        classroomId: "",
      });
      setSchedules([]);
      setTempSchedule({ dayOfWeek: "", startTime: "", endTime: "" });
      setIsEditing(false);
      setEditingScheduleId(null);
      setEditingClassId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar la clase:", error);
      alert("Error al guardar la clase. Por favor intenta de nuevo.");
    }
  };

  // Mapear días de la semana
  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  // Combinar horarios con detalles de clase (joins manuales)
  const schedulesWithDetails = groupClassSchedules.map((schedule) => {
    // 1. Buscar la clase (group_has_class)
    const groupClass = groupHasClasses.find(
      (ghc) => ghc.id === schedule.group_class_id
    );

    // 2. Buscar el profesor: teacher_enrolled → profiles
    const teacher = teachersEnrolled.find(
      (t) => t.id === groupClass?.teacher_enrolled_id
    );
    const teacherProfile = profiles.find((p) => p.id === teacher?.user_id);
    const teacherName = teacherProfile?.full_name || "Sin profesor";

    // 3. Buscar la materia
    const materia = materiasData.find((m) => m.id === groupClass?.subject_id);

    // 4. Buscar el grupo
    const group = groupsData.find((g) => g.id === groupClass?.group_id);

    // 5. Buscar el curso (a través del grupo)
    const course = coursesData.find((c) => c.id === group?.course_id);

    // 6. Buscar el aula
    const classroom = classroomsData.find(
      (c) => c.id === (schedule.classroom_id || groupClass?.classroom_id)
    );

    return {
      // Datos del horario
      id: schedule.id,
      day_of_week: schedule.day_of_week,
      dia: diasSemana[schedule.day_of_week - 1] || "Sin día",
      horaInicio: schedule.start_time,
      horaFin: schedule.end_time,

      // Datos de la clase
      class_id: groupClass?.id,
      class_name: groupClass?.name || "Sin nombre",

      // Datos del profesor
      teacher_id: groupClass?.teacher_enrolled_id,
      profesor: teacherName,

      // Datos de la materia
      subject_id: groupClass?.subject_id,
      materia: materia?.name || "Sin materia",

      // Datos del grupo
      group_id: groupClass?.group_id,
      grupo: group?.name || "Sin grupo",

      // Datos del curso
      course_id: group?.course_id,
      curso: course?.name || "Sin curso",

      // Datos del aula
      classroom_id: schedule.classroom_id || groupClass?.classroom_id,
      aula: classroom?.name || "Sin aula",
    };
  });

  // Filtrar horarios
  const filteredHorarios = schedulesWithDetails.filter((schedule) => {
    // Filtro por búsqueda de texto
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        schedule.class_name.toLowerCase().includes(searchLower) ||
        schedule.profesor.toLowerCase().includes(searchLower) ||
        schedule.materia.toLowerCase().includes(searchLower) ||
        schedule.curso.toLowerCase().includes(searchLower) ||
        schedule.grupo.toLowerCase().includes(searchLower) ||
        schedule.aula.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;
    }

    // Filtro por profesor
    if (
      selectedProfesor !== "Todos los profesores" &&
      schedule.profesor !== selectedProfesor
    ) {
      return false;
    }

    // Filtro por materia
    if (
      selectedMateria !== "Todas las materias" &&
      schedule.materia !== selectedMateria
    ) {
      return false;
    }

    // Filtro por día
    if (selectedDia !== "Todos los días" && schedule.dia !== selectedDia) {
      return false;
    }

    // Filtro por curso
    if (
      selectedCurso !== "Todos los cursos" &&
      schedule.curso !== selectedCurso
    ) {
      return false;
    }

    // Filtro por grupo
    if (
      selectedGrupo !== "Todos los grupos" &&
      schedule.grupo !== selectedGrupo
    ) {
      return false;
    }

    return true;
  });

  // Obtener listas únicas para los filtros (de todos los horarios, no solo los filtrados)
  const profesoresList = [
    ...new Set(schedulesWithDetails.map((h) => h.profesor)),
  ].filter((p) => p !== "Sin profesor");

  const materias = [
    ...new Set(schedulesWithDetails.map((h) => h.materia)),
  ].filter((m) => m !== "Sin materia");

  const cursos = [...new Set(schedulesWithDetails.map((h) => h.curso))].filter(
    (c) => c !== "Sin curso"
  );

  const grupos = [...new Set(schedulesWithDetails.map((h) => h.grupo))].filter(
    (g) => g !== "Sin grupo"
  );

  // Filtrar grupos según el curso seleccionado en el formulario
  const gruposFiltrados = formData.courseId
    ? groupsData.filter((g) => g.course_id === formData.courseId)
    : groupsData;

  // Generar horas del día (6 AM - 8 PM)
  const horasDelDia = Array.from({ length: 15 }, (_, i) => {
    const hora = i + 6; // Empezar en 6 AM
    return `${hora.toString().padStart(2, "0")}:00`;
  });

  // Agrupar horarios por día de la semana
  const horariosPorDia = diasSemana.map((dia, index) => {
    return {
      dia,
      dayNumber: index + 1,
      horarios: filteredHorarios.filter((h) => h.day_of_week === index + 1),
    };
  });

  // Colores para diferentes materias
  const coloresMaterias = [
    "bg-blue-100 border-blue-300 text-blue-900",
    "bg-green-100 border-green-300 text-green-900",
    "bg-purple-100 border-purple-300 text-purple-900",
    "bg-yellow-100 border-yellow-300 text-yellow-900",
    "bg-pink-100 border-pink-300 text-pink-900",
    "bg-indigo-100 border-indigo-300 text-indigo-900",
    "bg-orange-100 border-orange-300 text-orange-900",
    "bg-teal-100 border-teal-300 text-teal-900",
  ];

  // Asignar color a cada materia
  const getColorForSubject = (subjectId: string | undefined) => {
    if (!subjectId) return coloresMaterias[0];
    const index =
      [...new Set(schedulesWithDetails.map((h) => h.subject_id))].indexOf(
        subjectId
      ) % coloresMaterias.length;
    return coloresMaterias[index];
  };

  // Función para cargar datos cuando se presiona el botón "Filtrar"
  const handleFilterClick = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchGroupHasClasses(),
        fetchGroupClassSchedules(),
        fetchTeachersEnrolled(),
        fetchProfiles(),
        fetchMaterias(),
        fetchGroups(),
        fetchClassrooms(),
        fetchCourses(),
        fetchPeriodos(),
      ]);
      setDataLoaded(true);
    } catch (error) {
      console.error("Error al cargar los datos:", error);
      alert("Error al cargar los datos. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // // Debug: Ver qué datos están llegando
  // useEffect(() => {
  //   console.log("=== DEBUG HORARIOS ===");
  //   console.log("groupHasClasses:", groupHasClasses);
  //   console.log("groupClassSchedules:", groupClassSchedules);
  //   console.log("teachersEnrolled:", teachersEnrolled);
  //   console.log("profiles:", profiles);
  //   console.log("materiasData:", materiasData);
  //   console.log("groupsData:", groupsData);
  //   console.log("classroomsData:", classroomsData);
  //   console.log("schedulesWithDetails:", schedulesWithDetails);
  // }, [
  //   groupHasClasses,
  //   groupClassSchedules,
  //   teachersEnrolled,
  //   profiles,
  //   materiasData,
  //   groupsData,
  //   classroomsData,
  // ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          Gestión de Horarios
        </h2>
        <button
          onClick={() => {
            // Limpiar estados antes de abrir el modal en modo creación
            setFormData({
              className: "",
              subjectId: "",
              teacherId: "",
              courseId: "",
              groupId: "",
              classroomId: "",
            });
            setSchedules([]);
            setTempSchedule({ dayOfWeek: "", startTime: "", endTime: "" });
            setIsEditing(false);
            setEditingScheduleId(null);
            setEditingClassId(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-black text-white rounded  flex items-center gap-2"
        >
          <span>+</span>
          Crear Nueva Clase
        </button>
      </div>

      {/* Botones para cambiar vista */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2">
              Vista:
            </span>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Calendario Semanal
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Lista de Horarios
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por profesor, materia, curso o aula..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={selectedProfesor}
                onValueChange={setSelectedProfesor}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por profesor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos los profesores">
                    Todos los profesores
                  </SelectItem>
                  {profesoresList.map((profesor) => (
                    <SelectItem key={profesor} value={profesor}>
                      {profesor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedMateria}
                onValueChange={setSelectedMateria}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por materia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todas las materias">
                    Todas las materias
                  </SelectItem>
                  {materias.map((materia) => (
                    <SelectItem key={materia} value={materia}>
                      {materia}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCurso} onValueChange={setSelectedCurso}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos los cursos">
                    Todos los cursos
                  </SelectItem>
                  {cursos.map((curso) => (
                    <SelectItem key={curso} value={curso}>
                      {curso}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedGrupo} onValueChange={setSelectedGrupo}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por grupo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos los grupos">
                    Todos los grupos
                  </SelectItem>
                  {grupos.map((grupo) => (
                    <SelectItem key={grupo} value={grupo}>
                      {grupo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDia} onValueChange={setSelectedDia}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por día" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos los días">Todos los días</SelectItem>
                  {diasSemana.map((dia) => (
                    <SelectItem key={dia} value={dia}>
                      {dia}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Botón Filtrar */}
            <div className="flex justify-end">
              <Button
                onClick={handleFilterClick}
                disabled={isLoading}
                className="px-6"
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">Cargando...</span>
                  </>
                ) : (
                  <>
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrar
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendario semanal */}
      {viewMode === "calendar" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Horario Semanal</span>
              <Badge variant="secondary" className="ml-2">
                Vista de Calendario
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!dataLoaded ? (
              <div className="text-center py-12 text-muted-foreground">
                <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">
                  Presiona el botón "Filtrar" para cargar los horarios
                </p>
                <p className="text-sm">
                  Configura los filtros que necesites y luego haz clic en el
                  botón Filtrar
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="grid grid-cols-8 gap-2 min-w-[1200px]">
                  {/* Columna de horas */}
                  <div className="col-span-1">
                    <div className="h-12 flex items-center justify-center font-semibold text-sm bg-muted rounded">
                      Hora
                    </div>
                    {horasDelDia.map((hora) => (
                      <div
                        key={hora}
                        className="h-20 flex items-center justify-center text-sm font-medium text-muted-foreground border-t"
                      >
                        {hora}
                      </div>
                    ))}
                  </div>

                  {/* Columnas de días */}
                  {horariosPorDia.map((diaData) => (
                    <div key={diaData.dia} className="col-span-1 relative">
                      {/* Encabezado del día */}
                      <div className="h-12 flex items-center justify-center font-semibold text-sm bg-muted rounded mb-2">
                        {diaData.dia}
                      </div>

                      {/* Grid de horas */}
                      <div className="relative">
                        {horasDelDia.map((hora) => (
                          <div
                            key={hora}
                            className="h-20 border-t border-border/50"
                          />
                        ))}

                        {/* Bloques de horarios posicionados absolutamente */}
                        {diaData.horarios.map((horario) => {
                          const startHour = parseInt(
                            horario.horaInicio.split(":")[0]
                          );
                          const startMinute = parseInt(
                            horario.horaInicio.split(":")[1]
                          );
                          const endHour = parseInt(
                            horario.horaFin.split(":")[0]
                          );
                          const endMinute = parseInt(
                            horario.horaFin.split(":")[1]
                          );

                          // Calcular posición y altura
                          const topPosition =
                            (startHour - 6) * 80 + (startMinute / 60) * 80;
                          const duration =
                            (endHour - startHour) * 60 +
                            (endMinute - startMinute);
                          const height = (duration / 60) * 80;

                          const colorClass = getColorForSubject(
                            horario.subject_id
                          );

                          return (
                            <div
                              key={horario.id}
                              className={`absolute left-0 right-0 mx-1 rounded-lg border-2 p-2 ${colorClass} overflow-hidden cursor-pointer hover:opacity-80 transition-opacity`}
                              style={{
                                top: `${topPosition}px`,
                                height: `${height}px`,
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(horario);
                              }}
                            >
                              <div className="text-xs font-semibold truncate">
                                {horario.materia} - {horario.curso} {horario.grupo}
                              </div>
                              <div className="text-xs truncate">
                                {horario.horaInicio.substring(0, 5)} -{" "}
                                {horario.horaFin.substring(0, 5)} | {horario.profesor}
                              </div>
                              <div className="text-xs truncate opacity-70">
                                {horario.aula}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Lista de horarios */}
      {viewMode === "list" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Lista de Horarios</span>
              {dataLoaded && (
                <Badge variant="secondary" className="ml-2">
                  {filteredHorarios.length} horarios
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!dataLoaded ? (
              <div className="text-center py-12 text-muted-foreground">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">
                  Presiona el botón "Filtrar" para cargar los horarios
                </p>
                <p className="text-sm">
                  Configura los filtros que necesites y luego haz clic en el
                  botón Filtrar
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredHorarios.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No se encontraron horarios que coincidan con los filtros
                    seleccionados.
                  </div>
                ) : (
                  <>
                    {/* Agrupar horarios por día */}
                    {horariosPorDia.map((diaData) => {
                      // Filtrar solo los horarios que corresponden a este día
                      const horariosDelDia = filteredHorarios.filter(
                        (h) => h.day_of_week === diaData.dayNumber
                      );

                      // Solo mostrar el día si tiene horarios
                      if (horariosDelDia.length === 0) return null;

                      return (
                        <div key={diaData.dia} className="space-y-3">
                          {/* Encabezado del día */}
                          <div className="flex items-center gap-2 pb-2 border-b">
                            <Calendar className="w-5 h-5 text-primary" />
                            <h3 className="text-lg font-semibold text-foreground">
                              {diaData.dia}
                            </h3>
                            <Badge variant="secondary" className="ml-2">
                              {horariosDelDia.length}{" "}
                              {horariosDelDia.length === 1 ? "clase" : "clases"}
                            </Badge>
                          </div>

                          {/* Horarios del día */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {horariosDelDia.map((horario) => (
                              <Card
                                key={horario.id}
                                className="border border-border cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => handleEditClick(horario)}
                              >
                                <CardContent className="p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <Badge variant="outline" className="text-xs">
                                        {horario.dia}
                                      </Badge>
                                      <span className="text-sm font-medium text-blue-600">
                                        {horario.horaInicio} - {horario.horaFin}
                                      </span>
                                    </div>

                                    <div className="space-y-2">
                                      <div className="flex items-center space-x-2 text-sm">
                                        <BookOpen className="w-4 h-4 text-green-500" />
                                        <span className="font-medium">
                                          {horario.materia}
                                        </span>
                                      </div>

                                      <div className="flex items-center space-x-2 text-sm">
                                        <Users className="w-4 h-4 text-blue-500" />
                                        <span>{horario.profesor}</span>
                                      </div>

                                      <div className="flex items-center space-x-2 text-sm">
                                        <Users className="w-4 h-4 text-purple-500" />
                                        <span>
                                          {horario.curso} - {horario.grupo}
                                        </span>
                                      </div>

                                      <div className="flex items-center space-x-2 text-sm">
                                        <MapPin className="w-4 h-4 text-orange-500" />
                                        <span>{horario.aula}</span>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Modal para crear/editar clase */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing
                ? "Editar Clase y Horario"
                : "Crear Nueva Clase y Horario"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Nombre de la clase */}
            <div className="space-y-2">
              <Label htmlFor="class-name">Nombre de la Clase</Label>
              <Input
                id="class-name"
                placeholder="Ej: Matemáticas Avanzadas"
                value={formData.className}
                onChange={(e) =>
                  setFormData({ ...formData, className: e.target.value })
                }
              />
            </div>

            {/* Materia */}
            <div className="space-y-2">
              <Label htmlFor="materia">Materia</Label>
              <Select
                value={formData.subjectId}
                onValueChange={(value) =>
                  setFormData({ ...formData, subjectId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar materia" />
                </SelectTrigger>
                <SelectContent>
                  {materiasData.map((materia) => (
                    <SelectItem key={materia.id} value={materia.id}>
                      {materia.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Profesor */}
            <div className="space-y-2">
              <Label htmlFor="profesor">Profesor</Label>
              <Select
                value={formData.teacherId}
                onValueChange={(value) =>
                  setFormData({ ...formData, teacherId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar profesor" />
                </SelectTrigger>
                <SelectContent>
                  {teachersEnrolled.map((teacher) => {
                    const profile = profiles.find(
                      (p) => p.id === teacher.user_id
                    );
                    return (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {profile?.full_name || "Sin nombre"}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Curso */}
            <div className="space-y-2">
              <Label htmlFor="curso">Curso</Label>
              <Select
                value={formData.courseId}
                onValueChange={(value) => {
                  // Al cambiar el curso, limpiar el grupo seleccionado
                  setFormData({ ...formData, courseId: value, groupId: "" });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar curso" />
                </SelectTrigger>
                <SelectContent>
                  {coursesData.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Grupo */}
            <div className="space-y-2">
              <Label htmlFor="grupo">Grupo</Label>
              <Select
                value={formData.groupId}
                onValueChange={(value) =>
                  setFormData({ ...formData, groupId: value })
                }
                disabled={!formData.courseId}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      formData.courseId
                        ? "Seleccionar grupo"
                        : "Primero selecciona un curso"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {gruposFiltrados.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Aula */}
            <div className="space-y-2">
              <Label htmlFor="aula">Aula</Label>
              <Select
                value={formData.classroomId}
                onValueChange={(value) =>
                  setFormData({ ...formData, classroomId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar aula" />
                </SelectTrigger>
                <SelectContent>
                  {classroomsData.map((classroom) => (
                    <SelectItem key={classroom.id} value={classroom.id}>
                      {classroom.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-4">Horarios de la Clase</h3>

              {/* Lista de horarios agregados */}
              {schedules.length > 0 && (
                <div className="space-y-2 mb-4">
                  <Label>Horarios agregados ({schedules.length})</Label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {schedules.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-4 text-sm">
                          <Badge variant="outline">
                            {diasSemana[parseInt(schedule.dayOfWeek) - 1]}
                          </Badge>
                          <span className="font-medium">
                            {schedule.startTime} - {schedule.endTime}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSchedule(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          Eliminar
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formulario para agregar nuevo horario */}
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <Label className="text-sm font-medium">Agregar nuevo horario</Label>

                {/* Día de la semana */}
                <div className="space-y-2">
                  <Label htmlFor="dia">Día de la Semana</Label>
                  <Select
                    value={tempSchedule.dayOfWeek}
                    onValueChange={(value) =>
                      setTempSchedule({ ...tempSchedule, dayOfWeek: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar día" />
                    </SelectTrigger>
                    <SelectContent>
                      {diasSemana.map((dia, index) => (
                        <SelectItem key={dia} value={(index + 1).toString()}>
                          {dia}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Hora de inicio y fin */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hora-inicio">Hora de Inicio</Label>
                    <Input
                      id="hora-inicio"
                      type="time"
                      placeholder="08:00"
                      value={tempSchedule.startTime}
                      onChange={(e) =>
                        setTempSchedule({
                          ...tempSchedule,
                          startTime: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hora-fin">Hora de Fin</Label>
                    <Input
                      id="hora-fin"
                      type="time"
                      placeholder="09:00"
                      value={tempSchedule.endTime}
                      onChange={(e) =>
                        setTempSchedule({
                          ...tempSchedule,
                          endTime: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Botón para agregar horario */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddSchedule}
                  className="w-full"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Agregar Horario
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsModalOpen(false);
                setIsEditing(false);
                setEditingScheduleId(null);
                setEditingClassId(null);
                setSchedules([]);
                setTempSchedule({ dayOfWeek: "", startTime: "", endTime: "" });
                setFormData({
                  className: "",
                  subjectId: "",
                  teacherId: "",
                  courseId: "",
                  groupId: "",
                  classroomId: "",
                });
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateOrUpdateClass}>
              {isEditing ? "Actualizar Clase" : "Crear Clase"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
