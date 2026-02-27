"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useImageModal } from "./ImageModalProvider";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    id: 1,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/StreetArt/StreetArt8.jpg",
    alt: "Vibrant street art depicting Day of the Dead elements",
    className: "col-span-12 md:col-span-8 md:col-start-1 h-[60vh]",
  },
  {
    id: 2,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/StreetArt/StreetArt5.jpg",
    alt: "Street art of a colorful owl",
    className:
      "col-span-12 md:col-span-6 md:col-start-6 h-[50vh] md:mt-[-10vh]",
  },
  {
    id: 3,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/StreetArt/StreetArt2.jpg",
    alt: "Jaguar mural",
    className: "col-span-12 md:col-span-5 md:col-start-2 h-[70vh] md:mt-24",
  },
  {
    id: 4,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/StreetArt/StreetArt10.jpg",
    alt: "Large scale of the Virgin Mary on a building",
    className: "col-span-12 md:col-span-7 md:col-start-6 h-[90vh] md:mt-12",
  },
  {
    id: 5,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/StreetArt/StreetArt1.jpg",
    alt: "Luchador mural",
    className: "col-span-12 md:col-span-8 md:col-start-3 h-[80vh] md:mt-24",
  },
];

export default function StreetsGallery() {
  const container = useRef<HTMLDivElement>(null);
  const { openModal } = useImageModal();

  useGSAP(
    () => {
      // Iterate through all gallery items
      const items = gsap.utils.toArray<HTMLElement>(".gallery-item");

      items.forEach((item) => {
        const image = item.querySelector("img");

        // 1. Reveal Animation (Fade & Slide UP on enter)
        gsap.fromTo(
          item,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%", // Trigger when top of element hits 85% of viewport height
              toggleActions: "play none none reverse",
            },
          },
        );

        // 2. Parallax Scaling Animation (Scrubbing scale down slightly)
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.15 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom", // Animation starts when top of container hits bottom of screen
                end: "bottom top", // Animation ends when bottom of container hits top of screen
                scrub: true, // Sync animation with scrollbar
              },
            },
          );
        }
      });
    },
    { scope: container },
  );

  return (
    <section ref={container} className='relative w-full bg-obsidian py-32'>
      <div className='container mx-auto px-4 sm:px-8 md:px-16 flex flex-col lg:flex-row gap-16 lg:gap-8'>
        {/* Sticky Header Section */}
        <div className='w-full lg:w-1/3 flex flex-col items-start lg:sticky lg:top-32 h-fit z-10'>
          <p className='font-sans text-parchment/60 tracking-widest uppercase text-sm mb-4'>
            01. The Streets
          </p>
          <h2 className='font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-accent-marigold leading-tight'>
            Colors of the <br className='hidden lg:block' /> Ancestors
          </h2>
          <p className='font-sans text-parchment/80 mt-6 max-w-md text-lg leading-relaxed'>
            The walls of Oaxaca breathe history. During Día de los Muertos, the
            streets transform into a vibrant canvas of vivid murals that
            showcase the rich culture and traditions of the region.
          </p>
        </div>

        {/* Asymmetrical Gallery Grid */}
        <div className='w-full lg:w-2/3 grid grid-cols-12 gap-y-12 sm:gap-x-6 z-0'>
          {images.map((img) => (
            <div
              key={img.id}
              className={`gallery-item relative overflow-hidden bg-zinc-900/50 rounded-lg ${img.className} cursor-pointer`}
              onClick={() => openModal(img.url, img.alt)}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 66vw'
                className='object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
