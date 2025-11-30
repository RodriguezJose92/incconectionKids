"use client";

import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { persist, createJSONStorage } from "zustand/middleware";

type UserInfoStoreState = {
    user: User | null;
    setUser: (user: User | null) => void;

    roles: string[];
    setRoles: (roles: string[]) => void;

    hydrated: boolean;
    setHydrated: (v: boolean) => void;
    clear: () => void;
};

export const UserInfoStore = create<UserInfoStoreState>()(

    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),

            roles: [],
            setRoles: (roles) => set({ roles }),

            hydrated: false,
            setHydrated: (v) => set({ hydrated: v }),

            clear: () => set({ user: null, roles: [] }),
        }),
        {
            name: "user-info",
            storage: createJSONStorage(() => localStorage),

            partialize: (state) => ({ user: state.user, roles: state.roles }),

            version: 1,
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )

);