import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, LayoutDashboard, Bot, ArrowRight } from "lucide-react";
import { CONTACTS, pageHead, useLang, usePageMeta } from "@/lib/i18n";
import { Reveal } from "@/components/site/Layout";
import logo from "@/assets/logo-3s.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => pageHead("home"),
  component: Index,
});

const serviceIcons = [Globe, LayoutDashboard, Bot] as const;

function Index() {
  const { t } = useLang();
  usePageMeta("home");
  const wa = `${CONTACTS.ma1.url}?text=${encodeURIComponent(t.waDefault)}`;
  return (
    <>
      <section className="hero-glow">
        <div className="container-site grid items-center gap-10 py-14 md:py-24 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">{t.home.location}</p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">{t.home.title}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t.home.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">{t.home.ctaContact}</Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-outline">{t.home.ctaWa}</a>
            </div>
          </Reveal>
          <Reveal>
            <img src={logo.url} alt="3S Solutions — Agence digitale" className="w-full rounded-3xl border border-border shadow-glow" />
          </Reveal>
        </div>
      </section>

      <section className="container-site py-16">
        <Reveal><h2 className="section-title">{t.home.servicesTitle}</h2></Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {t.services.items.map((s, i) => {
            const Icon = serviceIcons[i] ?? Globe;
            return (
              <Reveal key={s.t}>
                <Link to="/services" className="card-lift block h-full">
                  <Icon className="size-8 text-primary" />
                  <h3 className="mt-5 font-display text-xl font-semibold">{s.t}</h3>
                  <p className="mt-2 text-muted-foreground">{s.short}</p>
                  <ArrowRight className="mt-6 size-5 text-accent" />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container-site py-16">
        <Reveal><h2 className="section-title">{t.home.processTitle}</h2></Reveal>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.steps.map((s, i) => (
            <Reveal key={s.t}>
              <li className="h-full rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-3xl font-bold text-primary">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-site py-16">
        <Reveal>
          <div className="cta-panel">
            <h2 className="font-display text-2xl font-bold md:text-4xl">{t.home.finalTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.home.finalDesc}</p>
            <Link to="/contact" className="btn-primary mt-8">{t.home.finalCta}</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
