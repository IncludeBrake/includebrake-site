import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/home/SectionReveal";
import type { InquiryService } from "@/components/InquiryDialog";

const MARK_URL =
  "https://ellprnxjjzatijdxcogk.supabase.co/storage/v1/render/image/public/files/chat-generated-images/project-ltyoebekwsuiki71jba7/d5358079-e17d-4139-a21f-c883fafffb87.png?width=420&resize=contain&quality=75";

const bottlenecks = [
  { title: "The Dual-Entry Tax", body: "The same ticket details get retyped into dispatch, then invoicing, then your accounting software." },
  { title: "The Dead Quote", body: "An estimate sits on a counter for two days because only one person knows how to price the specialty work." },
  { title: "The Missing Handoff", body: "Notes scribbled at 2:00 AM on a tow hook do not reach billing until the customer disputes the line item." },
  { title: "The Regulatory Drag", body: "A heavy-haul driver sits idling at a state line waiting on a permit clearance that lived in someone’s unread inbox." },
];

const principles = [
  { title: "No software migration", body: "IncludeBrake builds a clean bridge across the tools you already use. Your shop management and dispatch systems stay in place.", label: "The existing stack stays" },
  { title: "Baseline before build", body: "We record how long the current process takes by the clock, then run the same process again after the fix to compare it.", label: "Evidence, not theories" },
  { title: "Operators keep the keys", body: "Your staff confirm and release the work. Documentation, maps, scripts, and files remain under your control.", label: "Full oversight" },
];

const services = [
  {
    number: "01",
    title: "The Blueprint & Operating Map",
    lead: "You feel the drag across the entire business, but you cannot afford downtime to hunt down every single leak.",
    body: "We spend time with your dispatchers, service writers, and drivers. We document every step from intake to cash collection. You receive a permanent operating map you own, plus an objective priority list of what to streamline first.",
    tags: ["intake", "dispatch", "handoffs", "invoicing"],
    value: "blueprint" as InquiryService,
  },
  {
    number: "02",
    title: "The Single Process Fix",
    lead: "You already know the exact paperwork bottleneck draining your week.",
    body: "We map that specific task, build a reliable link between your existing screens, and route clean data to your staff. If the new workflow does not verifiably cut turnaround time against your current baseline, we do not expand it.",
    tags: ["one bottleneck", "handoffs", "baseline", "existing tools"],
    value: "process-fix" as InquiryService,
  },
];

const industries = [
  { title: "Heavy-Duty Towing & Recovery", body: "Call intake, dispatch logs, impound release paperwork, and commercial billing reconciliation." },
  { title: "Heavy Haul & Specialized Freight", body: "State permit coordination, route survey filing, pilot car billing, and driver manifest packets." },
  { title: "Collision & Auto Body", body: "Repair order supplements, adjuster photo documentation, parts verification, and claim sign-offs." },
  { title: "Commercial Fleet & Auto Repair", body: "Bay check-in, technician diagnostic notes, customer approval chains, and final invoicing." },
];

type Props = { onInquire: (service?: InquiryService) => void };

