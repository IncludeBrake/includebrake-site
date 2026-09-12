import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Minus } from "lucide-react";
import { SectionReveal } from "@/components/home/SectionReveal";

const baselineBefore = [
  "Ticket written in the field",
  "Retyped into dispatch",
  "Retyped into invoicing",
  "Retyped into accounting",
  "Errors caught at customer dispute",
];

const baselineAfter = [
  "Ticket written in the field",
  "Details carried across, once",
  "Anything unclear is flagged for a person",
  "Your staff confirm and release",
  "Same clock, run again, compared",
];

const approachSteps = [
  { label: "Record the current clock", body: "Before we build, we record how long your current process takes by the clock." },
  { label: "Build across the tools", body: "We build a clean bridge across the screens your team already uses, with people in control of the handoff." },
  { label: "Run the same process again", body: "After the fix is live, we time it again and compare it to the baseline before discussing expansion work." },
];

const statements = [
  { label: "01 / For the floor", title: "Calm at the handoff.", body: "The work should move from field to desk without a second round of retyping or a new software learning curve." },
  { label: "02 / For the team", title: "Clear for the crew.", body: "Your staff confirm and release the work. The change removes repetitive administrative clutter from their desks." },
  { label: "03 / For the operator", title: "Yours when we leave.", body: "You retain every map, script, file, and decision. If you manage the process internally tomorrow, you have what you need." },
];

