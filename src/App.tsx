import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import imgChezManu from '/kiosque.jpg';
import imgInvoicer from '/Invoicer.jpg';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  Moon,
  Sun,
  MapPin,
  Phone,
} from "lucide-react";

// ——– Types ——–
interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  cvUrl?: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  live?: string;
  code?: string;
}

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  points: string[];
}

// ---- Infos perso ----
const PROFILE: Profile = {
  name: "Luke",
  role: "Développeur FullStack",
  tagline: "Je conçois des interfaces simples, modernes et performantes en React et Next.",
  location: "Fagnières, France",
  email: "plaut.luke@gmail.com",
  phone: "+33 7 61 92 49 20",
  github: "https://github.com/Leikioh",
  linkedin: "https://www.linkedin.com/in/luke-plaut-870901210/",
  cvUrl: "/cv.pdf",
};

const projects: Project[] = [
  {
    title: "Le Kiosque Chez Manu",
    description:
      "Mon premier site Web pour une Pizzeria",
    tags: ["Html, Css, JavaScript"],
    image: imgChezManu,
    live: "https://leikioh.github.io/ChezManu/index.html",
    code: "https://github.com/Leikioh/ChezManu",
  },
  {
    title: "Invoicer",
    description:
      "App Web de création de Devis et Facturation",
    tags: ["Next.js, Typescript, Prisma"],
    image: imgInvoicer,
    live: "https://invoicer-rzrw-4bel4gysa-leikiohs-projects.vercel.app/",
    code: "https://github.com/Leikioh/invoicer",
  },
  {
    title: "E‑commerce Headless",
    description:
      "Front headless (Stripe + CMS) avec recherche, filtres, et panier persistant.",
    tags: ["Next.js", "Stripe", "CMS"],
    image:
      "https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1200&auto=format&fit=crop",
    live: "https://exemple.com/shop",
    code: "https://github.com/vous/headless-shop",
  },
];

const skills: string[] = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Git",
  "Accessibilité",
];

const experience: ExperienceItem[] = [
  {
    role: "Auto-Entrepreneur",
    company: "Luke's corp",
    period: "Acutellement",
    points: [
      "Construction d'un site Web pour une Pizzeria",
      "Projet d'école Ilaria Digital School",
      "Réalisation d'outil de facturation",
    ],
  },
  {
    role: "Directeur Adjoint",
    company: "CGR",
    period: "2021 – 2025",
    points: [
      "Exploitation de cinéma",
    ],
  },
];

// ——– Thème (clair/sombre) ——–
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    root.classList.toggle("dark", isDark);
    root.classList.add("scroll-smooth");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

const Section: React.FC<{ id: string; title: string; children: React.ReactNode }> = ({ id, title, children }) => (
  <section id={id} className="py-20">
    <div className="mx-auto max-w-6xl px-4">
      <h2 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {children}
    </div>
  </section>
);

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-600 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
    {children}
  </span>
);

