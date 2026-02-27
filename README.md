# Mictlán | Day of the Dead in Oaxaca

A stunning visual journey through the vibrant colors, art, and reverence of Día de los Muertos.

## Overview

Mictlán is a highly interactive, visually immersive web experience built to showcase the beauty of the Day of the Dead celebrations. It features a curated collection of galleries capturing the essence of the streets, altars, cemeteries, and people of Oaxaca during this sacred time.

## Features

- **Immersive Visuals**: High-resolution image galleries highlighting the rich textures and colors of Oaxaca, with a custom modal viewer.
- **Micro-Animations & Transitions**: Powered by [GSAP](https://gsap.com/) for a premium, polished feel, including an engaging preloader and reveal animations.
- **Smooth Scrolling**: Implemented using [Lenis](https://lenis.studiofreight.com/) for fluid, momentum-based scrolling.
- **Custom Cursor**: A context-aware custom cursor that enhances interactivity.
- **Thematic Styling**: Custom color palette (obsidian, parchment, carmine, marigold) and global film grain overlay to evoke a cinematic, documentary feel.
- **Typography**: Utilizing `next/font` with Geist (sans/mono) and Cinzel Decorative for elegant headings.

## Tech Stack

- **Framework**: [Next.js 15+ App Router](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: GSAP (`@gsap/react`)
- **Scroll**: Lenis
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   # or yarn / pnpm / bun
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   # or yarn dev / pnpm dev / bun dev
   ```

3. **Open your browser** to [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/app/`: Next.js app routes (`layout.tsx`, `page.tsx`, `globals.css`).
- `src/components/`: Reusable React components including the core layout blocks (`Hero`, `Footer`) and specialized gallery sections (`StreetsGallery`, `AltarsGallery`, `CemeteriesGallery`, `PeopleGallery`).
- `public/`: Static assets such as images and the `noise.svg` overlay.

---

_Created as a showcase of modern front-end development, fluid motion, and visual storytelling._