export function MidApproachSections() {
  const approachRef = useRef<HTMLElement>(null);
  const methodRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: approachProgress } = useScroll({ target: approachRef, offset: ["start 0.85", "end 0.2"] });
  const { scrollYProgress: methodProgress } = useScroll({ target: methodRef, offset: ["start 0.9", "end 0.25"] });
  const lineScale = useTransform(approachProgress, [0, 1], [0, 1]);
  const scanScale = useTransform(methodProgress, [0, 1], [0, 1]);

  return (
    <>
      <section ref={approachRef} id="approach" className="anchor-offset section-pad bg-black py-28 text-white sm:py-40">
        <div className="content-width">
          <SectionReveal>
            <div className="editorial-heading-grid">
              <div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/[0.45]">05 / About the approach</p><p className="mt-8 max-w-[220px] text-sm leading-relaxed text-white/[0.45]">A small, measurable change that keeps the operation yours.</p></div>
              <div><h2 className="display-heading text-white">The Baseline Rule:<br /><span className="text-white/[0.45]">We Measure Before We Build.</span></h2><p className="mt-9 max-w-2xl text-base leading-relaxed text-white/[0.58] sm:text-lg">We work from evidence, not theories. You maintain full oversight at every step, and the same clock tells us whether the new method is worth carrying forward.</p></div>
            </div>
          </SectionReveal>

          <div className="relative mt-20 pl-8 sm:pl-14">
            <motion.div className="approach-line" style={{ scaleY: reduce ? 1 : lineScale }} aria-hidden />
            <div className="space-y-5">
              {approachSteps.map((step, index) => (
                <SectionReveal key={step.label} delay={index * 0.08}>
                  <article className="relative border-b border-white/10 pb-7 pt-1 sm:pb-9">
                    <span className="approach-dot" aria-hidden><span /></span>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">0{index + 1} / {step.label}</p>
                    <h3 className="mt-3 text-2xl font-bold tracking-[-0.05em] sm:text-3xl">{step.label}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/[0.55] sm:text-base">{step.body}</p>
                  </article>
                </SectionReveal>
              ))}
            </div>
          </div>

          <SectionReveal delay={0.1}>
            <div className="mt-20 rounded-[1.5rem] border border-white/[0.15] bg-white/[0.045] p-5 sm:p-8 lg:p-10">
              <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">Method / recorded first, measured after</p><h3 className="mt-4 max-w-2xl text-2xl font-bold tracking-[-0.05em] sm:text-4xl">The same process, two clear readings.</h3></div><p className="max-w-xs text-sm leading-relaxed text-white/[0.45]">If the new method does not measurably outperform the old one, we do not push expansion work.</p></div>
              <div className="mt-8 grid gap-4 md:grid-cols-2"><ProcessList label="Baseline / recorded first" items={baselineBefore} /><ProcessList label="After / measured against it" items={baselineAfter} inverse /></div>
              <p className="mt-6 text-xs leading-relaxed text-white/[0.35]">Illustration of the method. Your actual baseline is recorded in your shop, from your own process.</p>
            </div>
          </SectionReveal>

          <div className="mt-28 grid gap-10 border-t border-white/[0.15] pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:pt-16">
            <SectionReveal><div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/[0.45]">Ownership / always</p><h2 className="mt-7 max-w-xl font-sans text-[clamp(2.8rem,6vw,6rem)] font-extrabold leading-[0.91] tracking-[-0.07em]">You hold the keys.<br /><span className="text-white/[0.45]">Always.</span></h2></div></SectionReveal>
            <SectionReveal delay={0.08}><div className="lg:pt-16"><p className="max-w-2xl text-xl leading-relaxed tracking-[-0.02em] text-white/[0.65] sm:text-2xl">Everything we build lives on your infrastructure, accessible via clear, plain-language documentation. No proprietary lock-in. No closed ecosystems.</p><p className="mt-7 max-w-xl text-sm leading-relaxed text-white/[0.45] sm:text-base">If you choose to manage the process internally tomorrow, you retain every script, map, and file without restriction.</p></div></SectionReveal>
          </div>
        </div>
      </section>

      <section id="experiences" className="anchor-offset section-pad bg-white py-28 text-black sm:py-36">
        <div className="content-width">
          <SectionReveal><div className="editorial-heading-grid"><p className="label-mono">06 / What the work should feel like</p><div><h2 className="display-heading">Questions have<br /><span className="text-black/[0.45]">practical answers.</span></h2><p className="body-copy mt-9 max-w-2xl">There are no invented testimonials here. These are the standards the work is built around, from the first walkthrough to the handoff.</p></div></div></SectionReveal>
          <div className="mt-20 grid gap-4 lg:grid-cols-3">
            {statements.map((item, index) => <SectionReveal key={item.title} delay={index * 0.08}><article className="flex min-h-[320px] flex-col justify-between rounded-[1.35rem] border border-black/[0.15] p-6 sm:p-8"><div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/[0.45]">{item.label}</span><Check className="h-4 w-4 text-black/[0.35]" aria-hidden /></div><div><h3 className="text-3xl font-bold leading-[0.96] tracking-[-0.06em]">{item.title}</h3><p className="mt-5 text-sm leading-relaxed text-black/[0.55] sm:text-base">{item.body}</p></div></article></SectionReveal>)}
          </div>
        </div>
      </section>

      <section ref={methodRef} id="method" className="anchor-offset section-pad bg-zinc-100 py-28 text-black sm:py-36">
        <div className="content-width">
          <SectionReveal><div className="flex flex-col justify-between gap-8 border-b border-black/[0.15] pb-10 md:flex-row md:items-end"><div><p className="label-mono">07 / Method illustration</p><h2 className="mt-7 max-w-4xl font-sans text-[clamp(2.8rem,6vw,6rem)] font-extrabold leading-[0.91] tracking-[-0.07em]">Compare the same clock.</h2></div><p className="max-w-sm text-sm leading-relaxed text-black/[0.55]">A visual explanation of how IncludeBrake looks for a measurable change, not a client result or a promised outcome.</p></div></SectionReveal>
          <SectionReveal delay={0.08}><div className="method-card relative mt-12 overflow-hidden rounded-[1.6rem] bg-black p-6 text-white sm:p-10 lg:p-14"><motion.div className="method-scan" style={{ scaleX: reduce ? 1 : scanScale }} aria-hidden /><div className="flex flex-col justify-between gap-8 border-b border-white/[0.15] pb-8 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">Illustration / no fabricated result</p><h3 className="mt-4 max-w-2xl text-3xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-5xl">Same workflow.<br /><span className="text-white/[0.45]">Clearer handoff.</span></h3></div><ArrowRight className="h-6 w-6 text-white/[0.45]" aria-hidden /></div><div className="method-grid mt-10"><MethodColumn label="Before / recorded baseline" items={baselineBefore} /><div className="hidden items-center justify-center md:flex" aria-hidden><Minus className="h-5 w-5 text-white/40" /></div><MethodColumn label="After / measured against it" items={baselineAfter} inverse /></div><p className="mt-8 max-w-2xl text-xs leading-relaxed text-white/[0.35]">The actual comparison uses your own process, your own people, and your own clock. IncludeBrake does not publish a result before doing that work.</p></div></SectionReveal>
        </div>
      </section>
    </>
  );
}

function ProcessList({ label, items, inverse = false }: { label: string; items: string[]; inverse?: boolean }) {
  return <div className={`rounded-xl border p-5 sm:p-6 ${inverse ? "border-white/[0.15] bg-white/[0.06]" : "border-white/10 bg-black/[0.35]"}`}><p className={`font-mono text-[10px] uppercase tracking-[0.15em] ${inverse ? "text-white/70" : "text-white/40"}`}>{label}</p><ol className="mt-5 space-y-3">{items.map((item, index) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/[0.62]"><span className="font-mono text-[10px] text-white/30">0{index + 1}</span><span>{item}</span></li>)}</ol></div>;
}

function MethodColumn({ label, items, inverse = false }: { label: string; items: string[]; inverse?: boolean }) {
  return <div className={`method-column ${inverse ? "method-column-inverse" : ""}`}><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/[0.45]">{label}</p><ol className="mt-6 space-y-4">{items.map((item, index) => <li key={item} className="grid grid-cols-[30px_1fr] gap-3 text-sm leading-relaxed text-white/[0.65] sm:text-base"><span className="font-mono text-[11px] text-white/30">0{index + 1}</span><span>{item}</span></li>)}</ol></div>;
}
