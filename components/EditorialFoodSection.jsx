"use client";

import { motion } from "framer-motion";

const foods = [
  {
    src: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=85",
    alt: "Fresh bánh mì sandwich with herbs",
    wrapperClass:
      "-left-[18%] -top-[7%] w-[clamp(11rem,27vw,27rem)] sm:-left-[8%] sm:-top-[14%]",
    initial: { opacity: 0, x: -48, y: -36, rotate: -18 },
    animate: {
      opacity: 1,
      x: [0, 8, -4, 6, 0],
      y: [0, -18, 8, -6, 0],
      rotate: [-12, -9, -14, -10, -12],
    },
    duration: 8.6,
    delay: 0.15,
  },
  {
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85",
    alt: "Bowl of colourful Vietnamese-inspired food",
    wrapperClass:
      "-bottom-[12%] -right-[19%] w-[clamp(13rem,31vw,31rem)] sm:-bottom-[17%] sm:-right-[11%]",
    initial: { opacity: 0, x: 52, y: 42, rotate: 19 },
    animate: {
      opacity: 1,
      x: [0, -6, 9, -3, 0],
      y: [0, 14, -19, 7, 0],
      rotate: [13, 16, 10, 15, 13],
    },
    duration: 9.8,
    delay: 0.45,
  },
  {
    src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=85",
    alt: "Fresh red chilli peppers",
    wrapperClass:
      "left-[65%] top-[44%] w-[clamp(4rem,8.5vw,7rem)] sm:left-[61%] sm:top-[43%]",
    initial: { opacity: 0, x: 20, y: 28, rotate: 8 },
    animate: {
      opacity: 1,
      x: [0, 5, -3, 7, 0],
      y: [0, -11, 5, -8, 0],
      rotate: [18, 21, 16, 20, 18],
    },
    duration: 6.7,
    delay: 0.8,
  },
];

const floatingTransition = (duration, delay) => ({
  delay,
  duration,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "loop",
});

export default function EditorialFoodSection() {
  return (
    <motion.section
      aria-labelledby="editorial-food-heading"
      className="relative isolate min-h-[42rem] overflow-hidden bg-[#b44d30] sm:min-h-[100svh]"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div aria-hidden="true" className="absolute inset-0 z-0 bg-[#b44d30]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[5] bg-cover bg-center opacity-[0.1] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd6?auto=format&fit=crop&w=1800&q=80)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[5] opacity-[0.13] [background-image:repeating-linear-gradient(0deg,rgba(255,247,222,0.5)_0_1px,transparent_1px_4px),repeating-linear-gradient(90deg,rgba(79,27,18,0.25)_0_1px,transparent_1px_7px)] mix-blend-soft-light"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-br from-[#da7041]/60 via-transparent to-[#6b291d]/40"
      />

      <div className="relative flex min-h-[42rem] items-center justify-center px-4 py-20 sm:min-h-[100svh] sm:px-8">
        <motion.h2
          id="editorial-food-heading"
          className="relative z-20 w-[78vw] text-center font-display text-[clamp(5.5rem,21vw,18rem)] font-black leading-[0.68] tracking-[-0.11em] text-[#fff1cf] [text-shadow:0_0.025em_0_rgba(102,36,22,0.1)]"
          initial={{ opacity: 0, scale: 0.94 }}
          transition={{ delay: 0.16, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          BANH MI
        </motion.h2>

        {foods.map((food) => (
          <motion.figure
            key={food.src}
            className={`absolute z-40 m-0 transform-gpu ${food.wrapperClass}`}
            initial={food.initial}
            transition={floatingTransition(food.duration, food.delay)}
            whileInView={food.animate}
            viewport={{ once: true }}
          >
            <motion.img
              alt={food.alt}
              className="h-auto w-full object-contain drop-shadow-[0_1.1rem_1.3rem_rgba(66,24,16,0.3)]"
              draggable="false"
              transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.7 }}
              whileHover={{ rotate: 3, scale: 1.04 }}
              src={food.src}
            />
          </motion.figure>
        ))}

        <motion.div
          className="absolute left-1/2 top-1/2 z-30 flex w-[min(80vw,42rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden bg-[#f2d998] px-6 py-3 text-center shadow-[0_0.85rem_1.5rem_rgba(74,26,16,0.26)] [clip-path:polygon(0_8%,2%_3%,6%_6%,10%_1%,15%_5%,21%_2%,29%_5%,37%_1%,45%_4%,54%_2%,61%_5%,68%_1%,75%_4%,83%_2%,90%_6%,96%_3%,100%_8%,99%_90%,95%_96%,89%_93%,82%_99%,76%_95%,68%_98%,59%_94%,51%_98%,43%_95%,36%_99%,28%_95%,20%_98%,12%_94%,5%_97%,0_91%)] sm:px-11 sm:py-4"
          initial={{ opacity: 0, rotate: -5, y: 42 }}
          transition={{ delay: 0.42, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileInView={{ opacity: 1, rotate: -2 }}
          viewport={{ once: true }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(0deg,transparent_0_3px,rgba(112,71,39,0.25)_3px_4px),repeating-linear-gradient(90deg,transparent_0_7px,rgba(255,255,255,0.35)_7px_8px)] mix-blend-multiply"
          />
          <p className="relative font-serif text-[clamp(1rem,2.6vw,1.75rem)] italic leading-none tracking-[-0.035em] text-[#5a2b20]">
            Let&apos;s visit Vietnam and enjoy
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
