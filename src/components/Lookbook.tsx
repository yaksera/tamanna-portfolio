import Image from "next/image";
import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function Lookbook() {
  const { lookbook } = site;

  return (
    <section id="lookbook" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-blush/60" />
              {lookbook.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-none tracking-[-0.01em]">
              {lookbook.heading}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-sm text-sm font-light leading-relaxed text-muted">
              {lookbook.intro}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lookbook.items.map((item, i) => (
            <Reveal key={item.src} delay={(i % 3) * 110}>
              <figure className="group relative cursor-pointer overflow-hidden rounded-sm bg-ink-2">
                <div
                  className={`relative ${
                    item.span === "tall" ? "aspect-[3/4.4]" : "aspect-[3/3.6]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
                  <div className="absolute inset-0 bg-blush/0 transition-colors duration-700 group-hover:bg-blush/10" />
                </div>

                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div className="translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                    <p className="font-display text-2xl font-light leading-tight text-cream">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-blush">
                      {item.meta}
                    </p>
                  </div>
                  <span className="mb-1 shrink-0 text-lg text-cream opacity-0 transition-all duration-500 group-hover:opacity-100">
                    ↗
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
