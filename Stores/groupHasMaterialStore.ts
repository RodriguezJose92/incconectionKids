"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type GroupHasMaterial = {
  id: string; // uuid
  group_has_class_id: string; // uuid (relación con la clase del grupo)
  cycle_id: string; // uuid (relación con el ciclo académico)

  title: string; // text

  bucket: string; // text
  storage_path: string; // text
  original_name: string | null; // text
  mime_type: string | null; // text
  file_size: number | null; // int8

  is_active: boolean; // bool

  created_at: string; // timestamptz
  updated_at: string; // timestamptz
};

type GroupHasMaterialStoreProps = {
  materials: GroupHasMaterial[];
  loading: boolean;
  error: string | null;

  fetchMaterials: () => Promise<void>;
  fetchMaterialsByGroupClassId: (
    groupHasClassId: string
  ) => Promise<GroupHasMaterial[]>;
  addMaterial: (material: GroupHasMaterial) => Promise<void>;
  updateMaterial: (
    id: string,
    data: Partial<GroupHasMaterial>
  ) => Promise<void>;
  deleteMaterial: (id: string) => Promise<void>;
  clear: () => void;
};

export const GroupHasMaterialStore = create<GroupHasMaterialStoreProps>()(
  persist(
    (set, get) => ({
      materials: [],
      loading: false,
      error: null,

      fetchMaterials: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("group_has_material")
            .select("*");

          console.log(data);
          if (error) throw error;
          set({ materials: data || [] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      fetchMaterialsByGroupClassId: async (groupHasClassId) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("group_has_material")
            .select("*")
            .eq("group_has_class_id", groupHasClassId);
          if (error) throw error;
          set({ materials: data || [] });
          return data || [];
        } catch (err: any) {
          set({ error: err.message });
          return [];
        } finally {
          set({ loading: false });
        }
      },

      addMaterial: async (material) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("group_has_material")
            .insert(material)
            .select();
          if (error) throw error;
          set({ materials: [...get().materials, ...(data || [])] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      updateMaterial: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const { data: updated, error } = await supabase
            .from("group_has_material")
            .update(data)
            .eq("id", id)
            .select();
          if (error) throw error;
          set({
            materials: get().materials.map((m) =>
              m.id === id ? { ...m, ...updated?.[0] } : m
            ),
          });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      deleteMaterial: async (id) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabase
            .from("group_has_material")
            .delete()
            .eq("id", id);
          if (error) throw error;
          set({ materials: get().materials.filter((m) => m.id !== id) });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      clear: () => set({ materials: [], error: null }),
    }),
    {
      name: "group-has-material-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ materials: state.materials }),
      version: 1,
    }
  )
);
