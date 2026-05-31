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
  title: "Lorenzo Ebraico | Software Developer, AI Systems & Cybersecurity",
  description: "Esplora i miei progetti e competenze nelle aree dello sviluppo software, dei sistemi AI distribuiti e della cybersecurity. Scopri il mio percorso professionale e gli strumenti che uso ogni giorno.",
  keywords: ["Software Developer", "AI Systems", "Cybersecurity", "Next.js Portfolio", "React Developer", "TypeScript", "Node.js", "Backend Developer", "Full Stack Developer"],
  authors: [{ name: "Lorenzo Ebraico" }],
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
