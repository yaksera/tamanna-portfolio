"use client";

import { useEffect, useRef, useState } from "react";

type Fit = "cover" | "contain";

type Props = {
  /**
   * How the film fills its box.
   *  - "contain" shows the whole frame, letterboxed. Nothing is ever cut.
   *  - "cover" fills the box and crops whatever does not fit.
   *
   * This is a prop rather than something you pass through `className`,
   * because `object-cover` and `object-contain` are both real Tailwind
   * utilities: putting both on one element does NOT let the later one win.
   * The winner is decided by their order in the generated stylesheet, and
   * `object-cover` sorts after `object-contain` — so a passed-in
   * `object-contain` was silently losing to the built-in `object-cover`.
   */
  fit?: Fit;
  /** Extra classes for the <video> element itself. */
  className?: string;
  /** Playback rate — under 1 gives the film a slower, editorial feel. */
  rate?: number;
  poster?: string;
  priority?: boolean;
};

/* Written out in full so Tailwind's scanner can see both class names. */
const FIT_CLASS: Record<Fit, string> = {
  cover: "object-cover",
  contain: "object-contain",
};

const POSTER_FIT_CLASS: Record<Fit, string> = {
  cover: "bg-cover",
  contain: "bg-contain bg-no-repeat",
};

/**
 * Bump this whenever you re-encode the films. Browsers cache video hard — and
 * serve it back without revalidating — so replacing a file under the same name
 * can leave people watching the previous cut for days. The query string is
 * ignored by the server and changes the cache key.
 */
const V = "2";

const MP4 = `/media/hero.mp4?v=${V}`;
const MP4_SMALL = `/media/hero-720.mp4?v=${V}`;
const WEBM = `/media/hero.webm?v=${V}`;

/**
 * Seamless, infinitely looping background film.
 *
 * Deliberately defensive — background video has a lot of ways to silently
 * end up as a black rectangle:
 *  - the poster is painted as a CSS background behind the video, so there is
 *    always an image there even if the file never loads
 *  - "already loaded" is checked on mount, not just waited for as an event
 *    (a cached video fires `loadeddata` before React attaches the handler)
 *  - the off-screen pause never fires on the observer's first callback, which
 *    can report a false negative while layout is still settling
 *  - if autoplay is refused (Edge/Chrome energy saver, iOS low power), it
 *    retries on the first user interaction instead of staying frozen
 */
export default function VideoLoop({
  fit = "cover",
  className = "",
  rate = 1,
  poster = `/media/poster.jpg?v=${V}`,
  priority = false,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  // Pick the file on the client. Doing this here rather than with <source
  // media="..."> because that attribute is unreliable outside <picture>:
  // Safari ignores it, and a mis-selection leaves you with no video at all.
  //
  // Every candidate is tried in turn — if a build lacks the codec for one
  // encode (Chromium without proprietary codecs has no H.264, some Linux
  // builds have no VP9) the next one is loaded instead of giving up.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const small = window.matchMedia("(max-width: 767px)").matches;
    const canWebm = v.canPlayType('video/webm; codecs="vp9"') !== "";

    const queue = small
      ? [MP4_SMALL, WEBM, MP4]
      : canWebm
        ? [WEBM, MP4, MP4_SMALL]
        : [MP4, MP4_SMALL, WEBM];

    let i = 0;
    const load = () => {
      v.src = queue[i];
      v.load();
    };

    const onError = () => {
      if (++i < queue.length) load();
    };

    v.addEventListener("error", onError);
    load();

    return () => v.removeEventListener("error", onError);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    v.playbackRate = rate;

    const markReady = () => setReady(true);
    // HAVE_CURRENT_DATA or better means the first frame is already decoded and
    // the loadeddata event has been and gone.
    if (v.readyState >= 2) markReady();
    v.addEventListener("loadeddata", markReady);
    v.addEventListener("canplay", markReady);

    let played = false;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.then(() => {
          played = true;
          markReady();
        }).catch(() => {
          // Autoplay refused — wait for any interaction and try once more.
          const retry = () => {
            v.play()
              .then(markReady)
              .catch(() => {});
            window.removeEventListener("pointerdown", retry);
            window.removeEventListener("touchstart", retry);
            window.removeEventListener("scroll", retry);
          };
          window.addEventListener("pointerdown", retry, { once: true });
          window.addEventListener("touchstart", retry, { once: true });
          window.addEventListener("scroll", retry, { once: true });
        });
      } else {
        played = true;
      }
    };
    tryPlay();

    // Only run the film while it is actually on screen. The first callback is
    // never allowed to pause: it can report a false negative during hydration.
    let first = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlay();
        } else if (!first && played) {
          v.pause();
        }
        first = false;
      },
      { threshold: 0 },
    );
    io.observe(v);

    // Some browsers suspend video on tab blur; resume on return.
    const onVis = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      v.removeEventListener("loadeddata", markReady);
      v.removeEventListener("canplay", markReady);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [rate]);

  return (
    // The poster sits on the wrapper too, so a failed or slow video degrades to
    // a still frame rather than a black box. Its fit matches the video's, so
    // the still is framed exactly like the film with no jump on play.
    <div
      className={`h-full w-full bg-center ${POSTER_FIT_CLASS[fit]}`}
      style={{ backgroundImage: `url(${poster})` }}
    >
      <video
        ref={ref}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        preload={priority ? "auto" : "metadata"}
        poster={poster}
        aria-hidden="true"
        className={`h-full w-full ${FIT_CLASS[fit]} transition-opacity duration-[1200ms] ease-out ${
          ready ? "opacity-100" : "opacity-0"
        } ${className}`}
      >
        {/* No <source> here on purpose: the effect above assigns the right
            file on mount, which avoids fetching two encodes of the same film.
            Without JS the poster background still fills the section. */}
      </video>
    </div>
  );
}
