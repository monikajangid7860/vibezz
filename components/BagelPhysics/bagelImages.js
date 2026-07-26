import { createSeededTexture } from "./helpers";

const IMAGE_SOURCES = [
  "/images/bagel-key.png",
  "/images/sandwitch.webp",
  "/images/donut.webp",
  "/images/donu.webp",
  "/images/what.webp",
  
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