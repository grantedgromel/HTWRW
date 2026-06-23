import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref + boolean that flips true once the element scrolls into view.
 * Used to trigger entrance animations (bars growing, numbers counting up).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.25 },
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      });
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Animate a number from 0 → target once `active` is true.
 * Returns the current animated value.
 */
export function useCountUp(target: number, active: boolean, durationMs = 1200) {
  const [val, setVal] = useState(0);
  const raf = useRef<number>();

  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      setVal(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, active, durationMs]);

  return val;
}

/** Format a count-up value, preserving the suffix/precision of a label like "700×". */
export function formatCountValue(value: string, current: number): string {
  // Pull a leading number out of the label (handles "84%", "700×", "5-10×", "1,000+").
  const match = value.match(/^[^\d]*([\d,.]+)/);
  if (!match) return value;
  const numStr = match[1].replace(/,/g, '');
  const targetNum = parseFloat(numStr);
  if (isNaN(targetNum)) return value;
  const rounded = targetNum >= 100 ? Math.round(current) : Math.round(current * 10) / 10;
  const printed =
    targetNum >= 1000 ? rounded.toLocaleString('en-US') : String(rounded);
  return value.replace(match[1], printed);
}
