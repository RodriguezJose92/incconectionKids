"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type Cycle = {
  id: string;
  academic_period_id: string;
  name: string;
  description: string | null;
  start_date: string;  // ISO date
  end_date: string;    // ISO date
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type CycleStoreProps = {
  cycles: Cycle[];
  loading: boolean;
  error: string | null;

  fetchCycles: () => Promise<void>;
  addCycle: (cycle: Cycle) => Promise<void>;
  updateCycle: (id: string, data: Partial<Cycle>) => Promise<void>;
  deleteCycle: (id: string) => Promise<void>;
  clear: () => void;
};

export const CycleStore = create<CycleStoreProps>()(
  persist(
    (set, get) => ({
      cycles: [],
      loading: false,
      error: null,

      fetchCycles: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase.from("cycles").select("*");
          if (error) throw error;
          set({ cycles: data || [] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      addCycle: async (cycle) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("cycles")
            .insert(cycle)
            .select();
          if (error) throw error;
          set({ cycles: [...get().cycles, ...(data || [])] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      updateCycle: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const { data: updated, error } = await supabase
            .from("cycles")
            .update(data)
            .eq("id", id)
            .select();
          if (error) throw error;
          set({
            cycles: get().cycles.map((c) =>
              c.id === id ? { ...c, ...updated?.[0] } : c
            ),
          });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      deleteCycle: async (id) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabase.from("cycles").delete().eq("id", id);
          if (error) throw error;
          set({ cycles: get().cycles.filter((c) => c.id !== id) });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      clear: () => set({ cycles: [], error: null }),
    }),
    {
      name: "cycle-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cycles: state.cycles }),
      version: 1,
    }
  )
);