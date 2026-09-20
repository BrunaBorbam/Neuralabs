'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';

/**
 * Static image by default (fast, no network cost) — the video only loads
 * and plays when the visitor hovers the card, once, and holds on its last
 * frame. Never loops: the source clips are a one-shot "reveal" (a flat
 * card bursting into a 3D scene), not an ambient loop, so looping would
 * jump visibly from the end back to the start.
 *
 * On touch devices (no real hover) it just shows the poster image — the
 * video is skipped entirely rather than guessing at a tap-to-play affordance.
 */
export const HoverRevealVideo = ({
  image,
  video,
  alt,
  className = '',
}: {
  image: string;
  /** Base path without extension, e.g. '/videos/verticals/airbnb' — resolved
   * to both a .webm (smaller, tried first) and a .mp4 (universal fallback,
   * required for Safari, which doesn't support WebM) source. */
  video?: string;
  alt: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  if (!video) {
    return (
      <Image
        src={image}
        alt={alt}
        fill
        loading="lazy"
        sizes="(min-width: 768px) 50vw, 100vw"
        className={className}
      />
    );
  }

  const handleEnter = () => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    setActive(true);
    const el = videoRef.current;
    if (el) {
      el.currentTime = 0;
      el.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <div className="absolute inset-0" onPointerEnter={handleEnter} onPointerLeave={handleLeave}>
      <Image
        src={image}
        alt={alt}
        fill
        loading="lazy"
        sizes="(min-width: 768px) 50vw, 100vw"
        className={`${className} transition-opacity duration-300 ${active ? 'opacity-0' : 'opacity-100'}`}
      />
      <video
        ref={videoRef}
        muted
        playsInline
        preload="none"
        poster={image}
        className={`${className} absolute inset-0 w-full h-full transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src={`${video}.webm`} type="video/webm" />
        <source src={`${video}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
};
