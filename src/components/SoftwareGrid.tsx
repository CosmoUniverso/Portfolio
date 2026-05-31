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
          return (
            <div 
              key={idx} 
              className="software-card glass-panel"
              onMouseMove={handleMouseMove}
              style={{
                "--hover-glow": `${accentColor}18`
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
          background: var(--bg-secondary) !important;
          border: 1px solid var(--glass-border) !important;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          overflow: hidden;
          transition: var(--transition-smooth) !important;
          box-shadow: var(--glass-shadow);
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
            var(--hover-glow),
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
          background: var(--bg-secondary) !important;
          box-shadow: 0 10px 24px -5px var(--hover-glow) !important;
          border-color: var(--glass-border-active) !important;
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
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
          letter-spacing: -0.2px;
        }

        .tool-category {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
