import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { formatEuro, useCart } from "@/lib/cart";
import { OI } from "@/lib/oi-data";
import { btnR, ease } from "@/lib/site-tokens";
import { createPageHead } from "@/lib/site-seo";

export const Route = createFileRoute("/afrekenen")({
  head: () =>
    createPageHead({
      title: "Afrekenen | Office Image",
      description:
        "Rond uw bestelling veilig af. Afrekenen met bezorging, betaling en orderbevestiging bij Office Image.",
      path: "/afrekenen",
    }),
  component: AfrekenenPage,
});

type Step = 1 | 2 | 3 | 4;
type Payment = "ideal" | "card" | "invoice";

const STEPS = [
  { n: 1, label: "Gegevens" },
  { n: 2, label: "Bezorging" },
  { n: 3, label: "Betaling" },
  { n: 4, label: "Bevestiging" },
] as const;

const PAYMENTS: { id: Payment; label: string; desc: string }[] = [
  { id: "ideal", label: "iDEAL", desc: "Direct betalen via uw bank" },
  { id: "card", label: "Creditcard", desc: "Visa, Mastercard, American Express" },
  { id: "invoice", label: "Op factuur", desc: "Voor zakelijke klanten op aanvraag" },
];

function AfrekenenPage() {
  const navigate = useNavigate();
  const {
    selectedItems,
    selectedSubtotal,
    selectedTotalCount,
    setQty,
    removeItem,
    clearSelectedItems,
  } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [payment, setPayment] = useState<Payment>("ideal");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [form, setForm] = useState({
    voornaam: "",
    achternaam: "",
    email: "",
    telefoon: "",
    bedrijf: "",
    straat: "",
    huisnummer: "",
    postcode: "",
    plaats: "",
    notitie: "",
  });

  const vat = useMemo(() => Math.round(selectedSubtotal * 0.21), [selectedSubtotal]);
  const shipping = selectedSubtotal >= 500 ? 0 : 49;
  const total = selectedSubtotal + vat + shipping;

  useEffect(() => {
    if (selectedItems.length === 0 && !done) {
      navigate({ to: "/producten" });
    }
  }, [selectedItems.length, done, navigate]);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
  };

  const canProceed = () => {
    if (step === 1) return form.voornaam && form.achternaam && form.email && form.telefoon;
    if (step === 2) return form.straat && form.huisnummer && form.postcode && form.plaats;
    if (step === 3) return !!payment;
    return true;
  };

  const handleSubmit = () => {
    setSubmitting(true);
    window.setTimeout(() => {
      const id = `OI-${Date.now().toString(36).toUpperCase()}`;
      setOrderId(id);
      setDone(true);
      setStep(4);
      clearSelectedItems();
      setSubmitting(false);
    }, 1400);
  };

  if (selectedItems.length === 0 && done) {
    return (
      <main className="min-h-screen bg-[var(--bone)]">
        <SiteHeader />
        <SuccessView orderId={orderId} />
        <SiteFooter />
      </main>
    );
  }

  if (selectedItems.length === 0) return null;

  return (
    <main className="min-h-screen bg-[var(--bone)] text-[var(--foreground)]">
      <SiteHeader />

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 py-10 md:py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <div className="eyebrow text-[var(--muted-foreground)]">Veilig afrekenen</div>
          <h1 className="mt-3 font-display text-3xl md:text-5xl tracking-tight text-[var(--ink)]">
            Uw bestelling afronden
          </h1>
        </motion.div>

        {/* Progress */}
        <div className="mt-10 md:mt-14">
          <div className="flex items-center justify-between max-w-2xl">
            {STEPS.map((s, i) => (
              <div key={s.n} className="flex items-center flex-1 last:flex-none">
                <button
                  type="button"
                  onClick={() => s.n < step && setStep(s.n as Step)}
                  disabled={s.n > step}
                  className={`flex flex-col items-center gap-2 transition-opacity ${s.n > step ? "opacity-40" : ""}`}
                >
                  <span className={`grid size-9 place-items-center rounded-full text-sm font-semibold num transition-colors ${
                    step >= s.n ? "bg-[var(--clay)] text-[var(--bone)]" : "bg-[var(--sand)] text-[var(--ink)]/50"
                  }`}>
                    {step > s.n ? "✓" : s.n}
                  </span>
                  <span className="hidden sm:block text-[10px] uppercase tracking-[0.16em] text-[var(--muted-foreground)]">{s.label}</span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-2 md:mx-4 transition-colors ${step > s.n ? "bg-[var(--clay)]" : "bg-[var(--ink)]/10"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 lg:mt-16 grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-start">
          {/* Form */}
          <div className="rounded-2xl border border-[var(--ink)]/8 bg-white p-6 md:p-10 shadow-[0_20px_60px_-40px_rgba(17,24,39,0.2)]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.4, ease }}>
                  <h2 className="font-display text-2xl text-[var(--ink)]">Contactgegevens</h2>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">Wij gebruiken deze gegevens voor uw orderbevestiging.</p>
                  <div className="mt-8 grid sm:grid-cols-2 gap-4">
                    <Field label="Voornaam" value={form.voornaam} onChange={update("voornaam")} required />
                    <Field label="Achternaam" value={form.achternaam} onChange={update("achternaam")} required />
                    <Field label="Emailadres" type="email" value={form.email} onChange={update("email")} required className="sm:col-span-2" />
                    <Field label="Telefoon" type="tel" value={form.telefoon} onChange={update("telefoon")} required />
                    <Field label="Bedrijf (optioneel)" value={form.bedrijf} onChange={update("bedrijf")} />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.4, ease }}>
                  <h2 className="font-display text-2xl text-[var(--ink)]">Bezorgadres</h2>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">Levering binnen Nederland. Montage op aanvraag beschikbaar.</p>
                  <div className="mt-8 grid sm:grid-cols-3 gap-4">
                    <Field label="Straat" value={form.straat} onChange={update("straat")} required className="sm:col-span-2" />
                    <Field label="Nr." value={form.huisnummer} onChange={update("huisnummer")} required />
                    <Field label="Postcode" value={form.postcode} onChange={update("postcode")} required />
                    <Field label="Plaats" value={form.plaats} onChange={update("plaats")} required className="sm:col-span-2" />
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] mb-2">Opmerking (optioneel)</label>
                      <textarea
                        value={form.notitie}
                        onChange={update("notitie")}
                        rows={3}
                        className={`w-full ${btnR} border border-[var(--ink)]/10 bg-[var(--bone)] px-4 py-3 text-sm outline-none focus:border-[var(--clay)] focus:ring-2 focus:ring-[var(--clay)]/20 transition-all resize-none`}
                        placeholder="Bijv. levering op verdieping 3, bel aan bij receptie"
                      />
                    </div>
                  </div>
                  <div className="mt-6 rounded-xl bg-[var(--sand)] p-4 text-sm text-[var(--muted-foreground)]">
                    Gratis bezorging bij bestellingen vanaf {formatEuro(500)}. Onder dit bedrag: {formatEuro(49)} verzendkosten.
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.4, ease }}>
                  <h2 className="font-display text-2xl text-[var(--ink)]">Betaalmethode</h2>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">Kies uw voorkeursmethode. Alle transacties zijn beveiligd.</p>
                  <div className="mt-8 space-y-3">
                    {PAYMENTS.map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPayment(p.id)}
                        className={`w-full flex items-center gap-4 ${btnR} border p-4 text-left transition-all duration-300 ${
                          payment === p.id
                            ? "border-[var(--clay)] bg-[color-mix(in_oklab,var(--clay)_8%,white)] shadow-[0_8px_24px_-12px_rgba(184,138,90,0.35)]"
                            : "border-[var(--ink)]/10 hover:border-[var(--ink)]/20 bg-white"
                        }`}
                      >
                        <span className={`grid size-5 place-items-center rounded-full border-2 transition-colors ${payment === p.id ? "border-[var(--clay)] bg-[var(--clay)]" : "border-[var(--ink)]/20"}`}>
                          {payment === p.id && <span className="size-2 rounded-full bg-white" />}
                        </span>
                        <div>
                          <div className="font-medium text-[var(--ink)]">{p.label}</div>
                          <div className="text-sm text-[var(--muted-foreground)]">{p.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                    <span className={`${btnR} border border-[var(--ink)]/8 px-3 py-1.5`}>SSL beveiligd</span>
                    <span className={`${btnR} border border-[var(--ink)]/8 px-3 py-1.5`}>PCI compliant</span>
                    <span className={`${btnR} border border-[var(--ink)]/8 px-3 py-1.5`}>14 dagen retour</span>
                  </div>
                </motion.div>
              )}

              {step === 4 && !done && (
                <motion.div key="s4" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.4, ease }}>
                  <h2 className="font-display text-2xl text-[var(--ink)]">Controleer uw bestelling</h2>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">Nog één keer alles nalopen voordat u plaatst.</p>
                  <dl className="mt-8 space-y-4 text-sm">
                    <SummaryRow label="Naam" value={`${form.voornaam} ${form.achternaam}`} />
                    <SummaryRow label="Email" value={form.email} />
                    <SummaryRow label="Telefoon" value={form.telefoon} />
                    <SummaryRow label="Bezorging" value={`${form.straat} ${form.huisnummer}, ${form.postcode} ${form.plaats}`} />
                    <SummaryRow label="Betaling" value={PAYMENTS.find(p => p.id === payment)?.label ?? ""} />
                  </dl>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 4 && (
              <div className="mt-10 flex flex-wrap gap-3">
                {step > 1 && (
                  <button type="button" onClick={() => setStep((step - 1) as Step)} className={`${btnR} border border-[var(--ink)]/12 px-6 py-3 text-sm font-medium text-[var(--ink)] hover:bg-[var(--sand)] transition-colors`}>
                    Terug
                  </button>
                )}
                <button
                  type="button"
                  disabled={!canProceed()}
                  onClick={() => setStep((step + 1) as Step)}
                  className={`${btnR} bg-[var(--ink)] text-[var(--bone)] px-8 py-3 text-sm font-medium hover:bg-[var(--clay)] transition-colors disabled:opacity-40 disabled:pointer-events-none`}
                >
                  Volgende stap
                </button>
              </div>
            )}

            {step === 4 && !done && (
              <div className="mt-10">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleSubmit}
                  className={`flex w-full sm:w-auto items-center justify-center gap-2 ${btnR} bg-[var(--clay)] text-[var(--bone)] px-10 py-4 text-sm font-semibold hover:bg-[var(--ochre)] hover:text-[var(--ink)] transition-colors disabled:opacity-60`}
                >
                  {submitting ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="size-4 rounded-full border-2 border-[var(--bone)]/30 border-t-[var(--bone)]" />
                      Bestelling verwerken
                    </>
                  ) : (
                    <>Bestelling plaatsen, {formatEuro(total)}</>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <aside className="relative lg:sticky lg:top-24 rounded-2xl border border-[var(--ink)]/8 bg-[color-mix(in_oklab,var(--ink)_3%,white)] p-6 md:p-8 shadow-[0_24px_64px_-32px_rgba(17,24,39,0.18)] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-[var(--ochre)] via-[var(--clay)] to-transparent" />
            <h3 className="font-display text-xl text-[var(--ink)]">Overzicht</h3>
            <p className="mt-1 text-sm text-[var(--muted-foreground)] num">{selectedTotalCount} {selectedTotalCount === 1 ? "artikel" : "artikelen"} geselecteerd</p>

            <ul className="mt-6 space-y-4 max-h-[280px] overflow-y-auto pr-1">
              {selectedItems.map(item => (
                <li key={item.id} className="flex gap-3">
                  <div className="size-14 shrink-0 rounded-lg overflow-hidden bg-[var(--sand)]">
                    <img src={item.img} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium leading-snug text-[var(--ink)] line-clamp-2">{item.name}</p>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-md border border-[var(--ink)]/10 overflow-hidden text-[12px]">
                        <button type="button" onClick={() => setQty(item.id, item.qty - 1)} className="grid size-6 place-items-center hover:bg-[var(--sand)]">−</button>
                        <span className="w-6 text-center num">{item.qty}</span>
                        <button type="button" onClick={() => setQty(item.id, item.qty + 1)} className="grid size-6 place-items-center hover:bg-[var(--sand)]">+</button>
                      </div>
                      <span className="text-sm font-medium num">{formatEuro(item.priceValue * item.qty)}</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeItem(item.id)} className="shrink-0 text-[var(--muted-foreground)] hover:text-red-600 text-xs" aria-label="Verwijder">×</button>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-[var(--ink)]/8 space-y-2 text-sm">
              <div className="flex justify-between text-[var(--muted-foreground)]"><span>Subtotaal</span><span className="num">{formatEuro(selectedSubtotal)}</span></div>
              <div className="flex justify-between text-[var(--muted-foreground)]"><span>Verzendkosten</span><span className="num">{shipping === 0 ? "Gratis" : formatEuro(shipping)}</span></div>
              <div className="flex justify-between text-[var(--muted-foreground)]"><span>Btw (21%)</span><span className="num">{formatEuro(vat)}</span></div>
              <div className="flex justify-between pt-3 font-display text-xl text-[var(--ink)]"><span>Totaal</span><span className="num">{formatEuro(total)}</span></div>
            </div>

            <Link to="/producten" className={`mt-6 flex w-full items-center justify-center ${btnR} border border-[var(--ink)]/10 py-3 text-sm font-medium text-[var(--ink)] hover:bg-[var(--sand)] transition-colors`}>
              Verder winkelen
            </Link>

            <p className="mt-4 text-[11px] text-[var(--muted-foreground)] leading-relaxed">
              Vragen? Bel <a href={OI.showroom.telHref} className="text-[var(--clay)] hover:underline num">{OI.showroom.tel}</a>
            </p>
          </aside>
        </div>
      </div>

      {done && <SuccessView orderId={orderId} />}
      <SiteFooter />
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[11px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] mb-2">
        {label}{required && <span className="text-[var(--clay)]"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full ${btnR} border border-[var(--ink)]/10 bg-[var(--bone)] px-4 py-3 text-sm outline-none focus:border-[var(--clay)] focus:ring-2 focus:ring-[var(--clay)]/20 transition-all`}
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-[var(--ink)]/6 last:border-0">
      <dt className="text-[var(--muted-foreground)]">{label}</dt>
      <dd className="font-medium text-[var(--ink)]">{value}</dd>
    </div>
  );
}

function SuccessView({ orderId }: { orderId: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease }}
      className="max-w-[640px] mx-auto px-6 py-16 md:py-24 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="mx-auto grid size-20 place-items-center rounded-full bg-emerald-600 text-white mb-8"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M5 12l4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      <h2 className="font-display text-3xl md:text-4xl text-[var(--ink)] tracking-tight">Bedankt voor uw bestelling</h2>
      <p className="mt-4 text-[var(--muted-foreground)] leading-relaxed">
        Uw order is succesvol ontvangen. U ontvangt binnen enkele minuten een bevestiging per email.
      </p>
      {orderId && (
        <div className={`mt-6 inline-flex ${btnR} bg-[var(--sand)] px-5 py-3 text-sm`}>
          Ordernummer: <span className="ml-2 font-semibold num text-[var(--ink)]">{orderId}</span>
        </div>
      )}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/producten" className={`${btnR} bg-[var(--ink)] text-[var(--bone)] px-6 py-3 text-sm font-medium hover:bg-[var(--clay)] transition-colors`}>
          Verder winkelen
        </Link>
        <Link to="/" className={`${btnR} border border-[var(--ink)]/12 px-6 py-3 text-sm font-medium text-[var(--ink)] hover:bg-[var(--sand)] transition-colors`}>
          Terug naar startpagina
        </Link>
      </div>
    </motion.section>
  );
}
