"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  ["about", "About"],
  ["work", "Experience"],
  ["projects", "Projects"],
  ["stack", "Stack"],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = [...LINKS.map((l) => l[0]), "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header
      ref={navRef}
      className={`nav${scrolled ? " scrolled" : ""}${open ? " menu-open" : ""}`}
    >
      <div className="nav__inner">
        <a href="#top" className="nav__brand" aria-label="Home" onClick={() => setOpen(false)}>
          <span className="nav__mark">R</span>
          <span className="nav__name">
            rp<span className="accent">.</span>singh
          </span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
              {label}
            </a>
          ))}
          <a href="#contact" className="nav__cta">
            Contact
          </a>
        </nav>
        <button
          className="nav__toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobileMenu"
          onClick={() => setOpen((o) => !o)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
      <div className="nav__mobile" id="mobileMenu" hidden={!open}>
        {[...LINKS, ["contact", "Contact"]].map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </div>
    </header>
  );
}
