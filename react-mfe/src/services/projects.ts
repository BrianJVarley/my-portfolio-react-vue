import { Project } from "@/models/project.ts";

export type GetProjectsFilters = {
  limit: number;
  page: number;
  latest?: boolean;
};

const projects = [
  {
    id: 1,
    title: "Case Manager",
    company: "Backbase",
    tech: ["Angular", "NgRx", "RxJS", "TypeScript"],
    description:
      "End-to-end case handling platform for Financial Institutions.",
    year: "2024",
    tag: "Fintech",
  },
  {
    id: 2,
    title: "Simple Offset",
    tech: ["React Native", "TypeScript"],
    description:
      "Duct sizing calculator for contractors — offline-first mobile app.",
    year: "2023",
    tag: "Side project",
  }
] as Project[];

export async function getProjects(filters?: GetProjectsFilters) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return projects as Project[];
}
