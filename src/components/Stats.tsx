"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

function CountUp({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const render = (v: number) =>
      (el.textContent = prefix + Math.round(v).toLocaleString());
    if (reduce) {
      render(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const dur = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            render(to * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, prefix, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {to.toLocaleString()}
    </span>
  );
}

const SPECTRUM = ["#7b4dff", "#5d6bff", "#b94dff", "#ff3b5c"];

const STATS = [
  { num: <CountUp to={4563} prefix="#" />, label: <>JEE Advanced 2021 rank<br /><em>out of 1,51,000</em></> },
  { num: <CountUp to={1551} />, label: <>Codeforces Specialist<br /><em>peak rating</em></> },
  { num: <>0.25<span className="stat__unit">%</span></>, label: <>Code With Cisco<br /><em>national finalist</em></> },
  { num: <>BS-MS<span className="stat__unit"> · MnC</span></>, label: <>Math &amp; Computing<br /><em>IIT Roorkee · 2026</em></> },
];

export default function Stats() {
  return (
    <div className="panel">
      {STATS.map((s, i) => (
        <div className="stat" key={i}>
          <span className="stat__band" style={{ background: SPECTRUM[i] }} />
          <span className="stat__num">{s.num}</span>
          <span className="stat__label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
