import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Minus } from "lucide-react";
import { SectionReveal } from "@/components/home/SectionReveal";

const baselineBefore = [
  "Ticket written in the field",
  "Typed into dispatch",
  "Typed again into billing",
  "Typed again into the books",
  "Mistakes found when the customer disputes it",
];

const baselineAfter = [
  "Ticket written in the field",
  "Info carried over once",
  "Anything unclear is flagged for a person",
  "Your staff confirm and release it",
  "Same clock, timed again, compared",
];

const approachSteps = [
  { label: "Time it today", body: "Before I build anything, I time the job the way your people run it now." },
  { label: "Fix it on your tools", body: "I connect the screens your team already uses. Your people still confirm every handoff." },
  { label: "Time it again", body: "Once the fix is live, I time it again and show you both numbers. Then you decide what's next." },
];

const statements = [
  { label: "01 / The bay", title: "Grew up in a body shop.", body: "I worked in a frame and body shop as a detailer and shop assistant through 2008. I know how a repair moves through a shop." },
  { label: "02 / The field", title: "Field inspections for years.", body: "I do field inspections for insurance and asset companies: the condition photos and reports they rely on." },
  { label: "03 / The road", title: "Years around towing and heavy haul.", body: "I've watched the paperwork pile up after the truck gets home. That's where I learned to build the fixes." },
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
              <div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/[0.45]">05 / Here's how I work</p><p className="mt-8 max-w-[220px] text-sm leading-relaxed text-white/[0.45]">One small change, timed, and yours to keep.</p></div>
              <div><h2 className="display-heading text-white">Time It First.<br /><span className="text-white/[0.45]">Then Fix It.</span></h2><p className="mt-9 max-w-2xl text-base leading-relaxed text-white/[0.58] sm:text-lg">I don't guess. I time the job as it runs today. The same clock decides if the fix is worth keeping.</p></div>
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
              <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">Example / timed first, timed after</p><h3 className="mt-4 max-w-2xl text-2xl font-bold tracking-[-0.05em] sm:text-4xl">Same job. Two times on the clock.</h3></div><p className="max-w-xs text-sm leading-relaxed text-white/[0.45]">If the fix doesn't beat the old way by the clock, I don't push more work.</p></div>
              <div className="mt-8 grid gap-4 md:grid-cols-2"><ProcessList label="Baseline / recorded first" items={baselineBefore} /><ProcessList label="After / measured against it" items={baselineAfter} inverse /></div>
              <p className="mt-6 text-xs leading-relaxed text-white/[0.35]">This is an example of the method. Your real numbers come from your shop and your own process.</p>
            </div>
          </SectionReveal>

          <div className="mt-28 grid gap-10 border-t border-white/[0.15] pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:pt-16">
            <SectionReveal><div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/[0.45]">Ownership / always</p><h2 className="mt-7 max-w-xl font-sans text-[clamp(2.8rem,6vw,6rem)] font-extrabold leading-[0.91] tracking-[-0.07em]">You hold the keys.<br /><span className="text-white/[0.45]">Always.</span></h2></div></SectionReveal>
            <SectionReveal delay={0.08}><div className="lg:pt-16"><p className="max-w-2xl text-xl leading-relaxed tracking-[-0.02em] text-white/[0.65] sm:text-2xl">Everything I build lives on your computers, with plain-English instructions. No lock-in. Nothing you have to rent.</p><p className="mt-7 max-w-xl text-sm leading-relaxed text-white/[0.45] sm:text-base">If you take it in-house tomorrow, you keep every script, map and file.</p></div></SectionReveal>
          </div>
        </div>
      </section>

      <section id="experiences" className="anchor-offset section-pad bg-white py-28 text-black sm:py-36">
        <div className="content-width">
          <SectionReveal><div className="editorial-heading-grid"><p className="label-mono">06 / Why me</p><div><h2 className="display-heading">I know your yard<br /><span className="text-black/[0.45]">because I've stood in one.</span></h2><p className="body-copy mt-9 max-w-2xl">No made-up reviews here. My first case study is coming. Until then, here's where I learned this work.</p></div></div></SectionReveal>
          <div className="mt-20 grid gap-4 lg:grid-cols-3">
            {statements.map((item, index) => <SectionReveal key={item.title} delay={index * 0.08}><article className="flex min-h-[320px] flex-col justify-between rounded-[1.35rem] border border-black/[0.15] p-6 sm:p-8"><div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/[0.45]">{item.label}</span><Check className="h-4 w-4 text-black/[0.35]" aria-hidden /></div><div><h3 className="text-3xl font-bold leading-[0.96] tracking-[-0.06em]">{item.title}</h3><p className="mt-5 text-sm leading-relaxed text-black/[0.55] sm:text-base">{item.body}</p></div></article></SectionReveal>)}
          </div>
        </div>
      </section>

      <section ref={methodRef} id="method" className="anchor-offset section-pad bg-zinc-100 py-28 text-black sm:py-36">
        <div className="content-width">
          <SectionReveal><div className="flex flex-col justify-between gap-8 border-b border-black/[0.15] pb-10 md:flex-row md:items-end"><div><p className="label-mono">07 / Example, not a result</p><h2 className="mt-7 max-w-4xl font-sans text-[clamp(2.8rem,6vw,6rem)] font-extrabold leading-[0.91] tracking-[-0.07em]">Same job. Same clock.</h2></div><p className="max-w-sm text-sm leading-relaxed text-black/[0.55]">This shows how I measure a fix. It's not a client result or a promise.</p></div></SectionReveal>
          <SectionReveal delay={0.08}><div className="method-card relative mt-12 overflow-hidden rounded-[1.6rem] bg-black p-6 text-white sm:p-10 lg:p-14"><motion.div className="method-scan" style={{ scaleX: reduce ? 1 : scanScale }} aria-hidden /><div className="flex flex-col justify-between gap-8 border-b border-white/[0.15] pb-8 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">Example / no made-up numbers</p><h3 className="mt-4 max-w-2xl text-3xl font-bold leading-[0.95] tracking-[-0.06em] sm:text-5xl">Same job.<br /><span className="text-white/[0.45]">Cleaner handoff.</span></h3></div><ArrowRight className="h-6 w-6 text-white/[0.45]" aria-hidden /></div><div className="method-grid mt-10"><MethodColumn label="Before / recorded baseline" items={baselineBefore} /><div className="hidden items-center justify-center md:flex" aria-hidden><Minus className="h-5 w-5 text-white/40" /></div><MethodColumn label="After / measured against it" items={baselineAfter} inverse /></div><p className="mt-8 max-w-2xl text-xs leading-relaxed text-white/[0.35]">The real comparison uses your process, your people and your clock. I don't publish a result until that work is done.</p></div></SectionReveal>
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
