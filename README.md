# Tamanna Shrestha — Portfolio

A Next.js portfolio site built around the hero film, with a charcoal + soft-blush
brand palette sampled from the video itself.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000   runit
```

```bash
npm run build && npm run start   # production
```

Node 18.18+ (20 or 22 recommended).

## Editing the site

**All copy lives in one file: `src/content/site.ts`.** Name, tagline, bio, stats,
digitals, lookbook captions, services, credits, testimonials, contact details and
social links are all there. Nothing else needs touching to change the text.

## Brand

Defined once as design tokens in `src/app/globals.css` under `@theme`:

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#0a0a0c` | page background |
| `ink-2` / `ink-3` | `#101014` / `#17171c` | raised panels |
| `cream` | `#f3efec` | primary text |
| `muted` | `#9b9490` | secondary text |
| `blush` | `#e7b3b6` | accent |
| `blush-2` | `#c98a90` | accent, deeper |

Change a value there and it updates everywhere (`bg-ink`, `text-blush`, …).

Type: **Cormorant Garamond** for display, **Jost** for interface — both
self-hosted via `@fontsource`, so there is no Google Fonts request at build or
runtime.

## The video

`src/components/VideoLoop.tsx` is the reusable looping-film component. It is
used three times — hero, the reel band, and behind the contact section — each at
a different playback rate and opacity.

It handles the things background video usually gets wrong:

- `muted` + `playsInline` + `autoPlay` so mobile browsers actually allow it
- `loop` for seamless, endless playback
- picks the encode on mount with `matchMedia` — `hero-720.mp4` on phones,
  `hero.webm` on desktop where VP9 is supported, `hero.mp4` otherwise — and
  falls through to the next file if a browser can't decode the first
- the poster is painted as a CSS background *behind* the video, so a slow or
  failed load degrades to a still frame instead of a black rectangle
- treats "already loaded" as a state, not just an event: a cached video fires
  `loadeddata` before React can attach a handler, which would otherwise leave
  the video stuck invisible on refresh
- pauses when scrolled off screen, but never on the observer's first callback
  (that one can report a false negative while layout is still settling, which
  freezes the hero on frame one)
- if autoplay is refused — Edge/Chrome energy saver, iOS low power mode — it
  retries on the first click, tap or scroll rather than staying frozen

Two things to know when editing it:

**Use the `fit` prop, never an `object-*` class.** `<VideoLoop fit="contain" />`
is correct; `<VideoLoop className="object-contain" />` looks right and does
nothing. Both `object-cover` and `object-contain` are real Tailwind utilities,
so putting both on one element does not let the later one win — the stylesheet's
own ordering decides, and `object-cover` sorts last. All three placements use
`fit="contain"` so the whole frame is always visible.

**Bump `V` in `VideoLoop.tsx` whenever you re-encode the films.** It appends
`?v=N` to the media URLs. Browsers cache video aggressively and serve it back
without revalidating, so replacing a file under the same name can leave people
watching the previous cut for days.

### Swapping in a different film

Replace the files in `public/media/` keeping the same names:

| File | What it is |
| --- | --- |
| `hero.mp4` | 1920px h.264, no audio track, `+faststart` |
| `hero.webm` | 1600px VP9 |
| `hero-720.mp4` | 1280px h.264, phones |
| `poster.jpg` | first-frame still |

The hero shows the film **uncropped** (`object-contain`), so the whole walk is
visible — head to shoes — at every window size. That is why the type is held to
the left two-fifths on desktop and sits below the film on phones: nothing is
allowed to cover her.

The source had a "Veo" generation watermark in the bottom-right corner, which
full-bleed cropping used to hide. Since nothing is cropped now, it is painted
out at encode time with ffmpeg's `delogo` filter (it interpolates from the
surrounding pixels — on the dark studio floor the repair is invisible):

```bash
-vf "delogo=x=1845:y=1026:w=68:h=46,scale=1920:-2"
```

Drop that filter from the commands below if you replace the footage with your
own clean film.

### Why the loop is 5.5s, not 8s

In the original clip she walks toward the camera, and from roughly **6.0s
onward the top of her head is clipped by the frame** — that is in the source
footage itself, not something the layout does, so no amount of CSS can bring it
back. The encode trims to the range where her head is whole, and blends the
last 0.15s into the first so the loop point does not pop:

```bash
-filter_complex "[0:v]delogo=x=1845:y=1026:w=68:h=46,split[a][b];\
  [a]trim=0:5.5,setpts=PTS-STARTPTS[main];\
  [b]trim=5.5:5.65,setpts=PTS-STARTPTS[tail];\
  [tail][main]xfade=transition=fade:duration=0.15:offset=0,scale=1920:-2[v]" -map "[v]"
```

If you reshoot, leave headroom above her for the whole take and you can drop
both the trim and the delogo.

Encoding commands used for the current files:

```bash
ffmpeg -i source.mp4 -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p \
  -movflags +faststart -vf scale=1920:-2 hero.mp4
ffmpeg -i source.mp4 -an -c:v libvpx-vp9 -crf 36 -b:v 0 -vf scale=1600:-2 hero.webm
ffmpeg -i source.mp4 -vf "select=eq(n\,20)" -frames:v 1 -q:v 3 poster.jpg
```

Stripping the audio track (`-an`) matters — it is what lets browsers autoplay.

The lookbook stills (`look-01…06.jpg`) and `about.jpg` are frames pulled from
the same film as placeholders. Swap them for real shots when you have them; the
grid expects roughly 3:4 portraits.

## Contact form

`src/components/Contact.tsx` currently opens the visitor's mail client with the
fields pre-filled — no backend needed. To wire up a real endpoint, replace the
`window.location.href = mailto:…` line in `handleSubmit` with a `fetch()` to
Formspree, Resend, or a Next.js route handler.

## Deploy

Any Next.js host works. On Vercel: push to a Git repo, import it, no config
needed. Before going live, update in `src/content/site.ts` and
`src/app/layout.tsx`:

- the real email and phone
- the social URLs (currently pointing at instagram.com / linkedin.com)
- `metadataBase` and the OpenGraph `url` (currently `tamannashrestha.com`)

## Structure

```
src/
  app/
    layout.tsx      fonts, metadata, OpenGraph
    globals.css     brand tokens, animations, utilities
    page.tsx        section order
  components/
    Nav, Hero, Marquee, About, Lookbook, Reel,
    Services, Experience, Testimonials, Contact, Footer
    VideoLoop       the looping film
    Reveal          fade-up-on-scroll wrapper
  content/
    site.ts         ← all the words
public/media/       video + stills
```

Motion respects `prefers-reduced-motion`: the marquee, scroll cue and reveal
animations all switch off for visitors who ask for that.
