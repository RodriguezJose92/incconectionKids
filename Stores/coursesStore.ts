"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type Course = {
  id: string;
  institute_id: string;
  name: string;
  code?: string | null;
  education_level?: string | null;
  grade_number?: number | null;
  max_students: number;
  description: string | null;
  is_active: boolean;
  credits?: number;
  duration_weeks?: number;
  teacher_id?: string | null;
  created_at: string;
  updated_at: string;
};

type CoursesStoreProps = {
  courses: Course[];
  loading: boolean;
  error: string | null;

  fetchCourses: () => Promise<void>;
  addCourse: (course: Course) => Promise<void>;
  updateCourse: (id: string, data: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  clear: () => void;
};

export const CoursesStore = create<CoursesStoreProps>()(
  persist(
    (set, get) => ({
      courses: [],
      loading: false,
      error: null,

      fetchCourses: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase.from("courses").select("*");
          if (error) throw error;
          set({ courses: data || [] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      addCourse: async (course) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("courses")
            .insert(course)
            .select();
          if (error) throw error;
          set({ courses: [...get().courses, ...(data || [])] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      updateCourse: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const { data: updated, error } = await supabase
            .from("courses")
            .update(data)
            .eq("id", id)
            .select();
          if (error) throw error;
          set({
            courses: get().courses.map((c) =>
              c.id === id ? { ...c, ...updated?.[0] } : c
            ),
          });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      deleteCourse: async (id) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabase
            .from("courses")
            .delete()
            .eq("id", id);
          if (error) throw error;
          set({ courses: get().courses.filter((c) => c.id !== id) });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      clear: () => set({ courses: [], error: null }),
    }),
    {
      name: "courses-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ courses: state.courses }),
      version: 1,
    }
  )
);
