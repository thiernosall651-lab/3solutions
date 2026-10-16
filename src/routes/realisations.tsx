import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import { pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { PageHero, Reveal } from "@/components/site/Layout";

export const Route = createFileRoute("/realisations")({
  head: () => pageHead("portfolio"),
  component: Portfolio,
});

// Replace `image: undefined` with an imported screenshot to show a real capture.
const projectImages: (string | undefined)[] = [undefined, undefined];

function Portfolio() {
  const { t } = useLang();
  usePageMeta("portfolio");
  return (
    <>
      <PageHero title={t.portfolio.title} intro={t.portfolio.intro} />
      <section className="container-site grid gap-6 md:grid-cols-2">
        {t.portfolio.items.map((p, i) => (
          <Reveal key={p.t}>
            <article className="overflow-hidden rounded-2xl border border-border bg-card">
              {projectImages[i] ? (
                <img src={projectImages[i]} alt={p.t} className="aspect-video w-full object-cover" />
              ) : (
                <div className="flex aspect-video flex-col items-center justify-center gap-2 border-b border-dashed border-border bg-muted text-muted-foreground">
                  <ImageIcon className="size-8" />
                  <span className="text-sm">{t.portfolio.placeholder}</span>
                </div>
              )}
              <div className="p-6">
                <span className="chip">{t.portfolio.demo}</span>
                <h2 className="mt-4 font-display text-xl font-semibold">{p.t}</h2>
                <p className="text-sm text-accent">{p.loc}</p>
                <p className="mt-3 text-muted-foreground">{p.d}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
