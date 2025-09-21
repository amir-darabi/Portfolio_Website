// Performance optimization utilities
export const reducedMotionMediaQuery = '(prefers-reduced-motion: reduce)';

export const usePerformanceOptimizations = () => {
  if (typeof window === 'undefined') return { prefersReducedMotion: false };
  
  const prefersReducedMotion = window.matchMedia(reducedMotionMediaQuery).matches;
  return { prefersReducedMotion };
};

export const debounce = <T extends (...args: unknown[]) => void>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = <T extends (...args: unknown[]) => void>(func: T, limit: number) => {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
