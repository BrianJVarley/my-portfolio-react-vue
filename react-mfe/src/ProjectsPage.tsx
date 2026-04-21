// This is the component exposed to the shell via Module Federation.
// import('reactMfe/ProjectsPage') resolves to this file.

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useProjectsStore } from "./state/profileStore";
import { getProjects } from "./services/projects";
import { FiltersComponent } from "./components/FiltersComponent";
import { useCallback, useEffect, useRef, useMemo } from "react";
import { useLoadingAnimation } from "./hooks/useLoadingAnimation";
const MotionButton = motion.button;

export default function ProjectsPage() {
  const queryClient = useQueryClient();
  const { filters } = useProjectsStore();
  const {
    sectionMotion,
    loadingStateMotion,
    loadingTextMotion,
    loadingDotAnimate,
    getLoadingDotTransition,
  } = useLoadingAnimation();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["projects", filters],
    queryFn: () => getProjects(filters),
    staleTime: () => {
      return filters?.latest ? 1000 * 5 : 1000 * 60 * 10;
    },
  });

  /**
   * example tanstack/query invalidate usage
   * real example - would be used for CUD operations in the ProjectsPage, but since this is read-only we'll just re-fetch on button click for demo purposes
   */
  const handleSelectedWorkClick = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  }, [queryClient]);

  const projectStats = useMemo(() => {
    const projects = data ?? [];
    const technologies = new Set(projects.flatMap((project) => project.tech));
    const companies = new Set(
      projects
        .map((project) => project.company)
        .filter((company): company is string => Boolean(company)),
    );

    return {
      totalProjects: projects.length,
      totalTechnologies: technologies.size,
      totalCompanies: companies.size,
    };
  }, [data]);

  useEffect(() => {
    document.title = isLoading
      ? "Selected Work | Loading"
      : `Selected Work (${projectStats.totalProjects} projects)`;
  }, [isLoading, projectStats.totalProjects]);

  const handleGlobalKeydownRef = useRef<(event: KeyboardEvent) => void>(
    () => {},
  );
  handleGlobalKeydownRef.current = (event: KeyboardEvent) => {
    if (event.key.toLowerCase() !== "r") {
      return;
    }

    const target = event.target;
    const isTypingInField =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      (target instanceof HTMLElement && target.isContentEditable);

    if (isTypingInField) {
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["projects", filters] });
  };

  useEffect(() => {
    const onKeydown = (event: KeyboardEvent) =>
      handleGlobalKeydownRef.current(event);

    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, []);

  if (isLoading) {
    return (
      <motion.section className="mfe-page" {...sectionMotion}>
        <div className="projects-header">
          <span className="mfe-badge mfe-badge--react">React MFE</span>
          <h2 className="section-title">Selected Work</h2>
          <p className="section-sub">A few things I&apos;ve shipped.</p>
        </div>
        <motion.div className="loading-state" {...loadingStateMotion}>
          <motion.span {...loadingTextMotion}>Loading projects</motion.span>
          <div className="loading-dots">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="loading-dot"
                animate={loadingDotAnimate}
                transition={getLoadingDotTransition(i)}
              >
                .
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.section>
    );
  }

  if (isError) {
    return (
      <section className="mfe-page">
        <div className="projects-header">
          <span className="mfe-badge mfe-badge--react">React MFE</span>
          <h2 className="section-title">Selected Work</h2>
          <p className="section-sub">A few things I&apos;ve shipped.</p>
        </div>
        <div className="error-state">
          Error loading projects: {error?.message || "Unknown error"}
        </div>
      </section>
    );
  }

  return (
    <section className="mfe-page">
      <div className="projects-header mfe-header-top">
        <span className="mfe-badge mfe-badge--react">React MFE</span>
        <MotionButton
          type="button"
          onClick={handleSelectedWorkClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="selected-work-button"
        >
          Selected Work
        </MotionButton>
        <p className="section-sub">A few things I&apos;ve shipped.</p>
      </div>

      <FiltersComponent />

      <p className="projects-summary" aria-live="polite">
        {projectStats.totalProjects} projects across{" "}
        {projectStats.totalTechnologies} technologies
        {projectStats.totalCompanies > 0
          ? ` for ${projectStats.totalCompanies} companies & hobby project`
          : ""}
      </p>
    
      <ul className="project-grid" role="list">
        {data?.map((p) => (
          <li key={p.id} className="project-card">
            <div className="project-card__meta">
              <span className="project-card__year">{p.year}</span>
              <span className="project-card__tag">{p.tag}</span>
            </div>
            <h3 className="project-card__title">{p.title}</h3>
            {p.company && (
              <p className="project-card__company">Company: {p.company}</p>
            )}
            <p className="project-card__desc">{p.description}</p>
            <ul
              className="project-card__tech"
              role="list"
              aria-label="Technologies"
            >
              {p.tech.map((t) => (
                <li key={t} className="tech-chip">
                  {t}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <style>{`
        .projects-header { margin-bottom: 3rem; }

        .mfe-header-top {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .mfe-badge {
          display: inline-block;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          margin-bottom: 1.25rem;
        }
        .mfe-badge--react {
          border: 1px solid #61dafb;
          color: #61dafb;
        }

        .selected-work-button {
          border: 1px solid #61dafb;
          color: #61dafb;
          background: transparent;
        }

        .section-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          letter-spacing: -0.03em;
          color: #e8e6e1;
          margin-bottom: 0.5rem;
        }

        .section-sub {
          color: #6b6970;
          font-size: 0.875rem;
        }

        .projects-summary {
          color: #9a9898;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 1.25rem 0 1.5rem;
        }

        .projects-shortcut-hint {
          color: #6b6970;
          font-size: 0.72rem;
          margin: -0.75rem 0 1.5rem;
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1px;
          background: #222228;
          border: 1px solid #222228;
          list-style: none;
          padding: 0;
        }

        .project-card {
          background: #131316;
          padding: 2rem;
          transition: background 200ms ease;
        }
        .project-card:hover { background: #1a1a1f; }

        .loading-state, .error-state {
          text-align: center;
          padding: 2rem;
          color: #6b6970;
          font-size: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .loading-dots {
          display: flex;
          gap: 0.2rem;
        }

        .loading-dot {
          display: inline-block;
          font-size: 1.5rem;
          line-height: 1;
        }

        .error-state {
          color: #ff6b6b;
        }

        .project-card__meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6b6970;
          margin-bottom: 1rem;
        }

        .project-card__title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.3rem;
          color: #e8e6e1;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .project-card__desc {
          font-size: 0.8rem;
          line-height: 1.65;
          color: #9a9898;
          margin-bottom: 1.25rem;
        }

        .project-card__tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          list-style: none;
          padding: 0;
        }

        .tech-chip {
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: #1e1e24;
          border: 1px solid #2a2a32;
          color: #9a9898;
          padding: 0.2rem 0.55rem;
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
}
