import { GetProjectsFilters } from '@/api/projects';
import { Project } from '@/types/project';
import { create } from 'zustand';

type ProfileStore = {
  filters?: GetProjectsFilters;
  setFilters: (filters?: GetProjectsFilters) => void;
};

export const useUserStore = create<ProfileStore>((set) => ({
  filters: undefined,
  setFilters: (filters) => set({ filters }),
}));