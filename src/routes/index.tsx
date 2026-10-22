import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, LayoutDashboard, Bot, ArrowRight, ArrowUpRight, CheckCircle2, MessageCircle } from "lucide-react";
import { CONTACTS, pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { Reveal } from "@/components/site/Layout";
import logo from "@/assets/logo-3s.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => pageHead("home"),
  component: Index,
});

const serviceIcons = [Globe, LayoutDashboard, Bot] as const;
const robotUrl = "https://raw.githubusercontent.com/thiernosall651-lab/3s_solustions/main/src/assets/robot-mascot.png";
const team = [
  {
    name: "Thierno",
    image: "https://raw.githubusercontent.com/thiernosall651-lab/3s_solustions/main/src/assets/team-thierno.png",
    altKey: "teamAltThierno" as const,
    initials: "T",
  },
  {
    name: "Abdourahamane",
    image: "/team-abdourahamane.webp",
    altKey: "teamAltAbdourahamane" as const,
    initials: "A",
  },
] as const;

const projects = [
  {
    name: "K2B Booking",
    url: "https://k2bbooking.com/",
    domain: "k2bbooking.com",
    logoUrl: "/k2b-booking.webp",
    wordmark: "K2B",
    submark: "BOOKING",
    kind: "k2b",
  },
  {
    name: "Teranga Beauty",
    url: "https://terangabeauty.net/",
    domain: "terangabeauty.net",
    logoUrl: "https://s3s-solutions.lovable.app/__l5e/assets-v1/c944e8c8-f768-4514-a82a-89ca4d8d3922/logo-teranga-beauty.png",
    wordmark: "TERANGA",
    submark: "BEAUTY",
    kind: "teranga",
  },
  {
    name: "Les Nouveaux Jardins d’Amizmiz",
    url: "https://lesnouveauxjardinsdamizmiz.com/",
    domain: "lesnouveauxjardinsdamizmiz.com",
    logoUrl: "https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D1440%2Ch%3D756%2Cfit%3Dcrop%2Cf%3Djpeg/Aq2GkpyGwVIgbV4v/photo-2025-09-02-13-50-43-AVLxV6K2JOsDaq9v.jpg",
    wordmark: "Les Jardins",
    submark: "d’Amizmiz",
    kind: "jardins",
  },
  {
    name: "Sen Drapeaux",
    url: "https://sen-drapeau.3ssolutions.workers.dev/",
    domain: "sen-drapeau.3ssolutions.workers.dev",
    logoUrl: null,
    wordmark: "SEN",
    submark: "DRAPEAUX",
    kind: "sen",
  },
] as const;

function ProjectLogo({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-xl bg-white p-3 sm:h-28">
      <div
        data-logo-fallback
        className={`flex h-full w-full flex-col items-center justify-center gap-1 text-center ${project.logoUrl ? "hidden" : "flex"}`}
      >
        {project.kind === "sen" && (
          <span aria-hidden="true" className="mb-1 flex h-2 w-14 overflow-hidden rounded-full">
            <span className="w-1/3 bg-green-600" />
            <span className="w-1/3 bg-yellow-400" />
            <span className="w-1/3 bg-red-600" />
          </span>
        )}
        <span className={`font-display text-xl font-extrabold tracking-wide sm:text-2xl ${project.kind === "teranga" ? "text-amber-700" : project.kind === "jardins" ? "text-emerald-800" : "text-slate-900"}`}>
          {project.wordmark}
        </span>
        <span className={`text-xs font-bold tracking-[0.22em] ${project.kind === "teranga" ? "text-amber-600" : project.kind === "jardins" ? "text-emerald-700" : "text-slate-700"}`}>
          {project.submark}
        </span>
      </div>
      {project.logoUrl && (
        <img
          src={project.logoUrl}
          alt={project.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain p-3"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            const fallback = event.currentTarget.parentElement?.querySelector<HTMLElement>("[data-logo-fallback]");
            fallback?.classList.remove("hidden");
            fallback?.classList.add("flex");
          }}
        />
      )}
    </div>
  );
}


