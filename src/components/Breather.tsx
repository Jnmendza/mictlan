"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { handleMouseMove } from "@/utils/handle-mouse-move";

// Ensure plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Breather() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spanishRef = useRef<HTMLParagraphElement>(null);
  const englishRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      // 1. Enter animation for the whole content block
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        },
      );

      // 2. Scrubbed translation animation using GSAP timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrub effect (Lenis complements this perfectly)
        },
      });

      // Cinematic slow push-in over the entire scroll
      tl.to(
        contentRef.current,
        {
          scale: 1.05,
          duration: 1,
          ease: "none",
        },
        0,
      );

      // 3. The flashy transition sequence

      // Spanish explodes outward and flips up
      tl.to(
        spanishRef.current,
        {
          opacity: 0,
          y: -80,
          z: 100, // 3D perspective pop
          rotationX: 45, // Tips backward
          scale: 1.2, // Explodes towards the viewer
          filter: "blur(24px)", // Heavy blur
          duration: 0.5,
          ease: "back.in(1.5)",
        },
        0.3, // Starts translation effect at 30% scroll progress
      );

      // English pulls in from an exploded, flipped state
      tl.fromTo(
        englishRef.current,
        {
          opacity: 0,
          y: 80,
          z: -100, // Starts far away
          rotationX: -45, // Tipped forward
          scale: 0.8, // Starts small
          filter: "blur(24px)",
          letterSpacing: "0.5em", // Starts wide
        },
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotationX: 0,
          scale: 1,
          filter: "blur(0px)",
          letterSpacing: "0.1em", // Snaps to normal tracking
          duration: 0.5,
          ease: "back.out(1.5)",
        },
        0.5, // Starts at 50% scroll progress, overlapping slightly
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className='relative h-[400vh] w-full bg-obsidian'>
      <div className='sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-[10vw]'>
        <div
          ref={contentRef}
          className='flex w-full flex-col items-center justify-center'
        >
          <div className='relative flex h-32 w-full max-w-4xl items-center justify-center text-center md:h-40'>
            {/* Spanish Version (Interactive) */}
            <p
              ref={spanishRef}
              onMouseMove={(e) => handleMouseMove(e, spanishRef)}
              style={{
                background: `
                  radial-gradient(
                    circle 120px at var(--mouse-x, -100%) var(--mouse-y, -100%),
                    #d90429 0%,
                    transparent 100%
                  ),
                  #fcf9f2 /* parchment fallback */
                `,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent", // Fallback for non-webkit
                backgroundClip: "text",
              }}
              className='pointer-events-auto absolute font-sans text-xl font-light leading-relaxed tracking-[0.1em] md:text-3xl lg:text-4xl transition-colors duration-300'
            >
              &quot;Una civilización que niega a la{" "}
              <span className='font-heading'>muerte</span>,
              <br className='hidden md:block' /> acaba por negar la vida.&quot;
            </p>

            {/* English Version (Interactive) */}
            <p
              ref={englishRef}
              onMouseMove={(e) => handleMouseMove(e, englishRef)}
              style={{
                background: `
                  radial-gradient(
                    circle 120px at var(--mouse-x, -100%) var(--mouse-y, -100%),
                    #fca311 0%,
                    transparent 100%
                  ),
                  #fcf9f2 /* parchment fallback */
                `,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent", // Fallback for non-webkit
                backgroundClip: "text",
              }}
              className='pointer-events-auto absolute font-sans text-xl font-light leading-relaxed tracking-[0.1em] opacity-0 transition-colors duration-300 md:text-3xl lg:text-4xl'
            >
              &quot;A civilization that denies death
              <br className='hidden md:block' /> ends up denying{" "}
              <span className='font-heading'>life</span>.&quot;
            </p>
          </div>

          {/* Author */}
          <div className='mt-16 md:mt-24'>
            <p className='font-sans text-xs font-light tracking-[0.2em] text-parchment/60 uppercase md:text-sm'>
              - Octavio <span className='font-heading'>Paz</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
