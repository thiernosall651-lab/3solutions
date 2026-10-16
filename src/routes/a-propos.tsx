import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { PageHero, Reveal } from "@/components/site/Layout";

export const Route = createFileRoute("/a-propos")({
  head: () => pageHead("about"),
  component: About,
});

function About() {
  const { t } = useLang();
  usePageMeta("about");
  return (
    <>
      <PageHero title={t.about.title} />
      <section className="container-site">
        <Reveal className="max-w-3xl space-y-5 text-lg text-muted-foreground">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
        </Reveal>
        <Reveal><h2 className="section-title mt-16">{t.about.valuesTitle}</h2></Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.about.values.map((v) => (
            <Reveal key={v.t}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold text-primary">{v.t}</h3>
                <p className="mt-2 text-muted-foreground">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Link to="/contact" className="btn-primary mt-12">{t.about.cta}</Link>
      </section>
    </>
  );
}
