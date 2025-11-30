"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type Materia = {
  id: string;
  institute_id: string;

  name: string;
  description: string | null;
  code: string | null;

  is_active: boolean;

  created_at: string;
  updated_at: string;
};

type MateriasStoreProps = {
  materias: Materia[];
  loading: boolean;
  error: string | null;

  fetchMaterias: () => Promise<void>;
  addMateria: (materia: Materia) => Promise<void>;
  updateMateria: (id: string, data: Partial<Materia>) => Promise<void>;
  deleteMateria: (id: string) => Promise<void>;
  clear: () => void;
};

export const MateriasStore = create<MateriasStoreProps>()(
  persist(
    (set, get) => ({
      materias: [],
      loading: false,
      error: null,

      fetchMaterias: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase.from("materias").select("*");
          console.log(error);
          if (error) throw error;
          set({ materias: data || [] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      addMateria: async (materia) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("materias")
            .insert(materia)
            .select();
          if (error) throw error;
          set({ materias: [...get().materias, ...(data || [])] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      updateMateria: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const { data: updated, error } = await supabase
            .from("materias")
            .update(data)
            .eq("id", id)
            .select();
          if (error) throw error;
          set({
            materias: get().materias.map((m) =>
              m.id === id ? { ...m, ...updated?.[0] } : m
            ),
          });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      deleteMateria: async (id) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabase
            .from("materias")
            .delete()
            .eq("id", id);
          if (error) throw error;
          set({ materias: get().materias.filter((m) => m.id !== id) });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      clear: () => set({ materias: [], error: null }),
    }),
    {
      name: "materias-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ materias: state.materias }),
      version: 1,
    }
  )
);
