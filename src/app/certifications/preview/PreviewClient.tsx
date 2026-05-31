"use client";

import Link from "next/link";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import CertificationPreview from "@/components/CertificationPreview";

type PreviewClientProps = {
  fileUrl: string;
  title: string;
  issuer: string;
  year: string;
};

export default function PreviewClient({ fileUrl, title, issuer, year }: PreviewClientProps) {
  return (
    <main className="cert-preview-page">
      <div className="cert-preview-shell">
        <div className="cert-preview-topbar">
          <Link href="/#certifications" className="cert-preview-back">
            <ArrowLeft className="w-4 h-4" />
            <span>Indietro</span>
          </Link>
          <div className="cert-preview-copy">
            <p className="cert-preview-eyebrow">Anteprima certificazione</p>
            <h1>{title}</h1>
            {issuer ? <p>{issuer}{year ? ` · ${year}` : ""}</p> : null}
          </div>
          {fileUrl ? (
            <div className="cert-preview-actions">
              <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="cert-preview-action">
                <ExternalLink className="w-4 h-4" />
                <span>Apri file</span>
              </a>
              <a href={fileUrl} download className="cert-preview-action cert-preview-action-secondary">
                <Download className="w-4 h-4" />
                <span>Scarica</span>
              </a>
            </div>
          ) : null}
        </div>

        <section className="cert-preview-stage">
          {fileUrl ? (
            <CertificationPreview fileUrl={fileUrl} title={title} />
          ) : (
            <div className="cert-preview-empty">
              <p>Nessun file di certificazione disponibile.</p>
            </div>
          )}
        </section>
      </div>

      <style jsx global>{`
        .cert-preview-page {
          min-height: 100vh;
          padding: 24px;
          background: var(--hero-bg-gradient);
          color: var(--text-primary);
        }

        .cert-preview-shell {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .cert-preview-topbar {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 18px 20px;
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          background: rgba(10, 10, 18, 0.72);
          backdrop-filter: blur(18px);
        }

        .cert-preview-back,
        .cert-preview-action {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          min-height: 42px;
          padding: 0 14px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          transition: var(--transition-fast);
        }

        .cert-preview-back {
          color: var(--text-primary);
          background: var(--bg-tertiary);
          border: 1px solid var(--glass-border);
        }

        .cert-preview-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .cert-preview-action {
          color: #ffffff;
          background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%);
        }

        .cert-preview-action-secondary {
          color: var(--text-primary);
          background: var(--bg-tertiary);
          border: 1px solid var(--glass-border);
        }

        .cert-preview-copy h1 {
          font-size: clamp(1.2rem, 2vw, 2rem);
          line-height: 1.1;
          margin-bottom: 4px;
        }

        .cert-preview-eyebrow {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-cyan);
          margin-bottom: 6px;
        }

        .cert-preview-copy p:last-child {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .cert-preview-stage {
          min-height: calc(100vh - 150px);
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          background: rgba(10, 10, 18, 0.72);
          overflow: hidden;
          display: flex;
        }

        .cert-preview-stage :global(.certification-preview-shell) {
          width: 100%;
          height: 100%;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow: auto;
          padding: 16px;
          box-sizing: border-box;
        }

        .cert-preview-stage :global(.certification-preview-pdf) {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }

        .cert-preview-stage :global(.certification-preview-canvas),
        .cert-preview-stage :global(.certification-preview-image) {
          width: 100%;
          max-width: 100%;
          height: auto;
          display: block;
          background: #0b0d16;
          border-radius: 14px;
        }

        .cert-preview-stage :global(.certification-preview-image-shell) {
          width: 100%;
          flex: 1 1 auto;
          min-height: 0;
          overflow: auto;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .cert-preview-stage :global(.certification-preview-loading),
        .cert-preview-stage :global(.certification-preview-error) {
          margin-bottom: 12px;
          font-size: 0.92rem;
          color: var(--text-secondary);
        }

        .cert-preview-stage :global(.certification-preview-error) {
          color: #f59e0b;
        }

        .cert-preview-empty {
          min-height: 360px;
          display: grid;
          place-items: center;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .cert-preview-topbar {
            grid-template-columns: 1fr;
          }

          .cert-preview-actions {
            justify-content: flex-start;
          }
        }
      `}</style>
    </main>
  );
}
