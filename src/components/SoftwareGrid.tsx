"use client";

import React from "react";
import { Code, GitBranch, Terminal, Layers, Cpu, Sparkles, Brain, Film, Camera, Scissors, Award } from "lucide-react";
import { Software } from "@/data/portfolioData";

interface SoftwareGridProps {
  softwareList: Software[];
  accentColor: string;
}

export default function SoftwareGrid({ softwareList, accentColor }: SoftwareGridProps) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  // Helper per selezionare l'icona Lucide adatta al software
  const getSoftwareIcon = (iconName: string, color: string) => {
    const props = { className: "w-6 h-6", style: { color } };
    switch (iconName) {
      case "code": return <Code {...props} />;
      case "git": return <GitBranch {...props} />;
      case "terminal": return <Terminal {...props} />;
      case "layers": return <Layers {...props} />;
      case "cpu": return <Cpu {...props} />;
      case "sparkles": return <Sparkles {...props} />;
      case "brain": return <Brain {...props} />;
      case "film": return <Film {...props} />;
      case "camera": return <Camera {...props} />;
      case "scissors": return <Scissors {...props} />;
      default: return <Code {...props} />;
    }
  };

  return (
    <div className="software-section-container">
      <div className="software-header">
        <Award className="w-5 h-5" style={{ color: accentColor }} />
        <h4 className="software-title">Strumenti & Tecnologie Preferite</h4>
      </div>

      <div className="software-grid">
        {softwareList.map((tool, idx) => {
          const tierClass = `tier-${tool.proficiency.toLowerCase()}`;
          const tierConfig = {
            C: {
              glow: `${accentColor}12`, tint: "rgba(255,255,255,0.02)", border: `${accentColor}18`, weight: 600, lift: "0px",
              nameColorLight: "#1f2937", nameGlowLight: "0 0 7px rgba(15, 23, 42, 0.10)", categoryColorLight: "#475569",
              nameColorDark: "#eef3f8", nameGlowDark: "0 0 6px rgba(255,255,255,0.08)", categoryColorDark: "#cbd5e1"
            },
            B: {
              glow: `${accentColor}20`, tint: `${accentColor}0d`, border: `${accentColor}28`, weight: 700, lift: "-2px",
              nameColorLight: "#5b6472", nameGlowLight: "0 0 10px rgba(15, 23, 42, 0.12)", categoryColorLight: "#64748b",
              nameColorDark: "#d8dee6", nameGlowDark: "0 0 12px rgba(216, 222, 230, 0.22)", categoryColorDark: "#cbd5e1"
            },
            A: {
              glow: `${accentColor}38`, tint: `${accentColor}18`, border: `${accentColor}42`, weight: 800, lift: "-3px",
              nameColorLight: "#9a6700", nameGlowLight: "0 0 12px rgba(154, 103, 0, 0.24), 0 0 22px rgba(15, 23, 42, 0.10)", categoryColorLight: "#b45309",
              nameColorDark: "#ffd87d", nameGlowDark: "0 0 16px rgba(255, 216, 125, 0.34)", categoryColorDark: "#fde68a"
            },
            S: {
              glow: `${accentColor}60`, tint: `${accentColor}22`, border: `${accentColor}56`, weight: 900, lift: "-5px",
              nameColorLight: "#0f5b74", nameGlowLight: "0 0 14px rgba(15, 91, 116, 0.30), 0 0 28px rgba(15, 91, 116, 0.14)", categoryColorLight: "#155e75",
              nameColorDark: "#9beeff", nameGlowDark: "0 0 18px rgba(155, 238, 255, 0.45), 0 0 34px rgba(155, 238, 255, 0.16)", categoryColorDark: "#bfdbfe"
            },
          }[tool.proficiency];

          return (
            <div 
              key={idx} 
              className={`software-card glass-panel ${tierClass}`}
              onMouseMove={handleMouseMove}
              style={{
                "--hover-glow": `${accentColor}18`,
                "--tier-glow": tierConfig.glow,
                "--tier-tint": tierConfig.tint,
                "--tier-border": tierConfig.border,
                "--tier-weight": tierConfig.weight,
                "--tier-lift": tierConfig.lift,
                "--tier-name-color-light": tierConfig.nameColorLight,
                "--tier-name-glow-light": tierConfig.nameGlowLight,
                "--tier-category-color-light": tierConfig.categoryColorLight,
                "--tier-name-color-dark": tierConfig.nameColorDark,
                "--tier-name-glow-dark": tierConfig.nameGlowDark,
                "--tier-category-color-dark": tierConfig.categoryColorDark,
              } as React.CSSProperties}
            >
              <div className="software-card-header">
                <div className="software-icon-wrapper" style={{ backgroundColor: `${accentColor}12` }}>
                  {getSoftwareIcon(tool.iconName, accentColor)}
                </div>
              </div>

              <div className="software-card-body">
                <h5 className="tool-name">{tool.name}</h5>
                <span className="tool-category">{tool.category}</span>
              </div>
              {tool.proficiency === "S" && <div className="tier-s-particles" aria-hidden />}
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        .software-section-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          margin-top: 24px;
        }

        .software-header {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 10px;
        }

        .software-title {
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: -0.2px;
          color: var(--text-primary);
        }

        .software-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          width: 100%;
        }

        .software-card {
          padding: 20px !important;
          border-radius: 16px !important;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.86)) !important;
          border: 1px solid var(--glass-border) !important;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          overflow: hidden;
          transition: var(--transition-smooth) !important;
          box-shadow: var(--glass-shadow);
          transform: translateY(var(--tier-lift, 0px));
          border-color: var(--tier-border, var(--glass-border)) !important;
          backdrop-filter: saturate(1.05) blur(14px);
        }

        .software-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            150px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
            var(--tier-tint, var(--hover-glow)),
            transparent 80%
          );
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .software-card:hover::before {
          opacity: 1;
        }

        .software-card:hover {
          transform: translateY(-4px);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(249, 250, 251, 0.92)) !important;
          box-shadow: 0 14px 34px -10px var(--tier-glow) !important;
          border-color: var(--tier-border, var(--glass-border-active)) !important;
        }

        .software-card-header {
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .software-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          transition: var(--transition-smooth);
          background: var(--bg-primary);
        }

        .software-card:hover .software-icon-wrapper {
          transform: scale(1.05) rotate(5deg);
        }

        .software-card-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: relative;
          z-index: 1;
        }

        .tool-name {
          font-size: 1rem;
          font-weight: var(--tier-weight, 600);
          color: var(--tier-name-color-light, var(--text-primary));
          letter-spacing: -0.2px;
          filter: saturate(1.14) contrast(1.05);
          text-shadow: var(--tier-name-glow-light, none);
        }

        .tool-category {
          font-size: 0.75rem;
          color: var(--tier-category-color-light, #475569);
          font-weight: 600;
          letter-spacing: 0.01em;
        }
      `}</style>

      <style jsx global>{`
        /* CBAS tier styles */
        .software-card.tier-c { transform: translateY(var(--tier-lift, 0px)); }
        .software-card.tier-b { box-shadow: 0 8px 20px -8px var(--tier-glow, rgba(0,0,0,0.06)); }
        .software-card.tier-a { box-shadow: 0 14px 28px -8px var(--tier-glow, rgba(0,0,0,0.08)); }
        .software-card.tier-s { box-shadow: 0 18px 42px -12px var(--tier-glow, rgba(0,0,0,0.12)); }

        .software-card.tier-a .tool-name { letter-spacing: -0.35px; }
        .software-card.tier-s .tool-name { letter-spacing: -0.6px; }

        .software-card.tier-a .software-icon-wrapper { box-shadow: 0 0 0 1px var(--tier-border), 0 0 18px -8px var(--tier-glow); }
        .software-card.tier-s .software-icon-wrapper { transform: scale(1.08); box-shadow: 0 8px 30px -10px var(--tier-glow), 0 0 26px -12px var(--tier-glow); }

        .dark .software-card {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03)) !important;
        }

        .dark .software-card:hover {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.045)) !important;
        }

        .dark .tool-name {
          color: var(--tier-name-color-dark, var(--text-primary));
          text-shadow: var(--tier-name-glow-dark, none);
        }

        .dark .tool-category {
          color: var(--tier-category-color-dark, var(--text-muted));
        }

        .tier-s-particles {
          pointer-events: none;
          position: absolute;
          inset: -8px;
          background-image: radial-gradient(circle at 18% 18%, rgba(15, 23, 42, 0.16) 0 1.5px, transparent 5px), radial-gradient(circle at 82% 26%, rgba(15, 23, 42, 0.12) 0 1.5px, transparent 6px), radial-gradient(circle at 72% 76%, rgba(15, 23, 42, 0.10) 0 2px, transparent 7px);
          mix-blend-mode: multiply;
          z-index: 0;
          opacity: 0.95;
          animation: subtle-pulse 4.2s ease-in-out infinite;
        }

        .dark .tier-s-particles {
          background-image: radial-gradient(circle at 18% 18%, rgba(255,255,255,0.06) 0 1.5px, transparent 5px), radial-gradient(circle at 82% 26%, rgba(255,255,255,0.05) 0 1.5px, transparent 6px), radial-gradient(circle at 72% 76%, rgba(255,255,255,0.04) 0 2px, transparent 7px);
          mix-blend-mode: screen;
          opacity: 0.72;
        }

        @keyframes subtle-pulse {
          0% { opacity: 0.6; transform: translateY(0px) scale(1); }
          50% { opacity: 0.9; transform: translateY(-2px) scale(1.02); }
          100% { opacity: 0.6; transform: translateY(0px) scale(1); }
        }

        .software-card { font-family: inherit; }
      `}</style>
    </div>
  );
}