export function MidPrimarySections({ onInquire }: Props) {
  return (
    <>
      <section id="workflows" className="anchor-offset section-pad bg-zinc-100 py-28 text-black sm:py-36">
        <div className="content-width">
          <SectionReveal>
            <div className="editorial-heading-grid">
              <div>
                <p className="label-mono">01 / Workflows</p>
                <p className="mt-8 max-w-[220px] text-sm leading-relaxed text-black/50">The floor keeps moving. The paperwork builds up in the gaps.</p>
              </div>
              <div>
                <h2 className="display-heading max-w-5xl">The Work Gets Done.<br /><span className="text-black/[0.45]">The Paperwork Stalls.</span></h2>
                <p className="body-copy mt-9 max-w-2xl">You do not lose time turning wrenches or moving loads. You lose it in the gap between the field and the desk. These are the familiar loops that turn a finished job into unfinished administration.</p>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-20 grid gap-5 md:grid-cols-2">
            {bottlenecks.map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.07} className={index % 2 === 1 ? "md:translate-y-12" : ""}>
                <article className="group workflow-card overflow-hidden rounded-[1.45rem] border border-black/10 bg-white">
                  <div className={`workflow-card-surface workflow-surface-${index}`}>
                    <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-black/[0.45]">
                      <span>0{index + 1} / workflow</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden />
                    </div>
                    {index === 2 ? <img src={MARK_URL} alt="" width={180} height={140} className="workflow-mark" aria-hidden /> : null}
                    <div className="workflow-orbit" aria-hidden />
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="text-2xl font-bold tracking-[-0.055em] sm:text-3xl">{item.title}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-black/[0.55] sm:text-base">{item.body}</p>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="anchor-offset section-pad bg-white py-28 text-black sm:py-36">
        <div className="content-width">
          <SectionReveal>
            <div className="editorial-heading-grid">
              <p className="label-mono">02 / Why IncludeBrake</p>
              <div>
                <h2 className="display-heading max-w-4xl">Clear work.<br /><span className="text-black/[0.45]">Clean handoffs.</span></h2>
                <p className="body-copy mt-9 max-w-2xl">No fluff. We work from the process your people actually run, keep decision-making visible, and make the change small enough to use on a live floor.</p>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-20 grid gap-4 lg:grid-cols-3">
            {principles.map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.08}>
                <article className="principle-panel group flex min-h-[330px] flex-col justify-between rounded-[1.35rem] border border-black/[0.15] bg-zinc-100 p-6 transition-colors hover:bg-black hover:text-white sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/[0.45] transition-colors group-hover:text-white/[0.45]">0{index + 1}</span>
                    <span className="h-2 w-2 rounded-full bg-black transition-colors group-hover:bg-white" aria-hidden />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/[0.45] transition-colors group-hover:text-white/[0.45]">{item.label}</p>
                    <h3 className="mt-4 text-2xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-3xl">{item.title}</h3>
                    <p className="mt-5 text-sm leading-relaxed text-black/[0.55] transition-colors group-hover:text-white/60 sm:text-base">{item.body}</p>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="anchor-offset section-pad bg-black py-28 text-white sm:py-36">
        <div className="content-width">
          <SectionReveal>
            <div className="editorial-heading-grid">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/[0.45]">03 / Services</p>
                <p className="mt-8 max-w-[220px] text-sm leading-relaxed text-white/[0.45]">Clean operational documentation first, or a targeted fix for one known leak.</p>
              </div>
              <div>
                <h2 className="display-heading text-white">Two ways to<br /><span className="text-white/[0.45]">clear the drag.</span></h2>
                <p className="mt-9 max-w-2xl text-base leading-relaxed text-white/[0.55] sm:text-lg">Start with a permanent view of the operation, or target the one process you already know is leaking time.</p>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-20 grid gap-4 lg:grid-cols-2">
            {services.map((service, index) => (
              <SectionReveal key={service.title} delay={index * 0.08} className="h-full">
                <article className={`group flex h-full min-h-[510px] flex-col justify-between rounded-[1.5rem] border p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9 ${index === 0 ? "border-white/10 bg-white text-black" : "border-white/[0.15] bg-white/[0.045] text-white"}`}>
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                      <span className={index === 0 ? "text-black/[0.45]" : "text-white/[0.45]"}>Service / {service.number}</span>
                      <ArrowUpRight className={`h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 ${index === 0 ? "text-black/[0.45]" : "text-white/[0.45]"}`} aria-hidden />
                    </div>
                    <h3 className="mt-20 max-w-md text-3xl font-bold leading-[0.96] tracking-[-0.06em] sm:text-4xl">{service.title}</h3>
                    <p className={`mt-7 max-w-lg text-base font-semibold leading-relaxed ${index === 0 ? "text-black/75" : "text-white/80"}`}>{service.lead}</p>
                    <p className={`mt-5 max-w-lg text-sm leading-relaxed sm:text-base ${index === 0 ? "text-black/[0.55]" : "text-white/[0.55]"}`}>{service.body}</p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {service.tags.map((tag) => <span key={tag} className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] ${index === 0 ? "border-black/[0.15] text-black/[0.55]" : "border-white/[0.15] text-white/[0.55]"}`}>{tag}</span>)}
                    </div>
                  </div>
                  <button type="button" onClick={() => onInquire(service.value)} className={`pill-button mt-10 inline-flex h-11 w-fit items-center gap-3 px-5 text-sm font-bold transition ${index === 0 ? "bg-black text-white hover:bg-black/80" : "bg-white text-black hover:bg-white/[0.85]"}`}>
                    Talk through this service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </button>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="who-its-for" className="anchor-offset section-pad bg-zinc-100 py-28 text-black sm:py-36">
        <div className="content-width">
          <SectionReveal>
            <div className="editorial-heading-grid">
              <div>
                <p className="label-mono">04 / Industry focus</p>
                <p className="mt-8 max-w-[220px] text-sm leading-relaxed text-black/50">Four trades. The same underlying problem in four different shapes.</p>
              </div>
              <div>
                <h2 className="display-heading">Built for operators<br /><span className="text-black/[0.45]">who run heavy equipment.</span></h2>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-20 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.06}>
                <article className="group flex min-h-[310px] flex-col justify-between rounded-[1.3rem] border border-black/[0.15] bg-white p-6 transition-colors duration-300 hover:bg-black hover:text-white sm:p-7">
                  <div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/[0.45] transition-colors group-hover:text-white/[0.45]">0{index + 1} / focus</span><ArrowUpRight className="h-4 w-4 text-black/[0.35] transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60" aria-hidden /></div>
                  <div><h3 className="text-2xl font-bold leading-[0.98] tracking-[-0.055em]">{item.title}</h3><p className="mt-5 text-sm leading-relaxed text-black/[0.55] transition-colors group-hover:text-white/60">{item.body}</p></div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
