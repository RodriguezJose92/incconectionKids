"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type Group = {
  id: string;
  course_id: string;
  name: string;
  year: number;
  max_students: number | null;
  director_id: string | null;
  created_at: string;
  updated_at: string;
};

type GroupsStoreProps = {
  groups: Group[];
  loading: boolean;
  error: string | null;

  fetchGroups: () => Promise<void>;
  addGroup: (group: Group) => Promise<void>;
  updateGroup: (id: string, data: Partial<Group>) => Promise<void>;
  deleteGroup: (id: string) => Promise<void>;
  clear: () => void;
};

export const GroupsStore = create<GroupsStoreProps>()(
  persist(
    (set, get) => ({
      groups: [],
      loading: false,
      error: null,

      fetchGroups: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase.from("groups").select("*");
          if (error) throw error;
          set({ groups: data || [] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      addGroup: async (group) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("groups")
            .insert(group)
            .select();
          if (error) throw error;
          set({ groups: [...get().groups, ...(data || [])] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      updateGroup: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const { data: updated, error } = await supabase
            .from("groups")
            .update(data)
            .eq("id", id)
            .select();
          if (error) throw error;
          set({
            groups: get().groups.map((g) =>
              g.id === id ? { ...g, ...updated?.[0] } : g
            ),
          });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      deleteGroup: async (id) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabase.from("groups").delete().eq("id", id);
          if (error) throw error;
          set({ groups: get().groups.filter((g) => g.id !== id) });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      clear: () => set({ groups: [], error: null }),
    }),
    {
      name: "groups-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ groups: state.groups }),
      version: 1,
    }
  )
);