function Index() {
  const { t } = useLang();
  usePageMeta("home");
  const wa = `${CONTACTS.ma1.url}?text=${encodeURIComponent(t.waDefault)}`;

  return (
    <>
      <section className="hero-glow relative overflow-hidden">
        <div className="container-site grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">{t.home.location}</p>
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl xl:text-6xl">
              {t.home.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.home.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">{t.home.ctaContact}</Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-outline">{t.home.ctaWa}</a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-accent" />{t.home.businessTitle}</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-accent" />{t.home.personalTitle}</span>
            </div>
          </Reveal>

          <Reveal className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-primary/15 blur-2xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-glow">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-950/90 via-background to-cyan-950/30" aria-hidden="true" />
              <div className="relative p-4 sm:p-6">
                <img
                  src={robotUrl}
                  alt={t.home.robotAlt}
                  loading="eager"
                  onError={(event) => { event.currentTarget.style.display = "none"; }}
                  className="mx-auto aspect-[4/3] w-full max-w-lg object-contain transition-transform duration-700 motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
                />
              </div>
              <div className="relative border-t border-border bg-background/80 p-4 backdrop-blur sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <img src={logo.url} alt="3S Solutions" className="w-20 shrink-0 rounded-lg" loading="lazy" />
                    <div className="min-w-0">
                      <p className="font-display font-semibold">{t.home.robotLabel}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.home.robotDesc}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event("3s-open-whatsapp-assistant"))}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {t.home.helpCta}
                  </button>
                </div>
              </div>
              <div className="relative grid grid-cols-3 gap-2 border-t border-border p-3 sm:gap-3 sm:p-4">
                {t.services.items.map((service, i) => {
                  const Icon = serviceIcons[i] ?? Globe;
                  return (
                    <div key={service.t} className="min-w-0 rounded-xl border border-border bg-background/70 p-3">
                      <Icon className="size-5 text-primary" aria-hidden="true" />
                      <p className="mt-2 text-xs font-semibold leading-snug sm:text-sm">{service.t}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-site py-14 md:py-20">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">{t.home.location}</p>
            <h2 className="section-title mt-3">{t.home.servicesTitle}</h2>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {t.services.items.map((service, i) => {
            const Icon = serviceIcons[i] ?? Globe;
            return (
              <Reveal key={service.t}>
                <Link to="/services" className="card-lift group block h-full">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                    <Icon className="size-6 text-primary" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{service.t}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{service.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {t.services.quote}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-card/40" aria-labelledby="process-heading">
        <div className="container-site py-14 md:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">{t.home.location}</p>
              <h2 id="process-heading" className="mt-3 font-display text-3xl font-bold md:text-4xl">{t.home.processTitle}</h2>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.steps.map((step, index) => (
              <Reveal key={step.t}>
                <article className="h-full rounded-2xl border border-border bg-background p-5 sm:p-6">
                  <p className="font-display text-sm font-bold tracking-[0.2em] text-accent">0{index + 1}</p>
                  <h3 className="mt-4 font-display text-lg font-semibold">{step.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border" aria-labelledby="team-heading">
        <div className="container-site py-10 md:py-14">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-accent" aria-hidden="true" />
                <h2 id="team-heading" className="font-display text-2xl font-bold md:text-3xl">{t.home.teamTitle}</h2>
              </div>
              <p className="text-sm text-muted-foreground">{t.home.teamCaption}</p>
            </div>
          </Reveal>
          <div className="mx-auto mt-6 grid max-w-4xl gap-4 md:grid-cols-2">
            {team.map((member) => (
              <Reveal key={member.name}>
                <article className="group flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50 sm:gap-5 sm:p-5 motion-reduce:transition-none">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-full border-2 border-accent/70 bg-secondary sm:size-24">
                    <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-bold text-accent" aria-hidden="true">{member.initials}</span>
                    <img
                      src={member.image}
                      alt={t.home[member.altKey]}
                      loading="lazy"
                      onError={(event) => { event.currentTarget.style.display = "none"; }}
                      className="relative size-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="break-words font-display text-lg font-semibold sm:text-xl">{member.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.home.teamCaption}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/40" aria-labelledby="projects-heading">
        <div className="container-site py-14 md:py-20">
          <Reveal>
            <div className="max-w-2xl">
              <h2 id="projects-heading" className="font-display text-3xl font-bold md:text-4xl">{t.home.projectsTitle}</h2>
              <p className="mt-4 text-muted-foreground">{t.home.projectsDesc}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <Reveal key={project.url}>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background p-5 transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <ProjectLogo project={project} />
                  <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">{project.name}</h3>
                  <div className="mt-auto pt-4">
                    <p className="break-all text-xs leading-relaxed text-muted-foreground">{project.domain}</p>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm font-semibold text-accent">
                      <span>{t.home.viewProject}</span>
                      <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true" />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <div className="mt-7">
            <Link to="/realisations" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
              {t.home.projectsCta}<ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-site py-14 md:py-20" aria-labelledby="commitments-heading">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">{t.home.location}</p>
            <h2 id="commitments-heading" className="mt-3 font-display text-3xl font-bold md:text-4xl">{t.home.commitmentsTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t.home.commitmentsIntro}</p>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.commitments.map((item) => (
            <Reveal key={item.t}>
              <article className="h-full rounded-2xl border border-border bg-card p-5">
                <CheckCircle2 className="size-6 text-accent" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-site py-14 md:py-20">
        <Reveal>
          <div className="cta-panel">
            <p className="eyebrow">{t.home.location}</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">{t.home.finalTitle}</h2>
            <p className="mt-4 text-muted-foreground">{t.home.finalDesc}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="btn-primary">{t.home.finalCta}</Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-outline">{t.home.ctaWa}</a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
