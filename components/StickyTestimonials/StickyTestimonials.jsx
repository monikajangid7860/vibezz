"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import testimonialData from "./testimonialData";

const SCROLL_SPRING = { stiffness: 110, damping: 30, mass: 0.35 };

/**
 * A five-beat, scroll-driven testimonial sequence. The tall parent gives the
 * sticky frame room to play; its last viewport releases as normal page flow.
 */
export default function StickyTestimonials({ testimonials = testimonialData }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, SCROLL_SPRING);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonial-heading"
      className="relative h-[470vh] overflow-clip bg-[#f2ede2]"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.8),transparent_53%)]" />

        <h2
          id="testimonial-heading"
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 w-full -translate-x-1/2 -translate-y-1/2 text-center font-display text-[clamp(3.1rem,10vw,9.5rem)] font-black leading-[0.78] tracking-[-0.075em] text-[#241f19]"
        >
          <span className="block">They Drizzle</span>
          <span className="block">They Dunk</span>
          <span className="block">They Devour</span>
        </h2>

        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            progress={progress}
            testimonial={testimonial}
          />
        ))}
      </div>
    </section>
  );
}
