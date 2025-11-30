"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type PeriodoAcademico = {
  id: string;
  institute_id: string;

  name: string;
  description: string | null;

  start_date: string;
  end_date: string;

  is_active: boolean;

  created_at: string;
  updated_at: string;
};

type PeriodAcademicStoreProps = {
  periodos: PeriodoAcademico[];
  loading: boolean;
  error: string | null;

  fetchPeriodos: () => Promise<void>;
  addPeriodo: (periodo: PeriodoAcademico) => Promise<void>;
  updatePeriodo: (id: string, data: Partial<PeriodoAcademico>) => Promise<void>;
  deletePeriodo: (id: string) => Promise<void>;
  clear: () => void;
};

export const PeriodAcademicStore = create<PeriodAcademicStoreProps>()(
  persist(
    (set, get) => ({
      periodos: [],
      loading: false,
      error: null,

      fetchPeriodos: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("academic_period")
            .select("*");
          if (error) throw error;
          set({ periodos: data || [] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      addPeriodo: async (periodo) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("academic_period")
            .insert(periodo)
            .select();
          if (error) throw error;
          set({ periodos: [...get().periodos, ...(data || [])] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      updatePeriodo: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const { data: updated, error } = await supabase
            .from("academic_period")
            .update(data)
            .eq("id", id)
            .select();
          if (error) throw error;
          set({
            periodos: get().periodos.map((p) =>
              p.id === id ? { ...p, ...updated?.[0] } : p
            ),
          });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      deletePeriodo: async (id) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabase
            .from("academic_period")
            .delete()
            .eq("id", id);
          if (error) throw error;
          set({ periodos: get().periodos.filter((p) => p.id !== id) });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      clear: () => set({ periodos: [], error: null }),
    }),
    {
      name: "period-academic-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ periodos: state.periodos }),
      version: 1,
    }
  )
);
