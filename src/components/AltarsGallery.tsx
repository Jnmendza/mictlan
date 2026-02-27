"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useImageModal } from "./ImageModalProvider";

// Ensure plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const mockImages = [
  {
    id: 1,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/Altars/Altars6.jpg",
    alt: "Altar Offering 1",
  },
  {
    id: 2,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/Altars/Altars2.jpg",
    alt: "Altar Offering 2",
  },
  {
    id: 3,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/Altars/Altars3.jpg",
    alt: "Altar Offering 3",
  },
  {
    id: 4,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/Altars/Altars4.jpg",
    alt: "Altar Offering 4",
  },
  {
    id: 5,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/Altars/Altars5.jpg",
    alt: "Altar Offering 5",
  },
  {
    id: 6,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/Altars/Altars1.jpg",
    alt: "Altar Offering 6",
  },
];

export default function AltarsGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal } = useImageModal();

  useGSAP(
    () => {
      const container = containerRef.current;
      const section = sectionRef.current;
      if (!container || !section) return;

      const getScrollAmount = () => container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          pin: true,
          scrub: 1.5, // Heavier scrub for luxurious horizontal drag
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [] },
  );

  return (
    <section
      ref={sectionRef}
      className='relative flex h-screen w-full items-center overflow-hidden bg-obsidian'
    >
      {/* Subtle Marigold Glow */}
      <div className='pointer-events-none absolute left-1/2 top-1/2 z-0 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-marigold/10 blur-[150px]' />

      {/* Main Flex Container that moves horizontally */}
      <div
        ref={containerRef}
        className='z-10 flex h-full w-max flex-row flex-nowrap items-center gap-[5vw] px-[10vw]'
      >
        {/* Header Block inside the scroll flow */}
        <div className='flex w-[80vw] shrink-0 flex-col items-start justify-center pr-[5vw] md:w-[40vw]'>
          <p className='mb-4 font-sans text-sm tracking-widest text-parchment/60 uppercase'>
            02. The Altars
          </p>
          <h2 className='font-heading text-5xl font-bold leading-tight text-accent-marigold md:text-6xl lg:text-7xl'>
            Offerings to the <br className='hidden lg:block' /> Ancestors
          </h2>
          <p className='mt-6 font-sans text-lg leading-relaxed text-parchment/80'>
            Intimate glow of candlelight, scent of copal, and the vivid colors
            of cempasúchil guide the spirits home. Each ofrenda is a bridge
            between worlds, constructed with love and reverence.
          </p>
        </div>

        {/* Image Cards */}
        {mockImages.map((img) => (
          <div
            key={img.id}
            className='group relative h-[60vh] w-[80vw] shrink-0 overflow-hidden rounded-md border border-zinc-800/50 bg-zinc-900 shadow-2xl md:h-[70vh] md:w-[60vw] lg:w-[50vw] cursor-pointer'
            onClick={() => openModal(img.url, img.alt)}
          >
            <div className='absolute inset-0 flex items-center justify-center text-parchment/30 opacity-100 transition-opacity group-has-[img]:opacity-0'>
              <span className='font-sans text-sm tracking-widest uppercase'>
                Loading Offering...
              </span>
            </div>
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes='(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw'
              className='z-10 object-cover transition-opacity duration-700'
              priority={img.id <= 2}
            />
          </div>
        ))}

        {/* Trailing space mapping out padding at the end of the scroll */}
        <div className='w-[10vw] shrink-0' />
      </div>
    </section>
  );
}
