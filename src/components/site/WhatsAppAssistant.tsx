import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { CONTACTS, useLang, type WaKey } from "@/lib/i18n";

type Need = "website" | "app" | "ai" | "other";
type Country = "sn" | "ma" | "eu";

function WaIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43M20.08 3.9A11.3 11.3 0 0 0 12.05.58C5.79.58.7 5.67.7 11.93c0 2 .52 3.95 1.52 5.67L.6 23.5l6.04-1.58a11.3 11.3 0 0 0 5.4 1.38h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}

export function WhatsAppAssistant() {
  const { t } = useLang();
  const a = t.assistant;
  const [open, setOpen] = useState(false);
  const [need, setNeed] = useState<Need>();
  const [country, setCountry] = useState<Country>();
  const [line, setLine] = useState<WaKey>();
  const [error, setError] = useState(false);
  const fabRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
    fabRef.current?.focus();
  };

  useEffect(() => {
    const openFromHomepage = () => {
      setError(false);
      setOpen(true);
    };
    window.addEventListener("3s-open-whatsapp-assistant", openFromHomepage);
    return () => window.removeEventListener("3s-open-whatsapp-assistant", openFromHomepage);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLButtonElement>("[data-autofocus]")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [need, country, line]);

  const reset = () => {
    setNeed(undefined);
    setCountry(undefined);
    setLine(undefined);
    setError(false);
  };

  const go = () => {
    if (!need || !country || !line) return setError(true);
    const text = a.msg(a.needs[need], a.countries[country], a.lines[line]);
    window.open(`${CONTACTS[line].url}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const Bot = ({ children }: { children: string }) => (
    <p className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-sm">{children}</p>
  );
  const Me = ({ children }: { children: string }) => (
    <p className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">{children}</p>
  );
  function Choices<K extends string>({ opts, onPick }: { opts: Record<K, string>; onPick: (k: K) => void }) {
    return (
      <div className="flex flex-wrap gap-2">
        {(Object.keys(opts) as K[]).map((k, i) => (
          <button key={k} data-autofocus={i === 0 ? "" : undefined} onClick={() => onPick(k)} className="chip text-sm">
            {opts[k]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <>
      {!open && (
        <button
          ref={fabRef}
          onClick={() => setOpen(true)}
          aria-label={a.open}
          aria-haspopup="dialog"
          className="safe-fab fixed z-[60] flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <WaIcon className="size-7" />
        </button>
      )}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label={a.open}
          className="animate-assistant-in fixed inset-0 z-[60] flex flex-col bg-card sm:inset-auto sm:safe-fab sm:h-[34rem] sm:max-h-[calc(100vh-2rem)] sm:w-96 sm:rounded-2xl sm:border sm:border-border sm:shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border bg-whatsapp px-4 py-3 pt-[calc(0.75rem+env(safe-area-inset-top))] text-whatsapp-foreground sm:rounded-t-2xl sm:pt-3">
            <span className="flex items-center gap-2 font-display font-semibold">
              <WaIcon className="size-5" /> {a.title}
            </span>
            <button onClick={close} aria-label={a.close} className="rounded-full p-1 transition-colors hover:bg-background/20">
              <X className="size-5" />
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4" aria-live="polite">
            <Bot>{a.q1}</Bot>
            {need ? <Me>{a.needs[need]}</Me> : <Choices opts={a.needs} onPick={(k) => setNeed(k as Need)} />}
            {need && <Bot>{a.q2}</Bot>}
            {need && (country ? <Me>{a.countries[country]}</Me> : <Choices opts={a.countries} onPick={(k) => setCountry(k as Country)} />)}
            {country && <Bot>{a.q3}</Bot>}
            {country && (line ? <Me>{a.lines[line]}</Me> : <Choices opts={a.lines} onPick={(l) => { setLine(l as WaKey); setError(false); }} />)}
            {line && need && country && (
              <div className="rounded-2xl border border-border bg-background p-4 text-sm">
                <p className="mb-2 font-display font-semibold">{a.summary}</p>
                <dl className="space-y-1">
                  <div><dt className="inline text-muted-foreground">{a.need} : </dt><dd className="inline">{a.needs[need]}</dd></div>
                  <div><dt className="inline text-muted-foreground">{a.country} : </dt><dd className="inline">{a.countries[country]}</dd></div>
                  <div><dt className="inline text-muted-foreground">{a.contact} : </dt><dd className="inline">{a.lines[line]} ({CONTACTS[line].label})</dd></div>
                </dl>
              </div>
            )}
            {error && <p role="alert" className="text-sm text-destructive">{a.error}</p>}
            <div ref={endRef} />
          </div>
          <div className="flex flex-col gap-2 border-t border-border p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-4">
            {line && (
              <button data-autofocus="" onClick={go} className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90">
                <WaIcon className="size-4" /> {a.cont}
              </button>
            )}
            <button onClick={reset} className="btn-outline">{a.restart}</button>
          </div>
        </div>
      )}
    </>
  );
}
