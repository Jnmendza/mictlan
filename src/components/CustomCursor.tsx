"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only initialize custom cursor on devices with a fine pointer (mouse)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const container = containerRef.current;
    const dot = dotRef.current;
    const text = textRef.current;
    if (!container || !dot || !text) return;

    // Reveal cursor container
    gsap.set(container, { opacity: 1, xPercent: -50, yPercent: -50 });

    // Use GSAP's quickTo for high-performance, lag-free cursor tracking
    const xTo = gsap.quickTo(container, "x", {
      duration: 0.15,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(container, "y", {
      duration: 0.15,
      ease: "power3.out",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleHoverEnter = (isCloseAction = false) => {
      if (text) {
        text.innerText = isCloseAction ? "CLOSE" : "VIEW";
      }

      gsap.to(dot, {
        width: 64,
        height: 64,
        backgroundColor: isCloseAction
          ? "rgba(217, 4, 41, 0.4)"
          : "rgba(240, 169, 77, 0.4)",
        backdropFilter: "blur(8px)",
        border: isCloseAction
          ? "1px solid rgba(217, 4, 41, 0.8)"
          : "1px solid rgba(240, 169, 77, 0.8)",
        duration: 0.3,
      });
      gsap.to(text, { opacity: 1, duration: 0.3 });
    };

    const handleHoverLeave = () => {
      gsap.to(dot, {
        width: 16,
        height: 16,
        backgroundColor: "rgba(240, 169, 77, 1)",
        backdropFilter: "blur(0px)",
        border: "0px solid transparent",
        duration: 0.3,
      });
      gsap.to(text, { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // If hovering over modal close areas
      if (
        target.classList.contains("modal-close") ||
        target.closest(".modal-close")
      ) {
        handleHoverEnter(true);
        return;
      }

      // If we hover over a clickable element or an image/gallery card
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.tagName.toLowerCase() === "img" ||
        target.closest(".group") // target our image containers
      ) {
        handleHoverEnter(false);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.classList.contains("modal-close") ||
        target.closest(".modal-close")
      ) {
        handleHoverLeave();
        return;
      }

      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.tagName.toLowerCase() === "img" ||
        target.closest(".group")
      ) {
        handleHoverLeave();
      }
    };

    // Watch the DOM for removed elements to fix "stuck" hover states on unmount
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            // If the modal overlay or its close button was removed while hovered
            if (
              node.classList.contains("modal-close") ||
              node.querySelector(".modal-close")
            ) {
              handleHoverLeave();
            }
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='pointer-events-none fixed left-0 top-0 z-[999999999] opacity-0 flex items-center justify-center'
      style={{ willChange: "transform" }}
    >
      <div
        ref={dotRef}
        className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-marigold shadow-lg backdrop-blur-none origin-center'
        style={{ willChange: "width, height" }}
      />
      <span
        ref={textRef}
        className='relative z-10 font-sans text-[12px] md:text-[14px] font-bold tracking-widest text-[#0b090a] opacity-0 uppercase drop-shadow-sm'
        style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
      >
        View
      </span>
    </div>
  );
}
