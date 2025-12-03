"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  ClipboardList,
  Users,
  BarChart3,
  MessageSquare,
  Calendar,
  UserCheck,
  Clock,
  DoorOpen,
  Hash,
  BookOpen,
  UsersRound,
  GraduationCap,
} from "lucide-react";
import type { Curso, Estudiante } from "../types";
import { ESTUDIANTES_MOCK, PERIODOS } from "../constants";
import { TabContenido } from "./tabs/TabContenido";
import { TabActividades } from "./tabs/TabActividades";
import { TabEstudiantes } from "./tabs/TabEstudiantes";
import { TabCalificaciones } from "./tabs/TabCalificaciones";
import { ModalAsistencia } from "./modales/ModalAsistencia";
import { ModalAgregarMaterial } from "./modales/ModalAgregarMaterial";
import { ModalVisualizarMaterial } from "./modales/ModalVisualizarMaterial";
import { ModalEditarMaterial } from "./modales/ModalEditarMaterial";
import { ModalEliminarMaterial } from "./modales/ModalEliminarMaterial";
import { ModalAgregarActivity } from "./modales/ModalAgregarActivity";
import { ModalVisualizarActividad } from "./modales/ModalVisualizarActividad";
import { ModalEditarActividad } from "./modales/ModalEditarActividad";
import { ModalEliminarActividad } from "./modales/ModalEliminarActividad";
import {
  PeriodAcademicStore,
  type PeriodoAcademico,
} from "@/Stores/periodAcademicStore";
import { CycleStore, type Cycle } from "@/Stores/cycleStore";
import {
  GroupHasMaterialStore,
  type GroupHasMaterial,
} from "@/Stores/groupHasMaterialStore";
import {
  GroupHasActivityStore,
  type GroupHasActivity,
} from "@/Stores/groupHasActivityStore";

interface CursoDetalleProps {
  curso: Curso;
  onVolver: () => void;
}

