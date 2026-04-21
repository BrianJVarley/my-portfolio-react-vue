import { useMemo } from "react";

export function useLoadingFallback(label: string) {
  const dots = useMemo(() => [0, 1, 2], []);

  return {
    ariaLabel: `Loading ${label}`,
    dots,
  };
}
