import type { Metadata } from "next";
import { Geist, Geist_Mono, Cinzel_Decorative } from "next/font/google";
import SmoothScroll from "@/components/smooth-scroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import ImageModalProvider from "@/components/ImageModalProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-heading",
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mictlán | Day of the Dead in Oaxaca",
  description:
    "A visual journey through the vibrant colors, art, and reverence of Día de los Muertos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='bg-obsidian text-parchment'
      suppressHydrationWarning
    >
      <body
        className={`selection:bg-carmine selection:text-parchment ${geistSans.variable} ${geistMono.variable} ${cinzelDecorative.variable} antialiased selection:bg-accent-marigold selection:text-obsidian`}
        suppressHydrationWarning
      >
        {/* Global Film Grain / Noise Overlay */}
        <div
          className='pointer-events-none fixed inset-0 h-full w-full opacity-[0.05]'
          style={{ backgroundImage: "url('/noise.svg')" }}
        />

        <SmoothScroll>
          <ImageModalProvider>
            <Preloader />
            <CustomCursor />
            {children}
          </ImageModalProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
