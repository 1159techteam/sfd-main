"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Animate on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const router = useRouter();

  // Horizontal scroll tracking
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const sectionWidth = container.clientWidth;
      const currentIndex = Math.round(scrollPosition / sectionWidth);
      setCurrentSection(currentIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTo({
      left: index * container.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className=" bg-black text-white pt-0">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full h-16 bg-black/80 backdrop-blur-sm z-50 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <Image
              src="/white.svg"
              alt="Logo"
              width={50}
              height={50}
              className="w-32 h-10"
              unoptimized
            />
          </div>
          <div className="flex space-x-6">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className={`px-4 py-2 transition-colors ${
                  currentSection === index
                    ? "text-[#D4AF37]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {index === 0 ? "Home" : "About"}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Scroll Sections */}
      <div
        ref={scrollContainerRef}
        className="w-screen bg-black overflow-y-hidden flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
      >
        {/* Section 1: Hero */}
        <section className="scroll-item relative min-w-full h-screen snap-center">
          {/* Background Layers */}
          <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] -top-10 bg-cover bg-center z-0" />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 z-20" />

          {/* Hero Content */}
          <div className="relative z-30 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1
              className={`text-5xl md:text-7xl font-normal mb-6 tracking-tight transition-all duration-1000 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              SCHOOL FOR
              <span className="font-bold italic text-[#D4AF37]">
                {" "}
                THE DARING
              </span>
            </h1>

            <p
              className={`text-xl md:text-2xl max-w-3xl mb-4 font-light transition-all duration-1000 delay-300 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Unlock Your Potential - Embrace the Challenge
            </p>

            <p
              className={`text-lg md:text-xl max-w-2xl mb-12 font-light italic text-gray-300 transition-all duration-1000 delay-700 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              &quot;At 1159 Realty, we believe in pushing boundaries and
              challenging conventions. Join our movement and be part of
              something extraordinary.&quot;
            </p>

            <div
              className={`flex flex-col gap-4 items-center transition-all duration-1000 delay-600 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <button
                onClick={() => router.push("/participate")}
                className="px-6 py-3 bg-[#D4AF37] text-white font-semibold rounded-full hover:bg-yellow-400 transition"
              >
                Register to Attend
              </button>
              <button
                onClick={() => router.push("/participate")}
                className="px-6 py-3 bg-white text-[#D4AF37] font-semibold rounded-full hover:text-yellow-400 transition"
              >
                Click here to Volunteer
              </button>
               <button
                onClick={() => router.push("/scholarship")}
                className="px-6 py-3 bg-[#D4AF37] text-white font-semibold rounded-full hover:bg-yellow-400 transition"
              >
                Register for Grant/Scholarship
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: About */}
        <section className="scroll-item relative min-w-full h-screen snap-center">
          <div className="absolute inset-0 overflow-hidden z-0">
            <Image
              src="/hero-bg.jpg"
              alt="Abstract Background"
              fill
              className="object-cover opacity-56"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/0" />
            <Image
              src="/assets/wave.svg"
              alt="Wave"
              width={1440}
              height={320}
              className="absolute bottom-0 left-0 w-full"
              unoptimized
            />
          </div>

          <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col justify-center h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="pt-52 md:pt-0">
                <h2 className="theme-title animate-slide-up">
                  We Challenge Conventions
                </h2>
                <div className="theme-content animate-slide-up">
                  <p className="mb-6">
                    The School for the Daring is more than just an educational
                    impact. It&apos;s a movement that challenges the status quo
                    and pushes boundaries.
                  </p>
                  <p>
                    We believe in creating an environment where innovation
                    thrives, where taking risks is encouraged, and where the
                    daring are rewarded.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl animate-scale">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-600/10 z-10"></div>
                <Image
                  src="/assets/dots-grid.svg"
                  alt="About Illustration"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black py-6 text-center text-gray-400 text-sm">
        <p>
          © {new Date().getFullYear()} School for the Daring. <br></br>Powered
          by 1159 Realty <br></br>All rights reserved.
        </p>
      </footer>
    </div>
  );
}
