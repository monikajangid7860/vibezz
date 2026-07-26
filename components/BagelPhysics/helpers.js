export const randomBetween = (minimum, maximum) => minimum + Math.random() * (maximum - minimum);

export const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

export function createSeededTexture(sourceImage) {
  const canvas = document.createElement("canvas");
  canvas.width = sourceImage.naturalWidth;
  canvas.height = sourceImage.naturalHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(sourceImage, 0, 0);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height);

  // The source uses a flat chroma green backdrop. Remove it once, not per frame.
  for (let pixel = 0; pixel < pixels.data.length; pixel += 4) {
    const [red, green, blue] = pixels.data.slice(pixel, pixel + 3);
    if (green > 165 && green > red * 1.35 && green > blue * 1.35) pixels.data[pixel + 3] = 0;
  }
  context.putImageData(pixels, 0, 0);
  return canvas;
}
