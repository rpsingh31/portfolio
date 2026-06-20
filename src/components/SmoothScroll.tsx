"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

/* Weighted smooth scroll + drives the --scroll progress var that fills the
   wavelength rail. Disabled under prefers-reduced-motion. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const setProgress = () => {
      const max = root.scrollHeight - root.clientHeight;
      root.style.setProperty("--scroll", String(max > 0 ? root.scrollTop / max : 0));
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      window.addEventListener("scroll", setProgress, { passive: true });
      setProgress();
      return () => window.removeEventListener("scroll", setProgress);
    }

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    lenis.on("scroll", setProgress);
    setProgress();

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
