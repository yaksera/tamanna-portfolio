import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <a
          href="#top"
          className="font-display text-2xl tracking-[0.16em] text-cream transition-colors hover:text-blush"
        >
          {site.name}
          <span className="text-blush">.</span>
        </a>

        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="text-[0.68rem] uppercase tracking-[0.22em] text-muted transition-colors hover:text-blush"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-[0.62rem] uppercase tracking-[0.2em] text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
