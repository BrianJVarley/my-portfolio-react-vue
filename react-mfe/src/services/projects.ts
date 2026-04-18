import { Project } from '@/models/project.ts';

export type GetProjectsFilters = {
  limit: number;
  page: number;
  latest?: boolean;
};

export async function getProjects(filters?: GetProjectsFilters) {

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [{ id: 1, name: 'simple offset' }] as Project[];
}