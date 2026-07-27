"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ============================================================
   EditorialFoodSection
   Awwwards-style editorial hero for a "Bánh Mì" feature page.

   Palette
     --rust-deep   #4a1608
     --rust-base   #8a3418
     --rust-light  #c2571f
     --cream       #f4e9d8
     --paper       #f6ecd9
     --paper-ink   #5a2a12

   Type
     Display + italic accent: "Fraunces" (variable, supports
     Vietnamese diacritics) loaded via Google Fonts below.

   Replace the sticker `src` values with your real transparent
   PNG assets — paths are placeholders (e.g. /images/...).
============================================================ */

// ---- Sticker data -------------------------------------------------
// Each sticker owns its own float path (x / y / rotate / scale) so
// nothing on screen is synchronized with anything else.
const STICKERS = [
  {
    id: "sandwich",
    src: "https://mrday.it/wp-content/uploads/2026/04/Ciambella_Ciocco_e_Contributi.png",
    alt: "Toasted bánh mì sandwich stuffed with pork, pickled carrot and herbs",
    position: "left-[-9%] top-[4%] w-[46vw] sm:w-[36vw] md:w-[30vw] lg:w-[25vw]",
    baseRotate: -14,
    z: 20,
    float: {
      x: [0, 14, -6, 0],
      y: [0, -18, 6, 0],
      rotate: [-14, -10, -18, -14],
      scale: [1, 1.03, 0.98, 1],
      duration: 13,
      delay: 0,
    },
  },
  {
    id: "bowl",
    src: "https://banhmivietnam.xyz/img/Footer%20banh%20mi%20bottom.png",
    alt: "Bowl of Vietnamese herbs, pickled vegetables and grilled pork",
    position: "right-[-11%] bottom-[0%] w-[50vw] sm:w-[38vw] md:w-[32vw] lg:w-[27vw]",
    baseRotate: 11,
    z: 20,
    float: {
      x: [0, -16, 8, 0],
      y: [0, 14, -10, 0],
      rotate: [11, 16, 7, 11],
      scale: [1, 0.97, 1.02, 1],
      duration: 16.5,
      delay: 1.2,
    },
  },
  {
    id: "pepper",
    src: "https://banhmivietnam.xyz/img/Footer%20paper%20center.png",
    alt: "Fresh red chili pepper",
    position: "left-[54%] top-[60%] w-[9vw] sm:w-[17vw] md:w-[15.5vw] lg:w-[24.5vw]",
    baseRotate: 6,
    z: 30,
    float: {
      x: [0, 8, -8, 0],
      y: [0, -10, 9, 0],
      rotate: [6, 22, -4, 6],
      scale: [1, 1.1, 0.94, 1],
      duration: 8.5,
      delay: 0.6,
    },
  },
  {
    id: "herb",
    src: "https://banhmivietnam.xyz/img/Coriander.png?width=300",
    alt: "Sprig of Vietnamese coriander",
    position: "left-[15%] top-[74%] w-[7vw] sm:w-[25.5vw] md:w-[40vw] lg:w-[30.4vw]",
    baseRotate: -20,
    z: 30,
    float: {
      x: [0, -6, 6, 0],
      y: [0, 9, -9, 0],
      rotate: [-20, -7, -27, -20],
      scale: [1, 1.06, 0.96, 1],
      duration: 10.5,
      delay: 2,
    },
  },
];

// ---- Reusable animation helpers -----------------------------------
// Building the `animate` and `transition` objects in one place keeps
// each Sticker call site declarative and avoids repeating the same
// shape four times.
const floatAnimate = (float, reduceMotion) => ({
  opacity: 1,
  x: reduceMotion ? 0 : float.x,
  y: reduceMotion ? 0 : float.y,
  rotate: reduceMotion ? float.rotate[0] : float.rotate,
  scale: reduceMotion ? 1 : float.scale,
});

const floatTransition = (float, reduceMotion) => ({
  opacity: { duration: 0.8, delay: float.delay, ease: "easeOut" },
  default: reduceMotion
    ? { duration: 0.6, delay: float.delay, ease: "easeOut" }
    : {
        duration: float.duration,
        delay: float.delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
});

// ---- Sticker ---------------------------------------------------------
function Sticker({ data, reduceMotion }) {
  const { src, alt, position, baseRotate, z, float } = data;

  return (
    <motion.img
      src={src}
      alt={alt}
      draggable={false}
      className={`absolute ${position} object-contain drop-shadow-[0_22px_38px_rgba(0,0,0,0.45)] select-none will-change-transform`}
      style={{ zIndex: z }}
      initial={{ opacity: 0, scale: 0.85, rotate: baseRotate }}
      animate={floatAnimate(float, reduceMotion)}
      transition={floatTransition(float, reduceMotion)}
      whileHover={{ scale: 1.06 }}
    />
  );
}

// ---- Main component ----------------------------------------------
export default function EditorialFoodSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#8a3418]">
      {/* Display / accent typeface */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,900;1,9..144,500&display=swap');
        .font-display { font-family: 'Fraunces', ui-serif, Georgia, serif; font-optical-sizing: auto; }
      `}</style>

      {/* Layer 1 — base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,#c2571f_0%,#8a3418_55%,#4a1608_100%)]" />

      {/* Layer 2 — large faded food photograph */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.16] mix-blend-overlay"
        style={{ backgroundImage: "url('/images/banh-mi-photo-bg.jpg')" }}
        aria-hidden="true"
      />

      {/* Layer 3 — paper / noise texture */}
      <div
        className="absolute inset-0 opacity-[0.09] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      {/* Layer 4 — warm radial lighting */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,201,140,0.28)_0%,transparent_60%)]"
        aria-hidden="true"
      />

      {/* Layer 5 — vignette */}
      <div
        className="absolute inset-0 shadow-[inset_0_0_240px_130px_rgba(18,6,2,0.55)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Editorial collage — floating PNG stickers */}
      {STICKERS.map((sticker) => (
        <Sticker key={sticker.id} data={sticker} reduceMotion={reduceMotion} />
      ))}

      {/* Headline */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-[#f4e9d8] leading-[0.85] text-center select-none"
          style={{ fontSize: "min(22vw, 230px)", width: "min(75vw, 1100px)" }}
        >
          <span className="block">BÁNH</span>
          <span className="block">MI</span>
        </motion.h1>

        {/* Torn paper strip — centered over the headline, its own
            wrapper handles static centering so it never fights with
            Framer Motion's transform on the inner element. */}
        <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(72vw,540px)]">
          <motion.div
            initial={{ opacity: 0, y: 10, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5"
            style={{
              background: "#f6ecd9",
              clipPath:
                "polygon(0% 10%, 6% 0%, 13% 8%, 20% 1%, 27% 9%, 34% 0%, 41% 8%, 48% 1%, 55% 9%, 62% 0%, 69% 8%, 76% 1%, 83% 9%, 90% 0%, 100% 6%, 100% 90%, 92% 100%, 85% 92%, 78% 100%, 71% 93%, 64% 100%, 57% 92%, 50% 100%, 43% 93%, 36% 100%, 29% 92%, 22% 100%, 15% 93%, 8% 100%, 0% 92%)",
              boxShadow: "0 20px 45px rgba(18,6,2,0.45)",
            }}
          >
            <p className="font-display italic font-medium text-[#5a2a12] text-center text-sm sm:text-base md:text-lg tracking-wide">
              Let&apos;s visit Vietnam and enjoy
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
