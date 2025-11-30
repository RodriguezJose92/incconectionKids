"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type Event = {
  id: string;
  institute_id: string;
  title: string;
  description: string | null;
  category: string | null;
  location: string | null;
  start_at: string;      // ISO string desde Supabase
  end_at: string;        // ISO string desde Supabase
  is_all_day: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

type EventStoreProps = {
  events: Event[];
  loading: boolean;
  error: string | null;

  fetchEvents: () => Promise<void>;
  addEvent: (event: Event) => Promise<void>;
  updateEvent: (id: string, data: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  clear: () => void;
};

export const EventStore = create<EventStoreProps>()(
  persist(
    (set, get) => ({
      events: [],
      loading: false,
      error: null,

      fetchEvents: async () => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase.from("events").select("*");
          if (error) throw error;
          set({ events: data || [] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      addEvent: async (event) => {
        set({ loading: true, error: null });
        try {
          const { data, error } = await supabase
            .from("events")
            .insert(event)
            .select();
          if (error) throw error;
          set({ events: [...get().events, ...(data || [])] });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      updateEvent: async (id, data) => {
        set({ loading: true, error: null });
        try {
          const { data: updated, error } = await supabase
            .from("events")
            .update(data)
            .eq("id", id)
            .select();
          if (error) throw error;
          set({
            events: get().events.map((e) =>
              e.id === id ? { ...e, ...updated?.[0] } : e
            ),
          });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      deleteEvent: async (id) => {
        set({ loading: true, error: null });
        try {
          const { error } = await supabase.from("events").delete().eq("id", id);
          if (error) throw error;
          set({ events: get().events.filter((e) => e.id !== id) });
        } catch (err: any) {
          set({ error: err.message });
        } finally {
          set({ loading: false });
        }
      },

      clear: () => set({ events: [], error: null }),
    }),
    {
      name: "event-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ events: state.events }),
      version: 1,
    }
  )
);