const ProjectCard: React.FC<{ p: Project }> = ({ p }) => (
  <motion.a
    href={p.live || p.code || "#"}
    target="_blank"
    rel="noreferrer"
    whileHover={{ y: -4 }}
    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition dark:border-slate-800 dark:bg-slate-900"
  >
    <div className="relative aspect-[16/9] overflow-hidden">
      <img
        src={p.image}
        alt={p.title}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
    <div className="space-y-3 p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold">{p.title}</h3>
        <ExternalLink className="h-4 w-4 opacity-60" />
      </div>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {p.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
      <div className="flex items-center gap-4 pt-1">
        {p.live && (
          <a
            className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            href={p.live}
            target="_blank"
            rel="noreferrer"
          >
            Live
          </a>
        )}
        {p.code && (
          <a
            className="text-sm font-medium text-slate-600 hover:underline dark:text-slate-300"
            href={p.code}
            target="_blank"
            rel="noreferrer"
          >
            Code
          </a>
        )}
      </div>
    </div>
  </motion.a>
);

export default function App() {
  const { theme, setTheme } = useTheme();

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800 selection:bg-indigo-200/60 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100 dark:selection:bg-indigo-400/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur dark:border-slate-800/60 dark:bg-slate-950/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="flex items-center gap-3">
            {/* Avatar header remplacé par la photo */}
            <img
              src="/Luke.jpg"
              alt={PROFILE.name}
              className="h-9 w-9 rounded-xl object-cover shadow-md"
            />
            <div className="leading-tight">
              <div className="font-semibold">{PROFILE.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {PROFILE.role}
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {[
              ["À propos", "about"],
              ["Projets", "projects"],
              ["Expérience", "experience"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                {label}
              </a>
            ))}
            <div className="mx-1 h-6 w-px bg-slate-200 dark:bg-slate-800" />
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full border border-slate-200 bg-white p-2 shadow-sm transition hover:shadow dark:border-slate-700 dark:bg-slate-900"
              aria-label="Basculer le thème"
              title="Basculer le thème"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(ellipse_at_top,theme(colors.indigo.400),transparent_60%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Salut, je suis {PROFILE.name} 👋
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              {PROFILE.tagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white shadow transition hover:translate-y-[-1px] hover:shadow-md"
              >
                Voir mes projets <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> {PROFILE.location}</span>
              <a className="inline-flex items-center gap-2 hover:underline" href={`mailto:${PROFILE.email}`}><Mail className="h-4 w-4" /> {PROFILE.email}</a>
              <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> {PROFILE.phone}</span>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-500 to-purple-500 shadow-2xl dark:border-slate-800 md:h-80 md:w-80">
              
              <img
                src="/Luke.jpg"
                alt={PROFILE.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </div>
            <div className="absolute inset-x-0 -bottom-20 mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Disponible pour missions freelance et CDI. Parlons de votre projet !
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* À propos */}
      <Section id="about" title="À propos">
        <div className="grid gap-8 md:grid-cols-2">
          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Développeur frontend passionné par l’expérience utilisateur et la qualité
            logicielle. J’aime transformer des maquettes en produits concrets, rapides
            et accessibles. J’apporte un soin particulier à la sémantique, aux tests
            et aux performances.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-3 font-semibold">Compétences clés</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Projets */}
      <Section id="projects" title="Projets sélectionnés">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </Section>

      {/* Expérience */}
      <Section id="experience" title="Expérience">
        <div className="relative ml-2">
          <div className="absolute left-3 top-0 h-full w-px bg-slate-200 dark:bg-slate-800" />
          <div className="space-y-8">
            {experience.map((e, i) => (
              <div key={`${e.company}-${i}`} className="relative pl-10">
                <div className="absolute left-0 top-1 h-6 w-6 rounded-full border-4 border-white bg-indigo-600 shadow ring-1 ring-slate-200 dark:border-slate-950 dark:ring-slate-800" />
                <h3 className="text-lg font-semibold">
                  {e.role} · <span className="text-slate-500 dark:text-slate-400">{e.company}</span>
                </h3>
                <div className="mb-2 text-sm text-slate-500 dark:text-slate-400">{e.period}</div>
                <ul className="list-inside list-disc space-y-1 text-slate-600 dark:text-slate-300">
                  {e.points.map((pt, j) => (
                    <li key={`${i}-${j}`}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Contact">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-3 font-semibold">Travaillons ensemble</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Envie de collaborer, d’un devis ou simplement d’échanger ?
              Envoyez‑moi un message, je vous répondrai rapidement.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <a className="flex items-center gap-2 text-slate-700 hover:underline dark:text-slate-200" href={`mailto:${PROFILE.email}`}>
                <Mail className="h-4 w-4" /> {PROFILE.email}
              </a>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Phone className="h-4 w-4" /> {PROFILE.phone}
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <MapPin className="h-4 w-4" /> {PROFILE.location}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/70 py-10 text-sm dark:border-slate-800/60 dark:bg-slate-950/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="text-slate-600 dark:text-slate-400">
            © {year} {PROFILE.name}. Tous droits réservés.
          </div>
          <div className="flex items-center gap-3">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [sending, setSending] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const msg = String(form.get("message") || "");

    const subject = encodeURIComponent(`Contact portfolio – ${name}`);
    const body = encodeURIComponent(`${msg}

— ${name} (${email})`);
    const url = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;

    setSending(true);
    // Simule l’envoi puis ouvre le mailto
    setTimeout(() => {
      window.location.href = url;
      setSending(false);
      formEl.reset();
    }, 400);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Nom</label>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500/20 focus:ring dark:border-slate-700 dark:bg-slate-950"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500/20 focus:ring dark:border-slate-700 dark:bg-slate-950"
            placeholder="vous@exemple.com"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-indigo-500/20 focus:ring dark:border-slate-700 dark:bg-slate-950"
          placeholder="Parlez‑moi de votre idée…"
        />
      </div>
      <button
        disabled={sending}
        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white shadow transition enabled:hover:translate-y-[-1px] enabled:hover:shadow-md disabled:opacity-70"
      >
        {sending ? "Envoi…" : "Envoyer"}
      </button>
    </form>
  );
}