export function CursoDetalle({ curso, onVolver }: CursoDetalleProps) {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState("1");
  const [modalAsistencia, setModalAsistencia] = useState(false);
  const [modalAgregarMaterial, setModalAgregarMaterial] = useState(false);
  const [modalVisualizarMaterial, setModalVisualizarMaterial] = useState(false);
  const [modalEditarMaterial, setModalEditarMaterial] = useState(false);
  const [modalEliminarMaterial, setModalEliminarMaterial] = useState(false);
  const [materialSeleccionado, setMaterialSeleccionado] =
    useState<GroupHasMaterial | null>(null);
  const [materialAEditar, setMaterialAEditar] =
    useState<GroupHasMaterial | null>(null);
  const [materialAEliminar, setMaterialAEliminar] =
    useState<GroupHasMaterial | null>(null);

  // Estados para modales de actividades
  const [modalAgregarActividad, setModalAgregarActividad] = useState(false);
  const [modalVisualizarActividad, setModalVisualizarActividad] =
    useState(false);
  const [modalEditarActividad, setModalEditarActividad] = useState(false);
  const [modalEliminarActividad, setModalEliminarActividad] = useState(false);
  const [actividadSeleccionada, setActividadSeleccionada] =
    useState<GroupHasActivity | null>(null);
  const [actividadAEditar, setActividadAEditar] =
    useState<GroupHasActivity | null>(null);
  const [actividadAEliminar, setActividadAEliminar] =
    useState<GroupHasActivity | null>(null);
  const [fechaAsistencia, setFechaAsistencia] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filtroFecha, setFiltroFecha] = useState("");
  const [asistenciaEstudiantes, setAsistenciaEstudiantes] = useState<
    Estudiante[]
  >(
    ESTUDIANTES_MOCK.map((est) => ({
      ...est,
      presente: false,
      observaciones: "",
    }))
  );

  // Estados para período académico y ciclos
  const [periodoAcademico, setPeriodoAcademico] =
    useState<PeriodoAcademico | null>(null);
  const [ciclos, setCiclos] = useState<Cycle[]>([]);
  const [cicloSeleccionado, setCicloSeleccionado] = useState<string>("");

  // Zustand stores
  const { fetchActivePeriodo } = PeriodAcademicStore();
  const { fetchCyclesByAcademicPeriod } = CycleStore();
  const { materials, loading, fetchMaterialsByGroupClassId } =
    GroupHasMaterialStore();
  const {
    activities,
    loading: loadingActivities,
    fetchActivitiesByGroupClassId,
  } = GroupHasActivityStore();

  // Cargar período académico activo y sus ciclos
  useEffect(() => {
    const loadAcademicData = async () => {
      const activePeriod = await fetchActivePeriodo();
      if (activePeriod) {
        setPeriodoAcademico(activePeriod);
        const cyclesList = await fetchCyclesByAcademicPeriod(activePeriod.id);
        setCiclos(cyclesList);
        if (cyclesList.length > 0) {
          setCicloSeleccionado(cyclesList[0].id);
        }
      }
    };
    loadAcademicData();
  }, [fetchActivePeriodo, fetchCyclesByAcademicPeriod]);

  // Cargar materiales del curso
  useEffect(() => {
    if (curso?.id) {
      fetchMaterialsByGroupClassId(curso.id);
    }
  }, [curso?.id, fetchMaterialsByGroupClassId]);

  // Cargar actividades del curso
  useEffect(() => {
    if (curso?.id) {
      fetchActivitiesByGroupClassId(curso.id);
    }
  }, [curso?.id, fetchActivitiesByGroupClassId]);

  // Handlers para modales
  const abrirModalAsistencia = () => {
    setAsistenciaEstudiantes(
      ESTUDIANTES_MOCK.map((est) => ({
        ...est,
        presente: false,
        observaciones: "",
      }))
    );
    setModalAsistencia(true);
  };

  const guardarAsistencia = () => {
    console.log("Guardando asistencia:", {
      fecha: fechaAsistencia,
      estudiantes: asistenciaEstudiantes,
    });
    setModalAsistencia(false);
  };

  // Handlers para contenido
  const abrirModal = (material: GroupHasMaterial) => {
    setMaterialSeleccionado(material);
    setModalVisualizarMaterial(true);
  };

  const abrirModalEdicion = (material: GroupHasMaterial) => {
    setMaterialAEditar(material);
    setModalEditarMaterial(true);
  };

  const abrirModalEliminacion = (material: GroupHasMaterial) => {
    setMaterialAEliminar(material);
    setModalEliminarMaterial(true);
  };

  const abrirModalAgregar = () => {
    setModalAgregarMaterial(true);
  };

  // Handlers para actividades
  const abrirModalActividad = (actividad: GroupHasActivity) => {
    setActividadSeleccionada(actividad);
    setModalVisualizarActividad(true);
  };

  const abrirModalEdicionActividad = (actividad: GroupHasActivity) => {
    setActividadAEditar(actividad);
    setModalEditarActividad(true);
  };

  const abrirModalEliminacionActividad = (actividad: GroupHasActivity) => {
    setActividadAEliminar(actividad);
    setModalEliminarActividad(true);
  };

  const abrirModalAgregarActividad = () => {
    setModalAgregarActividad(true);
  };

  return (
    <div className="flex-1 space-y-6 p-6 absolute w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {curso?.nombre}
            </h1>
            {curso?.is_active !== undefined && (
              <Badge variant={curso.is_active ? "default" : "destructive"}>
                {curso.is_active ? "Activo" : "Inactivo"}
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* Grupo */}
            <Badge className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
              <UsersRound className="h-3.5 w-3.5" />
              <span className="font-medium">Grupo {curso?.grupo}</span>
            </Badge>

            {/* Separador visual */}
            <div className="h-6 w-px bg-border" />

            {/* Horarios */}
            <div className="flex flex-wrap gap-2">
              {curso?.horario?.split(",").map((horario, index) => (
                <Badge
                  key={index}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 text-purple-700 hover:bg-purple-200 border-0"
                >
                  <Clock className="h-3.5 w-3.5" />
                  <span className="font-medium">{horario.trim()}</span>
                </Badge>
              ))}
            </div>

            {/* Aula */}
            {curso?.classroom?.name && (
              <>
                <div className="h-6 w-px bg-border" />
                <Badge className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 hover:bg-green-200 border-0">
                  <DoorOpen className="h-3.5 w-3.5" />
                  <span className="font-medium">{curso.classroom.name}</span>
                </Badge>
              </>
            )}

            {/* Código del curso */}
            {curso?.course?.code && (
              <>
                <div className="h-6 w-px bg-border" />
                <Badge className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-700 hover:bg-amber-200 border-0">
                  <Hash className="h-3.5 w-3.5" />
                  <span className="font-medium">{curso.course.code}</span>
                </Badge>
              </>
            )}
          </div>

          {curso?.subject?.name && (
            <Badge
              variant="default"
              className="flex items-center gap-1.5 px-3 py-1.5 w-fit bg-primary/90"
            >
              <BookOpen className="h-4 w-4" />
              <span>{curso.subject.name}</span>
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* Año Académico */}
          {periodoAcademico && (
            <div className="relative flex items-center gap-3 px-5 py-3 bg-white/30  rounded-xl  border-primary/30 transition-all duration-300">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Año Académico
                </span>
                <span className="text-base font-bold text-primary leading-tight">
                  {periodoAcademico.name}
                </span>
              </div>
              <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-full blur-xl -z-10" />
            </div>
          )}

          {/* Select de Ciclos */}
          {ciclos.length > 0 && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Período:</label>
              <select
                value={cicloSeleccionado}
                onChange={(e) => setCicloSeleccionado(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm bg-background focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {ciclos.map((ciclo) => (
                  <option key={ciclo.id} value={ciclo.id}>
                    {ciclo.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button
            onClick={abrirModalAsistencia}
            className="bg-green-600 hover:bg-green-700"
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Tomar Asistencia
          </Button>
          <Button variant="outline" onClick={onVolver}>
            Volver a Mis Cursos
          </Button>
        </div>
      </div>

      <Tabs defaultValue="contenido" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="estudiantes" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Estudiantes
          </TabsTrigger>
          <TabsTrigger value="contenido" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Contenido
          </TabsTrigger>
          <TabsTrigger value="actividades" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Actividades
          </TabsTrigger>

          <TabsTrigger
            value="calificaciones"
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            Calificaciones
          </TabsTrigger>
          {/* <TabsTrigger value="foros" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Foros
          </TabsTrigger>
          <TabsTrigger value="planificacion" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Planificación
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="contenido" className="space-y-4">
          <TabContenido
            materiales={materials}
            loading={loading}
            onAbrirModal={abrirModal}
            onAbrirModalEdicion={abrirModalEdicion}
            onAbrirModalEliminacion={abrirModalEliminacion}
            onAbrirModalAgregar={abrirModalAgregar}
          />
        </TabsContent>

        <TabsContent value="actividades" className="space-y-4">
          <TabActividades
            actividades={activities}
            loading={loadingActivities}
            onAbrirModal={abrirModalActividad}
            onAbrirModalEdicion={abrirModalEdicionActividad}
            onAbrirModalEliminacion={abrirModalEliminacionActividad}
            onAbrirModalAgregar={abrirModalAgregarActividad}
          />
        </TabsContent>

        <TabsContent value="estudiantes" className="space-y-4">
          <TabEstudiantes curso={curso} />
        </TabsContent>

        <TabsContent value="calificaciones" className="space-y-4">
          <TabCalificaciones estudiantes={curso?.estudiantes || []} />
        </TabsContent>

        <TabsContent value="foros" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            Funcionalidad de foros en desarrollo
          </div>
        </TabsContent>

        <TabsContent value="planificacion" className="space-y-4">
          <div className="text-center py-8 text-muted-foreground">
            Funcionalidad de planificación en desarrollo
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de asistencia */}
      <ModalAsistencia
        open={modalAsistencia}
        onOpenChange={setModalAsistencia}
        curso={curso}
        fechaAsistencia={fechaAsistencia}
        setFechaAsistencia={setFechaAsistencia}
        filtroFecha={filtroFecha}
        setFiltroFecha={setFiltroFecha}
        asistenciaEstudiantes={asistenciaEstudiantes}
        setAsistenciaEstudiantes={setAsistenciaEstudiantes}
        onGuardar={guardarAsistencia}
      />

      {/* Modal de agregar material */}
      <ModalAgregarMaterial
        open={modalAgregarMaterial}
        onOpenChange={setModalAgregarMaterial}
        groupHasClassId={curso.id}
        cycleId={cicloSeleccionado}
      />

      {/* Modal de visualizar material */}
      <ModalVisualizarMaterial
        open={modalVisualizarMaterial}
        onOpenChange={setModalVisualizarMaterial}
        material={materialSeleccionado}
      />

      {/* Modal de editar material */}
      <ModalEditarMaterial
        open={modalEditarMaterial}
        onOpenChange={setModalEditarMaterial}
        material={materialAEditar}
      />

      {/* Modal de eliminar material */}
      <ModalEliminarMaterial
        open={modalEliminarMaterial}
        onOpenChange={setModalEliminarMaterial}
        material={materialAEliminar}
      />

      {/* Modal de agregar actividad */}
      <ModalAgregarActivity
        open={modalAgregarActividad}
        onOpenChange={setModalAgregarActividad}
        groupHasClassId={curso.id}
        cycleId={cicloSeleccionado}
      />

      {/* Modal de visualizar actividad */}
      <ModalVisualizarActividad
        open={modalVisualizarActividad}
        onOpenChange={setModalVisualizarActividad}
        actividad={actividadSeleccionada}
      />

      {/* Modal de editar actividad */}
      <ModalEditarActividad
        open={modalEditarActividad}
        onOpenChange={setModalEditarActividad}
        actividad={actividadAEditar}
      />

      {/* Modal de eliminar actividad */}
      <ModalEliminarActividad
        open={modalEliminarActividad}
        onOpenChange={setModalEliminarActividad}
        actividad={actividadAEliminar}
      />
    </div>
  );
}
