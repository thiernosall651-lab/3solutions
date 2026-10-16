import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

export const CONTACTS = {
  ma1: { label: "+212 696 66 12 47", url: "https://wa.me/212696661247", number: "212696661247" },
  ma2: { label: "+212 684 77 29 57", url: "https://wa.me/212684772957", number: "212684772957" },
  sn: { label: "+221 78 824 05 92", url: "https://wa.me/221788240592", number: "221788240592" },
  email: "thiernosall651@gmail.com",
  tiktok: "https://www.tiktok.com/@3swgrowth",
  instagram: "https://www.instagram.com/3sw_growth",
} as const;

export type WaKey = "ma1" | "ma2" | "sn";

const fr = {
  nav: { home: "Accueil", services: "Services", portfolio: "Réalisations", about: "À propos", contact: "Contact", cta: "Parler de mon projet", menu: "Menu" },
  meta: {
    home: { title: "3S Solutions — Sites web, CRM et IA au Sénégal, Maroc et Europe", desc: "Agence digitale : sites web, applications métier, CRM sur mesure, IA et automatisation pour les entreprises du Sénégal, du Maroc et d'Europe." },
    services: { title: "Services — Sites web, CRM et IA | 3S Solutions", desc: "Sites web et e-commerce, applications métier et CRM sur mesure, IA et automatisation : découvrez les services de 3S Solutions." },
    portfolio: { title: "Réalisations — Projets web | 3S Solutions", desc: "Découvrez des exemples de projets web réalisés par 3S Solutions au Sénégal et au Maroc." },
    about: { title: "À propos — Agence digitale Dakar & Casablanca | 3S Solutions", desc: "3S Solutions, agence digitale entre Dakar et Casablanca, accompagne les entreprises du Sénégal, du Maroc et d'Europe." },
    contact: { title: "Contact — Parlons de votre projet | 3S Solutions", desc: "Contactez 3S Solutions par WhatsApp ou e-mail pour votre site web, CRM ou projet d'automatisation IA." },
  },
  home: {
    location: "SÉNÉGAL · MAROC · EUROPE",
    title: "Sites web, CRM et automatisation IA pour les entreprises du Sénégal, du Maroc et d'Europe",
    desc: "3S Solutions aide les entreprises à renforcer leur présence en ligne, à mieux organiser leur activité et à automatiser les tâches répétitives, avec des outils simples et adaptés à leurs besoins.",
    ctaContact: "Parler de mon projet",
    ctaWa: "Écrire sur WhatsApp",
    servicesTitle: "Nos services",
    processTitle: "Notre méthode",
    steps: [
      { t: "Comprendre", d: "Nous analysons votre activité, vos objectifs et vos contraintes." },
      { t: "Concevoir", d: "Nous proposons une solution claire, adaptée à votre budget." },
      { t: "Développer et tester", d: "Nous construisons et vérifions chaque fonctionnalité." },
      { t: "Livrer et accompagner", d: "Nous mettons en ligne et restons disponibles après la livraison." },
    ],
    finalTitle: "Vous avez un projet en tête ?",
    finalDesc: "Décrivez-nous votre besoin, nous vous répondons rapidement.",
    finalCta: "Parler de mon projet",
  },
  services: {
    title: "Nos services",
    intro: "Des solutions digitales concrètes, pensées pour répondre aux besoins réels de votre entreprise.",
    needLabel: "Le besoin",
    quote: "Demander un devis",
    items: [
      { t: "Sites web et e-commerce", short: "Sites vitrines, sites d'entreprise et boutiques en ligne.", need: "Être visible en ligne, inspirer confiance et permettre à vos clients de vous trouver ou d'acheter facilement.", d: "Nous créons des sites professionnels, des sites d'entreprise et des boutiques en ligne rapides, adaptés au mobile et faciles à faire évoluer." },
      { t: "Applications métier et CRM sur mesure", short: "Outils sur mesure pour organiser et piloter votre activité.", need: "Centraliser vos clients, vos ventes et vos opérations au lieu de jongler entre carnets, tableurs et messages.", d: "Nous développons des applications métier, des CRM et des outils internes adaptés à votre façon de travailler." },
      { t: "IA et automatisation", short: "Assistants IA, workflows WhatsApp et automatisations.", need: "Gagner du temps sur les tâches répétitives : réponses aux clients, relances, saisie et suivi.", d: "Nous concevons des assistants IA, des workflows WhatsApp, des automatisations d'e-mails et de processus métier, selon vos outils et vos besoins." },
    ],
  },
  portfolio: {
    title: "Réalisations",
    intro: "Quelques exemples de projets. Les captures d'écran seront ajoutées prochainement.",
    placeholder: "Capture d'écran à ajouter",
    demo: "Démonstration",
    items: [
      { t: "Site d'entreprise — Sérigraphie", loc: "Sénégal", d: "Site web professionnel pour une entreprise de sérigraphie au Sénégal : présentation des services, réalisations et contact." },
      { t: "Site web — Salon de beauté", loc: "Casablanca, Maroc", d: "Site web pour un salon de beauté à Casablanca : prestations, ambiance du salon et prise de contact." },
    ],
  },
  about: {
    title: "Des solutions digitales pensées pour votre activité.",
    p1: "3S Solutions est une agence digitale qui opère entre Dakar et Casablanca. Nous accompagnons à distance les entreprises du Sénégal, du Maroc et d'Europe.",
    p2: "Notre approche est simple : partir de vos besoins réels pour proposer des solutions pratiques, utiles au quotidien et faciles à prendre en main.",
    valuesTitle: "Notre façon de travailler",
    values: [
      { t: "Pratique", d: "Des outils utiles, sans complexité inutile." },
      { t: "Centré sur votre activité", d: "Chaque solution répond à un besoin concret." },
      { t: "Simple et transparent", d: "Un processus clair, des échanges directs." },
    ],
    cta: "Parler de mon projet",
  },
  contact: {
    title: "Parlons de votre projet.",
    intro: "Remplissez le formulaire : il ouvrira WhatsApp avec votre message prêt à envoyer.",
    name: "Nom", company: "Entreprise", optional: "(facultatif)", service: "Service souhaité", message: "Message", wa: "Ligne WhatsApp préférée",
    services: { website: "Site web", app: "Application / CRM", ai: "Automatisation IA", other: "Autre" },
    waOpts: { ma1: "Maroc — ligne 1", ma2: "Maroc — ligne 2", sn: "Sénégal" },
    submit: "Envoyer sur WhatsApp",
    errName: "Veuillez indiquer votre nom.",
    errMessage: "Veuillez écrire un message.",
    errForm: "Veuillez corriger les champs indiqués.",
    note: "WhatsApp s'ouvrira dans un nouvel onglet. Votre message sera envoyé uniquement lorsque vous l'enverrez vous-même.",
    details: "Coordonnées",
    waMsg: { hello: "Bonjour 3S Solutions,", name: "Nom", company: "Entreprise", service: "Service", message: "Message" },
  },
  footer: { tagline: "Agence digitale — Sénégal · Maroc · Europe", contact: "Contact", follow: "Suivez-nous", rights: "Tous droits réservés.", nav: "Navigation" },
  waDefault: "Bonjour 3S Solutions, je souhaite parler de mon projet.",
  assistant: {
    open: "Parler à 3S Solutions", close: "Fermer", title: "3S Solutions",
    q1: "Bonjour ! Que souhaitez-vous ?", q2: "Dans quel pays êtes-vous ?", q3: "Avec qui voulez-vous échanger ?",
    needs: { website: "Site web", app: "Application ou CRM", ai: "Automatisation IA", other: "Autre" },
    countries: { sn: "Sénégal", ma: "Maroc", eu: "Europe" },
    lines: { ma1: "Maroc ligne 1", ma2: "Maroc ligne 2", sn: "Sénégal" },
    summary: "Récapitulatif", need: "Besoin", country: "Pays", contact: "Contact WhatsApp",
    cont: "Continuer sur WhatsApp", restart: "Recommencer",
    error: "Veuillez compléter toutes les étapes avant de continuer.",
    msg: (n: string, c: string, l: string) => `Bonjour 3S Solutions ! Je souhaite discuter de : ${n}. Mon pays : ${c}. Contact choisi : ${l}.`,
  },
};

