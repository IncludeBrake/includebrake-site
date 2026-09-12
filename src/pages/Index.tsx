import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, Menu, X } from "lucide-react";
import { HomeSections } from "@/components/HomeSections";
import { InquiryDialog, type InquiryService } from "@/components/InquiryDialog";

const LOGO_URL =
  "https://ellprnxjjzatijdxcogk.supabase.co/storage/v1/render/image/public/files/chat-generated-images/project-ltyoebekwsuiki71jba7/d5358079-e17d-4139-a21f-c883fafffb87.png?width=160&resize=contain&quality=75";
const HERO_LOGO_URL =
  "https://ellprnxjjzatijdxcogk.supabase.co/storage/v1/render/image/public/files/chat-generated-images/project-ltyoebekwsuiki71jba7/d5358079-e17d-4139-a21f-c883fafffb87.png?width=720&resize=contain&quality=75";

const NAV = [
  { href: "#workflows", label: "Workflows" },
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#faq", label: "FAQ" },
];

const STRIP_ITEMS = [
  "Heavy-duty towing & recovery",
  "Heavy haul & specialized freight",
  "Collision & auto body",
  "Commercial fleet & auto repair",
  "Keep your existing software",
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryService, setInquiryService] = useState<InquiryService>("");
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const markY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, 14]);

  const openInquiry = (service: InquiryService = "") => {
    setInquiryService(service);
    setInquiryOpen(true);
    setMenuOpen(false);
  };

  return (
    <div id="top" className="min-h-screen overflow-x-clip bg-background text-foreground">
      <Header
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((current) => !current)}
        onCloseMenu={() => setMenuOpen(false)}
        onInquire={() => openInquiry()}
      />

      <main>
        <section ref={heroRef} id="hero" className="hero-texture relative overflow-hidden bg-black text-white">
          <div className="hero-grid" aria-hidden />
          <div className="content-width relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-between section-pad pb-8 pt-20 sm:pb-10 sm:pt-28 lg:pt-32">
            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/[0.42] sm:text-[11px]">
              <span>IncludeBrake / operational clarity</span>
              <span>01 / 04</span>
            </div>

            <div className="relative z-10 max-w-[1040px] py-20 sm:py-24 lg:py-28">
              <motion.h1
                className="max-w-5xl font-sans text-[clamp(3.35rem,9.5vw,9.5rem)] font-extrabold leading-[0.86] tracking-[-0.078em]"
                initial={reduce ? false : { opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
              >
                Remove the
                <br />
                <span className="text-white/[0.52]">Bottleneck.</span>
                <br />
                Keep Your Software.
              </motion.h1>

              <motion.div
                className="mt-10 max-w-[650px] sm:mt-12"
                initial={reduce ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[15px] leading-relaxed text-white/[0.66] sm:text-lg sm:leading-relaxed">
                  We find the single administrative loop slowing down your shop floor or fleet.
                  Then we build a clean bridge across the tools you already use, keep your crew
                  in control, and measure the hours saved.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => openInquiry()}
                    className="pill-button inline-flex h-12 items-center justify-center gap-3 bg-white px-6 text-sm font-bold text-black transition hover:bg-white/[0.84]"
                  >
                    Talk through the bottleneck
                    <span className="button-arrow" aria-hidden>↗</span>
                  </button>
                  <a
                    href="#services"
                    className="pill-button inline-flex h-12 items-center justify-center border border-white/25 px-6 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
                  >
                    See the two ways we work
                  </a>
                </div>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.13em] text-white/[0.34] sm:text-[11px]">
                  No software migrations. No disruption to active bays or trucks.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="relative z-10 flex items-end justify-between gap-8 border-t border-white/[0.15] pt-5"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.34 }}
            >
              <span className="max-w-[230px] text-xs leading-relaxed text-white/[0.44]">
                Administrative drag lives between the field and the desk.
              </span>
              <a
                href="#workflows"
                className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/[0.66] transition hover:text-white"
              >
                Find the drag
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" aria-hidden />
              </a>
            </motion.div>

            <motion.img
              src={HERO_LOGO_URL}
              alt=""
              width={520}
              height={420}
              aria-hidden
              style={reduce ? undefined : { y: markY, rotate: markRotate }}
              className="pointer-events-none absolute -bottom-16 -right-28 hidden h-[390px] w-[520px] object-contain opacity-[0.18] invert grayscale mix-blend-screen md:block lg:-right-8 lg:h-[500px] lg:w-[620px]"
            />
          </div>
        </section>

        <section aria-label="Industries and operating principle" className="ticker-shell border-b border-black/10 bg-white text-black">
          <div className="flex w-max whitespace-nowrap">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="ticker-track flex shrink-0 items-center gap-8 px-5 py-4 sm:gap-12 sm:px-8"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {STRIP_ITEMS.map((item) => (
                  <span key={`${copy}-${item}`} className="inline-flex items-center gap-8 font-mono text-[10px] uppercase tracking-[0.16em] text-black/[0.58] sm:gap-12 sm:text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-black" aria-hidden />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <HomeSections onInquire={openInquiry} />
      </main>

      <InquiryDialog open={inquiryOpen} onOpenChange={setInquiryOpen} defaultService={inquiryService} />
    </div>
  );
}

function Header({
  menuOpen,
  onMenuToggle,
  onCloseMenu,
  onInquire,
}: {
  menuOpen: boolean;
  onMenuToggle: () => void;
  onCloseMenu: () => void;
  onInquire: () => void;
}) {
  const reduceMenu = useReducedMotion();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/[0.94] text-white backdrop-blur-xl">
      <div className="content-width section-pad flex min-h-[72px] items-center justify-between gap-6">
        <a href="#top" className="group inline-flex items-center gap-3" onClick={onCloseMenu}>
          <img src={LOGO_URL} alt="" width={42} height={34} className="h-8 w-10 object-contain invert grayscale transition-opacity group-hover:opacity-70" />
          <span className="text-[15px] font-extrabold tracking-[-0.045em]">IncludeBrake</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-[12px] font-semibold text-white/[0.56] transition hover:text-white">
              {item.label}
            </a>
          ))}
          <button type="button" onClick={onInquire} className="pill-button inline-flex h-11 items-center justify-center bg-white px-5 text-[12px] font-bold text-black transition hover:bg-white/[0.84]">
            Let&apos;s talk
          </button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button type="button" onClick={onInquire} className="pill-button inline-flex h-10 items-center justify-center bg-white px-4 text-xs font-bold text-black transition hover:bg-white/[0.84]">
            Let&apos;s talk
          </button>
          <button type="button" aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={onMenuToggle} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-white/60">
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="mobile-nav"
            className="overflow-hidden border-t border-white/10 bg-black px-5 py-5 lg:hidden"
            initial={reduceMenu ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMenu ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduceMenu ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile" className="content-width flex flex-col">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} onClick={onCloseMenu} className="border-b border-white/10 py-4 text-lg font-semibold text-white/75 transition hover:text-white">
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
