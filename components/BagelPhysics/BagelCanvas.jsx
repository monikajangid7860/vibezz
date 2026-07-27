"use client";

import { useEffect, useRef } from "react";
import useMatterEngine from "./useMatterEngine";
import useObjectSpawner from "./useObjectSpawner";
import useScrollCamera from "./useScrollCamera";

export default function BagelCanvas() {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const isVisibleRef = useRef(true);

  const cameraY = useScrollCamera();

  const {
    bodiesRef,
    dimensionsRef,
    texturesRef,
    resize,
    spawnObject,
    step,
  } = useMatterEngine(cameraY);

  useObjectSpawner(spawnObject);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      resize();
    };

    const visibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", visibilityChange);

    const render = (now) => {
      if (isVisibleRef.current) {
        step(now);

        const { width, height } = dimensionsRef.current;

        context.clearRect(0, 0, width, height);

        bodiesRef.current.forEach((body) => {
          const bagel = body.plugin.bagel;
          if (!bagel) return;

          const texture = texturesRef.current[bagel.textureIndex];
          if (!texture) return;

          const screenY = body.position.y - cameraY.current;

          if (
            screenY < -bagel.size * 1.5 ||
            screenY > height + bagel.size * 1.5
          ) {
            return;
          }

          context.save();

          context.translate(body.position.x, screenY);
          context.rotate(body.angle);

          context.drawImage(
            texture,
            -bagel.size / 2,
            -bagel.size / 2,
            bagel.size,
            bagel.size
          );

          context.restore();
        });
      }

      frameRef.current = requestAnimationFrame(render);
    };

    frameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", visibilityChange);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [
    bodiesRef,
    cameraY,
    dimensionsRef,
    resize,
    step,
    texturesRef,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden="true"
    />
  );
}
