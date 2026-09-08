import Lenis from 'lenis';

/**
 * Site-wide inertial scrolling (Lenis) with a single shared instance so
 * section navigation, hero buttons and route changes all drive the same
 * scroll engine. Disabled entirely for prefers-reduced-motion users.
 */
let lenis: Lenis | null = null;

export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {};
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ lerp: 0.12 });
  let raf = 0;
  const loop = (time: number) => {
    lenis?.raf(time);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
}

/** Scroll to an element (CSS selector or node), clearing the fixed chrome. */
export function scrollToEl(target: string | HTMLElement, offset = -120) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  // rect.top + scrollY is the element's absolute position — stable even if a
  // previous smooth scroll is still in flight, unlike selector-based targets.
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY + offset);
  if (lenis) lenis.scrollTo(top);
  else window.scrollTo({ top, behavior: 'smooth' });
}

/** Instant jump to top — used on route changes. */
export function scrollToTopImmediate() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}
