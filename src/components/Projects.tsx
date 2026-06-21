"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Stagger, staggerItem } from "./Reveal";

type Project = {
  title: string;
  band: string;
  role: string;
  desc: React.ReactNode;
  tags: string[];
  link: string;
  linkLabel: string;
  wide?: boolean;
  soon?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "TruckNet",
    band: "2025",
    role: "Real-time logistics marketplace",
    desc: "A load-bidding platform: shippers post loads, truckers bid live, and the lowest bid wins the instant it lands. WebSocket bidding rooms, JWT-secured REST APIs, and a SuperAdmin dashboard for approvals and oversight.",
    tags: ["WebSockets", "Node / Express", "JWT", "REST", "Real-time"],
    link: "https://github.com/rpsingh31/TruckNet",
    linkLabel: "Source",
    wide: true,
  },
  {
    title: "FoodieRAG",
    band: "2025",
    role: "Retrieval-augmented chatbot",
    desc: "A RAG chatbot for restaurant Q&A on LangChain + Hugging Face models, served via Streamlit. Automated scraping with Selenium/BeautifulSoup and a FAISS vector store over sentence-transformer embeddings.",
    tags: ["LangChain", "RAG", "FAISS", "Streamlit"],
    link: "https://github.com/rpsingh31/Restaurant-RAG",
    linkLabel: "Source",
  },
  {
    title: "LangChain Email Gen",
    band: "2025",
    role: "AI writing tool · full-stack",
    desc: (
      <>
        A full-stack app that drafts professional emails with{" "}
        <code>gemini-2.0-flash</code> through LangChain. Built on Next.js +
        Tailwind, with MongoDB/Mongoose and cookie sessions.
      </>
    ),
    tags: ["Next.js", "LangChain", "Gemini", "MongoDB"],
    link: "https://github.com/rpsingh31/LangChain-Email-Generator",
    linkLabel: "Source",
  },
  {
    title: "Next up",
    band: "in progress",
    role: "Applied AI & DevOps",
    desc: (
      <>
        I&apos;m building out more standalone projects in <strong>Applied AI</strong>{" "}
        (LLM agents, RAG) and <strong>DevOps</strong>. They&apos;ll show up here as
        they ship, so follow along on GitHub.
      </>
    ),
    tags: ["LLM Agents", "Docker", "CI/CD", "AWS"],
    link: "https://github.com/rpsingh31",
    linkLabel: "Follow on GitHub",
    wide: true,
    soon: true,
  },
];

function Capture({ p }: { p: Project }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  return (
    <motion.article
      ref={ref}
      variants={reduce ? undefined : staggerItem}
      className={`capture${p.wide ? " capture--wide" : ""}${p.soon ? " capture--soon" : ""}`}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      }}
    >
      <div className="capture__top">
        <h3>{p.title}</h3>
        <span className="capture__band">{p.band}</span>
      </div>
      <p className="capture__role">{p.role}</p>
      <p className="capture__desc">{p.desc}</p>
      <ul className="capture__tags">
        {p.tags.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="capture__links">
        <a href={p.link} target="_blank" rel="noopener">
          {p.linkLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <Stagger className="captures" gap={0.08}>
      {PROJECTS.map((p) => (
        <Capture key={p.title} p={p} />
      ))}
    </Stagger>
  );
}
