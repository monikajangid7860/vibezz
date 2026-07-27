"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

const menuItems = [
  {
    title: "ARTISAN SOURDOUGH",
    description:
      "Slow fermented for 48 hours with a crisp crust and airy crumb.",
    image:
      "https://lirp.cdn-website.com/7f832c4d/dms3rep/multi/opt/SQEW_LambArabiBox_146+1-1920w.png",
  },
  {
    title: "BUTTER CROISSANT",
    description:
      "Hand-laminated with premium butter and baked fresh every morning.",
    image:
      "https://lirp.cdn-website.com/7f832c4d/dms3rep/multi/opt/Frame+9-1920w.png",
  },
  {
    title: "CINNAMON ROLL",
    description:
      "Soft, fluffy layers finished with silky vanilla glaze.",
    image:
      "https://terryhoproducts.com/cdn/shop/files/ginger.png?v=1778277177&width=650",
  },
  {
    title: "CHOCOLATE ÉCLAIR",
    description:
      "Filled with rich vanilla cream and topped with dark chocolate.",
    image:
      "https://framerusercontent.com/images/FEHkn8uKZ9ErR1JlEleqeFC7KA.webp?scale-down-to=1024&width=1706&height=2560",
  },
  
  {
    title: "SIGNATURE CHEESECAKE",
    description:
      "Creamy baked cheesecake finished with seasonal berries.",
    image:
      "https://images.prismic.io/donmolinico/ZpT3cB5LeNNTxJ0__BolsaMarisco.png?auto=format,compress",
  },
];

const BROWN = "#3B2A1F";
const DISPLAY_FONT = "'Fraunces', 'Iowan Old Style', Georgia, serif";
const BODY_FONT = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const NOISE_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BakeryMenuShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageAreaRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 140, damping: 18, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 18, mass: 0.6 });

  const activeItem = menuItems[activeIndex];

  const handleMouseMove = (e) => {
    const el = imageAreaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const MAX_OFFSET = 20;
    mouseX.set(Math.max(Math.min(relX * MAX_OFFSET, MAX_OFFSET), -MAX_OFFSET));
    mouseY.set(Math.max(Math.min(relY * MAX_OFFSET, MAX_OFFSET), -MAX_OFFSET));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative w-full min-h-[95vh] overflow-hidden py-5"
      style={{ backgroundColor: "#e9dfcf" }}
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@400;500;600&display=swap");
      `}</style>

      {/* paper / editorial background texture */}
      <div
        className="pointer-events-none absolute inset-0"
        // style={{
        //   backgroundImage:
        //     "radial-gradient(circle at 12% 18%, rgba(178,136,86,0.14), transparent 45%), radial-gradient(circle at 88% 82%, rgba(120,80,50,0.10), transparent 50%), radial-gradient(circle at 50% 100%, rgba(178,136,86,0.08), transparent 60%)",
        // }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{ backgroundImage: `url("${NOISE_URL}")` }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col lg:min-h-[95vh] lg:flex-row-reverse">
        {/* ================= IMAGE SIDE ================= */}
        <div
          ref={imageAreaRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className=" relative flex h-[320px] items-center justify-center sm:h-[340px] md:h-[440px] lg:h-auto lg:min-h-[95vh] lg:basis-[55%] order-2"
        >
          {/* ambient glow, grounds the floating pastry without a frame */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full blur-3xl"
            style={{
              width: "70%",
              height: "70%",
              maxWidth: 520,
              maxHeight: 520,
              background:
                "radial-gradient(circle, rgba(214,180,140,0.38) 0%, rgba(214,180,140,0) 72%)",
            }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeItem.title}
              style={{ x: springX, y: springY }}
              initial={{ opacity: 0, scale: 0.92, rotate: 6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.92, rotate: -6 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center px-8"
            >
              <div className="relative h-full w-full max-w-[300px] max-h-[300px] sm:max-w-[340px] sm:max-h-[340px] md:max-w-[420px] md:max-h-[420px] lg:max-w-[700px] lg:max-h-[650px]">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="h-full w-full object-contain"
                  style={{
                    filter:
                      "drop-shadow(0 35px 45px rgba(59,42,31,0.28))",
                  }}
                  draggable={false}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= MENU SIDE ================= */}
        <div className="relative flex flex-col justify-center px-6 py-3 sm:px-10 md:px-14 lg:basis-[45%] lg:px-16 lg:py-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.p
              variants={itemVariants}
              className="text-[21px] tracking-[0.35em]"
              style={{ fontFamily: BODY_FONT, color: BROWN, opacity: 0.55 }}
            >
              THE MENU
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="mt-3 italic"
              style={{
                fontFamily: DISPLAY_FONT,
                color: BROWN,
                fontWeight: 400,
                fontSize: "clamp(18px, 2vw, 22px)",
              }}
            >
              Slow baked, always fresh.
            </motion.h2>

            <div className="mt-8 flex flex-col lg:mt-12">
              {menuItems.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    className="-mx-4 cursor-pointer select-none rounded-[20px] px-4 py-4 transition-all duration-300 ease-out sm:-mx-5 sm:px-5 sm:py-5 lg:py-6"
                    style={{
                      backgroundColor: isActive
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0)",
                      backdropFilter: isActive ? "blur(10px)" : "none",
                      WebkitBackdropFilter: isActive ? "blur(10px)" : "none",
                      transform: isActive ? "scale(1.015)" : "scale(1)",
                      boxShadow: isActive
                        ? "0 12px 30px rgba(59,42,31,0.07)"
                        : "0 0 0 rgba(0,0,0,0)",
                    }}
                  >
                    <div className="flex items-baseline gap-3 sm:gap-3">
                      <span
                        className="shrink-0 text-[10px] tracking-[0.2em] transition-opacity duration-300 sm:text-[11px]"
                        style={{
                          fontFamily: BODY_FONT,
                          color: BROWN,
                          opacity: isActive ? 0.65 : 0.25,
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className="min-w-0 flex-1 uppercase leading-[0.95] transition-opacity duration-300 [font-size:clamp(1rem,1.5vw,1.50rem)] md:[font-size:18px] lg:[font-size:clamp(22px,1vw,25px)]"
                        style={{
                          fontFamily: DISPLAY_FONT,
                          fontWeight: 900,
                          letterSpacing: "-0.02em",
                          color: BROWN,
                          opacity: isActive ? 1 : 0.35,
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0, y: -6 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -6 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="overflow-hidden pl-[26px] sm:pl-[34px]"
                        >
                          <span
                            className="mt-2 block max-w-[420px] text-[14px] italic leading-relaxed sm:mt-3 sm:text-[15px]"
                            style={{
                              fontFamily: DISPLAY_FONT,
                              color: BROWN,
                              opacity: 0.65,
                            }}
                          >
                            {item.description}
                          </span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
