"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const mockImages = [
  {
    id: 1,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/Cemeteries/Cemetery1.jpg",
    alt: "Cemetery Vigil 1",
  },
  {
    id: 2,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/Cemeteries/Cemetery2.jpg",
    alt: "Cemetery Vigil 2",
  },
  {
    id: 3,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/Cemeteries/Cemetery3.jpg",
    alt: "Cemetery Vigil 3",
  },
  {
    id: 4,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/Cemeteries/Cemetery4.jpg",
    alt: "Cemetery Vigil 4",
  },
  {
    id: 5,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/Cemeteries/Cemetery5.jpg",
    alt: "Cemetery Vigil 5",
  },
  {
    id: 6,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/Cemeteries/Cemetery6.jpg",
    alt: "Cemetery Vigil 6",
  },
];

export default function CemeteriesGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".cemetery-card");

      cards.forEach((card) => {
        gsap.fromTo(
          card as Element,
          {
            opacity: 0,
            y: 40,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: card as Element,
              start: "top 85%", // Start animation when top of card hits 85% down viewport
              end: "top 50%", // Finish animation when top of card hits 50% down viewport
              scrub: 1, // Smooth scrubbing
            },
          },
        );
      });
    },
    { scope: sectionRef, dependencies: [] },
  );

  return (
    <section
      ref={sectionRef}
      className='relative min-h-screen w-full bg-obsidian py-32 overflow-hidden'
    >
      {/* Header Section */}
      <div className='flex w-full flex-col items-center justify-center text-center px-[5vw] mb-24 z-10 relative'>
        <p className='mb-4 font-sans text-sm tracking-widest text-parchment/60 uppercase'>
          03. The Cemeteries
        </p>
        <h2 className='font-heading text-5xl font-bold leading-tight text-parchment md:text-6xl lg:text-8xl'>
          Vigils in the Night
        </h2>
      </div>

      {/* Staggered Grid Container */}
      <div className='relative z-10 mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-12'>
        {mockImages.map((img, index) => {
          // Add organic staggering to the specific columns
          // Middle column (index 1, 4) pushed down on large screens
          const isMiddleColumn = index % 3 === 1;
          // Last column (index 2, 5) slightly pushed down on md screens
          const isLastColumn = index % 2 === 1;

          return (
            <div
              key={img.id}
              className={`cemetery-card group relative h-[50vh] w-full overflow-hidden rounded-md border border-zinc-800/50 bg-zinc-900 shadow-2xl md:h-[60vh] 
                ${isMiddleColumn ? "lg:mt-32" : ""}
                ${isLastColumn ? "md:mt-16 lg:mt-0" : ""}
              `}
            >
              <div className='absolute inset-0 flex items-center justify-center text-parchment/30 opacity-100 transition-opacity group-has-[img]:opacity-0'>
                <span className='font-sans text-sm tracking-widest uppercase'>
                  Loading Vigil...
                </span>
              </div>
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                className='z-10 object-cover transition-opacity duration-700'
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
