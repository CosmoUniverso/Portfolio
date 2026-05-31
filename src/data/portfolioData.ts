export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  techStack: string[];
  year: string;
  iconName:
  | "code"
  | "git"
  | "terminal"
  | "layers"
  | "cpu"
  | "sparkles"
  | "brain"
  | "film"
  | "camera"
  | "scissors"
  | "database"
  | "tv"
  | "search";
  
  accentColor: string; // Colore per i bordi e bagliori personalizzati del progetto
  youtubeUrl?: string; // Player YouTube incorporato
  imageUrl?: string;    // Immagine screenshot di mockup
  projectUrl?: string;  // Link cliccabile al sito reale
}

export interface Software {
  name: string;
  category: string;
  proficiency: "C" | "B" | "A" | "S";
  iconName: "code" | "git" | "terminal" | "layers" | "cpu" | "sparkles" | "brain" | "film" | "camera" | "scissors" | "database" | "tv" | "search";
}

export interface SectionData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  highlightColor: string;
  projects: Project[];
  software: Software[];
}

export const portfolioData: SectionData[] = [
  {
    id: "coding",
    title: "Software Development",
    subtitle: "Programmazione, Architetture Software & Sistemi",
    description: "Focus su sviluppo software, progettazione di architetture backend, applicazioni Java e sistemi modulati. Approccio orientato alla scalabilità e alla risoluzione pratica dei problemi.",
    accentColor: "var(--accent-blue)",
    highlightColor: "var(--accent-cyan)",
    projects: [
      {
        id: "cod-1",
        title: "Gioco 2D in Java",
        subtitle: "Videogioco senza Game Engine",
        description: "Sviluppo di un videogioco in Java utilizzando solo librerie standard, con focus su OOP e game loop personalizzato.",
        details: [
          "Game loop e gestione eventi in Java",
          "Collisioni e sistemi di movimento",
          "Architettura OOP per entità e logica di gioco"
        ],
        techStack: ["Java", "Swing", "AWT", "OOP", "Git"],
        year: "2025",
        iconName: "tv",
        accentColor: "#3e64ff",
        youtubeUrl: "https://www.youtube.com/watch?v=WclUR5FU6yE",
        projectUrl: "https://mpsup3r.github.io/capolavoro/"
      },
      {
        id: "cod-2",
        title: "Peer Tutoring Java",
        subtitle: "Formazione tra studenti",
        description: "Supporto didattico su Java e programmazione orientata agli oggetti.",
        details: [
          "OOP: classi, ereditarietà, polimorfismo",
          "Debugging e problem solving",
          "Introduzione a Swing"
        ],
        techStack: ["Java", "Swing", "OOP", "Teaching"],
        year: "2026",
        iconName: "code",
        accentColor: "#06b6d4"
        ,projectUrl: ""
      }
    ],
    software: [
      { name: "Java", category: "Linguaggio Principale", proficiency: "S", iconName: "code" },
      { name: "VS Code", category: "IDE", proficiency: "S", iconName: "code" },
      { name: "Python", category: "Automazione", proficiency: "A", iconName: "code" },
      { name: "Git", category: "Version Control", proficiency: "A", iconName: "git" },
      { name: "Linux", category: "OS", proficiency: "A", iconName: "terminal" },
      { name: "SQL", category: "Database", proficiency: "B", iconName: "database" }
    ]
  },
  {
    id: "ai-systems",
    title: "AI & Distributed Systems",
    subtitle: "Automazione e Sistemi Intelligenti",
    description: "Sviluppo di sistemi software che integrano AI, automazione e architetture distribuite scalabili.",
    accentColor: "var(--accent-cyan)",
    highlightColor: "var(--highlight-yellow)",
    projects: [
      {
        id: "ai-1",
        title: "Ecosistema Vivo",
        subtitle: "Monitoraggio ambientale + AI",
        description: "Piattaforma per monitoraggio dati ambientali con integrazione AI.",
        details: [
          "Frontend e visualizzazione dati",
          "Backend e gestione dati",
          "Integrazione AI conversazionale"
        ],
        techStack: ["Next.js", "TypeScript", "Supabase", "Node.js", "AI"],
        year: "2026",
        iconName: "sparkles",
        accentColor: "#10b981",
        projectUrl: "https://albero-project.vercel.app/"
      },
      {
        id: "ai-2",
        title: "AutoStoker",
        subtitle: "Automazione Web",
        description: "Sistema di automazione per gestione contenuti e backend scalabile.",
        details: [
          "Architettura backend",
          "Automazione processi",
          "Integrazione API"
        ],
        techStack: ["Next.js", "Node.js", "TypeScript", "Automation"],
        year: "2026",
        iconName: "cpu",
        accentColor: "#fb923c",
        projectUrl: "https://autostoker.com"
      },
      {
        id: "ai-3",
        title: "TreeSite Backend",
        subtitle: "Sistemi distribuiti real-time",
        description: "Backend per comunicazione real-time e sistemi modulari.",
        details: [
          "WebSocket real-time",
          "Architettura distribuita",
          "Componenti AI backend"
        ],
        techStack: ["Node.js", "WebSocket", "TypeScript", "AI"],
        year: "2026",
        iconName: "database",
        accentColor: "#6366f1",
        projectUrl: "https://github.com/CosmoUniverso/TreeSite4BInfoBackend"
      },
      {
        id: "ai-4",
        title: "Local LLM Experiments",
        subtitle: "Ricerca su modelli locali",
        description: "Sperimentazione di LLM locali e automazione intelligente.",
        details: [
          "LLM locali su hardware consumer",
          "Pipeline di automazione",
          "Orchestrazione modelli AI"
        ],
        techStack: ["Python", "LLM", "Ollama", "AI Agents"],
        year: "2026",
        iconName: "brain",
        accentColor: "#f59e0b"
        ,
        projectUrl: ""
      }
    ],
    software: [
      { name: "Python", category: "AI", proficiency: "S", iconName: "code" },
      { name: "TypeScript", category: "Web", proficiency: "A", iconName: "code" },
      { name: "Node.js", category: "Backend", proficiency: "A", iconName: "cpu" },
      { name: "Ollama", category: "LLM Runtime", proficiency: "A", iconName: "brain" },
      { name: "Next.js", category: "Framework", proficiency: "B", iconName: "layers" },
      { name: "Supabase", category: "Backend", proficiency: "B", iconName: "database" }
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Infrastructure",
    subtitle: "Sicurezza, Networking e Sistemi Self-Hosted",
    description: "Studio di sicurezza informatica, networking e gestione di infrastrutture server personali per sviluppo e sperimentazione.",
    accentColor: "var(--highlight-orange)",
    highlightColor: "var(--accent-cyan)",
    projects: [
      {
        id: "cyb-1",
        title: "WiFi CSI Research",
        subtitle: "Analisi segnali WiFi con ESP32",
        description: "Studio del canale radio WiFi tramite ESP32 e analisi CSI.",
        details: [
          "Acquisizione dati CSI",
          "Analisi segnale radio",
          "Sperimentazioni embedded"
        ],
        techStack: ["ESP32", "WiFi CSI", "Python", "Embedded"],
        year: "2026",
        iconName: "cpu",
        accentColor: "#06b6d4"
        ,
        projectUrl: ""
      },
      {
        id: "cyb-2",
        title: "Cybersecurity Labs",
        subtitle: "Training pratico sicurezza",
        description: "Laboratori di sicurezza informatica offensiva e difensiva.",
        details: [
          "Analisi vulnerabilità",
          "Traffic analysis",
          "Pentesting basics"
        ],
        techStack: ["Linux", "Wireshark", "Networking"],
        year: "2026",
        iconName: "search",
        accentColor: "#ef4444"
        ,
        projectUrl: ""
      },
      {
        id: "cyb-3",
        title: "Infrastructure & Homelab",
        subtitle: "Server personali e sistemi self-hosted",
        description: "Gestione infrastruttura personale per sviluppo, hosting e sperimentazione.",
        details: [
          "Server Linux self-hosted",
          "SSH e gestione remota",
          "Deployment servizi",
          "Networking e sicurezza"
        ],
        techStack: ["Linux", "SSH", "Docker", "Networking", "Server Admin"],
        year: "2025",
        iconName: "database",
        accentColor: "#10b981",
        projectUrl: ""
      }
    ],
    software: [
      { name: "Linux", category: "OS", proficiency: "A", iconName: "terminal" },
      { name: "SSH", category: "Remote Access", proficiency: "A", iconName: "terminal" },
      { name: "Wireshark", category: "Network Analysis", proficiency: "B", iconName: "search" },
      { name: "ESP32", category: "Embedded", proficiency: "B", iconName: "cpu" },
      { name: "TCP/IP", category: "Networking", proficiency: "B", iconName: "cpu" },
      { name: "GitHub", category: "Collaboration", proficiency: "A", iconName: "git" }
    ]
  }
];
