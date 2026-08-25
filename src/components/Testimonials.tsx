import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function Testimonials() {
  const { testimonials } = site;

  return (
    <section className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 max-w-2xl">
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-blush/60" />
            {testimonials.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-none tracking-[-0.01em]">
            {testimonials.heading}
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <Reveal key={t.person} delay={i * 110}>
              <figure className="flex h-full flex-col justify-between rounded-sm border border-line bg-ink-2/50 p-8 transition-colors duration-500 hover:border-blush/30">
                <span className="font-display text-5xl leading-none text-blush/50">
                  &ldquo;
                </span>
                <blockquote className="mt-4 flex-1 text-[0.95rem] font-light leading-[1.85] text-cream/90">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-line pt-5">
                  <p className="text-sm text-cream">{t.person}</p>
                  <p className="mt-1 text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                    {t.title}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
