"use client";

import { useEffect, useRef } from "react";
import { PHYSICS_CONFIG } from "./physicsConfig";

export default function useScrollCamera() {
  const cameraY = useRef(PHYSICS_CONFIG.cameraOffset);

  useEffect(() => {
    const updateCamera = () => { cameraY.current = window.scrollY + PHYSICS_CONFIG.cameraOffset; };
    updateCamera();
    window.addEventListener("scroll", updateCamera, { passive: true });
    return () => window.removeEventListener("scroll", updateCamera);
  }, []);

  return cameraY;
}
