import { site } from "@/content/site";
import VideoLoop from "./VideoLoop";

export default function Hero() {
  const { hero } = site;

  return (
    <section
      id="top"
      className="grain relative flex min-h-[100svh] w-full flex-col overflow-hidden pt-[68px] md:pt-0"
    >
      {/* No header band: the nav is transparent and floats over the film, so
          the frame runs to the very top of the window. Phones keep a little
          top padding because their video band is short enough that the nav
          would otherwise land on her head. */}
      <div className="relative flex flex-1 flex-col">
        {/* ── The film, complete and uncropped ────────────
            `object-contain` means every frame is shown whole — head to
            shoes, nothing trimmed. On desktop it fills the section behind
            the type; on phones it becomes a 16:9 band with the type
            underneath, because a contained 16:9 frame in a portrait window
            is too short to hold text over. */}
        <div className="relative aspect-video w-full shrink-0 overflow-hidden border-b border-line md:absolute md:inset-0 md:aspect-auto md:border-0">
          <VideoLoop priority rate={0.82} fit="contain" />

          {/* Edge blends: the letterbox bars are the same ink as the page, so
              these keep the joins from reading as hard seams, and give the
              type something to sit on. They stop well short of her. */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-ink via-ink/55 to-transparent md:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-32 bg-gradient-to-l from-ink to-transparent md:block" />
          {/* A shallow top wash so the floating nav stays readable over the
              bright spotlight in the top-right of the frame. It is short and
              light on purpose: it fades out above her face, and only ever
              touches the top of her hair. No bottom fade at all — that would
              shade her shoes. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-28 bg-gradient-to-b from-ink/75 via-ink/25 to-transparent md:block" />

          {/* whisper of blush light, pulled from the video's warm key */}
          <div
            className="pointer-events-none absolute inset-0 opacity-35 mix-blend-soft-light"
            style={{
              background:
                "radial-gradient(55% 50% at 74% 20%, rgba(231,179,182,0.55), transparent 70%)",
            }}
          />
        </div>

        {/* ── Type ────────────────────────────────────────
            Held to the left two-fifths on desktop — the part of the frame
            that is empty studio — so nothing ever covers her. */}
        <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-12 md:px-10 md:py-0">
          <div className="w-full md:max-w-[40%]">
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-blush/60" />
              {hero.eyebrow}
            </p>

            <h1 className="font-display font-light leading-[0.88] tracking-[-0.02em]">
              <span className="block text-[clamp(2.6rem,8vw,8.5rem)] text-cream">
                {hero.line1}
              </span>
              <span className="block text-[clamp(2.6rem,8vw,8.5rem)] italic text-blush">
                {hero.line2}
              </span>
            </h1>

            <div className="mt-8 border-t border-line pt-7">
              <p className="max-w-md text-sm font-light leading-relaxed text-muted">
                {hero.tagline}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={hero.ctaPrimary.href}
                  className="group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-blush"
                >
                  {hero.ctaPrimary.label}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href={hero.ctaSecondary.href}
                  className="inline-flex items-center rounded-full border border-line px-7 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-cream transition-all duration-300 hover:border-cream/40 hover:bg-cream/5"
                >
                  {hero.ctaSecondary.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Side rails ─────────────────────────────────── */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <p className="rotate-180 text-[0.65rem] uppercase tracking-[0.4em] text-muted [writing-mode:vertical-rl]">
          {site.location}
        </p>
      </div>
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <ul className="flex flex-col items-center gap-6">
          {site.socials.slice(0, 3).map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rotate-180 text-[0.65rem] uppercase tracking-[0.35em] text-muted transition-colors hover:text-blush [writing-mode:vertical-rl]"
              >
                {s.label}
              </a>
            </li>
          ))}
          <li className="h-16 w-px bg-gradient-to-b from-line to-transparent" />
        </ul>
      </div>

      {/* ── Scroll cue ─────────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-6 right-10 z-10 hidden md:block lg:right-20">
        <div className="scroll-cue flex flex-col items-center gap-2">
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted">
            Scroll
          </span>
          <span className="h-8 w-px bg-gradient-to-b from-blush to-transparent" />
        </div>
      </div>
    </section>
  );
}
