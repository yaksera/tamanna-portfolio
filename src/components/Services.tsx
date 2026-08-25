import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function Services() {
  const { services } = site;

  return (
    <section id="services" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 max-w-2xl">
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-blush/60" />
            {services.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-none tracking-[-0.01em]">
            {services.heading}
          </h2>
        </Reveal>

        <div className="border-t border-line">
          {services.items.map((item, i) => (
            <Reveal key={item.no} delay={i * 80}>
              <article className="group grid grid-cols-1 items-start gap-4 border-b border-line py-9 transition-colors duration-500 hover:bg-ink-2/50 md:grid-cols-12 md:gap-8 md:px-4">
                <p className="font-display text-lg text-blush md:col-span-1">
                  {item.no}
                </p>
                <h3 className="font-display text-2xl font-light leading-tight text-cream transition-transform duration-500 md:col-span-4 md:text-3xl md:group-hover:translate-x-2">
                  {item.title}
                </h3>
                <p className="text-sm font-light leading-[1.85] text-muted md:col-span-6">
                  {item.body}
                </p>
                <span className="hidden text-right text-lg text-muted transition-all duration-500 group-hover:text-blush md:col-span-1 md:block">
                  →
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
