export type SpecRow = { key: string; value: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  status: string;
  role: string;
  stack: string[];
  spec: SpecRow[];
  problem: string;
  approach: string[];
  metrics?: { label: string; value: string }[];
  outcome: string;
  links?: { label: string; href: string }[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "panda-letter",
    name: "Panda Letter",
    tagline: "A private letters and memory-timeline app for couples and personal journaling — built to feel like a keepsake, not a feed.",
    status: "In development · Android",
    role: "Solo developer — architecture, product design, implementation",
    stack: [
      "Kotlin",
      "Jetpack Compose",
      "Material 3",
      "Clean Architecture",
      "Hilt",
      "Room + SQLCipher",
      "Firebase (Auth, Firestore, Storage, Functions, FCM)",
      "WorkManager",
      "Coroutines/Flow",
    ],
    spec: [
      { key: "type", value: "Native Android, multi-module" },
      { key: "layers", value: "presentation → domain ← data" },
      { key: "pattern", value: "MVVM, immutable UiState" },
      { key: "sync", value: "Offline-first, Room source of truth" },
    ],
    problem:
      "The original web version of Panda Letter worked for exactly one relationship, with no accounts and no audience — the entire trust model was 'nobody else has the link.' Rebuilding it as a public Android app meant scaling that intimacy to many users without turning it into a social feed, a dating app, or a scrapbook with ads.",
    approach: [
      "Designed a Clean Architecture split into :core:* and :feature:* Gradle modules (auth, letters, memories, timeline, search, sharing, settings, growingtogether) so feature modules never depend on each other — a solo maintainer can touch one feature eighteen months from now without re-reading the whole codebase.",
      "Room (encrypted with SQLCipher) is the single source of truth for every screen; Firestore sync runs entirely through WorkManager so uploads survive process death and never block the UI.",
      "Wrote a full Software Design Document before writing code — architecture rationale, data model, security model, and a 16-section spec covering everything from Firestore rules testing to phased delivery — treating a personal project with the same rigor as production software.",
      "Designed 'Growing Together', a shared-commitments feature, around an explicit anti-pattern list: no streaks as the primary metric, no plain done/not-done checkbox, no public activity feed — a missed day is recorded as one of four states (Completed/Skipped/Couldn't today/Pending) so it's never presented as failure.",
      "Enforced authorization with Firestore and Storage Security Rules rather than client-side checks alone, with a passing and a failing test required for every new rule.",
    ],
    outcome:
      "A modular, offline-first Android app with a design system carried over deliberately from the original web app (soft palette, serif display type for titles, gentle motion) rather than a generic Material reskin — currently in active development, phased deliberately so the MVP stays dogfoodable before any feature beyond it ships.",
    links: [],
    featured: true,
  },
  {
    slug: "scanify",
    name: "Scanify",
    tagline: "An Android app that upscales low-resolution photos using a cloud-hosted Real-ESRGAN model — built and formally evaluated as a final-year engineering project.",
    status: "Complete · Major project",
    role: "System design, Android client, evaluation",
    stack: [
      "Kotlin",
      "CameraX",
      "Jetpack",
      "Firebase (Auth, Crashlytics)",
      "OpenCV",
      "Flask",
      "Real-ESRGAN",
      "Python",
    ],
    spec: [
      { key: "architecture", value: "3-tier: client → API → model" },
      { key: "model", value: "Real-ESRGAN (GAN super-resolution)" },
      { key: "inference", value: "Cloud-hosted, Flask API" },
      { key: "evaluated", value: "20 users, SUS + task analysis" },
    ],
    problem:
      "High-quality image upscaling is either a technical desktop tool (Photoshop-grade, but requires expertise and horsepower) or a simplified mobile app with limited enhancement capability. Scanify's brief was to put state-of-the-art GAN-based super-resolution — normally a heavy neural network — inside a phone-friendly app without pretending the phone itself does the inference.",
    approach: [
      "Built a three-tier system: a native Kotlin/CameraX Android client, a Flask API server handling auth and request orchestration, and a Real-ESRGAN model served from a cloud GPU environment — decoupling UI, application logic, and neural processing into independently replaceable layers.",
      "Investigated and benchmarked traditional interpolation (bicubic, Lanczos3), classic CNN super-resolution, and GAN-based approaches before selecting Real-ESRGAN for its degradation modeling (handles blur, noise, and compression artifacts simultaneously, not just upscaling).",
      "Profiled the pipeline across hardware configurations (including batched runs on Tesla T4 GPUs) and tuned tiling to keep memory use bounded on high-resolution inputs.",
      "Ran a formal usability study — System Usability Scale questionnaire, task-completion analysis, and think-aloud protocol across 20 participants — rather than shipping on intuition.",
      "Benchmarked the finished system head-to-head against Adobe Photoshop's Super Resolution, Remini, Let's Enhance, and Lanczos3 interpolation on quality, speed, and cost.",
    ],
    metrics: [
      { label: "SUS usability score", value: "81.3 / 100 — top 10% of mobile apps" },
      { label: "Task completion (unassisted)", value: "92%" },
      { label: "First-time-user completion", value: "88%" },
      { label: "Quality vs. commercial tools", value: "2nd only to Photoshop, ahead of Remini & Let's Enhance" },
      { label: "Processing vs. desktop software", value: "40–60% faster when network is favorable" },
    ],
    outcome:
      "A working mobile-cloud image enhancement system with quality competitive with commercial desktop software and measured usability in the top decile of mobile apps — documented end-to-end in a 99-page technical report covering requirements, architecture, algorithm selection, implementation, and formal evaluation.",
    links: [],
    featured: true,
  },
  {
    slug: "instagram-clone",
    name: "Instagram Clone",
    tagline: "A feature-complete social app clone — auth, feed, likes, comments, follow graph, and search.",
    status: "Complete · Personal project",
    role: "Solo developer",
    stack: ["Kotlin", "Jetpack Compose", "Firebase", "MVVM"],
    spec: [
      { key: "pattern", value: "MVVM" },
      { key: "backend", value: "Firebase Auth + Firestore" },
    ],
    problem:
      "A from-scratch build of a full social app's core mechanics, to prove out Compose + Firebase + MVVM on a feature set with real state complexity: auth, a following graph, and a live feed.",
    approach: [
      "Implemented email/password auth, profile editing, photo posting with captions, a chronological feed, likes and comments, a follow/unfollow system, and username search.",
      "Structured the app around MVVM with Firestore as the backing store for posts, profiles, and the social graph.",
    ],
    outcome: "A complete, working clone covering the core interaction loop of a social app end-to-end.",
    links: [{ label: "GitHub", href: "https://github.com/unon4all/Instagram-Clone" }],
    featured: false,
  },
  {
    slug: "distance-tracker",
    name: "Distance Tracker App",
    tagline: "Real-time background location tracking with live distance calculation on Google Maps.",
    status: "Complete · Personal project",
    role: "Solo developer",
    stack: ["Kotlin", "Google Maps SDK", "Android Location Services"],
    spec: [
      { key: "tracking", value: "Background location updates" },
      { key: "map", value: "Google Maps SDK" },
    ],
    problem: "Track a user's route and cumulative distance in the background — without keeping the app in the foreground or draining the battery pointlessly.",
    approach: [
      "Built continuous background location tracking with the Google Maps SDK for Android.",
      "Implemented real-time distance calculation and route rendering as the user moves.",
    ],
    outcome: "A working distance-tracker with a live map interface and accurate route/distance display.",
    links: [{ label: "GitHub", href: "https://github.com/unon4all/GoogleMapsKotlin-Project" }],
    featured: false,
  },
  {
    slug: "to-do-app",
    name: "To-Do App",
    tagline: "A local-first task manager built to demonstrate clean MVVM and Room persistence.",
    status: "Complete · Personal project",
    role: "Solo developer",
    stack: ["Kotlin", "Jetpack Compose", "MVVM", "Room"],
    spec: [
      { key: "pattern", value: "MVVM" },
      { key: "storage", value: "Room (local)" },
    ],
    problem: "A deliberately small scope to get the fundamentals right: add/edit/delete/complete tasks with a clean separation of concerns.",
    approach: [
      "Built with Jetpack Compose for the UI and MVVM for state management.",
      "Persisted all tasks locally via Room so the app works fully offline.",
    ],
    outcome: "A clean, well-architected reference implementation of the MVVM + Room pattern.",
    links: [{ label: "GitHub", href: "https://github.com/unon4all/To-Do-App" }],
    featured: false,
  },
];
