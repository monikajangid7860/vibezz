"use client";

import { useCallback, useEffect, useState } from "react";
import foodData from "./foodData";
import OrbitItem from "./OrbitItem";
import { ACTIVE_POSITION_INDEX, DESKTOP_ORBIT_POSITIONS, MOBILE_ORBIT_POSITIONS } from "./positions";

const AUTOPLAY_DELAY = 1500;
const MOBILE_BREAKPOINT = 640;
const modulo = (value, length) => ((value % length) + length) % length;

export default function FoodOrbit() {
  const [activeOffset, setActiveOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const positions = isMobile ? MOBILE_ORBIT_POSITIONS : DESKTOP_ORBIT_POSITIONS;

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const updateViewport = () => setIsMobile(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const goNext = useCallback(() => setActiveOffset((offset) => modulo(offset + 1, foodData.length)), []);
  const goPrevious = useCallback(() => setActiveOffset((offset) => modulo(offset - 1, foodData.length)), []);

  useEffect(() => {
    if (isHovered) return undefined;
    const timer = window.setInterval(goNext, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [goNext, isHovered]);

  return (
    <section className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-[1600px] select-none flex-col items-center overflow-hidden rounded-[1.75rem] bg-[#e9dfcf] px-5 py-9 text-[#34271c] shadow-[0_24px_70px_rgba(82,57,32,0.14)] sm:min-h-[calc(100vh-3rem)] sm:px-8 lg:min-h-[calc(100vh-4rem)]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="absolute inset-x-0 top-0 h-[58%] bg-[radial-gradient(ellipse_at_center,_rgba(255,251,243,0.9)_0%,_rgba(255,251,243,0)_70%)]" />
      <p className="relative mt-[clamp(2rem,8vh,6rem)] flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8b7158] before:h-px before:w-7 before:bg-current after:h-px after:w-7 after:bg-current">Made slowly, served warmly</p>
      <h1 className="relative mt-5 max-w-4xl text-center font-display text-[clamp(3.6rem,9vw,8.5rem)] leading-[0.8] tracking-[-0.065em] text-[#2d2118]">Taste the little<br />things</h1>
      <p className="relative mt-6 max-w-xs text-center text-sm leading-relaxed text-[#765e49] sm:text-base">Everyday baking for unhurried mornings and the people you love.</p>
      <div className="relative mt-[clamp(3.5rem,9vh,6.5rem)] h-[clamp(16rem,30vw,25rem)] w-full max-w-[900px]" aria-label="Featured bakery selection">
        {foodData.map((food, foodIndex) => {
          // Incrementing activeOffset moves every food item one slot left on the arc.
          const positionIndex = modulo(foodIndex - activeOffset, positions.length);
          return <OrbitItem key={food.id} food={food} position={positions[positionIndex]} isActive={positionIndex === ACTIVE_POSITION_INDEX} />;
        })}
      </div>
      <nav className="relative mt-auto flex items-center gap-3 pt-5" aria-label="Food orbit controls">
        <button type="button" onClick={goPrevious} className="grid h-11 w-11 place-items-center rounded-full border border-[#9d846b]/45 text-[#604a37] transition-colors hover:bg-[#2d2118] hover:text-[#fffaf2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#765e49]" aria-label="Show previous food"><span aria-hidden="true">←</span></button>
        <span className="min-w-24 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b7158]">Bakery edit</span>
        <button type="button" onClick={goNext} className="grid h-11 w-11 place-items-center rounded-full border border-[#9d846b]/45 text-[#604a37] transition-colors hover:bg-[#2d2118] hover:text-[#fffaf2] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#765e49]" aria-label="Show next food"><span aria-hidden="true">→</span></button>
      </nav>
    </section>
  );
}