type Dict = typeof fr;

const en: Dict = {
  nav: { home: "Home", services: "Services", portfolio: "Portfolio", about: "About", contact: "Contact", cta: "Discuss my project", menu: "Menu" },
  meta: {
    home: { title: "3S Solutions — Websites, CRM & AI in Senegal, Morocco and Europe", desc: "Digital agency: websites, business apps, custom CRM, AI and automation for businesses in Senegal, Morocco and Europe." },
    services: { title: "Services — Websites, CRM & AI | 3S Solutions", desc: "Websites and e-commerce, custom business apps and CRM, AI and automation: explore 3S Solutions services." },
    portfolio: { title: "Portfolio — Web projects | 3S Solutions", desc: "Explore examples of web projects by 3S Solutions in Senegal and Morocco." },
    about: { title: "About — Digital agency Dakar & Casablanca | 3S Solutions", desc: "3S Solutions, a digital agency between Dakar and Casablanca, supports businesses in Senegal, Morocco and Europe." },
    contact: { title: "Contact — Let's talk about your project | 3S Solutions", desc: "Contact 3S Solutions via WhatsApp or email for your website, CRM or AI automation project." },
  },
  home: {
    location: "SENEGAL · MOROCCO · EUROPE",
    title: "Websites, CRM and AI automation for businesses in Senegal, Morocco and Europe",
    desc: "3S Solutions helps businesses strengthen their online presence, organize their operations and automate repetitive tasks, with simple tools tailored to their needs.",
    ctaContact: "Discuss my project",
    ctaWa: "Message on WhatsApp",
    servicesTitle: "Our services",
    processTitle: "Our process",
    steps: [
      { t: "Understand", d: "We analyze your business, goals and constraints." },
      { t: "Design", d: "We propose a clear solution that fits your budget." },
      { t: "Build and test", d: "We build and check every feature." },
      { t: "Deliver and support", d: "We go live and stay available after delivery." },
    ],
    finalTitle: "Have a project in mind?",
    finalDesc: "Tell us what you need and we'll get back to you quickly.",
    finalCta: "Discuss my project",
  },
  services: {
    title: "Our services",
    intro: "Practical digital solutions designed around the real needs of your business.",
    needLabel: "The need",
    quote: "Request a quote",
    items: [
      { t: "Websites and e-commerce", short: "Showcase sites, business websites and online stores.", need: "Be visible online, build trust and make it easy for customers to find you or buy from you.", d: "We build professional websites, business websites and online stores that are fast, mobile-friendly and easy to grow." },
      { t: "Custom business apps and CRM", short: "Tailored tools to organize and run your business.", need: "Centralize your customers, sales and operations instead of juggling notebooks, spreadsheets and messages.", d: "We develop business applications, CRM systems and internal tools adapted to the way you work." },
      { t: "AI and automation", short: "AI assistants, WhatsApp workflows and automations.", need: "Save time on repetitive tasks: customer replies, follow-ups, data entry and tracking.", d: "We design AI assistants, WhatsApp workflows, email automation and business process automation, based on your tools and needs." },
    ],
  },
  portfolio: {
    title: "Portfolio",
    intro: "A few project examples. Screenshots will be added soon.",
    placeholder: "Screenshot to be added",
    demo: "Demo",
    items: [
      { t: "Business website — Screen printing", loc: "Senegal", d: "Professional website for a screen-printing company in Senegal: services, past work and contact." },
      { t: "Website — Beauty salon", loc: "Casablanca, Morocco", d: "Website for a beauty salon in Casablanca: treatments, salon atmosphere and contact." },
    ],
  },
  about: {
    title: "Digital solutions designed for your business.",
    p1: "3S Solutions is a digital agency operating between Dakar and Casablanca. We work remotely with businesses in Senegal, Morocco and Europe.",
    p2: "Our approach is simple: start from your real needs to deliver practical solutions that are useful every day and easy to adopt.",
    valuesTitle: "How we work",
    values: [
      { t: "Practical", d: "Useful tools, without unnecessary complexity." },
      { t: "Business-focused", d: "Every solution answers a concrete need." },
      { t: "Simple and transparent", d: "A clear process and direct communication." },
    ],
    cta: "Discuss my project",
  },
  contact: {
    title: "Let's talk about your project.",
    intro: "Fill in the form: it will open WhatsApp with your message ready to send.",
    name: "Name", company: "Company", optional: "(optional)", service: "Service needed", message: "Message", wa: "Preferred WhatsApp line",
    services: { website: "Website", app: "Application / CRM", ai: "AI automation", other: "Other" },
    waOpts: { ma1: "Morocco — line 1", ma2: "Morocco — line 2", sn: "Senegal" },
    submit: "Send via WhatsApp",
    errName: "Please enter your name.",
    errMessage: "Please write a message.",
    errForm: "Please fix the highlighted fields.",
    note: "WhatsApp will open in a new tab. Your message is only sent when you send it yourself.",
    details: "Contact details",
    waMsg: { hello: "Hello 3S Solutions,", name: "Name", company: "Company", service: "Service", message: "Message" },
  },
  footer: { tagline: "Digital agency — Senegal · Morocco · Europe", contact: "Contact", follow: "Follow us", rights: "All rights reserved.", nav: "Navigation" },
  waDefault: "Hello 3S Solutions, I'd like to discuss my project.",
  assistant: {
    open: "Talk to 3S Solutions", close: "Close", title: "3S Solutions",
    q1: "Hello! What are you looking for?", q2: "Which country are you in?", q3: "Who would you like to talk to?",
    needs: { website: "Website", app: "Application or CRM", ai: "AI automation", other: "Other" },
    countries: { sn: "Senegal", ma: "Morocco", eu: "Europe" },
    lines: { ma1: "Morocco line 1", ma2: "Morocco line 2", sn: "Senegal" },
    summary: "Summary", need: "Need", country: "Country", contact: "WhatsApp contact",
    cont: "Continue on WhatsApp", restart: "Start over",
    error: "Please complete all steps before continuing.",
    msg: (n: string, c: string, l: string) => `Hello 3S Solutions! I'd like to discuss: ${n}. My country: ${c}. Chosen contact: ${l}.`,
  },
};

export const translations: Record<Lang, Dict> = { fr, en };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangContext = createContext<Ctx>({ lang: "fr", setLang: () => {}, t: fr });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "fr") setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };
  return <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

export function usePageMeta(page: keyof Dict["meta"]) {
  const { t } = useLang();
  useEffect(() => {
    const m = t.meta[page];
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", m.desc);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", m.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", m.desc);
  }, [t, page]);
}

export function pageHead(page: keyof Dict["meta"]) {
  const m = fr.meta[page];
  return {
    meta: [
      { title: m.title },
      { name: "description", content: m.desc },
      { property: "og:title", content: m.title },
      { property: "og:description", content: m.desc },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}

export function buildWhatsAppUrl(
  wa: WaKey,
  d: { name: string; company: string; service: string; message: string },
  lang: Lang,
) {
  const m = translations[lang].contact.waMsg;
  const lines = [m.hello, "", `${m.name}: ${d.name}`];
  if (d.company) lines.push(`${m.company}: ${d.company}`);
  lines.push(`${m.service}: ${d.service}`, "", `${m.message}: ${d.message}`);
  return `https://wa.me/${CONTACTS[wa].number}?text=${encodeURIComponent(lines.join("\n"))}`;
}
