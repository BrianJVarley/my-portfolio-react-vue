import { Project } from '@/types/project';

export type GetProjectsFilters = {
  limit: number;
  page: number;
};

export async function getProjects(filters?: GetProjectsFilters) {

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [{ id: 1, name: 'simple offset' }] as Project[];
}