import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function Experience() {
  const { experience } = site;

  return (
    <section
      id="experience"
      className="relative border-y border-line bg-ink-2 px-6 py-28 md:px-10 md:py-36"
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-blush/60" />
            {experience.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-none tracking-[-0.01em]">
            {experience.heading}
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-muted">
            Full CV, references and unretouched digitals available on request.
          </p>
        </Reveal>

        <div className="lg:col-span-8">
          <ul>
            {experience.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 70} as="li">
                <div className="group flex flex-col gap-1 border-b border-line py-6 transition-colors duration-500 first:border-t sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="w-16 shrink-0 font-display text-lg text-blush">
                    {item.year}
                  </span>
                  <span className="flex-1 text-base font-light text-cream transition-transform duration-500 sm:group-hover:translate-x-1.5">
                    {item.title}
                  </span>
                  <span className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">
                    {item.role}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
