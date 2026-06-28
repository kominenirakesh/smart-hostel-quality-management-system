import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ScanSearch,
  Workflow,
  BarChart3,
  GraduationCap,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowUpRight,
  Image as ImageIcon,
  ClipboardList,
  Bell,
  ListChecks,
  FileSearch,
  RefreshCcw,
  PlusSquare,
  Users,
  LineChart,
  Eye,
} from "lucide-react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./LandingPage.css";

/**
 * LandingPage
 * Public-facing entry point for the Smart Hostel Quality Management System.
 * Shares the same visual language as the Owner, Supervisor, and Student
 * dashboards: rounded cards, soft shadows, minimal borders, Inter/Plus
 * Jakarta Sans typography, and the dashboard color system.
 */

const WHY_CARDS = [
  {
    icon: ScanSearch,
    title: "AI Complaint Analysis",
    description:
      "Every complaint photo is reviewed by Gemini AI, which flags the issue type and severity before a supervisor even opens it.",
  },
  {
    icon: Workflow,
    title: "Complaint Tracking",
    description:
      "Each complaint moves through a clear lifecycle — Pending, In Progress, Resolved — so nothing sits unattended.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Owners see resolution times, recurring problem areas, and supervisor performance across every hostel, updated live.",
  },
];

const ROLE_CARDS = [
  {
    icon: GraduationCap,
    title: "Student",
    points: [
      { icon: ClipboardList, text: "Submit complaints" },
      { icon: ImageIcon, text: "Upload images" },
      { icon: Eye, text: "Track status" },
      { icon: Bell, text: "Receive updates" },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Supervisor",
    points: [
      { icon: ListChecks, text: "View complaints" },
      { icon: FileSearch, text: "Review AI analysis" },
      { icon: RefreshCcw, text: "Update complaint status" },
      { icon: CheckCircle2, text: "Resolve issues" },
    ],
  },
  {
    icon: Building2,
    title: "Owner",
    points: [
      { icon: PlusSquare, text: "Create hostels" },
      { icon: Users, text: "Assign supervisors" },
      { icon: LineChart, text: "View AI analytics" },
      { icon: Eye, text: "Monitor every hostel" },
    ],
  },
];

const TECH_STACK = [
  { label: "React", icon: "bi-bootstrap" },
  { label: "Node.js", icon: "bi-hexagon" },
  { label: "Express.js", icon: "bi-server" },
  { label: "MongoDB", icon: "bi-database" },
  { label: "JWT", icon: "bi-shield-lock" },
  { label: "Cloudinary", icon: "bi-cloud-arrow-up" },
  { label: "Gemini AI", icon: "bi-stars" },
  { label: "Axios", icon: "bi-arrow-left-right" },
  { label: "Bootstrap Icons", icon: "bi-grid-3x3-gap" },
  { label: "Lucide React", icon: "bi-feather" },
];

/** Adds a "revealed" class to elements once they enter the viewport. */
function useScrollReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const targets = root.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

/** Adds/removes a "scrolled" class on the navbar based on scroll position. */
function useStickyNavShadow(navRef) {
  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 8) {
        navRef.current.classList.add("is-scrolled");
      } else {
        navRef.current.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [navRef]);
}

