import React, { useEffect, useRef, useState } from "react";
import {
  Server, Database, Cpu, Terminal, Mail, MapPin, MessageCircle,
  ArrowRight, ExternalLink, Menu, X, Layers, GitBranch, Workflow,
  LineChart, Send, Download, Boxes, ChevronRight, Sparkles, ShieldCheck,
  FileSearch, Gauge, Component,
} from "lucide-react";

const Linkedin = ({ size = 24, strokeWidth = 2, className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const LINKEDIN_URL = "https://www.linkedin.com/in/meda-benissa/";
const EMAIL = "meda.benissa22@gmail.com";
const WHATSAPP_URL = "https://wa.me/31687761110";
const WHATSAPP_DISPLAY = "+31 6 8776 1110";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#ecosystem", label: "Skill Map" },
  { href: "#projects", label: "Projects" },
  { href: "#build", label: "What I Build" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const SKILL_GROUPS = [
  {
    label: "Backend",
    icon: Server,
    accent: "cyan",
    items: ["Python", "Django", "FastAPI", "Java Spring Boot", "REST APIs"],
  },
  {
    label: "Frontend",
    icon: Layers,
    accent: "violet",
    items: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML / CSS"],
  },
  {
    label: "Databases",
    icon: Database,
    accent: "emerald",
    items: ["PostgreSQL", "SQL", "Database Design"],
  },
  {
    label: "AI & Automation",
    icon: Cpu,
    accent: "cyan",
    items: ["LLM Integration", "AI Workflows", "Local LLMs", "Document / Log Analysis", "Automation Systems"],
  },
  {
    label: "Recommendation Systems",
    icon: GitBranch,
    accent: "violet",
    items: ["Content-Based Filtering", "Collaborative Filtering", "User Behavior Tracking", "Ranking Algorithms", "Similarity Scoring", "Personalized Recommendations"],
  },
  {
    label: "DevOps & Tools",
    icon: Terminal,
    accent: "emerald",
    items: ["Docker", "Git / GitHub", "CI/CD", "Postman", "JMeter", "RabbitMQ", "Redis"],
  },
];

const PROJECTS = [
  {
    tag: "API PLATFORM",
    accent: "cyan",
    title: "Logichainge API Platform",
    description:
      "A secure API platform that gives external partners controlled access to platform functionality — with API key authentication, organization-based access control, request logging, rate limiting, developer documentation, and usage tracking.",
    stack: ["Django", "PostgreSQL", "Vue.js", "REST APIs", "Docker", "Postman", "JMeter"],
    highlight: "Secure external integration, scalable API design, usage monitoring, and role-based access control.",
    icon: ShieldCheck,
  },
  {
    tag: "AI SYSTEM",
    accent: "violet",
    title: "AI Incident Analyzer",
    description:
      "An AI-powered incident log analyzer that ingests log files, processes them asynchronously through a message queue, and generates structured analysis — summary, root cause, impact, severity, and recommended actions.",
    stack: ["FastAPI", "PostgreSQL", "RabbitMQ", "SQLAlchemy", "Local LLM", "Python"],
    highlight: "Queue-based processing, local AI integration, structured persistence, and asynchronous system architecture.",
    icon: FileSearch,
  },
  {
    tag: "SAAS CONCEPT",
    accent: "emerald",
    title: "API Governance & Usage Intelligence Platform",
    description:
      "A SaaS-style platform concept that monitors API usage, detects abnormal traffic patterns, predicts usage limits, and explains usage behavior in plain English using AI.",
    stack: ["FastAPI / Django", "PostgreSQL", "AI / LLM", "REST APIs", "Dashboard UI"],
    highlight: "AI-assisted monitoring, API analytics, abuse detection, and usage intelligence.",
    icon: Gauge,
  },
  {
    tag: "FULL-STACK",
    accent: "cyan",
    title: "Streaming Platform with Recommendation Engine",
    description:
      "A full-stack, Netflix-style streaming platform (built for learning and portfolio purposes) for browsing titles, managing watchlists, and tracking viewing history. It's powered by a hybrid recommendation engine driven by real interaction signals rather than fixed rules.",
    stack: ["React", "TypeScript", "FastAPI / Django", "PostgreSQL", "Redis", "REST APIs"],
    highlight: "System architecture, personalized recommendation logic, user behavior tracking, and scalable API design.",
    icon: Component,
    recSystem: [
      "Content-based filtering using genres, tags, descriptions, and cast",
      "Collaborative filtering based on similar users' behavior",
      "Weighted scoring across watch history, ratings, and completion rate",
      "Trending / popularity ranking for new or anonymous users",
      "Personalized ranking blending preference, similarity, and popularity",
      "Redis caching layer for low-latency recommendation results",
    ],
  },
];

const BUILD_TYPES = [
  { icon: ShieldCheck, label: "Secure API Platforms" },
  { icon: Cpu, label: "AI-Powered Backend Workflows" },
  { icon: LineChart, label: "Business Dashboards" },
  { icon: Workflow, label: "Internal Automation Tools" },
  { icon: Database, label: "Database-Backed Web Applications" },
  { icon: FileSearch, label: "Document & Log Analysis Tools" },
  { icon: Boxes, label: "Workflow Automation Systems" },
  { icon: GitBranch, label: "Recommendation Systems" },
  { icon: Layers, label: "Full-Stack SaaS Applications" },
];

const ECOSYSTEM_TABS = [
  {
    id: "all",
    label: "All",
    title: "Full-stack systems view",
    text: "My work connects backend engineering, software architecture, AI workflows, cloud deployment, databases, and frontend interfaces into practical production-style systems.",
  },
  {
    id: "backend",
    label: "Backend",
    title: "Backend & API engineering",
    text: "I build backend systems around APIs, authentication, business logic, database-backed workflows, and reliable service design.",
  },
  {
    id: "architecture",
    label: "Architecture",
    title: "System architecture",
    text: "I focus on how systems are structured: API boundaries, scalability, queues, access control, service separation, and maintainable backend design.",
  },
  {
    id: "ai",
    label: "AI Systems",
    title: "AI-powered workflows",
    text: "I build systems that use LLMs and automation for incident analysis, document/log understanding, structured outputs, and intelligent backend processing.",
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    title: "Cloud, deployment & reliability",
    text: "I work with deployment-focused tools and patterns such as Docker, CI/CD, GitHub Actions, queues, caching, testing, and production readiness.",
  },
  {
    id: "data",
    label: "Data",
    title: "Data & persistence",
    text: "I work with relational databases, structured models, logs, usage tracking, and data flows that support dashboards and business logic.",
  },
  {
    id: "frontend",
    label: "Frontend",
    title: "Modern interfaces",
    text: "I build dashboards and portfolio-quality interfaces using React, Vue, JavaScript, and API-driven frontend architecture.",
  },
];

const ECOSYSTEM_NODES = [
  { label: "System Design", group: "all", x: 460, y: 310, size: 98 },

  // Backend
  { label: "Django", group: "backend", x: 230, y: 210, size: 56 },
  { label: "FastAPI", group: "backend", x: 300, y: 330, size: 48 },
  { label: "REST APIs", group: "backend", x: 185, y: 350, size: 46 },
  { label: "Java / Spring", group: "backend", x: 155, y: 250, size: 52 },

  // Architecture
  { label: "API Design", group: "architecture", x: 385, y: 170, size: 46 },
  { label: "RBAC", group: "architecture", x: 365, y: 245, size: 40 },
  { label: "Scalability", group: "architecture", x: 555, y: 255, size: 46 },
  { label: "Queues", group: "architecture", x: 545, y: 385, size: 42 },
  { label: "Microservices", group: "architecture", x: 375, y: 420, size: 44 },

  // AI
  { label: "LLMs", group: "ai", x: 590, y: 135, size: 58 },
  { label: "AI Workflows", group: "ai", x: 710, y: 210, size: 52 },
  { label: "Log Analysis", group: "ai", x: 660, y: 365, size: 44 },
  { label: "Recommendations", group: "ai", x: 790, y: 325, size: 54 },

  // Cloud & DevOps
  { label: "Docker", group: "cloud", x: 655, y: 470, size: 44 },
  { label: "GitHub Actions", group: "cloud", x: 585, y: 555, size: 42 },
  { label: "CI/CD", group: "cloud", x: 720, y: 545, size: 36 },
  { label: "RabbitMQ", group: "cloud", x: 785, y: 445, size: 42 },
  { label: "Redis", group: "cloud", x: 815, y: 520, size: 36 },

  // Data
  { label: "PostgreSQL", group: "data", x: 390, y: 500, size: 54 },
  { label: "SQL", group: "data", x: 295, y: 535, size: 36 },
  { label: "Usage Tracking", group: "data", x: 505, y: 520, size: 42 },

  // Frontend
  { label: "React", group: "frontend", x: 150, y: 250, size: 52 },
  { label: "Vue.js", group: "frontend", x: 115, y: 425, size: 44 },
  { label: "Dashboards", group: "frontend", x: 205, y: 525, size: 46 },
];

const ECOSYSTEM_EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [0, 5], [0, 6], [0, 7], [0, 8], [0, 9],
  [0, 10], [0, 11], [0, 12], [0, 13],
  [0, 14], [0, 15], [0, 16], [0, 17], [0, 18],
  [0, 19], [0, 20], [0, 21],
  [0, 22], [0, 23], [0, 24],

  [1, 3], [1, 5], [2, 3], [4, 3],
  [5, 7], [6, 8], [8, 17], [9, 14],
  [10, 11], [11, 13], [12, 17],
  [14, 15], [15, 16], [17, 18],
  [19, 21], [22, 24],
];

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook                                                 */
/* ------------------------------------------------------------------ */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-prompt">$</span>
      <span>{children}</span>
    </div>
  );
}

