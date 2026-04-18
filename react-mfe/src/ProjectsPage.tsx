// This is the component exposed to the shell via Module Federation.
// import('reactMfe/ProjectsPage') resolves to this file.

import { useQuery } from '@tanstack/react-query';
import { useUserStore } from './state/profileStore';
import { getProjects } from './services/projects';

const projects = [
  {
    id: 1,
    title: 'Case Manager',
    tech: ['Angular', 'NgRx', 'RxJS'],
    description: 'End-to-end case handling platform for financial compliance workflows.',
    year: '2024',
    tag: 'Fintech',
  },
  {
    id: 2,
    title: 'HVAC Calculator',
    tech: ['React Native', 'TypeScript'],
    description: 'Duct sizing calculator for contractors — offline-first mobile app.',
    year: '2023',
    tag: 'Side project',
  },
  {
    id: 3,
    title: 'LLM Eval Tooling',
    tech: ['Node.js', 'promptfoo', 'Groq'],
    description: 'Custom evaluation harness for benchmarking LLM outputs at scale.',
    year: '2024',
    tag: 'AI tooling',
  },
]

export default function ProjectsPage() {

   const { filters } = useUserStore();

  const { data } = useQuery({
    queryKey: ['projects', filters],
    queryFn: () => getProjects(filters),
  });


  return (
    <section className="mfe-page">
      <div className="projects-header">
        <span className="mfe-badge mfe-badge--react">React MFE</span>
        <h2 className="section-title">Selected Work</h2>
        <p className="section-sub">A few things I've shipped.</p>
      </div>

      <ul className="project-grid" role="list">
        <div>
      {/* <FiltersComponent /> */}
      {data?.map((project) => {
          return <div key={project.id}>{project.name}</div>;
      })}
    </div>
        {projects.map((p) => (
          <li key={p.id} className="project-card">
            <div className="project-card__meta">
              <span className="project-card__year">{p.year}</span>
              <span className="project-card__tag">{p.tag}</span>
            </div>
            <h3 className="project-card__title">{p.title}</h3>
            <p className="project-card__desc">{p.description}</p>
            <ul className="project-card__tech" role="list" aria-label="Technologies">
              {p.tech.map((t) => (
                <li key={t} className="tech-chip">{t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <style>{`
        .projects-header { margin-bottom: 3rem; }

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
  )
}
