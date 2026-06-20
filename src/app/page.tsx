import SmoothScroll from "@/components/SmoothScroll";
import SpectralField from "@/components/SpectralField";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <SmoothScroll>
      <a href="#main" className="skip-link">Skip to content</a>

      <SpectralField />

      <div className="rail" aria-hidden="true">
        <div className="rail__fill" />
      </div>

      <Nav />

      <div className="page">
      <main id="main">
        <Hero />

        {/* STAT INSTRUMENT PANEL */}
        <section className="section" style={{ paddingTop: 0 }} aria-label="Highlights">
          <Reveal>
            <Stats />
          </Reveal>
        </section>

        {/* ABOUT */}
        <section className="section" id="about">
          <Reveal>
            <div className="section__head">
              <p className="section__kicker">Profile</p>
              <h2 className="section__title">
                Working across the <span className="accent">spectrum</span>
              </h2>
            </div>
          </Reveal>
          <div className="about__grid">
            <Reveal className="about__lead">
              <p>
                I finished my <strong>MS in Mathematics &amp; Computing</strong> at{" "}
                <strong>IIT Roorkee</strong>, and these days I&apos;m a full-time{" "}
                <strong>Lead Engineer at Milk Inc</strong>. The work I like lives in the
                messy middle between research and production. Right now that&apos;s mostly
                a hyperspectral data platform we showed at FOOMA Japan this year, plus
                earlier work I&apos;m still fond of like a real-time pose-estimation
                library and a live bidding room that has to settle the lowest bid the
                second it lands.
              </p>
              <p>
                I came up through competitive programming and applied math, so I tend to
                obsess over the stuff that&apos;s easy to skip, like edge cases and latency
                and whether the thing is actually correct. A big part of my job now is{" "}
                <strong>Applied AI</strong>{" "}and the infrastructure that keeps it
                running, and I&apos;m still chasing the next level on both.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="about__aside">
                <figure className="about__photo">
                  {/* PHOTO: replace this .about__photo-ph block with
                      <img src="/assets/rudra.jpg" alt="Rudra Pratap Singh" />
                      The duotone grade + IR-on-hover are applied by CSS. */}
                  <div className="about__photo-ph">
                    <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
                      <path d="M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <span>add photo</span>
                  </div>
                  <figcaption className="about__photo-cap">
                    <span>Rudra · IIT Roorkee</span>
                    <em>hover ▸ IR</em>
                  </figcaption>
                </figure>
                <ul className="about__facts">
                  <li><span className="k">Now</span><span className="v">Lead Engineer at Milk Inc (full-time)</span></li>
                  <li><span className="k">Focus</span><span className="v">Applied AI, backend, DevOps / infra</span></li>
                  <li><span className="k">Base</span><span className="v">India, shipping to users in Japan</span></li>
                  <li><span className="k">Also</span><span className="v">Cup Captain for debate &amp; improv comedy</span></li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="section" id="work">
          <Reveal>
            <div className="section__head">
              <p className="section__kicker">Experience</p>
              <h2 className="section__title">Where I&apos;m shipping</h2>
            </div>
          </Reveal>
          <div className="timeline">
            <Reveal>
              <div className="tl">
                <div className="tl__meta">
                  <span className="tl__date">Jun 2025 – Present</span>
                  <span className="tl__org">Milk Inc</span>
                </div>
                <div className="tl__body">
                  <h3>Lead Engineer <span className="tl__tag">Full Stack</span></h3>
                  <ul>
                    <li>Built the FastAPI + PostgreSQL backend for <strong>ANSWER-Lite</strong>, a production hyperspectral data platform we showed at FOOMA Japan 2026, using SQLAlchemy 2.0, Alembic, and Pydantic v2 across a bilingual, multi-tenant deployment.</li>
                    <li>Designed the hardware integration API for the IRODORI 18-band hyperspectral camera (410-940nm) so it pushes spectral data straight to the backend with per-device targets and labels.</li>
                    <li>Moved long spectral-analysis jobs onto Celery + Redis, and kept a GitHub Actions CI/CD pipeline running for a Dockerized FastAPI + React stack on AWS Lightsail, with a zero-downtime instance migration.</li>
                    <li>Shipped a Next.js 15 SaaS app for Japanese landlords on Cloudflare Pages, with Supabase row-level security, Stripe subscriptions, and a Gemini OCR pipeline for document extraction.</li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="tl">
                <div className="tl__meta">
                  <span className="tl__date">Feb 2025 – Aug 2025</span>
                  <span className="tl__org">DeeCogs Technologies</span>
                </div>
                <div className="tl__body">
                  <h3>AI Engineer <span className="tl__tag">Intern</span></h3>
                  <ul>
                    <li>Built <strong>PhysioTrack</strong>, a real-time pose-estimation library on <code>MMPose</code> + <code>RTMLib</code> that computes joint angles from video and webcam feeds to assess spinal mobility for physiotherapy.</li>
                    <li>Built an AI physiotherapy agent with <strong>Google ADK</strong> and WebSockets for real-time, two-way patient communication, analyzing live video and audio and generating session feedback.</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <Reveal>
            <div className="section__head">
              <p className="section__kicker">Selected work</p>
              <h2 className="section__title">Captures</h2>
            </div>
          </Reveal>
          <Projects />
        </section>

        {/* STACK */}
        <section className="section" id="stack">
          <Reveal>
            <div className="section__head">
              <p className="section__kicker">Toolkit</p>
              <h2 className="section__title">The stack</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="stack__grid">
              <div className="stack__group">
                <h3>Languages</h3>
                <ul><li>Python</li><li>C++</li><li>TypeScript</li><li>JavaScript</li><li>SQL</li></ul>
              </div>
              <div className="stack__group">
                <h3>AI / ML</h3>
                <ul><li>PyTorch</li><li>LangChain</li><li>Google Gemini</li><li>Google ADK</li><li>MMPose</li><li>RTMLib</li><li>FAISS</li></ul>
              </div>
              <div className="stack__group">
                <h3>Web / Backend</h3>
                <ul><li>FastAPI</li><li>Next.js</li><li>React</li><li>Node</li><li>SQLAlchemy</li><li>Celery</li><li>Supabase</li><li>PostgreSQL</li></ul>
              </div>
              <div className="stack__group">
                <h3>DevOps / Tools</h3>
                <ul><li>Docker</li><li>AWS</li><li>GitHub Actions</li><li>CI/CD</li><li>Redis</li><li>Git</li><li>Linux</li><li className="learning">Kubernetes →</li></ul>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section className="section contact" id="contact">
          <Reveal>
            <div className="contact__inner">
              <p className="section__kicker" style={{ justifyContent: "center" }}>Contact</p>
              <h2 className="contact__title">Let&apos;s build something that actually ships.</h2>
              <p className="contact__lead">Open to AI / software roles and collaborations. The fastest way to reach me is email.</p>
              <a href="mailto:rpsingh31.work@gmail.com" className="contact__mail">rpsingh31.work@gmail.com</a>
              <ul className="contact__socials">
                <li><a href="https://github.com/rpsingh31" target="_blank" rel="noopener">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/rudra-d31-m08-y2003/" target="_blank" rel="noopener">LinkedIn</a></li>
                <li><a href="https://x.com/r_psingh31" target="_blank" rel="noopener">X / Twitter</a></li>
                <li><a href="/assets/Rudra_Pratap_Singh_Resume.pdf" target="_blank" rel="noopener">Résumé ↓</a></li>
              </ul>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <span>© {new Date().getFullYear()} Rudra Pratap Singh</span>
          <span>Designed &amp; built from scratch · Next.js · WebGL · Framer Motion</span>
        </div>
      </footer>
      </div>
    </SmoothScroll>
  );
}
