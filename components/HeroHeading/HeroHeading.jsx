"use client";

import { motion } from "framer-motion";

const PEPPER_SRC = "https://terryhoproducts.com/cdn/shop/files/spicy.png?v=1778277149&width=950";

export default function HeroHeading() {
  return (
    <h1 className="mt-5 font-display text-[clamp(6.6rem,12vw,11.5rem)] leading-[0.75] tracking-[-0.075em]">
      <span className="flex flex-wrap items-center justify-center gap-x-[0.08em] gap-y-0">
        <span>Good</span>
        <motion.span
          animate={{ y: [0, -7, 0], rotate: [-7, -4, -7] }}
          className="-mx-[0.1em] inline-flex w-[0.56em] shrink-0 items-center justify-center"
          transition={{ duration: 3.8, ease: "easeInOut", repeat: Infinity }}
        >
          <img
            alt=""
            aria-hidden="true"
            className="w-full -rotate-[7deg] object-contain drop-shadow-[0_0.12em_0.13em_rgba(63,38,21,0.22)]"
            src={PEPPER_SRC}
          />
        </motion.span>
        <span>things</span>
      </span>
      <span className="block">take time.</span>
    </h1>
  );
}
