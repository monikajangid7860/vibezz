import { createSeededTexture } from "./helpers";

const IMAGE_SOURCES = [
  
  "/images/sandwitch.webp",
  "/images/donut.webp",
  "/images/donu.webp",
  "/images/what.webp",
  "/images/pink.png",
  "/images/packet.png",
  "/images/cake.png",
  "/images/light.png",
  "/images/burger.webp",
  "/images/pack.avif"
  
  
];

export function loadBagelTextures() {
  return Promise.all(
    IMAGE_SOURCES.map((src) => {
      return new Promise((resolve) => {
        const image = new Image();

        image.onload = () => resolve(createSeededTexture(image));
        image.onerror = () => resolve(null);

        image.src = src;
      });
    })
  ).then((textures) => textures.filter(Boolean));
}