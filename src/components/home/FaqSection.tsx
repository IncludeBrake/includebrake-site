import { Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionReveal } from "@/components/home/SectionReveal";

const faqs = [
  { q: "Do I have to replace my shop management or dispatch software?", a: "No. I work beside the software you already run. I fix how info moves between your tools. I don't rip anything out or make you switch." },
  { q: "What happens after I send a process?", a: "I read it and reply by email, usually within one business day. I'll tell you where it gets stuck and whether a Single Process Fix or the Blueprint fits. If a call would be faster, say so and I'll set one up." },
  { q: "Do you need access to my systems?", a: "Only when a fix needs it, and only with your OK. I start by reviewing screens side by side with your team. If access is needed later, scope and permissions get agreed in writing first." },
  { q: "What changes for my staff day to day?", a: "Less retyping and fewer stuck handoffs. No new software to learn. Your crew keeps the tools they know. What changes is how info gets from one to the next, and who has to chase it." },
  { q: "What if the fix doesn't actually save time?", a: "I time the job before I build anything. After the fix is live, I time it again. If it doesn't beat the old way, I don't push more work." },
  { q: "Who owns what you build?", a: "You do. The docs, maps and scripts live on your side. No lock-in, nothing to rent." },
  { q: "How long does the Blueprint take, and what does it cost?", a: "It depends on how many processes get mapped and how many people touch them. I scope it against your shop after I read what you send. There's no package price on this page." },
  { q: "Will this work with my specific systems?", a: "I check against the tools you actually use. I don't claim certified links to every product. If I can fix a handoff without replacing software, that's what I do." },
];

export function FaqSection() {
  return <section id="faq" className="anchor-offset section-pad bg-zinc-100 py-28 text-black sm:py-36"><div className="content-width"><SectionReveal><p className="label-mono">10 / Straight answers</p><h2 className="mt-7 max-w-4xl font-sans text-[clamp(2.8rem,6vw,6.1rem)] font-extrabold leading-[0.91] tracking-[-0.07em]">Straight questions.<br /><span className="text-black/[0.45]">Straight answers.</span></h2></SectionReveal><SectionReveal delay={0.08}><div className="mt-16 border-t border-black/20"><Accordion type="single" collapsible className="w-full">{faqs.map((item, index) => <AccordionItem key={item.q} value={`faq-${index}`} className="border-black/[0.15]"><AccordionTrigger className="group gap-5 py-6 text-left text-base font-semibold tracking-[-0.02em] text-black hover:no-underline sm:py-7 sm:text-lg [&>svg:last-child]:hidden"><span className="flex flex-1 items-center justify-between gap-5"><span>{item.q}</span><Plus className="h-5 w-5 shrink-0 text-black/[0.45] transition-transform duration-200 group-data-[state=open]:rotate-45" aria-hidden /></span></AccordionTrigger><AccordionContent className="max-w-3xl pb-7 text-sm leading-relaxed text-black/[0.55] sm:text-base">{item.a}</AccordionContent></AccordionItem>)}</Accordion></div></SectionReveal></div></section>;
}
