"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        {/* The links sit in a left-hand group rather than across the middle:
            the bar is transparent over the hero film, and she stands dead
            centre of frame. Centred links landed on her head. */}
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
          <div className="flex items-center gap-8 lg:gap-12">
            <a
              href="#top"
              className="font-display text-xl leading-none tracking-[0.18em] text-cream drop-shadow-[0_1px_10px_rgba(10,10,12,0.9)] transition-colors hover:text-blush"
            >
              {site.name.split(" ")[0]}
              <span className="text-blush">.</span>
            </a>

            <ul className="hidden items-center gap-7 md:flex">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group relative text-[0.68rem] uppercase tracking-[0.2em] text-cream/70 drop-shadow-[0_1px_10px_rgba(10,10,12,0.9)] transition-colors hover:text-cream"
                  >
                    {item.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-blush transition-all duration-400 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <a
            href="#contact"
            className="hidden rounded-full border border-cream/25 bg-ink/30 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.22em] text-cream backdrop-blur-md transition-all duration-300 hover:border-blush hover:bg-blush hover:text-ink md:inline-block"
          >
            Book
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span
              className={`h-px w-6 bg-cream transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-cream transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 bg-ink transition-all duration-500 md:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center gap-2 px-8">
          {site.nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              className={`font-display text-4xl tracking-wide text-cream transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            onClick={() => setOpen(false)}
            className="mt-8 text-sm tracking-[0.15em] text-blush"
          >
            {site.email}
          </a>
        </div>
      </div>
    </>
  );
}
