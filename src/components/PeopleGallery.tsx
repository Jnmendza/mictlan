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
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/People/People1.jpg",
    alt: "Living Altar Portrait 1",
  },
  {
    id: 2,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/People/People2.jpg",
    alt: "Living Altar Portrait 2",
  },
  {
    id: 3,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/People/People3.jpg",
    alt: "Living Altar Portrait 3",
  },
  {
    id: 4,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/People/People4.jpg",
    alt: "Living Altar Portrait 4",
  },
  {
    id: 5,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/People/People5.jpg",
    alt: "Living Altar Portrait 5",
  },
  {
    id: 7,
    url: "https://nargtjqnjvwljfhrzvmk.supabase.co/storage/v1/object/public/images/gallery/People/People7.jpg",
    alt: "Living Altar Portrait 7",
  },
];

export default function PeopleGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openModal } = useImageModal();

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".portrait-card");

      cards.forEach((card) => {
        const image = card.querySelector(".portrait-image");

        // Set initial states
        gsap.set(card, { clipPath: "inset(100% 0 0 0)" });
        if (image) {
          gsap.set(image, { scale: 1.2 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%", // Start animating when the top of the card is 80% down the viewport
            end: "top 30%", // End when the top of the card is 30% down
            scrub: true,
          },
        });

        tl.to(card, {
          clipPath: "inset(0% 0 0 0)",
          ease: "none",
        });

        if (image) {
          tl.to(
            image,
            {
              scale: 1.0,
              ease: "none",
            },
            "<", // Run animation at the same time as the wrapper
          );
        }
      });
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <section ref={containerRef} className='relative w-full bg-obsidian py-32'>
      <div className='mx-auto flex max-w-[1600px] flex-col gap-16 px-[5vw] lg:flex-row'>
        {/* Left Column (Sticky) */}
        <div className='shrink-0 lg:sticky lg:top-32 lg:h-fit lg:w-5/12'>
          <p className='mb-4 font-sans text-sm tracking-widest text-parchment/60 uppercase'>
            04. The People
          </p>
          <h2 className='font-heading text-5xl font-bold leading-tight text-accent-marigold md:text-6xl lg:text-7xl'>
            Living Altars
          </h2>
          <p className='mt-6 max-w-md font-sans text-lg leading-relaxed text-parchment/80'>
            The tradition is carried on the faces and shoulders of the
            believers. Meticulous face paint mimicking Calaveras and ornate
            traditional dress transform the living into breathing tributes,
            honoring those who have walked before.
          </p>
        </div>

        {/* Right Column (Scrolling Stack) */}
        <div className='flex flex-col gap-y-32 lg:w-7/12'>
          {mockImages.map((img, index) => (
            <div
              key={img.id}
              className='portrait-card group relative h-[80vh] w-full overflow-hidden rounded-md border border-zinc-800/50 bg-zinc-900 shadow-2xl cursor-pointer'
              onClick={() => openModal(img.url, img.alt)}
            >
              <div className='absolute inset-0 flex items-center justify-center text-parchment/30 opacity-100 transition-opacity group-has-[img]:opacity-0'>
                <span className='font-sans text-sm tracking-widest uppercase'>
                  Loading Portrait...
                </span>
              </div>
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes='(max-width: 1024px) 90vw, 60vw'
                className='portrait-image z-10 object-cover transition-opacity duration-700'
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
