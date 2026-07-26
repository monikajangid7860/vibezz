"use client";

import { useCallback, useEffect, useRef } from "react";
import Matter from "matter-js";
import { loadBagelTextures } from "./bagelImages";
import { PHYSICS_CONFIG } from "./physicsConfig";
import { randomBetween } from "./helpers";

const { Bodies, Body, Composite, Engine, Events, Runner, World } = Matter;

export default function useMatterEngine(cameraY) {
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesRef = useRef([]);
  const texturesRef = useRef([]);
  const dimensionsRef = useRef({ width: 0, height: 0, worldHeight: 0 });
  const wallsRef = useRef([]);

  const createBoundaries = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    const { width, worldHeight } = dimensionsRef.current;
    const thickness = PHYSICS_CONFIG.wallThickness;
    Composite.remove(engine.world, wallsRef.current);
    wallsRef.current = [
      Bodies.rectangle(-thickness / 2, worldHeight / 2, thickness, worldHeight * 2, { isStatic: true }),
      Bodies.rectangle(width + thickness / 2, worldHeight / 2, thickness, worldHeight * 2, { isStatic: true }),
      Bodies.rectangle(width / 2, worldHeight - PHYSICS_CONFIG.floorInset, width + thickness * 2, thickness, { isStatic: true, restitution: 0.12 }),
    ];
    World.add(engine.world, wallsRef.current);
  }, []);

  const resize = useCallback(() => {
    dimensionsRef.current = {
      width: window.innerWidth,
      height: window.innerHeight,
      worldHeight: Math.max(document.documentElement.scrollHeight, window.innerHeight * 2),
    };
    createBoundaries();
  }, [createBoundaries]);

  useEffect(() => {
    const engine = Engine.create({ enableSleeping: true, gravity: { x: 0, y: PHYSICS_CONFIG.gravity, scale: 0.001 } });
    engineRef.current = engine;
    runnerRef.current = Runner.create({ isFixed: false });
    const softenSettledObjects = ({ pairs }) => {
      pairs.forEach(({ bodyA, bodyB }) => {
        [bodyA, bodyB].forEach((body) => {
          if (body.plugin.bagel && body.speed < 1.2) body.frictionAir = 0.025;
        });
      });
    };
    Events.on(engine, "collisionStart", softenSettledObjects);
    loadBagelTextures().then((textures) => { texturesRef.current = textures; });
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      Events.off(engine, "collisionStart", softenSettledObjects);
      Composite.clear(engine.world, false, true);
      Engine.clear(engine);
      engineRef.current = null;
      bodiesRef.current = [];
    };
  }, [resize]);

  const spawnObject = useCallback(() => {
    const engine = engineRef.current;
    const { width } = dimensionsRef.current;
    if (!engine || !width || bodiesRef.current.length >= PHYSICS_CONFIG.maxObjects) return;
    const size = randomBetween(...PHYSICS_CONFIG.objectSizeRange);
    const body = Bodies.circle(
      randomBetween(size, Math.max(size, width - size)),
      cameraY.current - PHYSICS_CONFIG.spawnAboveViewport,
      size / 2,
      {
        restitution: randomBetween(...PHYSICS_CONFIG.restitution),
        friction: randomBetween(...PHYSICS_CONFIG.friction),
        frictionAir: 0.012,
        density: PHYSICS_CONFIG.density,
        chamfer: { radius: size * 0.16 },
      },
    );
    Body.setAngle(body, randomBetween(-Math.PI, Math.PI));
    Body.setAngularVelocity(body, randomBetween(-0.075, 0.075));
    body.plugin.bagel = {
  size,
  textureIndex:
    texturesRef.current.length > 0
      ? Math.floor(Math.random() * texturesRef.current.length)
      : 0,
};
    bodiesRef.current.push(body);
    World.add(engine.world, body);
  }, [cameraY]);

  const step = useCallback((timestamp) => {
    if (engineRef.current && runnerRef.current) Runner.tick(runnerRef.current, engineRef.current, timestamp);
  }, []);

  return { bodiesRef, dimensionsRef, texturesRef, resize, spawnObject, step };
}
