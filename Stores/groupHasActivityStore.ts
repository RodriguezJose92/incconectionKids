"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type GroupHasActivity = {
  id: string; // uuid
  group_has_class_id: string; // uuid (relación con la clase del grupo)
  cycle_id: string; // uuid (relación con el ciclo académico)

  title: string; // text
  description: string | null; // text

  bucket: string; // text
  storage_path: string; // text
  original_name: string | null; // text
  mime_type: string | null; // text
  file_size: number | null; // int8
  limit_date: string | null; // timestamptz
  is_active: boolean; // bool

  created_at: string; // timestamptz
  updated_at: string; // timestamptz
};

type GroupHasActivityStoreProps = {
  activities: GroupHasActivity[];
  loading: boolean;
  error: string | null;

  fetchActivities: () => Promise<void>;
  fetchActivitiesByGroupClassId: (
    groupHasClassId: string
  ) => Promise<GroupHasActivity[]>;
  addActivity: (activity: GroupHasActivity) => Promise<void>;
  updateActivity: (
    id: string,
    data: Partial<GroupHasActivity>
  ) => Promise<void>;
  deleteActivity: (id: string) => Promise<void>;
  clear: () => void;
};

export const GroupHasActivityStore = create<GroupHasActivityStoreProps>()(
  persist(
    (set, get) => ({
      activities: [],
      loading: false,
      error: null,

      fetchActivities: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("group_has_activity")
            .select("*");

          if (error) throw error;
          set({ activities: data || [] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      fetchActivitiesByGroupClassId: async (groupHasClassId) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("group_has_activity")
            .select("*")
            .eq("group_has_class_id", groupHasClassId);

          if (error) throw error;
          set({ activities: data || [] });
          return data || [];
        } catch (err: any) {
          set({ error: err.message });
          return [];
        } finally {
          set({ loading: false });
        }
      },

      addActivity: async (activity) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("group_has_activity")
            .insert(activity)
            .select();

          if (error) throw error;
          set({ activities: [...get().activities, ...(data || [])] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      updateActivity: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const { data: updated, error } = await supabase
            .from("group_has_activity")
            .update(data)
            .eq("id", id)
            .select();

          if (error) throw error;
          set({
            activities: get().activities.map((a) =>
              a.id === id ? { ...a, ...(updated?.[0] || {}) } : a
            ),
          });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      deleteActivity: async (id) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabase
            .from("group_has_activity")
            .delete()
            .eq("id", id);

          if (error) throw error;
          set({
            activities: get().activities.filter((a) => a.id !== id),
          });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      clear: () => set({ activities: [], error: null }),
    }),
    {
      name: "group-has-activity-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ activities: state.activities }),
      version: 1,
    }
  )
);
