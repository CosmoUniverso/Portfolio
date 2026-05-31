"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type CertificationPreviewProps = {
  fileUrl: string;
  title: string;
};

export default function CertificationPreview({ fileUrl, title }: CertificationPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isPdf = useMemo(() => fileUrl.toLowerCase().endsWith(".pdf"), [fileUrl]);

  const pdfOptions = useMemo(
    () => ({
      url: fileUrl,
      verbosity: pdfjsLib.VerbosityLevel.ERRORS,
      useWasm: false,
      useWorkerFetch: false,
    }),
    [fileUrl],
  );

  useEffect(() => {
    if (!isPdf) {
      setIsLoading(false);
      setErrorMessage(null);
      return;
    }

    let isCancelled = false;
    const renderedCanvases: HTMLCanvasElement[] = [];

    const clearContainer = () => {
      const container = containerRef.current;
      if (!container) return;
      renderedCanvases.forEach((canvas) => canvas.remove());
      renderedCanvases.length = 0;
      container.querySelectorAll("canvas").forEach((canvas) => canvas.remove());
    };

    const renderPdf = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        clearContainer();

        const loadingTask = pdfjsLib.getDocument(pdfOptions);
        const pdf = await loadingTask.promise;
        const destroyPdf = async () => {
          await (pdf as unknown as { destroy?: () => Promise<void> }).destroy?.();
        };

        if (isCancelled) {
          await destroyPdf();
          return;
        }

        const container = containerRef.current;
        if (!container) return;

        const availableWidth = Math.max(320, Math.min(container.clientWidth || 900, 900));

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (isCancelled) break;

          const page = await pdf.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });
          const scale = Math.max(1, Math.min(2, (availableWidth - 24) / baseViewport.width));
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Impossibile inizializzare il contesto del canvas.");
          }

          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          canvas.className = "certification-preview-canvas";

          await page.render({ canvasContext: context, canvas, viewport }).promise;

          if (isCancelled) {
            canvas.remove();
            break;
          }

          container.appendChild(canvas);
          renderedCanvases.push(canvas);
          page.cleanup();
        }

        await destroyPdf();
        if (!isCancelled) {
          setIsLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("PDF preview error:", error);
          setErrorMessage("Anteprima PDF non disponibile. Usa le azioni sotto per aprirlo o scaricarlo.");
          setIsLoading(false);
        }
      }
    };

    void renderPdf();

    return () => {
      isCancelled = true;
      clearContainer();
    };
  }, [isPdf, pdfOptions]);

  if (!isPdf) {
    return (
      <div className="certification-preview-image-shell">
        <img src={fileUrl} alt={title} className="certification-preview-image" />
      </div>
    );
  }

  return (
    <div className="certification-preview-shell">
      {isLoading && <p className="certification-preview-loading">Caricamento anteprima…</p>}
      {errorMessage && <p className="certification-preview-error">{errorMessage}</p>}
      <div ref={containerRef} className="certification-preview-pdf" aria-label={`Anteprima PDF ${title}`} />
    </div>
  );
}
