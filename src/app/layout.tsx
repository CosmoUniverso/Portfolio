import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manuel Portfolio | Software Developer, AI Integration & Media Editor",
  description: "Esplora i miei progetti e competenze nelle aree dello sviluppo software (Coding), dell'integrazione guidata da Intelligenza Artificiale (AI-Coding) e della post-produzione audiovisiva (Photo & Video Editing). Scopri il mio percorso professionale ed i miei strumenti preferiti.",
  keywords: ["Software Developer", "AI Developer", "AI Coding", "Video Editor", "Premiere Pro", "Next.js Portfolio", "React Developer", "DaVinci Resolve", "Full Stack Developer"],
  authors: [{ name: "Manuel" }],
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        {/* Luci ed orbs d'ambiente fissi sullo sfondo per l'effetto Cyber-Space */}
        <div className="ambient-orbs" aria-hidden="true">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
