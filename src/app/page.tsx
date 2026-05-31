"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code, Cpu, Film, Mail, Sparkles, Terminal, Send, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
import SoftwareGrid from "@/components/SoftwareGrid";
import { portfolioData } from "@/data/portfolioData";

export default function Home() {
  const codingData = portfolioData.find((s) => s.id === "coding")!;
  const aiCodingData = portfolioData.find((s) => s.id === "ai-coding")!;
  const photoVideoData = portfolioData.find((s) => s.id === "photo-video")!;

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({ name: "", email: "", message: "" });
      }, 5000);
    }
  };

  const handleExploreClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
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

  return (
    <div className="portfolio-app">
      {/* Barra di Navigazione Flottante */}
      <Navbar />

      {/* Sezione HERO */}
      <section id="home" className="hero-section">
        {/* Griglia decorativa di sfondo */}
        <div className="hero-grid-overlay" aria-hidden="true" />
        
        <div className="container hero-container">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="hero-title"
          >
            Costruisco il <span className="text-gradient-accent">Futuro Digitale</span> combinando Codice, IA e Design
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="hero-subtitle"
          >
            Esplora il mio percorso professionale attraverso soluzioni di sviluppo web d'eccellenza, 
            integrazioni avanzate con intelligenza artificiale generativa e produzioni audiovisive 
            di impatto cinematografico.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="hero-cta-buttons"
          >
            <a href="#coding" onClick={(e) => handleExploreClick(e, "coding")} className="btn btn-primary">
              <span>Esplora i Progetti</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="mailto:manuelprati08@gmail.com" className="btn btn-secondary">
              <Mail className="w-4 h-4" />
              <span>Contattami</span>
            </a>
          </motion.div>

          {/* Social links con SVG inline per i Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="hero-social-links"
          >
            <a href="https://github.com/MPSup3r" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Profilo GitHub">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/manuel-prati-3585613b2" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Profilo LinkedIn">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                 <rect x="2" y="9" width="4" height="12"></rect>
                 <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Sezione 1: CODING */}
      <section id="coding" className="section coding-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="section-header-block"
          >
            <div className="section-header-left">
              <div className="section-pre-title" style={{ color: codingData.accentColor }}>
                <Code className="w-4 h-4" />
                <span>01. {codingData.title.toUpperCase()}</span>
              </div>
              <h2 className="section-title">{codingData.subtitle}</h2>
            </div>
            <p className="section-description-text">{codingData.description}</p>
          </motion.div>

          {/* Carosello Progetti Coding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-content-carousel"
          >
            <Carousel projects={codingData.projects} />
          </motion.div>

          {/* Griglia Software Coding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-content-software"
          >
            <SoftwareGrid softwareList={codingData.software} accentColor={codingData.accentColor} />
          </motion.div>
        </div>
      </section>

      {/* Sezione 2: AI-CODING */}
      <section id="ai-coding" className="section ai-coding-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="section-header-block"
          >
            <div className="section-header-left">
              <div className="section-pre-title" style={{ color: aiCodingData.accentColor }}>
                <Cpu className="w-4 h-4" />
                <span>02. {aiCodingData.title.toUpperCase()}</span>
              </div>
              <h2 className="section-title">{aiCodingData.subtitle}</h2>
            </div>
            <p className="section-description-text">{aiCodingData.description}</p>
          </motion.div>

          {/* Carosello Progetti AI-Coding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-content-carousel"
          >
            <Carousel projects={aiCodingData.projects} />
          </motion.div>

          {/* Griglia Software AI-Coding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-content-software"
          >
            <SoftwareGrid softwareList={aiCodingData.software} accentColor={aiCodingData.accentColor} />
          </motion.div>
        </div>
      </section>

      {/* Sezione 3: EDITING (COMING SOON) */}
      <section id="photo-video" className="section photo-video-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="section-header-block"
          >
            <div className="section-header-left">
              <div className="section-pre-title" style={{ color: "#fbbf24" }}>
                <Film className="w-4 h-4" />
                <span>03. EDITING & PRODUZIONE CREATIVA</span>
              </div>
              <h2 className="section-title">Coming Soon</h2>
            </div>
            <p className="section-description-text">
              Nuovi contenuti in fase di elaborazione. Sto selezionando e ottimizzando le mie migliori produzioni multimediali per presentarle in una veste professionale.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="coming-soon-card glass-panel"
          >
            <div className="coming-soon-content">
              <div className="coming-soon-glow-icon">
                <Sparkles className="w-10 h-10 yellow-pulse-icon" />
              </div>
              <h3 className="coming-soon-title-main">Sezione Multimediale in Arrivo</h3>
              <p className="coming-soon-desc">
                Il montaggio di questa sezione è attualmente nella timeline di post-produzione. 
                Presto potrai esplorare i miei lavori di color grading cinematografico, 
                motion graphics animate e montaggio video professionale.
              </p>
              <div className="coming-soon-timeline">
                <div className="timeline-progress-bar">
                  <div className="timeline-progress-fill" />
                </div>
                <span className="timeline-status">Rendering in corso... 85%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sezione CONTATTI */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="section-header-block"
          >
            <div className="section-header-left">
              <div className="section-pre-title" style={{ color: "var(--accent-blue)" }}>
                <Mail className="w-4 h-4" />
                <span>04. CONTATTI</span>
              </div>
              <h2 className="section-title">Lavoriamo Insieme</h2>
            </div>
            <p className="section-description-text">{isSubmitted ? "Grazie per avermi scritto!" : "Hai un'idea da realizzare, un progetto da sviluppare o hai bisogno di una consulenza multimediale? Scrivimi!"}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="contact-card glass-panel"
          >
            <div className="contact-grid">
              {/* Colonna Sinistra: Info Contatto */}
              <div className="contact-info-col">
                <h3 className="contact-info-title">Parliamo del tuo progetto</h3>
                <p className="contact-info-desc">
                  Compila il modulo per inviarmi un messaggio diretto. Ti risponderò al più presto per analizzare insieme le tue esigenze.
                </p>
                
                <div className="contact-details">
                  <div className="contact-detail-card">
                    <Mail className="w-5 h-5 contact-icon" />
                    <div>
                      <span className="detail-label">Email</span>
                      <a href="mailto:manuelprati08@gmail.com" className="detail-value">manuelprati08@gmail.com</a>
                    </div>
                  </div>
                  <div className="contact-detail-card">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 contact-icon">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <div>
                      <span className="detail-label">Posizione</span>
                      <span className="detail-value">Casorate Primo (PV), Italia</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colonna Destra: Form */}
              <div className="contact-form-col">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="success-state"
                  >
                    <div className="success-icon-wrapper">
                      <Check className="w-8 h-8 text-gradient-accent" />
                    </div>
                    <h4 className="success-title">Messaggio Inviato!</h4>
                    <p className="success-desc">
                      Grazie per avermi contattato, {formState.name}. Ti risponderò all'indirizzo {formState.email} il prima possibile!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Nome Completo</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleFormChange}
                        placeholder="Es. Mario Rossi"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Indirizzo Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleFormChange}
                        placeholder="Es. mario.rossi@email.it"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="form-label">Messaggio</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={handleFormChange}
                        placeholder="Descrivi brevemente la tua idea o richiesta..."
                        className="form-input form-textarea"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn">
                      <span>Invia Messaggio</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-block">
        <div className="container footer-container">
          <div className="footer-logo">
            <span className="logo-initial">M</span>
            <span className="logo-text">Manuel<span className="accent-dot">.</span></span>
          </div>
          <p className="footer-motto">
            Sviluppato integrando ingegneria del software, intelligenza artificiale generativa e design digitale.
          </p>
          <div className="footer-divider" />
          <div className="footer-bottom-row">
            <span className="footer-copy">© 2026 Manuel. Tutti i diritti riservati.</span>
            <div className="footer-socials">
              <a href="https://github.com/MPSup3r" target="_blank" rel="noopener noreferrer" className="footer-social-link">GitHub</a>
              <a href="https://www.linkedin.com/in/manuel-prati-3585613b2" target="_blank" rel="noopener noreferrer" className="footer-social-link">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .portfolio-app {
          position: relative;
          width: 100%;
        }

        /* HERO SECTION */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 140px 0 80px 0;
          overflow: hidden;
          background: var(--hero-bg-gradient);
        }

        .hero-grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(var(--grid-overlay-color) 1px, transparent 1px),
                            linear-gradient(90deg, var(--grid-overlay-color) 1px, transparent 1px);
          background-size: 50px 50px;
          background-position: center center;
          mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at 50% 50%, black 30%, transparent 80%);
          z-index: 0;
          pointer-events: none;
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 1;
          gap: 24px;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -1.5px;
          font-family: var(--font-sans);
          max-width: 900px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.25rem;
            letter-spacing: -0.8px;
          }
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          max-width: 650px;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .hero-subtitle {
            font-size: 1rem;
          }
        }

        .hero-cta-buttons {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 10px;
        }

        @media (max-width: 480px) {
          .hero-cta-buttons {
            flex-direction: column;
            width: 100%;
          }
          .hero-cta-buttons .btn {
            width: 100%;
          }
        }

        .hero-social-links {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 24px;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          transition: var(--transition-fast);
          text-decoration: none;
        }

        .social-icon:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        /* SECTION STYLING */
        .section {
          border-top: 1px solid var(--glass-border);
          background-position: center top;
          transition: background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .coding-section {
          background: radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.03) 0%, transparent 60%);
        }

        .ai-coding-section {
          background: radial-gradient(circle at 90% 40%, rgba(6, 182, 212, 0.03) 0%, transparent 60%);
        }

        .photo-video-section {
          background: radial-gradient(circle at 20% 80%, rgba(251, 191, 36, 0.03) 0%, transparent 60%);
        }

        .coming-soon-card {
          border-radius: 24px !important;
          background: rgba(10, 10, 10, 0.6) !important;
          border: 1px solid rgba(251, 191, 36, 0.15) !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(251, 191, 36, 0.03);
          overflow: hidden;
          width: 100%;
          padding: 60px 40px !important;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          transition: var(--transition-smooth);
          position: relative;
        }

        .coming-soon-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(251, 191, 36, 0.04) 0%, transparent 70%);
          z-index: 0;
          pointer-events: none;
        }

        .coming-soon-card:hover {
          border-color: rgba(251, 191, 36, 0.35) !important;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), 0 0 40px rgba(251, 191, 36, 0.08);
          transform: translateY(-2px);
        }

        .coming-soon-content {
          max-width: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          position: relative;
          z-index: 1;
        }

        .coming-soon-glow-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(251, 191, 36, 0.08);
          border: 1px solid rgba(251, 191, 36, 0.3);
          box-shadow: 0 0 30px rgba(251, 191, 36, 0.1);
          color: #fbbf24;
          margin-bottom: 8px;
        }

        .yellow-pulse-icon {
          animation: yellowPulse 2s infinite alternate ease-in-out;
        }

        @keyframes yellowPulse {
          0% { transform: scale(0.95); opacity: 0.8; filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.3)); }
          100% { transform: scale(1.08); opacity: 1; filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.8)); }
        }

        .coming-soon-title-main {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.8px;
          color: #ffffff;
        }

        .coming-soon-desc {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }

        .coming-soon-timeline {
          width: 100%;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-top: 12px;
        }

        .timeline-progress-bar {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .timeline-progress-fill {
          height: 100%;
          width: 85%;
          background: linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%);
          border-radius: 3px;
          animation: fillPulse 3s infinite alternate ease-in-out;
        }

        @keyframes fillPulse {
          0% { opacity: 0.85; }
          100% { opacity: 1; }
        }

        .timeline-status {
          font-family: monospace;
          font-size: 0.8rem;
          color: #fbbf24;
          letter-spacing: 0.5px;
        }

        .section-header-block {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: flex-end;
          margin-bottom: 56px;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 32px;
          width: 100%;
        }

        @media (max-width: 868px) {
          .section-header-block {
            grid-template-columns: 1fr;
            gap: 16px;
            padding-bottom: 24px;
            align-items: flex-start;
          }
        }

        .section-header-left {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .section-pre-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .section-title {
          font-size: 2.25rem;
          font-weight: 700;
          letter-spacing: -0.8px;
          font-family: var(--font-sans);
          line-height: 1.2;
          background: linear-gradient(135deg, var(--text-primary) 30%, var(--text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 1.75rem;
          }
        }

        .section-description-text {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .section-content-carousel {
          width: 100%;
          margin-bottom: 48px;
        }

        .section-content-software {
          width: 100%;
        }

        /* FOOTER BLOCK */
        .footer-block {
          border-top: 1px solid var(--glass-border);
          background-color: var(--bg-secondary);
          padding: 60px 0 40px 0;
          position: relative;
          z-index: 10;
          transition: background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .footer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-weight: 700;
        }

        .footer-motto {
          font-size: 0.9rem;
          color: var(--text-muted);
          max-width: 500px;
          line-height: 1.5;
        }

        .footer-divider {
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.05);
          margin: 10px 0;
        }

        .footer-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          flex-wrap: wrap;
          gap: 16px;
        }

        @media (max-width: 480px) {
          .footer-bottom-row {
            flex-direction: column;
            text-align: center;
          }
        }

        .footer-copy {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .footer-socials {
          display: flex;
          gap: 20px;
        }

        .footer-social-link {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: var(--transition-fast);
        }

        .footer-social-link:hover {
          color: var(--accent-cyan);
        }

        /* CONTACT SECTION */
        .contact-section {
          background: radial-gradient(circle at 50% 90%, rgba(79, 70, 229, 0.03) 0%, transparent 60%);
        }

        .contact-card {
          border-radius: 24px !important;
          background: var(--bg-secondary) !important;
          border: 1px solid var(--glass-border) !important;
          box-shadow: var(--glass-shadow);
          overflow: hidden;
          width: 100%;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          min-height: 450px;
        }

        @media (max-width: 868px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        .contact-info-col {
          padding: 48px;
          background: var(--bg-tertiary);
          border-right: 1px solid var(--glass-border);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        @media (max-width: 868px) {
          .contact-info-col {
            border-right: none;
            border-bottom: 1px solid var(--glass-border);
            padding: 32px 24px;
          }
        }

        .contact-info-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.5px;
          color: var(--text-primary);
        }

        .contact-info-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 10px;
        }

        .contact-detail-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-radius: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--glass-border);
        }

        .contact-icon {
          color: var(--accent-blue);
          flex-shrink: 0;
        }

        .detail-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          transition: var(--transition-fast);
        }

        a.detail-value:hover {
          color: var(--accent-blue);
        }

        .contact-form-col {
          padding: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 868px) {
          .contact-form-col {
            padding: 32px 24px;
          }
        }

        .contact-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          background: var(--bg-primary);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          transition: var(--transition-fast);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--accent-blue);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .form-textarea {
          resize: vertical;
        }

        .submit-btn {
          margin-top: 10px;
          width: 100%;
        }

        /* Success state styling */
        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          max-width: 380px;
        }

        .success-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(34, 197, 94, 0.1);
          border: 2px solid var(--accent-cyan);
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.15);
        }

        .success-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.5px;
        }

        .success-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
