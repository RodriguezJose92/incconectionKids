"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type InstituteStoreProps = {
  id: string;
  setId: (id: string) => void;

  institute: any;
  setInstitute: (institute: any) => void;

  clear: () => void;
  fetchInstitute?: () => Promise<void>;
  updateInstitute?: (updates: any) => Promise<void>;
};

export const InstituteStore = create<InstituteStoreProps>()(
  persist(
    (set) => ({
      id: "",
      setId: (id) => set({ id }),

      institute: [],
      setInstitute: (institute) => set({ institute }),

      clear: () => set({ id: "", institute: [] }),

      fetchInstitute: async () => {
        try {
          const { data, error } = await supabase
            .from("institute")
            .select("*")
            .eq("name", "Colegio Jaime Quijano Caballero")
            .single();

          if (error) throw error;

          console.log("✅ Instituto obtenido desde Supabase:", data);

          if (data) {
            set({ institute: data, id: data.id });
          } else {
            console.warn(
              "No se encontró el instituto con el nombre especificado."
            );
          }
        } catch (err: any) {
          console.error("Error al obtener el instituto:", err.message);
        }
      },

      updateInstitute: async (updates) => {
        try {
          const { id } =
            (
              await supabase
                .from("institute")
                .select("id")
                .eq("name", "Colegio Jaime Quijano Caballero")
                .single()
            ).data || {};

          if (!id) {
            console.warn("⚠️ No se encontró el instituto para actualizar.");
            return;
          }

          const { data, error } = await supabase
            .from("institute")
            .update(updates)
            .eq("id", id)
            .select()
            .single();

          if (error) throw error;

          console.log("✅ Instituto actualizado correctamente:", data);
          set({ institute: data });
        } catch (err: any) {
          console.error("Error al actualizar el instituto:", err.message);
        }
      },
    }),
    {
      name: "institute-store", // clave en storage
      storage: createJSONStorage(() => localStorage), // o sessionStorage
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log("🔄 Rehidratando InstituteStore desde localStorage...");
          if (!state.institute || state.institute.length === 0) {
            console.log(
              "⚙️ Ejecutando fetchInstitute() para actualizar datos..."
            );
            state.fetchInstitute?.();
          } else {
            console.log(
              "✅ Datos del instituto cargados desde storage:",
              state.institute
            );

            setTimeout(() => {
              console.clear();
            }, 2000); // Espera 2 segundos antes de verificar actualizaciones
          }
        }
      },
      partialize: (state) => ({ id: state.id, institute: state.institute }),
      version: 1,
    }
  )
);
