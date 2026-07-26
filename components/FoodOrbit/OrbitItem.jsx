"use client";

import { motion } from "framer-motion";
import { ORBIT_SPRING } from "./positions";

const IMAGE_SIZE = "clamp(10rem, 18vw, 18rem)";

export default function OrbitItem({ food, position, isActive }) {
  return (
    <motion.figure
      className="absolute left-1/2 top-0 m-0 will-change-transform"
      initial={false}
      animate={{
        x: `calc(-50% + ${position.x}px)`,
        y: position.y,
        scale: position.scale,
        opacity: position.opacity,
        filter: `blur(${position.blur}px)`,
      }}
      transition={ORBIT_SPRING}
      style={{
        zIndex: position.zIndex,
      }}
    >
      <img
        src={food.image}
        alt={food.name}
        draggable={false}
        className="pointer-events-none select-none object-contain"
        style={{
          width: IMAGE_SIZE,
          height: "auto",
          filter: isActive
            ? "drop-shadow(0 30px 40px rgba(0,0,0,.25))"
            : "drop-shadow(0 12px 18px rgba(0,0,0,.12))",
        }}
      />
    </motion.figure>
  );
}