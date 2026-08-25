"use client";

import { useState } from "react";
import { site } from "@/content/site";
import Reveal from "./Reveal";
import VideoLoop from "./VideoLoop";

const fieldClass =
  "w-full border-b border-line bg-transparent px-0 py-3.5 text-sm font-light text-cream placeholder:text-muted/70 outline-none transition-colors duration-300 focus:border-blush";

export default function Contact() {
  const { contact } = site;
  const [sent, setSent] = useState(false);

  /**
   * No backend is wired up, so the form opens the visitor's mail client
   * pre-filled. Swap this for a fetch() to your form endpoint
   * (Formspree, Resend, a Next.js route handler…) when you have one.
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const project = String(data.get("project") ?? "");
    const dates = String(data.get("dates") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = encodeURIComponent(`Booking enquiry — ${project || "Project"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nProject: ${project}\nDates: ${dates}\n\n${message}`,
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="grain relative overflow-hidden">
      {/* third infinite-loop film, sunk deep into the background — contained
          like the others so she is never cut, even at this opacity */}
      <div className="absolute inset-0 opacity-25">
        <VideoLoop rate={0.5} fit="contain" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/92 to-ink" />
      <div
        className="absolute inset-0 opacity-40 mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(45% 45% at 80% 20%, rgba(231,179,182,0.6), transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-16 px-6 py-28 md:px-10 md:py-40 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-blush/60" />
              {contact.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-light leading-[1.02] tracking-[-0.01em]">
              {contact.heading}
            </h2>
            <p className="mt-7 max-w-md text-sm font-light leading-[1.85] text-muted">
              {contact.body}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <dl className="mt-12 space-y-6 border-t border-line pt-8">
              <div>
                <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-muted">
                  Email
                </dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lg font-light text-cream transition-colors hover:text-blush"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-muted">
                  Phone
                </dt>
                <dd className="mt-1.5 text-lg font-light text-cream">
                  {site.phone}
                </dd>
              </div>
              <div>
                <dt className="text-[0.62rem] uppercase tracking-[0.24em] text-muted">
                  Based in
                </dt>
                <dd className="mt-1.5 text-lg font-light text-cream">
                  {site.location} · {site.availability}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-sm border border-line bg-ink-2/70 p-8 backdrop-blur-sm md:p-10"
          >
            <div className="grid gap-7 sm:grid-cols-2">
              <label className="block">
                <span className="text-[0.62rem] uppercase tracking-[0.24em] text-muted">
                  Your name
                </span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="text-[0.62rem] uppercase tracking-[0.24em] text-muted">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="studio@brand.com"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="text-[0.62rem] uppercase tracking-[0.24em] text-muted">
                  Project type
                </span>
                <input
                  name="project"
                  placeholder="Campaign, editorial, runway…"
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="text-[0.62rem] uppercase tracking-[0.24em] text-muted">
                  Shoot dates
                </span>
                <input
                  name="dates"
                  placeholder="e.g. 12–14 September"
                  className={fieldClass}
                />
              </label>
            </div>

            <label className="mt-7 block">
              <span className="text-[0.62rem] uppercase tracking-[0.24em] text-muted">
                The brief
              </span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Concept, location, usage and budget range."
                className={`${fieldClass} resize-none`}
              />
            </label>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <button
                type="submit"
                className="group inline-flex items-center gap-3 rounded-full bg-cream px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-blush"
              >
                Send enquiry
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
              {sent && (
                <p className="text-xs text-blush">
                  Opening your mail app — if nothing happens, write to{" "}
                  {site.email}.
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
