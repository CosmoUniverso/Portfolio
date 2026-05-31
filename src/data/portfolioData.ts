export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  techStack: string[];
  year: string;
  iconName: "code" | "cpu" | "video" | "tv" | "bar-chart" | "database" | "mic" | "git-branch" | "search" | "film" | "image" | "play" | "sparkles" | "brain";
  accentColor: string; // Colore per i bordi e bagliori personalizzati del progetto
  youtubeUrl?: string; // Player YouTube incorporato
  imageUrl?: string;    // Immagine screenshot di mockup
  projectUrl?: string;  // Link cliccabile al sito reale
}

export interface Software {
  name: string;
  category: string;
  proficiency: "Avanzato" | "Esperto" | "Professionale" | "Ottimo";
  iconName: "code" | "git" | "terminal" | "layers" | "cpu" | "sparkles" | "brain" | "film" | "camera" | "scissors";
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
    title: "Coding",
    subtitle: "Sviluppo Software & Ingegneria Applicativa",
    description: "Sviluppo di applicazioni desktop e sistemi interattivi basati su architetture a thread sicuri e interfacce grafiche ottimizzate. Dedico costante attenzione alla gestione degli eventi, alle prestazioni computazionali e all'ingegnerizzazione della logica applicativa pura.",
    accentColor: "var(--accent-blue)",
    highlightColor: "var(--accent-cyan)",
    projects: [
      {
        id: "cod-1",
        title: "Gioco 2D in Java",
        subtitle: "Videogioco Action-RPG Sviluppato in Autonomia",
        description: "Un'avventura indie completa nata dalla passione per il game development e cresciuta fino a diventare un progetto di team strutturato. Sviluppato interamente in puro Java (senza l'uso di motori terzi), implementa un game engine multi-threaded ad alta efficienza e algoritmi avanzati di intelligenza artificiale per i nemici.",
        details: [
          "Integrazione di un ciclo di gioco (Game Loop) asincrono a 60 FPS gestito tramite multi-threading nativo Java.",
          "Sviluppo di un sistema di rendering grafico personalizzato basato sulle librerie grafiche standard Swing e AWT per una UI interattiva.",
          "Implementazione dell'algoritmo di ricerca del cammino minimo A* (A-Star) per il pathfinding dinamico in tempo reale degli avversari.",
          "Strutturazione di un team creativo autogestito coordinato tramite Notion, dividendo lo sviluppo tra programmatori, grafici pixel-art e compositori musicali."
        ],
        techStack: ["Java", "Swing / AWT", "Eclipse IDE", "A* Pathfinding", "Notion Tooling"],
        year: "2025",
        iconName: "tv",
        accentColor: "#3e64ff",
        youtubeUrl: "https://www.youtube.com/watch?v=WclUR5FU6yE",
        projectUrl: "https://mpsup3r.github.io/capolavoro/"
      },
      {
        id: "cod-2",
        title: "Lezioni di Java & Swing GUI",
        subtitle: "Programma di Peer Tutoring e Didattica Applicata",
        description: "Ideazione e conduzione di un programma annuale di mentoring scolastico rivolto ai compagni di corso, focalizzato sulla progettazione e sullo sviluppo di interfacce utente responsive (GUI) e logiche asincrone di gestione eventi tramite librerie standard Swing.",
        details: [
          "Progettazione di una roadmap didattica progressiva per trasferire concetti di programmazione a oggetti (OOP) e programmazione asincrona ad eventi.",
          "Esercitazioni pratiche su Layout Manager complessi, pannelli grafici personalizzati e listeners di interazione utente (ActionListener, MouseListener).",
          "Affiancamento continuo nella costruzione passo-passo di applicazioni desktop complete per accelerare l'apprendimento pratico."
        ],
        techStack: ["Java", "Java Swing", "Event-Driven programming", "Layout Managers", "Didattica & Tutoring"],
        year: "2026",
        iconName: "code",
        accentColor: "#06b6d4"
      }
    ],
    software: [
      { name: "IntelliJ IDEA", category: "IDE Java", proficiency: "Esperto", iconName: "code" },
      { name: "VS Code", category: "IDE / Editor", proficiency: "Esperto", iconName: "code" },
      { name: "Git", category: "Controllo Versione", proficiency: "Esperto", iconName: "git" },
      { name: "GitHub", category: "Hosting Collaborativo", proficiency: "Esperto", iconName: "git" },
      { name: "Notion", category: "Gestione Project & Wiki", proficiency: "Ottimo", iconName: "layers" }
    ]
  },
  {
    id: "ai-coding",
    title: "AI-Coding",
    subtitle: "Integrazione di Intelligenza Artificiale & Automazione",
    description: "Sinergia perfetta tra ingegneria del software classica ed intelligenze artificiali generative. Sviluppo di agenti di automazione e sistemi di telemetria integrati con modelli di linguaggio per velocizzare i processi di controllo, telemetria e audit intelligenti.",
    accentColor: "var(--accent-cyan)",
    highlightColor: "var(--highlight-yellow)",
    projects: [
      {
        id: "ai-1",
        title: "AutoStocker",
        subtitle: "Robot Mobile Intelligente per l'Automazione Industriale",
        description: "Prototipo avanzato di robot mobile autoguidato per l'automazione e la logistica industriale sostenibile (Industria 5.0). Programmazione dell'intero ecosistema software di controllo del robot, della console gestionale web e dei protocolli di telemetria a bassa latenza.",
        details: [
          "Sviluppo dell'applicazione web gestionale per il monitoraggio telemetrico, configurazione parametri operativi e sicurezza d'accesso contro comandi non autorizzati.",
          "Integrazione dei sistemi di locomozione avanzata a ruote sdoppiate (sterzo anteriore indipendente e ruote posteriori di trazione motrice).",
          "Interfacciamento asincrono con sensoristica energetica e hardware integrato, ottimizzando i consumi in decelerazione tramite KERS e moduli solari."
        ],
        techStack: ["Next.js", "TypeScript", "Three.js / 3D Model", "Arduino Integration", "Robot Control"],
        year: "2026",
        iconName: "cpu",
        accentColor: "#fb923c",
        projectUrl: "https://autostoker.com/it"
      },
      {
        id: "ai-2",
        title: "Ecosistema Vivo",
        subtitle: "Piattaforma di Monitoraggio Ecologico & Chatbot AI",
        description: "Framework didattico di riqualificazione arborea urbana focalizzato sull'accrescimento climatico di un esemplare di Populus Alba nel Parco Dini a Milano. Co-sviluppo dell'intera WebApp di monitoraggio e dell'agente conversazionale AI collegato in tempo reale.",
        details: [
          "Realizzazione della WebApp interattiva per la visualizzazione delle misurazioni biometriche online e del sequestro cumulativo di CO₂.",
          "Integrazione di un chatbot AI dedicato ('Vivo AI') in grado di rispondere in linguaggio naturale sullo stato dell'albero e sul micro-clima.",
          "Strutturazione di una pipeline dati sicura basata su Supabase per lo storage e un relay server Node.js ospitato su Render accoppiato a un server locale della scuola."
        ],
        techStack: ["Next.js", "Supabase", "Node.js (Render)", "Vercel", "AI Chatbot API", "Biometric Telemetry"],
        year: "2026",
        iconName: "sparkles",
        accentColor: "#10b981",
        imageUrl: "/vivo_dashboard.png",
        projectUrl: "https://albero-project.vercel.app/"
      },
      {
        id: "ai-3",
        title: "Lezioni di AI",
        subtitle: "Workshop e Didattica su LLMs & Prompt Engineering",
        description: "Progettazione e conduzione di sessioni di peer-tutoring mirate a diffondere l'uso responsabile ed efficiente dell'Intelligenza Artificiale Generativa nello sviluppo di codice e nell'automazione di flussi logici complessi.",
        details: [
          "Didattica incentrata sui principi del Prompt Engineering, uso efficiente del contesto di sistema e logiche di interazione con LLM commerciali ed open source.",
          "Workshop interattivi incentrati sull'utilizzo di Cursor AI e prompt guidati per flussi accelerati di programmazione, auditing di bug e refactoring automatico.",
          "Insegnamento di strategie concrete per integrare in sicurezza le API di Claude e Gemini nello sviluppo di applicativi moderni."
        ],
        techStack: ["Cursor AI", "LLMs (Gemini / Claude)", "Prompt Engineering", "Didattica & Tutoring"],
        year: "2026",
        iconName: "brain",
        accentColor: "#f59e0b"
      }
    ],
    software: [
      { name: "VS Code", category: "IDE di Sviluppo", proficiency: "Esperto", iconName: "code" },
      { name: "Gemini API", category: "Modelli Generativi Google", proficiency: "Esperto", iconName: "brain" },
      { name: "Claude API", category: "Modelli Logici Avanzati", proficiency: "Esperto", iconName: "brain" },
      { name: "Next.js", category: "React Framework", proficiency: "Esperto", iconName: "code" },
      { name: "TypeScript", category: "Linguaggio Tipizzato", proficiency: "Esperto", iconName: "code" },
      { name: "JavaScript", category: "Linguaggio di Scripting", proficiency: "Esperto", iconName: "code" },
      { name: "HTML5", category: "Strutturazione Web", proficiency: "Esperto", iconName: "layers" },
      { name: "CSS3", category: "Stile & Layout", proficiency: "Esperto", iconName: "layers" }
    ]
  },
  {
    id: "photo-video",
    title: "Photo & Video Editing",
    subtitle: "Editing Multimediale & Produzione Creativa",
    description: "Espressione visiva e post-produzione professionale. Unisco la sensibilità artistica e il rigore tecnico per curare montaggio, color grading, design audio cinematografico e animazioni motion design che rimangono impresse.",
    accentColor: "var(--highlight-orange)",
    highlightColor: "var(--highlight-yellow)",
    projects: [],
    software: []
  }
];
