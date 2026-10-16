import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, LayoutDashboard, Bot } from "lucide-react";
import { pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { PageHero, Reveal } from "@/components/site/Layout";

export const Route = createFileRoute("/services")({
  head: () => pageHead("services"),
  component: Services,
});

const icons = [Globe, LayoutDashboard, Bot] as const;

function Services() {
  const { t } = useLang();
  usePageMeta("services");
  return (
    <>
      <PageHero title={t.services.title} intro={t.services.intro} />
      <section className="container-site grid gap-6">
        {t.services.items.map((s, i) => {
          const Icon = icons[i] ?? Globe;
          return (
            <Reveal key={s.t}>
              <article className="card-lift grid gap-6 md:grid-cols-[auto_1fr_auto] md:items-center">
                <Icon className="size-10 text-primary" />
                <div>
                  <h2 className="font-display text-2xl font-semibold">{s.t}</h2>
                  <p className="mt-3 text-sm"><span className="eyebrow">{t.services.needLabel} — </span><span className="text-muted-foreground">{s.need}</span></p>
                  <p className="mt-3 text-muted-foreground">{s.d}</p>
                </div>
                <Link to="/contact" className="btn-primary">{t.services.quote}</Link>
              </article>
            </Reveal>
          );
        })}
      </section>
    </>
  );
}
