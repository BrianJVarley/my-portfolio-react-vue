import { useCallback, useMemo } from "react";

export function useLoadingAnimation() {
  const sectionMotion = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    }),
    [],
  );

  const loadingStateMotion = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: 0.2, duration: 0.3 },
    }),
    [],
  );

  const loadingTextMotion = useMemo(
    () => ({
      animate: { scale: [1, 1.1, 1] },
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    }),
    [],
  );

  const loadingDotAnimate = useMemo(
    () => ({
      y: [0, -10, 0],
      opacity: [0.5, 1, 0.5],
    }),
    [],
  );

  const getLoadingDotTransition = useCallback((index: number) => {
    return {
      duration: 0.8,
      repeat: Infinity,
      delay: index * 0.2,
      ease: "easeInOut" as const,
    };
  }, []);

  return {
    sectionMotion,
    loadingStateMotion,
    loadingTextMotion,
    loadingDotAnimate,
    getLoadingDotTransition,
  };
}
