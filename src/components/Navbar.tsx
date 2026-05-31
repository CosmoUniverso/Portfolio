"use client";

import React, { useState, useEffect } from "react";
import { Code, Cpu, Film, Home, Menu, X, Sun, Moon, Search } from "lucide-react";
import CommandMenu from "./CommandMenu";

interface NavItem {
  label: string;
  targetId: string;
  icon: React.ReactNode;
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  // Ascolta la scorciatoia globale ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Inizializza il tema da localStorage o imposta light come default, migrando vecchie impostazioni dark
  useEffect(() => {
    const migrated = localStorage.getItem("theme_migrated_v2");
    let initialTheme: "light" | "dark" = "light";
    
    if (!migrated) {
      // Forza il tema chiaro di default per questa nuova versione
      localStorage.setItem("theme", "light");
      localStorage.setItem("theme_migrated_v2", "true");
      initialTheme = "light";
    } else {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      initialTheme = savedTheme || "light";
    }
    
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems: NavItem[] = [
    { label: "Home", targetId: "home", icon: <Home className="w-4 h-4" /> },
    { label: "Coding", targetId: "coding", icon: <Code className="w-4 h-4" /> },
    { label: "AI-Coding", targetId: "ai-coding", icon: <Cpu className="w-4 h-4" /> },
    { label: "Photo & Video", targetId: "photo-video", icon: <Film className="w-4 h-4" /> },
  ];

  // Rileva lo scorrimento per aggiungere un'ombra o un effetto più marcato alla navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer per rilevare quale sezione è attiva a schermo
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Rileva quando la sezione occupa la parte centrale dello schermo
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Osserva le sezioni
    const sections = ["home", "coding", "ai-coding", "photo-video"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 90; // Offset per la navbar fissa
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container container glass-panel">
        <a href="#home" onClick={(e) => handleNavClick(e, "home")} className="navbar-logo">
          <span className="logo-initial">M</span>
          <span className="logo-text">Manuel<span className="accent-dot">.</span></span>
        </a>

        {/* Menu di Navigazione Desktop */}
        <nav className="navbar-desktop">
          {navItems.map((item) => (
            <a
              key={item.targetId}
              href={`#${item.targetId}`}
              onClick={(e) => handleNavClick(e, item.targetId)}
              className={`nav-link ${activeSection === item.targetId ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
              {activeSection === item.targetId && (
                <span className="active-indicator" />
              )}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          {/* Pulsante Command Menu */}
          <button
            className="cmd-menu-btn"
            onClick={() => setIsCmdOpen(true)}
            title="Apri menu dei comandi (⌘K)"
            aria-label="Apri menu di comando"
          >
            <Search className="w-4 h-4" />
            <span className="cmd-menu-btn-badge">⌘K</span>
          </button>

          {/* Pulsante Selettore Tema */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Attiva tema ${theme === "light" ? "scuro" : "chiaro"}`}
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          {/* Pulsante Menu Mobile */}
          <button
            className="navbar-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu di navigazione"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu di Navigazione Mobile (Overlay) */}
      <div className={`navbar-mobile-overlay ${isMobileMenuOpen ? "open" : ""}`}>
        <nav className="navbar-mobile glass-panel">
          {navItems.map((item) => (
            <a
              key={item.targetId}
              href={`#${item.targetId}`}
              onClick={(e) => handleNavClick(e, item.targetId)}
              className={`mobile-nav-link ${activeSection === item.targetId ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      <CommandMenu
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        toggleTheme={toggleTheme}
        currentTheme={theme}
      />

      <style jsx global>{`
        .navbar-wrapper {
          position: fixed;
          top: 20px;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: var(--transition-smooth);
          padding: 0 20px;
        }

        .navbar-scrolled {
          top: 10px;
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
          padding: 0 24px !important;
          max-width: var(--max-width);
          margin: 0 auto;
          border-radius: 30px !important;
          background: var(--glass-bg) !important;
          border: 1px solid var(--glass-border) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: var(--glass-shadow);
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 700;
          font-family: var(--font-sans);
          font-size: 1.25rem;
          letter-spacing: -0.5px;
        }

        .logo-initial {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%);
          color: white;
          font-size: 1rem;
          font-weight: 800;
        }

        .logo-text {
          font-size: 1.2rem;
          font-weight: 700;
        }

        .accent-dot {
          color: var(--accent-cyan);
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }

        .navbar-desktop {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 12px;
          transition: var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.04);
        }

        .nav-link.active {
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.06);
        }

        .active-indicator {
          position: absolute;
          bottom: -2px;
          left: 16px;
          right: 16px;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-blue) 0%, var(--accent-cyan) 100%);
          border-radius: 2px;
          box-shadow: 0 1px 8px rgba(6, 182, 212, 0.4);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cmd-menu-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 8px;
          transition: var(--transition-fast);
          height: 36px;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.02);
        }

        .cmd-menu-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--glass-border-active);
        }

        .cmd-menu-btn-badge {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          padding: 2px 5px;
          background: var(--bg-tertiary);
          border: 1px solid var(--glass-border);
          border-radius: 4px;
          font-family: var(--font-sans);
        }

        .theme-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 6px;
          border-radius: 50%;
          transition: var(--transition-fast);
          width: 36px;
          height: 36px;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.02);
        }

        .theme-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: var(--glass-border-active);
          transform: scale(1.05);
        }

        .navbar-toggle-btn {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          transition: var(--transition-fast);
          border: 1px solid var(--glass-border);
        }

        .navbar-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--glass-border-active);
        }

        /* Mobile Menu Overlay styling */
        .navbar-mobile-overlay {
          position: fixed;
          top: 90px;
          left: 0;
          width: 100%;
          padding: 0 20px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: var(--transition-smooth);
        }

        .navbar-mobile-overlay.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .navbar-mobile {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px !important;
          border-radius: 20px !important;
          background: var(--bg-secondary) !important;
          border: 1px solid var(--glass-border) !important;
          box-shadow: var(--glass-shadow);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          border-radius: 12px;
          transition: var(--transition-fast);
        }

        .mobile-nav-link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .mobile-nav-link.active {
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.08);
          border-left: 3px solid var(--accent-cyan);
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        @media (max-width: 768px) {
          .navbar-desktop {
            display: none;
          }
          
          .navbar-toggle-btn {
            display: flex;
            align-items: center;
          }
        }
      `}</style>
    </header>
  );
}
