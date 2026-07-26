"use client";

import { motion, useSpring, useTransform } from "framer-motion";

const SPRING = { stiffness: 135, damping: 25, mass: 0.55 };
const ENTER_DURATION = 0.14;

function Sparkle() {
  return (
    <svg
      aria-hidden="true"
      className="absolute -right-3 -top-4 h-8 w-8 text-[#f5b329]"
      fill="currentColor"
      viewBox="0 0 32 32"
    >
      <path d="M16 0c1.4 10.6 5.4 14.6 16 16-10.6 1.4-14.6 5.4-16 16-1.4-10.6-5.4-14.6-16-16C10.6 14.6 14.6 10.6 16 0Z" />
    </svg>
  );
}

export default function TestimonialCard({ testimonial, progress }) {
  const { entry, rotation } = testimonial;
  const settle = entry + ENTER_DURATION;
  const finish = settle + 0.1;

  // Each card has its own portion of the sticky section's scroll timeline.
  const y = useSpring(
    useTransform(progress, [entry, settle, finish], [68, 0, -5]),
    SPRING
  );
  const opacity = useTransform(progress, [entry, settle], [0, 1]);
  const scale = useSpring(
    useTransform(progress, [entry, settle, finish], [0.91, 1, 0.985]),
    SPRING
  );
  const rotate = useSpring(
    useTransform(progress, [entry, settle, finish], [rotation * 2, rotation, rotation * 0.7]),
    SPRING
  );

  return (
    <motion.article
      className={`absolute z-0 w-[min(17.5rem,calc(100vw-2.5rem))] will-change-transform sm:w-72 ${testimonial.mobilePosition} ${testimonial.desktopPosition}`}
      style={{ opacity, scale, rotate, y }}
    >
      {testimonial.sparkle && <Sparkle />}
      <div className="rounded-[1.45rem] border border-[#231d17]/10 bg-[#fffdf8] px-4 pb-3 pt-4 shadow-[0_18px_45px_rgba(56,40,23,0.14)] sm:px-5 sm:pt-5">
        <p className="font-display text-[1.04rem] leading-[1.25] tracking-[-0.025em] text-[#231d17] sm:text-[1.15rem]">
          “{testimonial.text}”
        </p>
        <div className="mt-4 flex items-center gap-2.5">
          <img
            alt={testimonial.name}
            className="h-9 w-9 rounded-full object-cover ring-2 ring-[#f1e9da]"
            height="72"
            loading="lazy"
            src={testimonial.image}
            width="72"
          />
          <div className="min-w-0">
            <p className="truncate text-xs font-bold uppercase tracking-[0.1em] text-[#3a3027]">
              {testimonial.name}
            </p>
            <p className="mt-0.5 text-[0.68rem] text-[#75695e]">{testimonial.role}</p>
          </div>
        </div>
      </div>
      <div className="ml-8 h-3 w-5 -translate-y-px rotate-[28deg] bg-[#fffdf8]" />
    </motion.article>
  );
}
