// Standalone entry — only used when running react-mfe in isolation (pnpm dev)
// Not loaded by the shell; the shell imports ProjectsPage directly via federation.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProjectsPage from "./ProjectsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
  },
});



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div style={{ padding: "2rem" }}>
      <p
        style={{
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#6b6970",
          marginBottom: "2rem",
        }}
      >
        ↳ React MFE · Standalone dev mode
      </p>
      <QueryClientProvider client={queryClient}>
        <ProjectsPage />
      </QueryClientProvider>
    </div>
  </StrictMode>,
);
