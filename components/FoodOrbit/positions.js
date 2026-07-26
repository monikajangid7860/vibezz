// These are intentionally a top-half ellipse, rather than points from a circle.
// Keep the order from left to right; the food data moves between these fixed slots.
export const DESKTOP_ORBIT_POSITIONS = [
  { x: -390, y: 180, scale: 0.46, opacity: 0.25, zIndex: 1, blur: 2.5 },
  { x: -278, y: 104, scale: 0.62, opacity: 0.48, zIndex: 2, blur: 1.5 },
  { x: -152, y: 38, scale: 0.84, opacity: 0.82, zIndex: 4, blur: 0.4 },
  { x: 0, y: 0, scale: 1.36, opacity: 1, zIndex: 10, blur: 0 },
  { x: 152, y: 38, scale: 0.84, opacity: 0.82, zIndex: 4, blur: 0.4 },
  { x: 278, y: 104, scale: 0.62, opacity: 0.48, zIndex: 2, blur: 1.5 },
  { x: 390, y: 180, scale: 0.46, opacity: 0.25, zIndex: 1, blur: 2.5 },
];

export const MOBILE_ORBIT_POSITIONS = [
  { x: -174, y: 110, scale: 0.4, opacity: 0.2, zIndex: 1, blur: 2.5 },
  { x: -126, y: 68, scale: 0.54, opacity: 0.42, zIndex: 2, blur: 1.5 },
  { x: -70, y: 26, scale: 0.72, opacity: 0.75, zIndex: 4, blur: 0.4 },
  { x: 0, y: 0, scale: 1.1, opacity: 1, zIndex: 10, blur: 0 },
  { x: 70, y: 26, scale: 0.72, opacity: 0.75, zIndex: 4, blur: 0.4 },
  { x: 126, y: 68, scale: 0.54, opacity: 0.42, zIndex: 2, blur: 1.5 },
  { x: 174, y: 110, scale: 0.4, opacity: 0.2, zIndex: 1, blur: 2.5 },
];

export const ACTIVE_POSITION_INDEX = Math.floor(DESKTOP_ORBIT_POSITIONS.length / 2);
export const ORBIT_SPRING = { type: "spring", stiffness: 90, damping: 18, mass: 0.9 };
