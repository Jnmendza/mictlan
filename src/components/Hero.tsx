"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Elements down and faded
      gsap.set(".hero-title, .hero-subtitle, .hero-scroll", {
        y: 50,
        opacity: 0,
      });

      // Animate up and fade in with stagger
      const tl = gsap.timeline();

      tl.to(".hero-title", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
      })
        .to(
          ".hero-subtitle",
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
          },
          "-=1.2",
        )
        .to(
          ".hero-scroll",
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
          },
          "-=1.2",
        );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className='relative flex min-h-screen w-full flex-col items-center justify-center bg-obsidian text-parchment overflow-hidden'
    >
      <div className='z-10 flex flex-col items-center px-4 text-center'>
        <h1 className='hero-title font-heading text-7xl font-bold tracking-tight text-parchment drop-shadow-2xl md:text-9xl'>
          MICTLÁN
        </h1>
        <p className='hero-subtitle mt-6 max-w-2xl font-sans text-xl text-parchment/80 md:text-3xl'>
          A Journey Through Oaxaca&apos;s Día de los Muertos
        </p>
      </div>

      <div className='hero-scroll absolute bottom-12 flex flex-col items-center gap-3 text-accent-marigold transition-colors hover:text-white'>
        <span className='text-sm uppercase tracking-widest text-parchment/70'>
          Scroll to explore
        </span>
        <ChevronDown className='h-8 w-8 animate-bounce' />
      </div>
    </section>
  );
}
