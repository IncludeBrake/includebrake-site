import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/home/SectionReveal";
import type { InquiryService } from "@/components/InquiryDialog";

const MARK_URL =
  "https://ellprnxjjzatijdxcogk.supabase.co/storage/v1/render/image/public/files/chat-generated-images/project-ltyoebekwsuiki71jba7/d5358079-e17d-4139-a21f-c883fafffb87.png?width=420&resize=contain&quality=75";

const bottlenecks = [
  { title: "Typing the same ticket three times", body: "Dispatch, then billing, then the books. Every retype is a chance to get it wrong." },
  { title: "The estimate that sat until they went elsewhere", body: "The quote waits on the one person who can price it. By the time it goes out, the customer's gone." },
  { title: "What the tech knew never made the invoice", body: "Driver notes, tech notes, the off-rent call. The office hears about it when the customer disputes the bill." },
  { title: "Photos on a driver's phone", body: "The damage photos and times exist somewhere. Just not on the ticket when the claim comes in." },
];

const principles = [
  { title: "No new software", body: "Your shop and dispatch software stay in place. I make the tools you already run talk to each other.", label: "Your software stays" },
  { title: "Timed before and after", body: "I time the job the way it runs today. After the fix, I time it again and show you both.", label: "By the clock" },
  { title: "Your crew keeps the keys", body: "Your staff confirm and release the work. Anything unclear gets flagged for a person. The docs, maps, scripts and files are yours.", label: "Your call, every time" },
];

const services = [
  {
    number: "01",
    title: "The Blueprint & Operating Map",
    lead: "Jobs get stuck in more than one place, and you can't shut down to find every one.",
    body: "I sit with your dispatchers, service writers and drivers. I write down every step from the first call to the payment. You get an operating map you own, plus a list of what to fix first.",
    tags: ["intake", "dispatch", "handoffs", "invoicing"],
    value: "blueprint" as InquiryService,
  },
  {
    number: "02",
    title: "The Single Process Fix",
    lead: "You already know the one paperwork problem eating your week.",
    body: "I map that one task, connect the screens you already use, and get clean info to your staff. If it doesn't beat today's time by the clock, I don't push you to expand it.",
    tags: ["one stuck point", "handoffs", "timed before and after", "your software"],
    value: "process-fix" as InquiryService,
  },
];

const industries = [
  { title: "Heavy-Duty Towing & Recovery", body: "The truck's back. The invoice isn't. Your math: heavy jobs billed late each month × average ticket = cash you're floating." },
  { title: "Heavy Haul & Specialized Freight", body: "The load's chained down. The paperwork isn't. Your math: idle days a month × truck and driver cost per day." },
  { title: "Collision & Auto Body", body: "The car's torn down. The supplement's still waiting. Your math: extra days per repair × repairs a month = bay-days lost." },
  { title: "Commercial Fleet & Auto Repair", body: "Your tech found it. The customer never heard. Your math: stalled quotes a week × average ticket = work diagnosed for free." },
  { title: "Equipment Rental & Yard Operations", body: "It came back with a dent and extra hours. Your math: unbilled hours × hourly rate + damage you ate." },
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
                <p className="label-mono">01 / Sound familiar?</p>
                <p className="mt-8 max-w-[220px] text-sm leading-relaxed text-black/50">The bays keep moving. The paperwork piles up behind them.</p>
              </div>
              <div>
                <h2 className="display-heading max-w-5xl">The Work Gets Done.<br /><span className="text-black/[0.45]">The Paperwork Stalls.</span></h2>
                <p className="body-copy mt-9 max-w-2xl">You don't lose time turning wrenches or moving loads. You lose it between the field and the desk. Here's where it shows up in all five trades.</p>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-20 grid gap-5 md:grid-cols-2">
            {bottlenecks.map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.07} className={index % 2 === 1 ? "md:translate-y-12" : ""}>
                <article className="group workflow-card overflow-hidden rounded-[1.45rem] border border-black/10 bg-white">
                  <div className={`workflow-card-surface workflow-surface-${index}`}>
                    <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-black/[0.45]">
                      <span>0{index + 1} / stuck point</span>
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
              <p className="label-mono">02 / How I work</p>
              <div>
                <h2 className="display-heading max-w-4xl">Clear work.<br /><span className="text-black/[0.45]">Clean handoffs.</span></h2>
                <p className="body-copy mt-9 max-w-2xl">I work from the process your people actually run. Every decision stays visible. Every change is small enough to use on a live floor.</p>
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
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-white/[0.45]">03 / What I fix</p>
                <p className="mt-8 max-w-[220px] text-sm leading-relaxed text-white/[0.45]">The whole job flow mapped, or one stuck point fixed.</p>
              </div>
              <div>
                <h2 className="display-heading text-white">Two ways<br /><span className="text-white/[0.45]">I fix it.</span></h2>
                <p className="mt-9 max-w-2xl text-base leading-relaxed text-white/[0.55] sm:text-lg">Map the whole job from call to check, or fix the one spot you already know is costing you.</p>
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
                    Send a process for this <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
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
                <p className="label-mono">04 / Who I work with</p>
                <p className="mt-8 max-w-[220px] text-sm leading-relaxed text-black/50">Five trades. Same four problems. Do your own math.</p>
              </div>
              <div>
                <h2 className="display-heading">Built for the yard,<br /><span className="text-black/[0.45]">the bay, and the road.</span></h2>
              </div>
            </div>
          </SectionReveal>

          <div className="mt-20 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {industries.map((item, index) => (
              <SectionReveal key={item.title} delay={index * 0.06}>
                <article className="group flex min-h-[310px] flex-col justify-between rounded-[1.3rem] border border-black/[0.15] bg-white p-6 transition-colors duration-300 hover:bg-black hover:text-white sm:p-7">
                  <div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/[0.45] transition-colors group-hover:text-white/[0.45]">0{index + 1} / trade</span><ArrowUpRight className="h-4 w-4 text-black/[0.35] transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white/60" aria-hidden /></div>
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
