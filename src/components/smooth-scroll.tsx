"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05, // Lower number = heavier, smoother momentum
        duration: 1.5, // slightly longer duration for that cinematic feel
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
