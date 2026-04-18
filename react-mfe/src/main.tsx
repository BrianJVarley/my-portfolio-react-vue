// Standalone entry — only used when running react-mfe in isolation (pnpm dev)
// Not loaded by the shell; the shell imports ProjectsPage directly via federation.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProjectsPage from './ProjectsPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{ padding: '2rem' }}>
      <p style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b6970', marginBottom: '2rem' }}>
        ↳ React MFE · Standalone dev mode
      </p>
      <ProjectsPage />
    </div>
  </StrictMode>
)
