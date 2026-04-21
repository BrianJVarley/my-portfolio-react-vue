import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useLoadingFallback } from "./hooks/useLoadingFallback";

// Lazy-load federated remotes — resolved at runtime via Module Federation
const ProjectsPage = lazy(() => import("reactMfe/ProjectsPage"));
const AboutPage = lazy(() => import("vueMfe/AboutPage"));

function LoadingFallback({ label }: { label: string }) {
  const { ariaLabel, dots } = useLoadingFallback(label);

  return (
    <div className="mfe-loading" role="status" aria-label={ariaLabel}>
      {dots.map((dot) => (
        <span key={dot} className="mfe-loading__dot" />
      ))}
    </div>
  );
}

function ErrorFallback({ name }: { name: string }) {
  return (
    <div className="mfe-error" role="alert">
      <p>
        Could not load <strong>{name}</strong>.
      </p>
      <p className="mfe-error__hint">
        Make sure the remote is running on the correct port.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <header className="site-header">
          <a href="/" className="wordmark">
            <span className="wordmark__first">Brian</span>
            <span className="wordmark__last">Varley</span>
          </a>
          <nav className="site-nav" aria-label="Main navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link nav-link--active" : "nav-link"
              }
            >
              About
            </NavLink>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/projects"
              element={
                <Suspense fallback={<LoadingFallback label="Projects" />}>
                  <ProjectsPage />
                </Suspense>
              }
              errorElement={<ErrorFallback name="React MFE (Projects)" />}
            />

            <Route
              path="/about"
              element={
                <Suspense fallback={<LoadingFallback label="About" />}>
                  <AboutPage />
                </Suspense>
              }
              errorElement={<ErrorFallback name="Vue MFE (About)" />}
            />
          </Routes>
        </main>

        <footer className="site-footer">
          <span>Built with React + Vue · Module Federation 2.0</span>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function HomePage() {
  return (
    <section className="home">
      <div className="home__eyebrow">Frontend Engineer</div>
      <h1 className="home__headline">
        A snapshot of my
        <br />
        <em>work & experience.</em>
      </h1>
      <p className="home__sub">
        This portfolio is a micro-frontend shell — the Projects section runs in{" "}
        <strong>React</strong>, the About section in <strong>Vue</strong>, both
        composed at runtime via Module Federation 2.0.
      </p>
      <div className="home__cta-row">
        <a href="/projects" className="btn btn--primary">
          View Projects
        </a>
        <a href="/about" className="btn btn--ghost">
          About Me
        </a>
      </div>
      <div className="home__mfe-legend" aria-hidden="true">
        <span className="pill pill--react">React MFE · :3001</span>
        <span className="pill pill--vue">Vue MFE · :3002</span>
        <span className="pill pill--shell">Shell · :3000</span>
      </div>
    </section>
  );
}