function AccentDot({ accent }) {
  return <span className={`accent-dot accent-dot-${accent}`} />;
}

/* ------------------------------------------------------------------ */
/*  Node graph background (signature element)                         */
/* ------------------------------------------------------------------ */

function NodeGraph() {
  const nodes = [
    { x: 90, y: 80 }, { x: 260, y: 40 }, { x: 430, y: 110 },
    { x: 610, y: 60 }, { x: 150, y: 220 }, { x: 350, y: 260 },
    { x: 540, y: 230 }, { x: 700, y: 190 }, { x: 40, y: 340 },
    { x: 470, y: 350 }, { x: 660, y: 340 }, { x: 250, y: 380 },
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 6], [6, 7], [2, 6],
    [4, 8], [5, 9], [9, 10], [9, 11], [3, 7], [0, 4],
  ];
  return (
    <svg className="node-graph" viewBox="0 0 760 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="url(#edgeGrad)"
          strokeWidth="1"
          className="node-edge"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x} cy={n.y} r={i % 3 === 0 ? 4.5 : 3}
          className="node-dot"
          style={{ animationDelay: `${i * 0.25}s` }}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function smoothScrollToHash(hash) {
  const target = document.querySelector(hash);
  if (!target) return;

  const navHeight = document.querySelector(".nav")?.offsetHeight || 0;
  const startY = window.scrollY;
  const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const finalY = Math.min(Math.max(targetY, 0), maxY);

  const distance = finalY - startY;
  const duration = 700;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

function Nav() {
  const [open, setOpen] = useState(false);

  function handleNavClick(e, href) {
    e.preventDefault();
    smoothScrollToHash(href);
    window.history.pushState(null, "", href);
    setOpen(false);
  }

  return (
    <header className="nav">
      <div className="shell nav-inner">
        <a href="#top" className="logo" onClick={(e) => handleNavClick(e, "#top")}>
          <span className="logo-mark">MB</span>
          <span className="logo-cursor" />
        </a>

        <nav className="nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="btn btn-ghost nav-cta"
          onClick={(e) => handleNavClick(e, "#contact")}
        >
          Contact <ArrowRight size={15} />
        </a>

        <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="nav-mobile">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => handleNavClick(e, l.href)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-bg">
        <NodeGraph />
        <div className="glow glow-cyan" />
        <div className="glow glow-violet" />
        <div className="grid-overlay" />
      </div>
      <div className="shell hero-inner">
        <div className="hero-badge">
          <span className="pulse-dot" />
          AI &nbsp;•&nbsp; APIs &nbsp;•&nbsp; Full-Stack &nbsp;•&nbsp; Dashboards &nbsp;•&nbsp; Automation &nbsp;•&nbsp; Recommendation Systems
        </div>
        <h1 className="hero-name">Mohamed Benissa</h1>
        <p className="hero-title">Software Engineer <span className="hero-title-sep">/</span> AI &amp; Full Stack Developer</p>
        <p className="hero-headline">
          I build scalable systems, secure APIs, AI-powered workflows,
          recommendation systems, and modern web applications.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View Projects <ArrowRight size={17} />
          </a>
          <a href="#contact" className="btn btn-outline">
            Contact Me
          </a>
        </div>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true" />
    </section>
  );
}

function About() {
  const facts = [
    "System architecture",
    "Secure API design",
    "Asynchronous processing",
    "Database design",
    "System reliability",
  ];
  return (
    <section id="about" className="section">
      <div className="shell about-grid">
        <Reveal>
          <Eyebrow>about</Eyebrow>
          <h2 className="section-title">Engineering systems that hold up in production.</h2>
          <p className="about-text">
            I'm a software engineer working across AI/LLM-enabled systems, full stack platforms,
            API systems, dashboards, recommendation systems, and scalable application workflows.
            My focus is on system architecture, secure API design, asynchronous processing,
            database design, and system reliability — building practical tools that solve
            real business problems rather than just technical demos.
          </p>
          <p className="about-text">
            I care about the parts of a system that are invisible when they work correctly:
            clean data models, predictable API contracts, resilient queues, and interfaces
            that make complex data easy to act on.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="about-facts">
            {facts.map((f) => (
              <div key={f} className="about-fact">
                <ChevronRight size={16} className="about-fact-icon" />
                {f}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="shell">
        <Reveal>
          <Eyebrow>skills</Eyebrow>
          <h2 className="section-title">What I work with.</h2>
        </Reveal>
        <div className="skills-grid">
          {SKILL_GROUPS.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.label} delay={i * 70}>
                <div className={`skill-card accent-${g.accent}`}>
                  <div className="skill-card-head">
                    <span className="skill-icon"><Icon size={19} /></span>
                    <h3>{g.label}</h3>
                  </div>
                  <div className="skill-chips">
                    {g.items.map((it) => (
                      <span key={it} className="chip">{it}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, index }) {
  const Icon = p.icon;
  return (
    <Reveal delay={index * 90}>
      <article className={`project-card accent-${p.accent}`}>
        <div className="project-shot">
          <div className="project-shot-grid" />
          <Icon size={34} className="project-shot-icon" />
          <span className="project-tag">{p.tag}</span>
        </div>
        <div className="project-body">
          <h3>{p.title}</h3>
          <p className="project-desc">{p.description}</p>

          {p.recSystem && (
            <ul className="rec-list">
              {p.recSystem.map((r) => (
                <li key={r}><ChevronRight size={13} />{r}</li>
              ))}
            </ul>
          )}

          <div className="project-stack">
            {p.stack.map((s) => (
              <span key={s} className="chip chip-sm">{s}</span>
            ))}
          </div>

          <p className="project-highlight">
            <Sparkles size={14} /> {p.highlight}
          </p>

          <div className="project-links">
            <a href="#" className="link-btn">
              <ExternalLink size={15} /> Live demo
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="shell">
        <Reveal>
          <Eyebrow>projects</Eyebrow>
          <h2 className="section-title">Featured work.</h2>
          <p className="section-sub">
            A selection of platforms and systems spanning secure APIs, AI-driven analysis,
            and recommendation engines.
          </p>
        </Reveal>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatIBuild() {
  return (
    <section id="build" className="section section-alt">
      <div className="shell">
        <Reveal>
          <Eyebrow>capabilities</Eyebrow>
          <h2 className="section-title">What I build.</h2>
        </Reveal>
        <div className="build-grid">
          {BUILD_TYPES.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.label} delay={i * 50}>
                <div className="build-card">
                  <Icon size={18} />
                  <span>{b.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillEcosystem() {
  const [activeTab, setActiveTab] = useState("all");

  const activeInfo =
    ECOSYSTEM_TABS.find((tab) => tab.id === activeTab) || ECOSYSTEM_TABS[0];

  function isActiveNode(node) {
    return activeTab === "all" || node.group === activeTab || node.group === "all";
  }

  function isActiveEdge(edge) {
    const a = ECOSYSTEM_NODES[edge[0]];
    const b = ECOSYSTEM_NODES[edge[1]];
    return isActiveNode(a) && isActiveNode(b);
  }

  return (
    <section id="ecosystem" className="section ecosystem-section">
      <div className="shell">
        <Reveal>
          <Eyebrow>skill map</Eyebrow>
          <h2 className="section-title">How my skills connect.</h2>
          <p className="section-sub">
            A visual map of the areas I work across — from backend systems and APIs
            to AI workflows, data, DevOps, and frontend interfaces.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="ecosystem-tabs">
            {ECOSYSTEM_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`ecosystem-tab ${activeTab === tab.id ? "ecosystem-tab-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="ecosystem-layout">
          <Reveal delay={160} className="ecosystem-map-wrap">
            <div className={`ecosystem-map ecosystem-map-${activeTab}`}>
              <div className="ecosystem-orbit ecosystem-orbit-backend" />
              <div className="ecosystem-orbit ecosystem-orbit-architecture" />
              <div className="ecosystem-orbit ecosystem-orbit-ai" />
              <div className="ecosystem-orbit ecosystem-orbit-cloud" />
              <div className="ecosystem-orbit ecosystem-orbit-data" />
              <div className="ecosystem-orbit ecosystem-orbit-frontend" />

              <span className="ecosystem-cluster-label cluster-backend">Backend</span>
              <span className="ecosystem-cluster-label cluster-architecture">Architecture</span>
              <span className="ecosystem-cluster-label cluster-ai">AI Systems</span>
              <span className="ecosystem-cluster-label cluster-cloud">Cloud & DevOps</span>
              <span className="ecosystem-cluster-label cluster-data">Data</span>
              <span className="ecosystem-cluster-label cluster-frontend">Frontend</span>

              <svg className="ecosystem-lines" viewBox="0 0 900 620" aria-hidden="true">
                {ECOSYSTEM_EDGES.map((edge, i) => {
                  const a = ECOSYSTEM_NODES[edge[0]];
                  const b = ECOSYSTEM_NODES[edge[1]];
                  return (
                    <line
                      key={i}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      className={isActiveEdge(edge) ? "ecosystem-line active" : "ecosystem-line"}
                    />
                  );
                })}
              </svg>

              {ECOSYSTEM_NODES.map((node) => (
                <div
                  key={node.label}
                  className={`ecosystem-node ecosystem-node-${node.group} ${
                    isActiveNode(node) ? "ecosystem-node-active" : "ecosystem-node-muted"
                  }`}
                  style={{
                    left: `${(node.x / 900) * 100}%`,
                    top: `${(node.y / 620) * 100}%`,
                    width: `${node.size}px`,
                    height: `${node.size}px`,
                  }}
                >
                  <span>{node.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={220}>
            <aside className="ecosystem-panel">
              <span className="ecosystem-panel-label">Current view</span>
              <h3>{activeInfo.title}</h3>
              <p>{activeInfo.text}</p>

              <div className="ecosystem-panel-list">
                <div>
                  <strong>Core strength</strong>
                  <span>Backend + AI + APIs</span>
                </div>
                <div>
                  <strong>Best use case</strong>
                  <span>Building practical, reliable systems</span>
                </div>
                <div>
                  <strong>Portfolio focus</strong>
                  <span>Production-style projects, not basic demos</span>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section">
      <div className="shell">
        <Reveal>
          <Eyebrow>education</Eyebrow>
          <h2 className="section-title">Foundation.</h2>
          <div className="edu-card">
            <div className="edu-card-icon"><Layers size={22} /></div>
            <div>
              <h3>Bachelor&apos;s degree in Computer Science</h3>
              <p>
                Focus areas: software engineering, Full stack development, API systems,
                cybersecurity foundations, AI-powered applications, recommendation systems,
                and scalable software design.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="section cta-section">
      <div className="shell">
        <Reveal>
          <div className="cta-box">
            <div className="cta-glow" />
            <h2 className="cta-title">Interested in working together?</h2>
            <p className="cta-text">
              I'm open to junior software engineering roles, freelance projects, AI automation
              work, Full stack development opportunities, API platform work, recommendation-system
              projects, and collaborations.
            </p>
            <div className="cta-actions">
              <a href="#contact" className="btn btn-primary">
                Contact Me <ArrowRight size={16} />
              </a>
              <a
                href="/Mohamed_Benissa_CV.pdf"
                download="Mohamed_Benissa_CV.pdf"
                className="btn btn-outline"
              >
                <Download size={16} /> Download CV
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-solid">
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    const subject = `Portfolio contact from ${form.name}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setStatus("sent");
    }, 500);
  }

  return (
    <section id="contact" className="section section-alt">
      <div className="shell contact-grid">
        <Reveal>
          <Eyebrow>contact</Eyebrow>
          <h2 className="section-title">Let's talk.</h2>
          <p className="section-sub">
            Have a role, a project, or an idea? Send a message and I'll get back to you.
          </p>

          <div className="contact-info">
            <a href={`mailto:${EMAIL}`} className="contact-info-row">
              <Mail size={17} /> {EMAIL}
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="contact-info-row">
              <Linkedin size={17} /> linkedin.com/in/meda-benissa
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="contact-info-row">
              <MessageCircle size={17} /> {WHATSAPP_DISPLAY}
            </a>
            <span className="contact-info-row contact-info-static">
              <MapPin size={17} /> Netherlands
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </label>
            <label>
              <span>Email</span>
              <input
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </label>
            <label>
              <span>Message</span>
              <textarea
                rows={5}
                placeholder="Tell me about the role or project..."
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                required
              />
            </label>
            <button type="submit" className="btn btn-primary contact-submit" disabled={status === "sending"}>
              {status === "sent" ? "Message sent" : status === "sending" ? "Sending..." : (
                <>Send message <Send size={15} /></>
              )}
            </button>
            {status === "sent" && (
              <p className="contact-confirm">Opening your email app to send this to Mohamed...</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <span>© {new Date().getFullYear()} Mohamed Benissa</span>
        <div className="footer-links">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /></a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /></a>
          <a href={`mailto:${EMAIL}`}><Mail size={16} /></a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    function handleMove(e) {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

      const target = e.target;
      const isInteractive =
        target instanceof Element &&
        target.closest("a, button, input, textarea, select, [role='button']");

      cursor.classList.toggle("custom-cursor-hover", Boolean(isInteractive));
    }

    function handleDown() {
      cursor.classList.add("custom-cursor-click");
    }

    function handleUp() {
      cursor.classList.remove("custom-cursor-click");
    }

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}

export default function Portfolio() {
  return (
    <div className="portfolio-root">
      <style>{`
        html {
          scroll-behavior: smooth;
          background: #0A0E14;
        }

        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
          background: #0A0E14;
        }

        body {
          overflow-x: hidden;
        }
        :root {
          --bg: #0A0E14;
          --bg-elev: #0F1520;
          --bg-elev-2: #131B28;
          --border: rgba(148, 163, 184, 0.12);
          --border-strong: rgba(148, 163, 184, 0.22);
          --text: #E7ECF3;
          --text-muted: #8B96A8;
          --text-dim: #5C6779;
          --cyan: #22D3EE;
          --violet: #8B7CF6;
          --emerald: #34D399;
          --mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;
          --display: 'Space Grotesk', 'Inter', sans-serif;
          --body: 'Inter', sans-serif;
        }

        .portfolio-root {
          background: var(--bg);
          color: var(--text);
          font-family: var(--body);
          line-height: 1.55;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
        .portfolio-root * { box-sizing: border-box; }
        .portfolio-root a { color: inherit; text-decoration: none; }
        .portfolio-root button { font-family: inherit; }
        .portfolio-root h1, .portfolio-root h2, .portfolio-root h3 {
          font-family: var(--display);
          letter-spacing: -0.02em;
          margin: 0;
        }
        .portfolio-root :focus-visible {
          outline: 2px solid var(--cyan);
          outline-offset: 3px;
          border-radius: 4px;
        }
        .portfolio-root section[id],
        .portfolio-root #top {
          scroll-margin-top: 84px;
        }

        .shell {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 28px;
        }

        @media (pointer: fine) {
          html,
          body,
          .portfolio-root,
          .portfolio-root * {
            cursor: none !important;
          }

          .custom-cursor {
            position: fixed;
            top: 0;
            left: 0;
            width: 11px;
            height: 11px;
            border-radius: 999px;
            background: var(--cyan);
            pointer-events: none;
            z-index: 9999;
            transform: translate3d(-100px, -100px, 0);
            box-shadow: 0 0 16px rgba(34, 211, 238, 0.9);
            transition:
              width 0.16s ease,
              height 0.16s ease,
              opacity 0.16s ease,
              background 0.16s ease;
          }

          .custom-cursor-hover {
            width: 20px;
            height: 20px;
            background: rgba(34, 211, 238, 0.25);
            border: 1px solid var(--cyan);
          }

          .custom-cursor-click {
            width: 8px;
            height: 8px;
            opacity: 0.8;
          }
        }

        @media (pointer: coarse) {
          .custom-cursor {
            display: none;
          }
        }

        /* ---------- Nav ---------- */
        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(10, 14, 20, 0.72);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }
        .logo {
          font-family: var(--mono);
          font-size: 18px;
          font-weight: 600;
          display: flex;
          align-items: center;
          letter-spacing: 0.02em;
        }
        .logo-mark {
          background: linear-gradient(135deg, var(--cyan), var(--violet));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .logo-cursor {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: var(--cyan);
          display: inline-block;
          margin-left: 6px;
          box-shadow: 0 0 12px rgba(34, 211, 238, 0.9);
          animation: blink 1.1s steps(1) infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .nav-links {
          display: flex;
          gap: 30px;
          font-size: 14px;
          color: var(--text-muted);
        }
        .nav-links a { transition: color 0.2s ease; }
        .nav-links a:hover { color: var(--text); }
        .nav-cta { display: inline-flex; }
        .nav-toggle { display: none; background: none; border: none; color: var(--text); cursor: pointer; }

        .nav-mobile {
          display: none;
        }

        @media (max-width: 860px) {
          .nav-links, .nav-cta { display: none; }
          .nav-toggle { display: flex; }
          .nav-mobile {
            display: flex;
            flex-direction: column;
            padding: 8px 28px 20px;
            gap: 14px;
            border-bottom: 1px solid var(--border);
            font-size: 15px;
            color: var(--text-muted);
          }
        }

        /* ---------- Buttons ---------- */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 8px;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid transparent;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, border-color 0.18s ease;
          white-space: nowrap;
        }
        .btn:hover { transform: translateY(-2px); }
        .btn-primary {
          background: linear-gradient(135deg, var(--cyan), var(--violet));
          color: #06090F;
          box-shadow: 0 0 0 rgba(34,211,238,0);
        }
        .btn-primary:hover { box-shadow: 0 8px 26px -8px rgba(34,211,238,0.55); }
        .btn-outline {
          border-color: var(--border-strong);
          color: var(--text);
          background: rgba(255,255,255,0.02);
        }
        .btn-outline:hover { border-color: var(--cyan); }
        .btn-ghost {
          color: var(--text-muted);
          font-size: 14px;
          padding: 8px 4px;
        }
        .btn-ghost:hover { color: var(--cyan); transform: none; }
        .btn-ghost-solid {
          border-color: var(--border);
          color: var(--text-muted);
          background: rgba(255,255,255,0.02);
          padding: 12px 18px;
        }
        .btn-ghost-solid:hover { color: var(--text); border-color: var(--border-strong); }

        /* ---------- Hero ---------- */
        .hero {
          position: relative;
          padding: 150px 0 130px;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 90%);
        }
        .node-graph {
          position: absolute;
          top: -20px;
          right: -60px;
          width: 62%;
          min-width: 520px;
          height: auto;
          opacity: 0.85;
        }
        .node-edge {
          stroke-dasharray: 6 6;
          animation: dash 6s linear infinite;
        }
        @keyframes dash { to { stroke-dashoffset: -240; } }
        .node-dot {
          fill: #7DD3E8;
          filter: drop-shadow(0 0 5px rgba(34,211,238,0.8));
          animation: nodePulse 3.2s ease-in-out infinite;
        }
        @keyframes nodePulse {
          0%, 100% { opacity: 0.55; r: 3; }
          50% { opacity: 1; }
        }
        .glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }
        .glow-cyan {
          width: 420px; height: 420px;
          background: rgba(34,211,238,0.16);
          top: -120px; left: -140px;
        }
        .glow-violet {
          width: 480px; height: 480px;
          background: rgba(139,124,246,0.14);
          bottom: -180px; right: -160px;
        }

        .hero-inner { position: relative; z-index: 2; max-width: 760px; }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--mono);
          font-size: 12.5px;
          color: var(--text-muted);
          border: 1px solid var(--border-strong);
          background: rgba(255,255,255,0.03);
          padding: 7px 14px;
          border-radius: 100px;
          margin-bottom: 28px;
        }
        .pulse-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--emerald);
          box-shadow: 0 0 0 0 rgba(52,211,153,0.6);
          animation: pulseDot 2s infinite;
        }
        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(52,211,153,0.55); }
          70% { box-shadow: 0 0 0 8px rgba(52,211,153,0); }
          100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
        }
        .hero-name {
          font-size: clamp(42px, 6.4vw, 74px);
          font-weight: 700;
          line-height: 1.02;
          margin-bottom: 18px;
        }
        .hero-title {
          font-size: clamp(17px, 2vw, 21px);
          color: var(--text);
          font-weight: 500;
          margin-bottom: 20px;
        }
        .hero-title-sep { color: var(--cyan); margin: 0 4px; }
        .hero-headline {
          font-size: 17px;
          color: var(--text-muted);
          max-width: 560px;
          margin-bottom: 38px;
        }
        .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }
        .hero-scroll-cue { height: 1px; }

        /* ---------- Sections ---------- */
        .section { padding: 108px 0; }
        .section-alt { background: linear-gradient(180deg, rgba(255,255,255,0.012), rgba(255,255,255,0)); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--mono);
          font-size: 13px;
          color: var(--cyan);
          margin-bottom: 14px;
          letter-spacing: 0.02em;
        }
        .eyebrow-prompt { color: var(--emerald); }
        .section-title {
          font-size: clamp(28px, 3.6vw, 38px);
          font-weight: 700;
          margin-bottom: 16px;
          max-width: 640px;
        }
        .section-sub {
          color: var(--text-muted);
          font-size: 16px;
          max-width: 560px;
          margin-bottom: 40px;
        }

        /* reveal animation */
        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-visible { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; transition: none; }
          .node-edge, .node-dot, .pulse-dot, .logo-cursor { animation: none; }
        }

        /* ---------- About ---------- */
        .about-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .about-text {
          color: var(--text-muted);
          font-size: 16px;
          margin-bottom: 16px;
          max-width: 560px;
        }
        .about-facts {
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 22px;
          background: rgba(255,255,255,0.015);
        }
        .about-fact {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14.5px;
          color: var(--text);
          padding: 11px 0;
          border-bottom: 1px solid var(--border);
        }
        .about-fact:last-child { border-bottom: none; }
        .about-fact-icon { color: var(--cyan); flex-shrink: 0; }

        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr; gap: 32px; }
        }

        /* ---------- Skills ---------- */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .skill-card {
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 24px;
          background: var(--bg-elev);
          transition: border-color 0.2s ease, transform 0.2s ease;
          height: 100%;
        }
        .skill-card:hover { transform: translateY(-4px); border-color: var(--border-strong); }
        .skill-card-head {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .skill-card-head h3 { font-size: 16px; font-weight: 600; }
        .skill-icon {
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
        }
        .accent-cyan .skill-icon { background: rgba(34,211,238,0.12); color: var(--cyan); }
        .accent-violet .skill-icon { background: rgba(139,124,246,0.14); color: var(--violet); }
        .accent-emerald .skill-icon { background: rgba(52,211,153,0.12); color: var(--emerald); }
        .skill-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .chip {
          font-family: var(--mono);
          font-size: 12.5px;
          padding: 6px 11px;
          border-radius: 6px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          color: var(--text-muted);
        }
        .chip-sm { font-size: 11.5px; padding: 5px 9px; }

        @media (max-width: 860px) {
          .skills-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .skills-grid { grid-template-columns: 1fr; }
        }

        /* ---------- Projects ---------- */
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 26px;
        }
        .project-card {
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          background: var(--bg-elev);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .project-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-strong);
          box-shadow: 0 20px 44px -22px rgba(0,0,0,0.6);
        }
        .project-shot {
          position: relative;
          height: 140px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(34,211,238,0.10), rgba(139,124,246,0.10));
          border-bottom: 1px solid var(--border);
        }
        .project-shot-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 22px 22px;
        }
        .project-shot-icon { position: relative; z-index: 1; color: var(--text); opacity: 0.85; }
        .project-tag {
          position: absolute;
          top: 14px; left: 16px;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          padding: 5px 10px;
          border-radius: 100px;
          background: rgba(6,9,15,0.55);
          border: 1px solid var(--border-strong);
          z-index: 2;
        }
        .accent-cyan .project-tag { color: var(--cyan); }
        .accent-violet .project-tag { color: var(--violet); }
        .accent-emerald .project-tag { color: var(--emerald); }

        .project-body { padding: 24px; flex: 1; display: flex; flex-direction: column; }
        .project-body h3 { font-size: 19px; margin-bottom: 10px; }
        .project-desc { color: var(--text-muted); font-size: 14.5px; margin-bottom: 14px; }
        .rec-list {
          list-style: none;
          margin: 0 0 14px;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .rec-list li {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 13px;
          color: var(--text-muted);
        }
        .rec-list li svg { color: var(--emerald); margin-top: 3px; flex-shrink: 0; }
        .project-stack { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 16px; }
        .project-highlight {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 13.5px;
          color: var(--text);
          background: rgba(255,255,255,0.03);
          border-left: 2px solid var(--cyan);
          padding: 10px 12px;
          border-radius: 6px;
          margin-bottom: 18px;
        }
        .project-highlight svg { color: var(--cyan); margin-top: 2px; flex-shrink: 0; }
        .project-links { display: flex; gap: 18px; margin-top: auto; }
        .link-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13.5px; font-weight: 600; color: var(--text-muted);
          transition: color 0.2s ease;
        }
        .link-btn:hover { color: var(--cyan); }

        @media (max-width: 860px) {
          .projects-grid { grid-template-columns: 1fr; }
        }

        /* ---------- What I Build ---------- */
        .build-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .build-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 20px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--bg-elev);
          font-size: 14.5px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .build-card:hover { border-color: var(--border-strong); transform: translateY(-3px); }
        .build-card svg { color: var(--violet); flex-shrink: 0; }

        @media (max-width: 860px) {
          .build-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .build-grid { grid-template-columns: 1fr; }
        }

        /* ---------- Skill Ecosystem ---------- */
        .ecosystem-section {
          position: relative;
          background:
            radial-gradient(circle at 18% 10%, rgba(34, 211, 238, 0.08), transparent 32%),
            radial-gradient(circle at 82% 18%, rgba(139, 124, 246, 0.09), transparent 36%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.012), rgba(255, 255, 255, 0)),
            var(--bg);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .ecosystem-tabs {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }

        .ecosystem-tab {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.025);
          color: var(--text-muted);
          padding: 9px 15px;
          border-radius: 999px;
          font-size: 13.5px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .ecosystem-tab:hover {
          color: var(--text);
          border-color: var(--border-strong);
          transform: translateY(-1px);
        }

        .ecosystem-tab-active {
          color: #06090F;
          border-color: transparent;
          background: linear-gradient(135deg, var(--cyan), var(--violet));
          box-shadow: 0 10px 28px -18px rgba(34, 211, 238, 0.8);
        }

        .ecosystem-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.65fr) 330px;
          gap: 24px;
          align-items: stretch;
        }

        .ecosystem-map-wrap {
          min-width: 0;
        }

        .ecosystem-map {
          position: relative;
          height: 620px;
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 22px;
          overflow: hidden;
          background:
            radial-gradient(circle at center, rgba(139, 124, 246, 0.08), transparent 30%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.008)),
            #081018;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 24px 70px -42px rgba(0, 0, 0, 0.9);
        }

        .ecosystem-map::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(148, 163, 184, 0.22) 1px, transparent 1px);
          background-size: 42px 42px;
          opacity: 0.18;
        }

        .ecosystem-map::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 48%, transparent 0%, rgba(0, 0, 0, 0.18) 70%);
          pointer-events: none;
        }

        .ecosystem-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .ecosystem-line {
          stroke: rgba(148, 163, 184, 0.12);
          stroke-width: 1;
          transition: stroke 0.25s ease, stroke-width 0.25s ease, opacity 0.25s ease;
        }

        .ecosystem-line.active {
          stroke: rgba(34, 211, 238, 0.42);
          stroke-width: 1.15;
        }

        .ecosystem-map-all .ecosystem-line.active {
          stroke: rgba(34, 211, 238, 0.24);
        }

        .ecosystem-node {
          position: absolute;
          transform: translate(-50%, -50%);
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 8px;
          font-family: var(--mono);
          font-size: 0;
          color: var(--text);
          border: 1px solid rgba(255, 255, 255, 0.14);
          transition:
            opacity 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
          z-index: 3;
        }

        .ecosystem-node span {
          position: absolute;
          top: calc(100% + 7px);
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 10.5px;
          line-height: 1;
          color: rgba(231, 236, 243, 0.82);
          background: rgba(6, 9, 15, 0.42);
          border: 1px solid rgba(148, 163, 184, 0.12);
          border-radius: 999px;
          padding: 4px 7px;
          backdrop-filter: blur(8px);
        }

        .ecosystem-node-all span {
          top: 50%;
          transform: translate(-50%, -50%);
          background: transparent;
          border: none;
          padding: 0;
          font-size: 12px;
          font-weight: 700;
          white-space: normal;
          max-width: 74px;
          line-height: 1.15;
        }

        .ecosystem-node:hover {
          transform: translate(-50%, -50%) scale(1.08);
          border-color: rgba(255, 255, 255, 0.38);
          z-index: 5;
        }

        .ecosystem-node:hover span {
          color: var(--text);
          border-color: rgba(148, 163, 184, 0.28);
        }

        .ecosystem-node-all {
          background: radial-gradient(circle, rgba(139, 124, 246, 0.85), rgba(139, 124, 246, 0.22));
          box-shadow: 0 0 42px rgba(139, 124, 246, 0.38);
        }

        .ecosystem-node-backend {
          background: radial-gradient(circle, rgba(34, 211, 238, 0.72), rgba(34, 211, 238, 0.18));
          box-shadow: 0 0 25px rgba(34, 211, 238, 0.24);
        }

        .ecosystem-node-ai {
          background: radial-gradient(circle, rgba(139, 124, 246, 0.74), rgba(139, 124, 246, 0.18));
          box-shadow: 0 0 25px rgba(139, 124, 246, 0.26);
        }

        .ecosystem-node-data {
          background: radial-gradient(circle, rgba(52, 211, 153, 0.72), rgba(52, 211, 153, 0.18));
          box-shadow: 0 0 25px rgba(52, 211, 153, 0.24);
        }

        .ecosystem-node-devops {
          background: radial-gradient(circle, rgba(20, 184, 166, 0.72), rgba(20, 184, 166, 0.16));
          box-shadow: 0 0 25px rgba(20, 184, 166, 0.22);
        }

        .ecosystem-node-frontend {
          background: radial-gradient(circle, rgba(59, 130, 246, 0.72), rgba(59, 130, 246, 0.18));
          box-shadow: 0 0 25px rgba(59, 130, 246, 0.24);
        }

        .ecosystem-node-muted {
          opacity: 0.22;
        }

        .ecosystem-node-active {
          opacity: 1;
        }

        .ecosystem-orbit {
          position: absolute;
          border-radius: 999px;
          filter: blur(1px);
          opacity: 0.26;
          pointer-events: none;
        }

        .ecosystem-orbit-backend {
          width: 260px;
          height: 230px;
          left: 120px;
          top: 130px;
          background: rgba(34, 211, 238, 0.14);
        }

        .ecosystem-orbit-ai {
          width: 310px;
          height: 235px;
          right: 55px;
          top: 70px;
          background: rgba(139, 124, 246, 0.15);
        }

        .ecosystem-orbit-data {
          width: 270px;
          height: 160px;
          left: 285px;
          bottom: 48px;
          background: rgba(52, 211, 153, 0.13);
        }

        .ecosystem-orbit-devops {
          width: 285px;
          height: 185px;
          right: 45px;
          bottom: 42px;
          background: rgba(20, 184, 166, 0.12);
        }

        .ecosystem-orbit-frontend {
          width: 235px;
          height: 280px;
          left: 42px;
          bottom: 62px;
          background: rgba(59, 130, 246, 0.13);
        }

        .ecosystem-orbit-architecture {
          width: 250px;
          height: 230px;
          left: 315px;
          top: 145px;
          background: rgba(168, 85, 247, 0.13);
        }

        .ecosystem-orbit-cloud {
          width: 285px;
          height: 185px;
          right: 42px;
          bottom: 42px;
          background: rgba(20, 184, 166, 0.12);
        }

        .cluster-architecture {
          left: 355px;
          top: 105px;
          color: rgba(168, 85, 247, 0.52);
        }

        .cluster-cloud {
          right: 105px;
          bottom: 205px;
          color: rgba(20, 184, 166, 0.5);
        }

        .ecosystem-cluster-label {
          position: absolute;
          z-index: 2;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(231, 236, 243, 0.32);
          pointer-events: none;
        }

        .cluster-backend {
          left: 170px;
          top: 112px;
          color: rgba(34, 211, 238, 0.5);
        }

        .cluster-ai {
          right: 150px;
          top: 65px;
          color: rgba(139, 124, 246, 0.55);
        }

        .cluster-data {
          left: 345px;
          bottom: 205px;
          color: rgba(52, 211, 153, 0.48);
        }

        .cluster-devops {
          right: 120px;
          bottom: 205px;
          color: rgba(20, 184, 166, 0.5);
        }

        .cluster-frontend {
          left: 70px;
          bottom: 280px;
          color: rgba(59, 130, 246, 0.5);
        }

        .ecosystem-panel {
          height: 100%;
          min-height: 360px;
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 22px;
          padding: 30px;
          background:
            radial-gradient(circle at 20% 0%, rgba(139, 124, 246, 0.12), transparent 38%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.015)),
            var(--bg-elev);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 24px 70px -44px rgba(0, 0, 0, 0.9);
        }

        .ecosystem-panel-label {
          display: inline-block;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cyan);
          margin-bottom: 16px;
        }

        .ecosystem-panel h3 {
          font-size: 23px;
          line-height: 1.25;
          margin-bottom: 14px;
          text-shadow: none;
        }

        .ecosystem-panel p {
          color: var(--text-muted);
          font-size: 15px;
          margin: 0 0 26px;
        }

        .ecosystem-panel-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ecosystem-panel-list div {
          padding: 15px;
          border: 1px solid var(--border);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.025);
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .ecosystem-panel-list div:hover {
          border-color: var(--border-strong);
          background: rgba(255, 255, 255, 0.04);
        }

        .ecosystem-panel-list strong {
          display: block;
          font-size: 13px;
          color: var(--text);
          margin-bottom: 5px;
        }

        .ecosystem-panel-list span {
          display: block;
          font-size: 13.5px;
          color: var(--text-muted);
        }

        @media (max-width: 960px) {
          .ecosystem-layout {
            grid-template-columns: 1fr;
          }

          .ecosystem-map {
            height: 560px;
          }
        }

        @media (max-width: 620px) {
          .ecosystem-map {
            height: 500px;
          }

          .ecosystem-node span {
            font-size: 9px;
          }

          .ecosystem-node:not(.ecosystem-node-all) {
            width: 38px !important;
            height: 38px !important;
          }

          .ecosystem-node-all {
            width: 76px !important;
            height: 76px !important;
          }
        }

        .ecosystem-node-architecture {
          background: radial-gradient(circle, rgba(168, 85, 247, 0.72), rgba(168, 85, 247, 0.18));
          box-shadow: 0 0 25px rgba(168, 85, 247, 0.24);
        }

        .ecosystem-node-cloud {
          background: radial-gradient(circle, rgba(20, 184, 166, 0.72), rgba(20, 184, 166, 0.16));
          box-shadow: 0 0 25px rgba(20, 184, 166, 0.22);
        }

        /* ---------- Education ---------- */
        .edu-card {
          display: flex;
          gap: 20px;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 26px;
          background: var(--bg-elev);
          max-width: 700px;
        }
        .edu-card-icon {
          width: 46px; height: 46px;
          border-radius: 10px;
          background: rgba(34,211,238,0.12);
          color: var(--cyan);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .edu-card h3 { font-size: 17px; margin-bottom: 8px; }
        .edu-card p { color: var(--text-muted); font-size: 14.5px; margin: 0; }

        /* ---------- CTA ---------- */
        .cta-box {
          position: relative;
          border: 1px solid var(--border-strong);
          border-radius: 20px;
          padding: 56px 40px;
          text-align: center;
          background: var(--bg-elev);
          overflow: hidden;
        }
        .cta-glow {
          position: absolute;
          width: 500px; height: 300px;
          background: radial-gradient(ellipse, rgba(34,211,238,0.14), transparent 70%);
          top: -120px; left: 50%; transform: translateX(-50%);
          pointer-events: none;
        }
        .cta-title { position: relative; font-size: clamp(26px, 4vw, 36px); margin-bottom: 14px; }
        .cta-text {
          position: relative;
          color: var(--text-muted);
          max-width: 560px;
          margin: 0 auto 30px;
          font-size: 15.5px;
        }
        .cta-actions { position: relative; display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; }

        /* ---------- Contact ---------- */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }
        .contact-info { margin-top: 30px; display: flex; flex-direction: column; gap: 14px; }
        .contact-info-row {
          display: flex; align-items: center; gap: 10px;
          font-size: 14.5px;
          color: var(--text-muted);
          transition: color 0.2s ease;
        }
        .contact-info-row:hover { color: var(--cyan); }
        .contact-info-row svg { color: var(--cyan); flex-shrink: 0; }
        .contact-info-static { cursor: default; }
        .contact-info-static:hover { color: var(--text-muted); }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 26px;
          background: var(--bg-elev);
        }
        .contact-form label { display: flex; flex-direction: column; gap: 7px; font-size: 13px; color: var(--text-muted); }
        .contact-form input, .contact-form textarea {
          font-family: var(--body);
          font-size: 14.5px;
          color: var(--text);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 11px 13px;
          resize: vertical;
          transition: border-color 0.2s ease;
        }
        .contact-form input:focus, .contact-form textarea:focus {
          border-color: var(--cyan);
          outline: none;
        }
        .contact-submit { justify-content: center; margin-top: 4px; }
        .contact-confirm { color: var(--emerald); font-size: 13.5px; text-align: center; margin: 0; }

        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; gap: 34px; }
        }

        /* ---------- Footer ---------- */
        .footer { padding: 32px 0; border-top: 1px solid var(--border); }
        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: var(--text-dim);
        }
        .footer-links { display: flex; gap: 16px; }
        .footer-links a { color: var(--text-dim); transition: color 0.2s ease; }
        .footer-links a:hover { color: var(--cyan); }
      `}</style>
      <CustomCursor />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <SkillEcosystem />
      <Projects />
      <WhatIBuild />
      <Education />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}
