"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const STOPS: [number, number, number][] = [
  [123, 77, 255],
  [93, 107, 255],
  [185, 77, 255],
  [255, 59, 92],
  [255, 97, 120],
];
const POS = [0, 0.25, 0.5, 0.8, 1];

function spectral(t: number): string {
  let i = 0;
  while (i < POS.length - 1 && t > POS[i + 1]) i++;
  const a = STOPS[i];
  const b = STOPS[Math.min(i + 1, STOPS.length - 1)];
  const span = POS[Math.min(i + 1, POS.length - 1)] - POS[i] || 1;
  const f = (t - POS[i]) / span;
  const c = a.map((v, k) => Math.round(v + (b[k] - v) * f));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

const BARS = 44;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero__veil" aria-hidden="true" />

      <motion.div
        className="hero__content"
        style={reduce ? undefined : { y, opacity }}
      >
        <p className="hero__status">
          <span className="dot" aria-hidden="true" />
          Currently Lead Engineer at Milk Inc
        </p>

        <h1 className="hero__title">
          <span>Rudra Pratap</span>
          <span className="accent">Singh</span>
        </h1>

        <p className="hero__lead">
          I build <strong>AI systems</strong> and{" "}
          <strong>real-time full-stack products</strong>, then get them in front
          of real users.
        </p>

        <p className="hero__sub">
          MS in Mathematics &amp; Computing, IIT Roorkee. Most of my time goes to{" "}
          <span className="tag-inline v">Applied AI</span> and the{" "}
          <span className="tag-inline">DevOps</span> that ships it.
        </p>

        <div className="spectro" aria-hidden="true">
          <div className="spectro__bar">
            <div className="spectro__bars">
              {Array.from({ length: BARS }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    background: spectral(i / (BARS - 1)),
                    animationDelay: `${((i % 11) * 0.13 + i * 0.014).toFixed(2)}s`,
                    animationDuration: `${(1.6 + (i % 5) * 0.18).toFixed(2)}s`,
                  }}
                />
              ))}
            </div>
            <div className="spectro__ticks">
              <span>violet</span>
              <span>indigo</span>
              <span>magenta</span>
              <span>crimson</span>
            </div>
          </div>
          <p className="spectro__cap">spectral signature · violet → crimson · live</p>
        </div>

        <div className="hero__actions">
          <a href="#projects" className="btn btn--primary">
            View work
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="/assets/Rudra_Pratap_Singh_Resume.pdf" className="btn btn--ghost" target="_blank" rel="noopener">
            Résumé
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <path d="M8 1.5V10M8 10L4.5 6.5M8 10l3.5-3.5M2.5 13.5h11" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <ul className="hero__socials" aria-label="Social links">
          <li><a href="https://github.com/rpsingh31" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/rudra-d31-m08-y2003/" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="https://x.com/r_psingh31" target="_blank" rel="noopener">X / Twitter</a></li>
          <li><a href="mailto:rpsingh31.work@gmail.com">Email</a></li>
        </ul>
      </motion.div>
    </section>
  );
}
