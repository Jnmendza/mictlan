import Hero from "@/components/Hero";
import StreetsGallery from "@/components/StreetsGallery";
import AltarsGallery from "@/components/AltarsGallery";
import CemeteriesGallery from "@/components/CemeteriesGallery";
import PeopleGallery from "@/components/PeopleGallery";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/smooth-scroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className='w-full min-h-screen bg-obsidian'>
        <Hero />
        <StreetsGallery />
        <AltarsGallery />
        <CemeteriesGallery />
        <PeopleGallery />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
