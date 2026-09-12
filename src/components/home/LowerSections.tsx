import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/home/SectionReveal";
import { FaqSection } from "@/components/home/FaqSection";
import type { InquiryService } from "@/components/InquiryDialog";

const LOGO_URL =
  "https://ellprnxjjzatijdxcogk.supabase.co/storage/v1/render/image/public/files/chat-generated-images/project-ltyoebekwsuiki71jba7/d5358079-e17d-4139-a21f-c883fafffb87.png?width=160&resize=contain&quality=75";

const paths = [
  { number: "01", title: "The Blueprint & Operating Map", fit: "Choose this when the drag shows up across more than one handoff and you need a permanent view of the operation.", leave: "A documented map of intake through cash collection, plus an objective priority list.", value: "blueprint" as InquiryService },
  { number: "02", title: "The Single Process Fix", fit: "Choose this when you already know the one paperwork bottleneck draining the week.", leave: "A targeted bridge across your existing screens, measured against the current baseline.", value: "process-fix" as InquiryService },
];

const boundaries = [
  { lead: "If you are looking for an ", strong: "off-the-shelf tool that requires replacing your shop management software", tail: ", we are not the right fit." },
  { lead: "If you want to ", strong: "eliminate your front desk or dispatch staff", tail: ", we are not the right fit." },
  { lead: "We work with operators who ", strong: "value their team", tail: ", intend to keep their current systems intact, and want repetitive administrative clutter permanently cleared off their desks." },
];

type Props = { onInquire: (service?: InquiryService) => void };

export function LowerSections({ onInquire }: Props) {
  return (
    <>
      <section id="start" className="anchor-offset section-pad bg-white py-28 text-black sm:py-36">
        <div className="content-width">
          <SectionReveal><div className="editorial-heading-grid"><div><p className="label-mono">08 / How to start</p><p className="mt-8 max-w-[220px] text-sm leading-relaxed text-black/50">Two legitimate paths, chosen by the problem you can see today.</p></div><div><h2 className="display-heading">Start with the<br /><span className="text-black/[0.45]">view you need.</span></h2><p className="body-copy mt-9 max-w-2xl">You can map the operation first, or focus on one known leak. Both paths begin with a clear conversation about the work your people already do.</p></div></div></SectionReveal>
          <div className="mt-20 grid gap-4 lg:grid-cols-2">
            {paths.map((path, index) => <SectionReveal key={path.title} delay={index * 0.08} className="h-full"><article className="flex h-full min-h-[370px] flex-col justify-between rounded-[1.45rem] border border-black/[0.15] bg-zinc-100 p-7 sm:p-9"><div><div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/[0.45]">Path / {path.number}</span><span className="h-2 w-2 rounded-full bg-black" aria-hidden /></div><h3 className="mt-16 max-w-md text-3xl font-bold leading-[0.96] tracking-[-0.06em] sm:text-4xl">{path.title}</h3><p className="mt-6 text-sm font-semibold leading-relaxed text-black/[0.72] sm:text-base">{path.fit}</p><p className="mt-5 text-sm leading-relaxed text-black/[0.52] sm:text-base"><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-black/40">You leave with / </span>{path.leave}</p></div><button type="button" onClick={() => onInquire(path.value)} className="pill-button mt-10 inline-flex h-11 w-fit items-center gap-3 bg-black px-5 text-sm font-bold text-white transition hover:bg-black/80">Talk through this path <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></button></article></SectionReveal>)}
          </div>
        </div>
      </section>

      <section id="boundaries" className="anchor-offset section-pad bg-black py-28 text-white sm:py-36">
        <div className="content-width"><SectionReveal><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"><div><p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/[0.45]">09 / Clear boundaries</p><h2 className="mt-7 max-w-xl font-sans text-[clamp(2.8rem,6vw,6rem)] font-extrabold leading-[0.91] tracking-[-0.07em]">Who We Are<br /><span className="text-white/[0.45]">Not Built For.</span></h2></div><ol className="space-y-0">{boundaries.map((item, index) => <BoundaryRow key={item.strong} number={`0${index + 1}`} delay={index * 0.08}><>{item.lead}<strong>{item.strong}</strong>{item.tail}</></BoundaryRow>)}</ol></div></SectionReveal></div>
      </section>

      <FaqSection />

      <section id="contact" className="anchor-offset section-pad bg-black py-32 text-white sm:py-48"><div className="content-width"><SectionReveal><div className="mx-auto max-w-5xl text-center"><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/[0.45]">11 / Start with the drag</p><h2 className="mt-8 font-sans text-[clamp(3.15rem,8vw,8rem)] font-extrabold leading-[0.86] tracking-[-0.078em]">Identify the Drag<br /><span className="text-white/[0.45]">in Your Operation.</span></h2><p className="mx-auto mt-9 max-w-xl text-base leading-relaxed text-white/[0.55] sm:text-lg">A short operational review to pinpoint your primary bottleneck. No pitch deck. Just a clear look at where time is leaking.</p><button type="button" onClick={() => onInquire()} className="pill-button mt-10 inline-flex h-12 items-center gap-3 bg-white px-7 text-sm font-bold text-black transition hover:bg-white/[0.85]">Talk through the bottleneck <ArrowRight className="h-4 w-4" aria-hidden /></button></div></SectionReveal></div></section>

      <footer className="section-pad border-t border-black/10 bg-white py-10 text-black sm:py-12"><div className="content-width"><div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><a href="#top" className="inline-flex items-center gap-3" aria-label="IncludeBrake home"><img src={LOGO_URL} alt="" width={52} height={40} className="h-9 w-12 object-contain" /><span className="text-lg font-extrabold tracking-[-0.05em]">IncludeBrake</span></a><nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3"><a href="#workflows" className="text-sm text-black/[0.55] transition hover:text-black">Workflows</a><a href="#services" className="text-sm text-black/[0.55] transition hover:text-black">Services</a><a href="#approach" className="text-sm text-black/[0.55] transition hover:text-black">Approach</a><a href="#faq" className="text-sm text-black/[0.55] transition hover:text-black">FAQ</a><button type="button" onClick={() => onInquire()} className="text-sm font-semibold text-black transition hover:text-black/[0.55]">Let&apos;s talk</button></nav></div><div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-black/40 sm:flex-row sm:items-center sm:justify-between"><span>IncludeBrake / operational clarity</span><span>© {new Date().getFullYear()} IncludeBrake</span></div></div></footer>
    </>
  );
}

function BoundaryRow({ number, delay, children }: { number: string; delay: number; children: ReactNode }) {
  const reduce = useReducedMotion();
  return <motion.li className="grid grid-cols-[48px_1fr] gap-4 border-t border-white/[0.15] py-7 text-sm leading-relaxed text-white/[0.55] sm:grid-cols-[64px_1fr] sm:py-9 sm:text-base" initial={reduce ? false : { opacity: 0, x: 18 }} whileInView={reduce ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true, margin: "-48px" }} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/[0.35]">{number}</span><p>{children}</p></motion.li>;
}
