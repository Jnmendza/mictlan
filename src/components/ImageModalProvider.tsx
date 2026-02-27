"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { X } from "lucide-react";

interface ImageModalContextType {
  openModal: (url: string, alt: string) => void;
  closeModal: () => void;
}

const ImageModalContext = createContext<ImageModalContextType | undefined>(
  undefined,
);

export function useImageModal() {
  const context = useContext(ImageModalContext);
  if (!context) {
    throw new Error("useImageModal must be used within an ImageModalProvider");
  }
  return context;
}

export default function ImageModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgData, setImgData] = useState<{ url: string; alt: string } | null>(
    null,
  );
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track previous overflow state to restore if the modal closes but preloader is still running
  const prevHtmlOverflow = useRef<string>("");
  const prevBodyOverflow = useRef<string>("");

  const openModal = (url: string, alt: string) => {
    setImgData({ url, alt });
    setIsOpen(true);
  };

  const closeModal = useCallback(() => {
    if (!isOpen) return;

    // Animate out
    if (overlayRef.current && containerRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(containerRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setIsOpen(false);
          setImgData(null);
          // Restore html and body scroll
          document.documentElement.style.overflow = prevHtmlOverflow.current;
          document.body.style.overflow = prevBodyOverflow.current;
        },
      });
    } else {
      setIsOpen(false);
      setImgData(null);
      document.documentElement.style.overflow = prevHtmlOverflow.current;
      document.body.style.overflow = prevBodyOverflow.current;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Store previous states
      prevHtmlOverflow.current = document.documentElement.style.overflow;
      prevBodyOverflow.current = document.body.style.overflow;

      // Force strict lock on both HTML and body
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      // Animate in
      if (overlayRef.current && containerRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out" },
        );
        gsap.fromTo(
          containerRef.current,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
        );
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  return (
    <ImageModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {/* The Fullscreen Modal */}
      {isOpen && imgData && (
        <div
          ref={overlayRef}
          data-lenis-prevent='true'
          className='fixed inset-0 z-[99999] flex items-center justify-center bg-obsidian/90 backdrop-blur-md opacity-0 modal-close overflow-hidden touch-none'
          onClick={closeModal} // Click outside to close
        >
          {/* Close Button UI for mobile/accessibility */}
          <button
            onClick={closeModal}
            className='absolute right-6 top-6 z-[100000] flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/50 text-parchment/60 transition-colors hover:bg-accent-carmine hover:text-parchment modal-close'
            aria-label='Close image preview'
          >
            <X className='h-6 w-6 pointer-events-none' />
          </button>

          {/* Image Container */}
          <div
            ref={containerRef}
            className='relative flex h-[85vh] w-[90vw] items-center justify-center opacity-0'
          >
            {/* Using a standard Next image with 'contain' so we don't crop the photo in preview mode */}
            <div className='relative h-full w-full'>
              <Image
                src={imgData.url}
                alt={imgData.alt}
                fill
                className='object-contain drop-shadow-2xl'
                sizes='100vw'
                priority
              />
            </div>
          </div>
        </div>
      )}
    </ImageModalContext.Provider>
  );
}
