import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { PageHero, Reveal } from "@/components/site/Layout";

export const Route = createFileRoute("/realisations")({
  head: () => pageHead("portfolio"),
  component: Portfolio,
});

const projectLinks = [
  {
    name: "K2B Booking",
    url: "https://k2bbooking.com/",
    logoUrl: "/k2b-booking.webp",
    wordmark: "K2B",
    submark: "BOOKING",
    kind: "k2b",
  },
  {
    name: "Teranga Beauty",
    url: "https://terangabeauty.net/",
    logoUrl: null,
    wordmark: "TERANGA",
    submark: "BEAUTY",
    kind: "teranga",
  },
  {
    name: "Les Nouveaux Jardins d’Amizmiz",
    url: "https://lesnouveauxjardinsdamizmiz.com/",
    logoUrl: "https://assets.zyrosite.com/cdn-cgi/image/format%3Dauto%2Cw%3D1440%2Ch%3D756%2Cfit%3Dcrop%2Cf%3Djpeg/Aq2GkpyGwVIgbV4v/photo-2025-09-02-13-50-43-AVLxV6K2JOsDaq9v.jpg",
    wordmark: "Les Jardins",
    submark: "d’Amizmiz",
    kind: "jardins",
  },
  {
    name: "Sen Drapeaux",
    url: "https://sen-drapeau.3ssolutions.workers.dev/",
    logoUrl: null,
    wordmark: "SEN",
    submark: "DRAPEAUX",
    kind: "sen",
  },
] as const;

function PortfolioLogo({ project }: { project: (typeof projectLinks)[number] }) {
  return (
    <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl bg-white p-3 sm:h-32">
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

function Portfolio() {
  const { t } = useLang();
  usePageMeta("portfolio");
  return (
    <>
      <PageHero title={t.portfolio.title} intro={t.portfolio.intro} />
      <section className="container-site grid gap-5 pb-12 sm:grid-cols-2 lg:grid-cols-4">
        {t.portfolio.items.map((p, index) => {
          const project = projectLinks[index];
          if (!project) return null;
          return (
            <Reveal key={project.url}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-4 transition-colors hover:border-accent/60 sm:p-5">
                <PortfolioLogo project={project} />
                <h2 className="mt-4 font-display text-lg font-semibold leading-snug">{p.t}</h2>
                <p className="mt-1 text-sm text-accent">{p.loc}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-between gap-3 rounded-full border border-accent/40 px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label={`${t.portfolio.viewSite}: ${project.name}`}
                >
                  <span>{t.portfolio.viewSite}</span>
                  <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          );
        })}
      </section>
    </>
  );
}
