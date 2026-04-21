import { GetProjectsFilters } from "@/services/projects.ts";
import { create } from "zustand";

type ProfileStore = {
  filters?: GetProjectsFilters;
  setFilters: (filters?: GetProjectsFilters) => void;
};

export const useProjectsStore = create<ProfileStore>((set) => ({
  filters: undefined,
  setFilters: (filters) => set({ filters }),
}));
