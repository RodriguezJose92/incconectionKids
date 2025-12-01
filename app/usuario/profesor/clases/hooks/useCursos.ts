import { useState, useEffect } from "react";
import { ManagmentStorage } from "@/components/Services/ManagmentStorage/ManagmentStorage";
import { createClient } from "@/lib/supabase/client";
import type { Curso } from "../types";
import { DIAS_SEMANA } from "../constants";

export function useCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoading(true);

        // 1. Obtener el id_User del storage
        const id_User = ManagmentStorage.getItem("id_User");
        if (!id_User) {
          console.warn("No se encontró id_User en el storage");
          setLoading(false);
          return;
        }

        // 2. Crear cliente de Supabase
        const supabase = createClient();

        // 3. Consultar teacher_enrolled para obtener el teacher_enrolled_id
        const { data: teacherEnrolled, error: teacherError } = await supabase
          .from("teacher_enrolled")
          .select("id")
          .eq("user_id", id_User)
          .single();

        if (teacherError) {
          console.error("Error al obtener teacher_enrolled:", teacherError);
          setError(teacherError);
          setLoading(false);
          return;
        }

        if (!teacherEnrolled) {
          console.warn("No se encontró teacher_enrolled para este usuario");
          setLoading(false);
          return;
        }

        // 4. Consultar group_has_class con el teacher_enrolled_id y obtener group_id
        const { data: cursos, error: cursosError } = await supabase
          .from("group_has_class")
          .select(
            `
            *,
            subject:subject_id (
              id,
              name
            ),
            group:group_id (
              id,
              name,
              course_id,
              course:course_id (
                id,
                name,
                code
              )
            ),

            classroom:classroom_id (
              id,
              name
            ),
            group_class_schedule!group_class_schedule_group_class_id_fkey (
              id,
              day_of_week,
              start_time,
              end_time
            )
          `
          )
          .eq("teacher_enrolled_id", teacherEnrolled.id)
          .eq("is_active", true);

        if (cursosError) {
          console.error("Error al obtener cursos:", cursosError);
          setError(cursosError);
          setLoading(false);
          return;
        }

        // 5. Obtener todos los group_ids únicos
        const groupIds = [
          ...new Set(cursos?.map((curso: any) => curso.group_id)),
        ];

        // 6. Consultar todos los estudiantes de todos los grupos
        const estudiantesPorGrupo: Record<string, any[]> = {};

        for (const groupId of groupIds) {
          const { data: estudiantesGrupo, error: estudiantesError } =
            await supabase
              .from("group_has_students")
              .select(
                `
                id,
                student_enrolled_id,
                group_id,
                student_enrolled:student_enrolled_id (
                  id,
                  user_id,
                  profiles:user_id (
                    id,
                    full_name,
                    email,
                    avatar_url
                  )
                )
              `
              )
              .eq("group_id", groupId);

          if (estudiantesError) {
            console.error(
              "Error al obtener estudiantes del grupo:",
              estudiantesError
            );
          } else {
            // Almacenar los estudiantes formateados por group_id
            estudiantesPorGrupo[groupId] = estudiantesGrupo || [];
          }
        }

        // 7. Transformar los datos al formato esperado por el UI con los estudiantes incluidos
        const cursosFormateados =
          cursos?.map((curso: any) => {
            const estudiantesDelGrupo =
              estudiantesPorGrupo[curso.group_id] || [];

            // Formatear horario desde group_class_schedule
            const formatearHorario = (schedules: any[]) => {
              if (!schedules || schedules.length === 0) {
                return "Horario no disponible";
              }

              return schedules
                .map((schedule: any) => {
                  const dia = DIAS_SEMANA[schedule.day_of_week] || "N/A";
                  const inicio = schedule.start_time || "N/A";
                  const fin = schedule.end_time || "N/A";
                  return `${dia} ${inicio}-${fin}`;
                })
                .join(", ");
            };

            return {
              // Campos originales del group_has_class
              id: curso.id,
              name: curso.name,
              subject_id: curso.subject_id,
              classroom_id: curso.classroom_id,
              teacher_enrolled_id: curso.teacher_enrolled_id,
              is_active: curso.is_active,
              created_at: curso.created_at,
              updated_at: curso.updated_at,
              group_id: curso.group_id,

              // Relaciones completas
              subject: curso.subject,
              group: curso.group,
              course: curso.course,
              classroom: curso.classroom,
              group_class_schedule: curso.group_class_schedule,

              // Campos formateados para la UI
              nombre: curso.name || curso.subject?.name || "Sin nombre",
              estudiantes: estudiantesDelGrupo.map((est: any) => ({
                id: est.student_enrolled?.id,
                user_id: est.student_enrolled?.user_id,
                full_name:
                  est.student_enrolled?.profiles?.full_name || "Sin nombre",
                email: est.student_enrolled?.profiles?.email || "Sin email",
                avatar: est.student_enrolled?.profiles?.avatar || null,
              })),
              cantidadEstudiantes: estudiantesDelGrupo.length,
              grupo: curso.group?.name || "N/A",
              curso_nombre: curso.course?.name || "N/A",
              horario: formatearHorario(curso.group_class_schedule),
              descripcion: "Curso del semestre actual",
            };
          }) || [];

        console.log("Cursos formateados con estudiantes:", cursosFormateados);
        setCursos(cursosFormateados);
        setLoading(false);
      } catch (err) {
        console.error("Error general al recuperar cursos:", err);
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchCursos();
  }, []);

  return { cursos, loading, error };
}
