import { site } from "@/content/site";
import Reveal from "./Reveal";
import VideoLoop from "./VideoLoop";

export default function Reel() {
  return (
    <section className="grain relative h-[85svh] min-h-[560px] w-full overflow-hidden">
      {/* Second infinite-loop film — mirrored and slowed for contrast against
          the hero.

          `object-contain` again: the frame is never cut vertically, so her
          head and her shoes stay in shot. The horizontal shift moves her off
          centre to clear the quote — that only ever pushes empty studio wall
          out of view, never her. */}
      <div
        className="absolute inset-0"
        style={{ transform: "translateX(-14%) scaleX(-1)" }}
      >
        <VideoLoop rate={0.6} fit="contain" />
      </div>

      {/* Right-weighted scrim on wide screens, bottom-weighted on phones */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20 md:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-l from-ink from-22% via-ink/70 via-52% to-transparent md:block" />

      {/* Shallow edge fades only — enough to blend the letterbox bars into the
          page, not deep enough to reach her. */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink to-transparent" />

      <div
        className="absolute inset-0 opacity-35 mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(45% 55% at 26% 45%, rgba(231,179,182,0.75), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-6 md:px-10">
        <Reveal className="ml-auto max-w-xl text-center md:text-right">
          <p className="eyebrow mb-8">The Reel</p>
          <p className="font-display text-[clamp(1.6rem,3.4vw,2.9rem)] font-light italic leading-[1.22] text-cream">
            &ldquo;Stillness photographs louder than a pose. I&rsquo;d rather give
            you one honest frame than fifty busy ones.&rdquo;
          </p>
          <p className="mt-8 text-[0.68rem] uppercase tracking-[0.3em] text-muted">
            {site.name} — {site.role}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
