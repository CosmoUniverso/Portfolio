"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Code, Cpu, Film, Tv, BarChart, Database, Mic, GitBranch, Search, Image as ImageIcon, Play, Calendar, CheckCircle2, ArrowRight, Sparkles, Brain } from "lucide-react";
import { Project } from "@/data/portfolioData";

interface CarouselProps {
  projects: Project[];
}

export default function Carousel({ projects }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0); // -1 per sinistra, 1 per destra

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 220, damping: 26 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 250 : -250,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring" as const, stiffness: 220, damping: 26 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Helper per mappare le icone Lucide associate al progetto
  const renderProjectIcon = (iconName: string, color: string) => {
    const props = { className: "w-8 h-8", style: { color } };
    switch (iconName) {
      case "code": return <Code {...props} />;
      case "cpu": return <Cpu {...props} />;
      case "video": return <Film {...props} />;
      case "tv": return <Tv {...props} />;
      case "bar-chart": return <BarChart {...props} />;
      case "database": return <Database {...props} />;
      case "mic": return <Mic {...props} />;
      case "git-branch": return <GitBranch {...props} />;
      case "search": return <Search {...props} />;
      case "film": return <Film {...props} />;
      case "image": return <ImageIcon {...props} />;
      case "play": return <Play {...props} />;
      case "sparkles": return <Sparkles {...props} />;
      case "brain": return <Brain {...props} />;
      default: return <Code {...props} />;
    }
  };

  const activeProject = projects[currentIndex];

  // Generatore di Mockup Grafico SVG/CSS basato sull'icona e sul tipo di progetto
  const renderProjectMockup = (project: Project) => {
    const glowStyle = {
      boxShadow: `0 0 40px -10px ${project.accentColor}40`,
      borderColor: `${project.accentColor}30`,
    };

    const hasMedia = !!(project.youtubeUrl || project.imageUrl);

    const getYouTubeId = (url: string) => {
      if (!url) return "";
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : "";
    };

    return (
      <div className="mockup-container" style={glowStyle}>
        {/* Intestazione stile finestra browser/editor Windows */}
        <div className="mockup-header">
          <div className="mockup-tab">
            {project.youtubeUrl ? `${project.title.toLowerCase().replace(/\s+/g, '-')}.mp4` : `${project.title.toLowerCase().replace(/\s+/g, '-')}.exe`}
          </div>
          <div className="mockup-win-controls">
            {/* Riduci a icona */}
            <span className="win-btn win-minimize">
              <svg viewBox="0 0 10 10" width="10" height="10">
                <line x1="1" y1="9" x2="9" y2="9" stroke="currentColor" strokeWidth="1" />
              </svg>
            </span>
            {/* Ingrandisci */}
            <span className="win-btn win-maximize">
              <svg viewBox="0 0 10 10" width="8" height="8">
                <rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </span>
            {/* Chiudi */}
            <span className="win-btn win-close">
              <svg viewBox="0 0 10 10" width="10" height="10">
                <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" stroke="currentColor" strokeWidth="1" />
                <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" stroke="currentColor" strokeWidth="1" />
              </svg>
            </span>
          </div>
        </div>

        {/* Visualizzazione Interattiva SVG Dinamica o Media senza bordi o Coming Soon */}
        <div className={`mockup-body ${hasMedia ? "mockup-body-media" : "mockup-body-coming-soon"}`}>
          {project.youtubeUrl ? (
            <div className="youtube-wrapper" style={{ width: "100%", height: "100%", position: "relative", background: "#000" }}>
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(project.youtubeUrl)}`}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, border: "none" }}
              />
            </div>
          ) : project.imageUrl ? (
            <div className="image-wrapper" style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
              <img
                src={project.imageUrl}
                alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ) : (
            <div className="coming-soon-mockup" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", textTransform: "none", textAlign: "center" }}>
              <div className="mockup-coming-soon-icon" style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: `${project.accentColor}12`,
                border: `1px solid ${project.accentColor}40`,
                color: project.accentColor,
                boxShadow: `0 0 20px ${project.accentColor}20`
              }}>
                <ImageIcon className="w-6 h-6 anim-pulse" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: "700", color: "var(--text-primary)" }}>Anteprima in Arrivo</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", maxWidth: "220px", lineHeight: "1.45" }}>
                  Il materiale multimediale per questo progetto è in fase di post-produzione.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="carousel-wrapper">
      {/* Contenitore slide con animazione di scorrimento */}
      <div className="carousel-slide-viewport">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="carousel-slide-content glass-panel"
          >
            {/* Sinistra: Mockup dell'applicazione */}
            <div className="slide-left-col">
              {renderProjectMockup(activeProject)}
            </div>

            {/* Destra: Dettagli del Progetto */}
            <div className="slide-right-col">
              <div className="project-badge-row">
                <span className="project-year">
                  <Calendar className="w-3.5 h-3.5 text-muted" />
                  {activeProject.year}
                </span>
                <span className="project-category-badge" style={{ backgroundColor: `${activeProject.accentColor}15`, color: activeProject.accentColor }}>
                  {renderProjectIcon(activeProject.iconName, activeProject.accentColor)}
                  <span>{activeProject.subtitle}</span>
                </span>
              </div>

              <h3 className="project-title">{activeProject.title}</h3>
              <p className="project-description">
                {activeProject.description}
                {activeProject.projectUrl && (
                  <span style={{ display: "block", marginTop: "12px" }}>
                    <a
                      href={activeProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="live-project-link"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        color: activeProject.accentColor,
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        textDecoration: "none",
                        transition: "opacity 0.2s"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      <span>Visualizza il sito ufficiale</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </span>
                )}
              </p>

              <div className="project-details-list">
                {activeProject.details.map((detail, idx) => (
                  <div key={idx} className="project-detail-item">
                    <CheckCircle2 className="w-4 h-4 detail-bullet" style={{ color: activeProject.accentColor }} />
                    <p className="detail-text">{detail}</p>
                  </div>
                ))}
              </div>

              <div className="project-tech-stack">
                <h4 className="tech-stack-title">Tecnologie & Strumenti</h4>
                <div className="tech-chips-container">
                  {activeProject.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Frecce di navigazione spostate a lato */}
      <div className="carousel-controls-arrows">
        <button className="ctrl-btn prev-btn glass-panel" onClick={handlePrev} aria-label="Progetto precedente">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="ctrl-btn next-btn glass-panel" onClick={handleNext} aria-label="Progetto successivo">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pallini indicatori centrati in basso */}
      <div className="carousel-dots-container">
        <div className="carousel-dots">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`dot-indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
              style={{
                backgroundColor: index === currentIndex ? activeProject.accentColor : "var(--carousel-dot-inactive)",
                boxShadow: index === currentIndex ? `0 0 12px ${activeProject.accentColor}` : "none"
              }}
              aria-label={`Vai al progetto ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .carousel-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
          position: relative;
        }

        .carousel-slide-viewport {
          position: relative;
          min-height: 480px;
          width: 100%;
          overflow: visible;
        }

        .carousel-slide-content {
          display: grid;
          grid-template-columns: 1.1fr 1.3fr;
          gap: 40px;
          padding: 40px !important;
          width: 100%;
          border-radius: 24px !important;
          background: var(--bg-secondary) !important;
          border: 1px solid var(--glass-border) !important;
          box-shadow: var(--glass-shadow);
          align-items: center;
        }

        @media (max-width: 968px) {
          .carousel-slide-content {
            grid-template-columns: 1fr;
            gap: 28px;
            padding: 24px !important;
          }
          .carousel-slide-viewport {
            min-height: auto;
          }
        }

        /* Mockup sinistro dell'app */
        .mockup-container {
          background: var(--bg-primary);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 4/3;
          display: flex;
          flex-direction: column;
          transition: var(--transition-smooth);
        }

        .mockup-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--bg-secondary);
          padding: 8px 16px;
          border-bottom: 1px solid var(--glass-border);
          position: relative;
        }

        .mockup-win-controls {
          display: flex;
          gap: 0;
          margin-right: -8px;
        }

        .win-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 20px;
          color: var(--text-secondary);
          transition: all 0.15s ease;
          border-radius: 2px;
        }

        .win-close:hover {
          background: #e81123 !important;
          color: #ffffff !important;
        }

        .win-btn:not(.win-close):hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
        }

        .dark .win-btn:not(.win-close):hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .mockup-tab {
          font-family: monospace;
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.5px;
        }

        .mockup-body {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          background: radial-gradient(circle at center, rgba(37, 99, 235, 0.05) 0%, transparent 70%);
        }

        .mockup-body-media {
          padding: 0 !important;
          background: #000000 !important;
          overflow: hidden;
        }

        .mockup-body-coming-soon {
          background: radial-gradient(circle at center, var(--bg-secondary) 0%, var(--bg-primary) 100%) !important;
        }

        .coming-soon-mockup {
          animation: floatSlow 6s infinite alternate ease-in-out;
        }

        @keyframes floatSlow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-6px); }
        }

        .svg-wrapper {
          width: 100%;
          max-width: 220px;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .svg-graphic {
          width: 100%;
          height: 100%;
        }

        /* SVG Animations */
        .anim-pulse {
          transform-origin: center;
          animation: svgPulse 2s infinite alternate ease-in-out;
        }

        .anim-ping {
          transform-origin: center;
          animation: svgPing 1.5s infinite ease-out;
        }

        .anim-rotate {
          transform-origin: center;
          animation: svgRotate 20s infinite linear;
        }

        @keyframes svgPulse {
          0% { transform: scale(0.9); opacity: 0.3; }
          100% { transform: scale(1.1); opacity: 0.8; }
        }

        @keyframes svgPing {
          0% { r: 1px; opacity: 1; }
          100% { r: 10px; opacity: 0; }
        }

        @keyframes svgRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Dettagli della slide (destra) */
        .slide-right-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .project-badge-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .project-year {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 500;
          background: var(--bg-tertiary);
          padding: 4px 10px;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
        }

        .project-category-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 8px;
          letter-spacing: 0.2px;
        }

        .project-title {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          font-family: var(--font-sans);
          line-height: 1.2;
          background: linear-gradient(135deg, var(--text-primary) 0%, rgba(255,255,255,0.8) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .project-description {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .project-details-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 6px 0;
        }

        .project-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .detail-bullet {
          flex-shrink: 0;
          margin-top: 3px;
        }

        .detail-text {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .project-tech-stack {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid var(--glass-border);
          padding-top: 16px;
        }

        .tech-stack-title {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .tech-chips-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tech-chip {
          font-size: 0.75rem;
          font-weight: 500;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid var(--glass-border);
        }

        /* Controlli del carosello */
        .carousel-controls-arrows {
          position: absolute;
          top: 50%;
          left: -22px;
          right: -22px;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          z-index: 10;
        }

        @media (max-width: 1024px) {
          .carousel-controls-arrows {
            position: relative;
            top: auto;
            left: auto;
            right: auto;
            transform: none;
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 16px;
            pointer-events: auto;
          }
        }

        .ctrl-btn {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50% !important;
          background: var(--bg-secondary) !important;
          color: var(--text-secondary);
          cursor: pointer;
          border: 1px solid var(--glass-border) !important;
          transition: var(--transition-fast);
          box-shadow: var(--glass-shadow);
        }

        .ctrl-btn:hover {
          color: var(--text-primary);
          border-color: var(--glass-border-active) !important;
          transform: scale(1.1);
        }

        .carousel-dots-container {
          display: flex;
          justify-content: center;
          width: 100%;
          margin-top: 16px;
        }

        .carousel-dots {
          display: flex;
          gap: 10px;
        }

        .dot-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: var(--transition-fast);
          padding: 0;
        }

        .dot-indicator:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
