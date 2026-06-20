import type { SimpleIcon } from "simple-icons";
import {
  siPython,
  siCplusplus,
  siTypescript,
  siJavascript,
  siPytorch,
  siLangchain,
  siGooglegemini,
  siFastapi,
  siNextdotjs,
  siReact,
  siNodedotjs,
  siSqlalchemy,
  siCelery,
  siSupabase,
  siPostgresql,
  siDocker,
  siGithubactions,
  siRedis,
  siGit,
  siLinux,
  siKubernetes,
} from "simple-icons";

type Item = {
  label: string;
  icon?: SimpleIcon;
  learning?: boolean;
};

type Group = {
  title: string;
  items: Item[];
};

// Authentic brand marks from simple-icons. Items without a real brand logo
// (SQL, Google ADK, MMPose, RTMLib, FAISS, CI/CD, AWS) fall back to a neutral
// glyph rather than an invented logo.
const GROUPS: Group[] = [
  {
    title: "Languages",
    items: [
      { label: "Python", icon: siPython },
      { label: "C++", icon: siCplusplus },
      { label: "TypeScript", icon: siTypescript },
      { label: "JavaScript", icon: siJavascript },
      { label: "SQL" },
    ],
  },
  {
    title: "AI / ML",
    items: [
      { label: "PyTorch", icon: siPytorch },
      { label: "LangChain", icon: siLangchain },
      { label: "Google Gemini", icon: siGooglegemini },
      { label: "Google ADK" },
      { label: "MMPose" },
      { label: "RTMLib" },
      { label: "FAISS" },
    ],
  },
  {
    title: "Web / Backend",
    items: [
      { label: "FastAPI", icon: siFastapi },
      { label: "Next.js", icon: siNextdotjs },
      { label: "React", icon: siReact },
      { label: "Node", icon: siNodedotjs },
      { label: "SQLAlchemy", icon: siSqlalchemy },
      { label: "Celery", icon: siCelery },
      { label: "Supabase", icon: siSupabase },
      { label: "PostgreSQL", icon: siPostgresql },
    ],
  },
  {
    title: "DevOps / Tools",
    items: [
      { label: "Docker", icon: siDocker },
      { label: "AWS" },
      { label: "GitHub Actions", icon: siGithubactions },
      { label: "CI/CD" },
      { label: "Redis", icon: siRedis },
      { label: "Git", icon: siGit },
      { label: "Linux", icon: siLinux },
      { label: "Kubernetes", icon: siKubernetes, learning: true },
    ],
  },
];

function Glyph({ icon }: { icon?: SimpleIcon }) {
  if (!icon) {
    // Neutral fallback for items without an authentic brand mark.
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="pill__dot">
        <circle cx="12" cy="12" r="4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  );
}

export default function Stack() {
  return (
    <div className="stack__grid">
      {GROUPS.map((group) => (
        <div className="stack__group" key={group.title}>
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li
                key={item.label}
                className={item.learning ? "learning" : undefined}
              >
                <Glyph icon={item.icon} />
                {item.label}
                {item.learning ? " →" : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
