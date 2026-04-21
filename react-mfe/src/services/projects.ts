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
    tech: [
      "Angular",
      "TypeScript",
      "NgRx",
      "RxJS",
      "Playwright",
      "Nx",
      "Web Components",
      "WCAG",
      "i18n",
    ],
    description:
      "Led frontend delivery for new and existing Case Manager features, including components, state management, unit and E2E coverage, and deployment of Angular Nx libraries for accessible, internationalized banking apps.",
    year: "2021-Present",
    tag: "Fintech",
  },
  {
    id: 2,
    title: "Workspaces",
    company: "Avaya",
    tech: [
      "Angular",
      "TypeScript",
      "NgRx",
      "RxJS",
      "REST",
      "WebSocket",
      "Web Components",
      "Highcharts",
      "Gridster",
      "SCSS",
      "Webpack",
      "Rollup",
      "Azure",
    ],
    description:
      "Built and scaled unified communications product experiences across dashboards and workflows, integrating real-time APIs and reusable frontend architecture in a distributed team.",
    year: "2017-2021",
    tag: "Unified Comms",
  },
  {
    id: 3,
    title: "Simple Offset",
    tech: ["React Native", "TypeScript", "Offline-first"],
    description:
      "A productivity app for HVAC sheet metal fabrication that calculates angles and cut measurements for offsets. Reached 1000+ paid downloads.",
    year: "2018-Present",
    tag: "Side project",
  },
  {
    id: 4,
    company: "HPE",
    title: "Data Center Infrastructure Management",
    tech: ["React", "JavaScript", "Redux", "D3", "SCSS", "Highcharts"],
    description:
      "Led frontend development for a data center infrastructure management tool, creating interactive visualizations and dashboards to monitor and optimize data center performance.",
    year: "2016",
    tag: "Side project",
  },
] as Project[];

export async function getProjects(filters?: GetProjectsFilters) {
  const delay = filters?.latest ? 350 : 1000;
  console.log(`getProjects called with filters:`, filters, `(simulated delay: ${delay}ms)`);
  await new Promise((resolve) => setTimeout(resolve, delay));

  return projects as Project[];
}
