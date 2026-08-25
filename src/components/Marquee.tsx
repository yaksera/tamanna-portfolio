import { site } from "@/content/site";

export default function Marquee() {
  const items = [...site.marquee, ...site.marquee, ...site.marquee];

  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-2 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-2 to-transparent" />

      <div className="marquee-track flex w-max items-center gap-10">
        {items.concat(items).map((word, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl font-light tracking-wide text-cream/85 md:text-3xl">
              {word}
            </span>
            <span className="text-blush">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
