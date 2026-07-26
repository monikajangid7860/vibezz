"use client";

import { useEffect, useRef } from "react";
import { PHYSICS_CONFIG } from "./physicsConfig";

export default function useObjectSpawner(spawnObject) {
  const previousScroll = useRef(0);
  const nextSpawnAt = useRef(PHYSICS_CONFIG.spawnInterval);

  useEffect(() => {
    previousScroll.current = window.scrollY;
    const onScroll = () => {
      const currentScroll = window.scrollY;
      const isMovingDown = currentScroll > previousScroll.current;
      previousScroll.current = currentScroll;
      if (!isMovingDown) return;

      while (currentScroll >= nextSpawnAt.current) {
        spawnObject();
        nextSpawnAt.current += PHYSICS_CONFIG.spawnInterval;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [spawnObject]);
}
