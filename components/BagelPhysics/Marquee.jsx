"use client";

import { motion } from "framer-motion";

const images = [
  "https://banhmivietnam.xyz/img/Carrot.png",
  "https://banhmivietnam.xyz/img/Cucumber.png",
  "https://banhmivietnam.xyz/img/Chilli.png",
  "https://banhmivietnam.xyz/img/Coriander.png",
    "https://www.cravburgers.shop/_next/image?url=%2Fimg-webp%2Ftomato.webp&w=1080&q=75",
  "https://www.cravburgers.shop/_next/image?url=%2Fimg-webp%2Flettuce.webp&w=1080&q=75",
  "https://www.cravburgers.shop/_next/image?url=%2Fimg-webp%2Fcheese.webp&w=1080&q=75",
  "https://banhmivietnam.xyz/img/Coriander.png",
  
];

export default function ImageStrip() {
  const items = [...images, ...images];

  return (
    <section className="overflow-hidden bg-[#e9dfcf] py-3">
      <motion.div
        className="flex w-max gap-8"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((src, index) => (
          <div
            key={index}
            className="flex h-40 w-40 shrink-0 items-center justify-center"
          >
            <img
              src={src}
              alt=""
              draggable={false}
              className="h-full w-full object-contain select-none"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}