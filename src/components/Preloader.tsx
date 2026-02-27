"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) return;

    // Prevent scrolling and lenis interaction while preloader is active
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        gsap.set(container, { display: "none" });
        // Dispatch a custom event to notify components that preloader finished
        window.dispatchEvent(new Event("preloaderComplete"));
      },
    });

    // 1. Fade in the text with wide tracking
    tl.fromTo(
      text,
      { opacity: 0, letterSpacing: "1em", x: "0.5em" }, // Offset x to keep it visually centered due to letter-spacing
      {
        opacity: 1,
        letterSpacing: "1.5em",
        x: "0.75em",
        duration: 1.5,
        ease: "power2.out",
      },
    )
      // 2. Track out the text slightly while holding
      .to(text, {
        letterSpacing: "2.5em",
        x: "1.25em",
        duration: 1.5,
        ease: "none",
      })
      // 3. Fade out the text
      .to(text, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.5")
      // 4. Slide up the black screen to reveal the site (Mictlán awakes)
      .to(
        container,
        { yPercent: -100, duration: 1.3, ease: "expo.inOut" },
        "-=0.1",
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className='fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-obsidian'
    >
      <h1
        ref={textRef}
        className='font-heading text-4xl font-bold tracking-widest text-parchment/80 uppercase md:text-6xl'
      >
        Mictlán
      </h1>
    </div>
  );
}
