import Image from "next/image";
import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function About() {
  const { about, stats, measurements } = site;

  return (
    <section id="about" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Portrait */}
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src="/media/about.jpg"
                alt={`${site.name} portrait`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </div>
            <div className="pointer-events-none absolute -bottom-5 -right-5 hidden h-32 w-32 border-b border-r border-blush/40 md:block" />
          </div>

          <p className="mt-6 text-[0.68rem] uppercase tracking-[0.28em] text-muted">
            {about.signatureNote}
          </p>
        </Reveal>

        {/* Copy */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-blush/60" />
              {about.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.01em]">
              {about.heading}
            </h2>
          </Reveal>

          {about.body.map((p, i) => (
            <Reveal key={i} delay={120 + i * 100}>
              <p className="mt-7 max-w-xl text-[0.95rem] font-light leading-[1.85] text-muted">
                {p}
              </p>
            </Reveal>
          ))}

          {/* Stats */}
          <Reveal delay={200}>
            <div className="mt-14 grid grid-cols-2 gap-y-10 border-t border-line pt-10 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl font-light text-blush md:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-2 max-w-[9rem] text-[0.68rem] uppercase leading-relaxed tracking-[0.18em] text-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Digitals */}
          <Reveal delay={260}>
            <div className="mt-14 rounded-sm border border-line bg-ink-2/60 p-7">
              <p className="eyebrow mb-6">Digitals</p>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
                {measurements.map((m) => (
                  <div key={m.k}>
                    <dt className="text-[0.62rem] uppercase tracking-[0.2em] text-muted">
                      {m.k}
                    </dt>
                    <dd className="mt-1 text-sm font-light text-cream">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
