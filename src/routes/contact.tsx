import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { buildWhatsAppUrl, pageHead, useLang, usePageMeta, type WaKey } from "@/lib/i18n";
import { ContactList, PageHero, Reveal, Socials } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("contact"),
  component: Contact,
});

type ServiceKey = "website" | "app" | "ai" | "other";

function Contact() {
  const { t, lang } = useLang();
  usePageMeta("contact");
  const c = t.contact;
  const [f, setF] = useState({ name: "", company: "", service: "website" as ServiceKey, message: "", wa: "ma1" as WaKey });
  const [errors, setErrors] = useState<{ name?: boolean; message?: boolean }>({});
  const [tried, setTried] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    const errs = { name: !f.name.trim(), message: !f.message.trim() };
    setErrors(errs);
    if (errs.name || errs.message) return;
    const url = buildWhatsAppUrl(f.wa, { name: f.name.trim(), company: f.company.trim(), service: c.services[f.service], message: f.message.trim() }, lang);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const hasErr = tried && (errors.name || errors.message);

  return (
    <>
      <PageHero title={c.title} intro={c.intro} />
      <section className="container-site grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <form onSubmit={submit} noValidate className="space-y-5 rounded-2xl border border-border bg-card p-6 md:p-8">
            {hasErr && <p role="alert" className="rounded-lg bg-destructive/15 px-4 py-3 text-sm text-destructive">{c.errForm}</p>}
            <div>
              <label htmlFor="name" className="field-label">{c.name} *</label>
              <input id="name" className="field" value={f.name} aria-invalid={!!errors.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
              {errors.name && <p className="field-error">{c.errName}</p>}
            </div>
            <div>
              <label htmlFor="company" className="field-label">{c.company} <span className="text-muted-foreground">{c.optional}</span></label>
              <input id="company" className="field" value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="service" className="field-label">{c.service}</label>
                <select id="service" className="field" value={f.service} onChange={(e) => setF({ ...f, service: e.target.value as ServiceKey })}>
                  {(Object.keys(c.services) as ServiceKey[]).map((k) => <option key={k} value={k}>{c.services[k]}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="wa" className="field-label">{c.wa}</label>
                <select id="wa" className="field" value={f.wa} onChange={(e) => setF({ ...f, wa: e.target.value as WaKey })}>
                  {(Object.keys(c.waOpts) as WaKey[]).map((k) => <option key={k} value={k}>{c.waOpts[k]}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="message" className="field-label">{c.message} *</label>
              <textarea id="message" rows={5} className="field" value={f.message} aria-invalid={!!errors.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
              {errors.message && <p className="field-error">{c.errMessage}</p>}
            </div>
            <button type="submit" className="btn-primary w-full sm:w-auto">{c.submit}</button>
            <p className="text-xs text-muted-foreground">{c.note}</p>
          </form>
        </Reveal>
        <Reveal>
          <div className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-display text-xl font-semibold">{c.details}</h2>
            <ContactList />
            <Socials />
          </div>
        </Reveal>
      </section>
    </>
  );
}