export default function LandingPage() {
  const navRef = useRef(null);
  const containerRef = useScrollReveal();
  useStickyNavShadow(navRef);

  return (
    <div className="landing" ref={containerRef}>
      {/* ---------- Navbar ---------- */}
      <header className="landing-nav" ref={navRef}>
        <div className="landing-nav__inner">
          <div className="landing-nav__brand">
            <span className="landing-nav__logo">
              <Building2 size={20} strokeWidth={2.25} />
            </span>
            <div className="landing-nav__brand-text">
              <span className="landing-nav__brand-name">Smart Hostel</span>
              <span className="landing-nav__brand-sub">
                Quality Management System
              </span>
            </div>
          </div>

          <nav className="landing-nav__actions" aria-label="Account actions">
            <Link to="/login" className="btnnn  btn--lg btnn">
              Log in
            </Link>
            <Link to="/register" className="btnnn btnn">
              Create account
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section className="hero">
          <div className="hero__content" data-reveal>
            <span className="eyebrow">Smart Hostel Quality Management System</span>
            <h1 className="hero__title">
              Smarter complaint management,
              <br />
              powered by AI.
            </h1>
            <p className="hero__description">
              Students report issues with a photo, Gemini AI reads and
              classifies each one instantly, and supervisors resolve them
              before they become repeat complaints. Owners watch it all
              happen across every hostel from a single dashboard.
            </p>
            {/* <div className="hero__actions">
              <Link to="/login" className="btn btn--primary btn--lg">
                Log in
              </Link>
              <Link to="/register" className="btn btn--secondary btn--lg">
                Create account
              </Link>
            </div> */}
          </div>

          <div className="hero__preview" data-reveal>
            <div className="preview-card">
              <div className="preview-card__header">
                <span className="preview-card__title">Hostel Overview</span>
                <span className="preview-card__badge">Live</span>
              </div>

              <div className="preview-stats">
                <div className="preview-stat">
                  <span className="preview-stat__label">Total complaints</span>
                  <span className="preview-stat__value">128</span>
                  <span className="preview-stat__delta preview-stat__delta--up">
                    <ArrowUpRight size={14} /> 12 this week
                  </span>
                </div>
                <div className="preview-stat">
                  <span className="preview-stat__label">Resolved</span>
                  <span className="preview-stat__value preview-stat__value--success">
                    104
                  </span>
                  <span className="preview-stat__delta">81% resolution rate</span>
                </div>
                <div className="preview-stat">
                  <span className="preview-stat__label">Pending</span>
                  <span className="preview-stat__value preview-stat__value--warning">
                    18
                  </span>
                  <span className="preview-stat__delta">Avg. 6h response</span>
                </div>
                <div className="preview-stat">
                  <span className="preview-stat__label">Active hostels</span>
                  <span className="preview-stat__value">6</span>
                  <span className="preview-stat__delta">3 supervisors online</span>
                </div>
              </div>

              <div className="preview-chart" aria-hidden="true">
                <div className="preview-chart__bars">
                  <span style={{ height: "40%" }} />
                  <span style={{ height: "65%" }} />
                  <span style={{ height: "50%" }} />
                  <span style={{ height: "80%" }} />
                  <span style={{ height: "60%" }} />
                  <span style={{ height: "90%" }} />
                  <span style={{ height: "70%" }} />
                </div>
                <span className="preview-chart__label">
                  Complaints resolved · last 7 days
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Why Smart Hostel ---------- */}
        <section className="section why" id="why">
          <div className="section__header" data-reveal>
            <span className="eyebrow">Why Smart Hostel</span>
            <h2 className="section__title">
              Built for how hostels actually run
            </h2>
          </div>

          <div className="grid grid--3">
            {WHY_CARDS.map(({ icon: Icon, title, description }) => (
              <article className="card card--feature" data-reveal key={title}>
                <span className="card__icon">
                  <Icon size={22} strokeWidth={2} />
                </span>
                <h3 className="card__title">{title}</h3>
                <p className="card__text">{description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Platform Roles ---------- */}
        <section className="section roles" id="roles">
          <div className="section__header" data-reveal>
            <span className="eyebrow">Platform Roles</span>
            <h2 className="section__title">One platform, three perspectives</h2>
          </div>

          <div className="grid grid--3">
            {ROLE_CARDS.map(({ icon: Icon, title, points }) => (
              <article className="card card--role" data-reveal key={title}>
                <span className="card__icon card__icon--role">
                  <Icon size={22} strokeWidth={2} />
                </span>
                <h3 className="card__title">{title}</h3>
                <ul className="card__list">
                  {points.map(({ icon: PointIcon, text }) => (
                    <li key={text}>
                      <PointIcon size={16} strokeWidth={2} />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Technology Stack ---------- */}
        <section className="section stack" id="stack">
          <div className="section__header" data-reveal>
            <span className="eyebrow">Technology Stack</span>
            <h2 className="section__title">Built on a reliable foundation</h2>
          </div>

          <div className="badge-row" data-reveal>
            {TECH_STACK.map(({ label, icon }) => (
              <span className="tech-badge" key={label}>
                <i className={`bi ${icon}`} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* ---------- Call To Action ---------- */}
        <section className="section cta-section">
          <div className="cta-card" data-reveal>
            <h2 className="cta-card__title">Ready to improve hostel quality?</h2>
            <p className="cta-card__text">
              Join Smart Hostel today and bring every complaint, supervisor,
              and hostel into one connected view.
            </p>
            <div className="cta-card__actions">
              <Link to="/login" className="btnnn">
                Log in
              </Link>
              <Link to="/register" className="btnnn">
                Create account
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="landing-footer">
        <div className="landing-footer__inner">
          <div className="landing-footer__brand">
            <span className="landing-nav__logo">
              <Building2 size={18} strokeWidth={2.25} />
            </span>
            <span className="landing-nav__brand-name">Smart Hostel</span>
          </div>

          {/* <nav className="landing-footer__links" aria-label="Footer">
            <a href="#why">About</a>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav> */}

          <p className="landing-footer__copy">
            © Rakesh Kominei 2026 Smart Hostel Quality Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}