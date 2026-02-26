"use client";

import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const lenis = useLenis();

  const handleBackToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    }
  };

  return (
    <footer className='w-full border-t border-zinc-800/30 bg-obsidian px-[5vw] py-12 lg:py-16'>
      <div className='mx-auto max-w-[1600px] flex flex-col items-center justify-between gap-8 md:flex-row'>
        {/* Left Side: Brand Logo */}
        <div className='flex items-center justify-center md:justify-start'>
          <h2 className='font-heading text-3xl font-bold tracking-widest text-parchment/70'>
            MICTLÁN
          </h2>
        </div>

        {/* Center/Bottom: Copyright */}
        <div className='text-center md:text-left order-3 md:order-2'>
          <p className='font-sans text-xs tracking-wider text-parchment/40'>
            © 2026. Photography & Design by Jonathan. All rights reserved.
          </p>
        </div>

        {/* Right Side: Back to Top */}
        <div className='flex items-center justify-center md:justify-end order-2 md:order-3'>
          <button
            onClick={handleBackToTop}
            className='group flex items-center gap-3 font-sans text-sm tracking-widest uppercase text-parchment/60 transition-colors duration-300 hover:text-accent-marigold'
            aria-label='Scroll back to top'
          >
            <span>Back to Top</span>
            <div className='flex h-8 w-8 items-center justify-center rounded-full border border-parchment/20 transition-all duration-300 group-hover:border-accent-marigold group-hover:bg-accent-marigold/10'>
              <ArrowUp className='h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1' />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
