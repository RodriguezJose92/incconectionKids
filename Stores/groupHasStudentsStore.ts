"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type GroupHasStudent = {
  id: string;
  group_id: string;
  student_enrolled_id: string;
  created_at: string;
  updated_at: string;
};

type GroupHasStudentsStoreProps = {
  groupHasStudents: GroupHasStudent[];
  loading: boolean;
  error: string | null;

  fetchGroupHasStudents: () => Promise<void>;
  addGroupHasStudent: (record: GroupHasStudent) => Promise<void>;
  updateGroupHasStudent: (
    id: string,
    data: Partial<GroupHasStudent>
  ) => Promise<void>;
  deleteGroupHasStudent: (id: string) => Promise<void>;
  clear: () => void;
};

export const GroupHasStudentsStore = create<GroupHasStudentsStoreProps>()(
  persist(
    (set, get) => ({
      groupHasStudents: [],
      loading: false,
      error: null,

      fetchGroupHasStudents: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("group_has_students")
            .select("*");
          if (error) throw error;
          set({ groupHasStudents: data || [] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      addGroupHasStudent: async (record) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("group_has_students")
            .insert(record)
            .select();
          if (error) throw error;
          set({
            groupHasStudents: [...get().groupHasStudents, ...(data || [])],
          });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      updateGroupHasStudent: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const { data: updated, error } = await supabase
            .from("group_has_students")
            .update(data)
            .eq("id", id)
            .select();
          if (error) throw error;
          set({
            groupHasStudents: get().groupHasStudents.map((r) =>
              r.id === id ? { ...r, ...updated?.[0] } : r
            ),
          });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      deleteGroupHasStudent: async (id) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabase
            .from("group_has_students")
            .delete()
            .eq("id", id);
          if (error) throw error;
          set({
            groupHasStudents: get().groupHasStudents.filter((r) => r.id !== id),
          });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      clear: () => set({ groupHasStudents: [], error: null }),
    }),
    {
      name: "group-has-students-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ groupHasStudents: state.groupHasStudents }),
      version: 1,
    }
  )
);
