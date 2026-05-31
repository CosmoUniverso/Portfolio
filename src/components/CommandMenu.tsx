"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Home, Code, Cpu, Film, Mail, Sun, Moon, ArrowRight, CornerDownLeft } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  toggleTheme: () => void;
  currentTheme: "light" | "dark";
}

export default function CommandMenu({ isOpen, onClose, toggleTheme, currentTheme }: CommandMenuProps) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (targetId: string) => {
    onClose();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 90;
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

  const commands: CommandItem[] = [
    {
      id: "nav-home",
      label: "Naviga a: Home",
      category: "Navigazione",
      icon: <Home className="w-4 h-4" />,
      action: () => handleNavClick("home"),
      shortcut: "H",
    },
    {
      id: "nav-coding",
      label: "Naviga a: Coding",
      category: "Navigazione",
      icon: <Code className="w-4 h-4" />,
      action: () => handleNavClick("coding"),
      shortcut: "C",
    },
    {
      id: "nav-ai-coding",
      label: "Naviga a: AI-Coding",
      category: "Navigazione",
      icon: <Cpu className="w-4 h-4" />,
      action: () => handleNavClick("ai-coding"),
      shortcut: "A",
    },
    {
      id: "nav-photo-video",
      label: "Naviga a: Photo & Video",
      category: "Navigazione",
      icon: <Film className="w-4 h-4" />,
      action: () => handleNavClick("photo-video"),
      shortcut: "P",
    },
    {
      id: "nav-contact",
      label: "Naviga a: Contatti",
      category: "Navigazione",
      icon: <Mail className="w-4 h-4" />,
      action: () => handleNavClick("contact"),
      shortcut: "M",
    },
    {
      id: "toggle-theme",
      label: `Attiva Tema: ${currentTheme === "light" ? "Scuro" : "Chiaro"}`,
      category: "Preferenze",
      icon: currentTheme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />,
      action: () => {
        toggleTheme();
        onClose();
      },
      shortcut: "T",
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Forza il focus sull'input all'apertura
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Gestione tastiera
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.altKey || e.metaKey || e.ctrlKey) {
        // Ignora combinazioni speciali di tasti
        return;
      } else {
        // Scorciatoie dirette a singolo tasto
        const pressedKey = e.key.toUpperCase();
        const matchingCmd = filteredCommands.find((cmd) => cmd.shortcut === pressedKey);
        if (matchingCmd) {
          e.preventDefault();
          matchingCmd.action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  // Auto scroll dell'elemento selezionato nella vista
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="cmdk-overlay-wrapper">
          {/* Backdrop con sfocatura */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cmdk-backdrop"
            onClick={onClose}
          />

          {/* Dialog del menu */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -20 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="cmdk-dialog glass-panel"
            role="dialog"
            aria-modal="true"
          >
            {/* Input di ricerca */}
            <div className="cmdk-search-box">
              <Search className="w-5 h-5 text-muted" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Cerca comandi o naviga con la tastiera..."
                className="cmdk-input"
              />
              <span className="cmdk-esc-badge">ESC</span>
            </div>

            {/* Lista dei comandi */}
            <div className="cmdk-list" ref={listRef}>
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`cmdk-item ${isSelected ? "selected" : ""}`}
                    >
                      <div className="cmdk-item-left">
                        <span className="cmdk-item-icon">{cmd.icon}</span>
                        <span className="cmdk-item-label">{cmd.label}</span>
                      </div>

                      <div className="cmdk-item-right">
                        {cmd.shortcut && (
                          <span className="cmdk-shortcut-badge">{cmd.shortcut}</span>
                        )}
                        {isSelected && (
                          <span className="cmdk-enter-indicator">
                            <CornerDownLeft className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="cmdk-no-results">
                  Nessun comando o sezione corrisponde alla ricerca.
                </div>
              )}
            </div>

            {/* Footer con suggerimenti */}
            <div className="cmdk-footer">
              <span className="cmdk-footer-tip">↑↓ per navigare</span>
              <span className="cmdk-footer-tip">ENTER per confermare</span>
              <span className="cmdk-footer-tip">Tasti H, C, A, P, M, T per attivazione rapida</span>
            </div>
          </motion.div>

          <style jsx global>{`
            .cmdk-overlay-wrapper {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 9999;
              display: flex;
              align-items: flex-start;
              justify-content: center;
              padding-top: 12vh;
            }

            .cmdk-backdrop {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgba(5, 7, 10, 0.4);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
            }

            .cmdk-dialog {
              position: relative;
              width: 100%;
              max-width: 600px;
              background: var(--bg-secondary) !important;
              border: 1px solid var(--glass-border) !important;
              box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px var(--glass-border) !important;
              border-radius: 16px !important;
              overflow: hidden;
              z-index: 10000;
              display: flex;
              flex-direction: column;
            }

            .cmdk-search-box {
              display: flex;
              align-items: center;
              padding: 16px 20px;
              border-bottom: 1px solid var(--glass-border);
              gap: 12px;
            }

            .cmdk-input {
              flex: 1;
              background: none;
              border: none;
              font-family: var(--font-sans);
              font-size: 1rem;
              color: var(--text-primary);
              outline: none;
            }

            .cmdk-input::placeholder {
              color: var(--text-muted);
            }

            .cmdk-esc-badge {
              font-size: 0.7rem;
              font-weight: 700;
              color: var(--text-muted);
              padding: 3px 6px;
              background: var(--bg-tertiary);
              border: 1px solid var(--glass-border);
              border-radius: 4px;
            }

            .cmdk-list {
              max-height: 330px;
              overflow-y: auto;
              padding: 8px;
            }

            .cmdk-item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 10px 14px;
              border-radius: 8px;
              cursor: pointer;
              transition: background-color 0.15s ease, transform 0.1s ease;
            }

            .cmdk-item.selected {
              background: var(--bg-tertiary);
            }

            .cmdk-item-left {
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .cmdk-item-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 28px;
              height: 28px;
              border-radius: 6px;
              background: var(--bg-primary);
              border: 1px solid var(--glass-border);
              color: var(--accent-blue);
              transition: all 0.2s ease;
            }

            .cmdk-item.selected .cmdk-item-icon {
              background: var(--accent-blue);
              color: #ffffff;
            }

            .cmdk-item-label {
              font-size: 0.9rem;
              font-weight: 500;
              color: var(--text-primary);
            }

            .cmdk-item-right {
              display: flex;
              align-items: center;
              gap: 10px;
            }

            .cmdk-shortcut-badge {
              font-size: 0.75rem;
              font-weight: 600;
              color: var(--text-muted);
              padding: 2px 6px;
              background: var(--bg-primary);
              border: 1px solid var(--glass-border);
              border-radius: 4px;
              min-width: 20px;
              text-align: center;
            }

            .cmdk-enter-indicator {
              color: var(--text-muted);
              display: flex;
              align-items: center;
            }

            .cmdk-no-results {
              padding: 24px;
              text-align: center;
              font-size: 0.9rem;
              color: var(--text-muted);
            }

            .cmdk-footer {
              display: flex;
              align-items: center;
              gap: 16px;
              padding: 12px 20px;
              border-top: 1px solid var(--glass-border);
              background: var(--bg-tertiary);
            }

            .cmdk-footer-tip {
              font-size: 0.7rem;
              color: var(--text-muted);
              font-weight: 500;
            }

            /* Scrollbar personalizzata per la lista cmdk */
            .cmdk-list::-webkit-scrollbar {
              width: 6px;
            }
            .cmdk-list::-webkit-scrollbar-track {
              background: transparent;
            }
            .cmdk-list::-webkit-scrollbar-thumb {
              background: var(--glass-border);
              border-radius: 3px;
            }
            .cmdk-list::-webkit-scrollbar-thumb:hover {
              background: var(--text-muted);
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}
