export const foods = [
  {
    id: 1,
    src: "/images/banhmi.png",
    alt: "Banh Mi",

    className:
      "absolute left-[-8%] top-[-8%] w-[clamp(16rem,30vw,32rem)] z-40",

    imgClass: "-rotate-[14deg]",

    initial: {
      opacity: 0,
      x: -80,
      y: -60,
      rotate: -20,
      scale: .9,
    },

    animate: {
      opacity: 1,

      x: [0, 8, 3, -6, 5, 0],

      y: [0, -18, -8, 10, -12, 0],

      rotate: [-14, -9, -13, -16, -11, -14],

      scale: [1, 1.02, 1, .99, 1.01, 1],
    },

    duration: 10,
  },

  {
    id: 2,

    src: "/images/noodle.png",

    alt: "Noodles",

    className:
      "absolute right-[-10%] bottom-[-10%] w-[clamp(18rem,34vw,38rem)] z-40",

    imgClass: "rotate-[10deg]",

    initial: {
      opacity: 0,
      x: 80,
      y: 60,
      rotate: 18,
      scale: .92,
    },

    animate: {
      opacity: 1,

      x: [0, -8, 6, -3, 4, 0],

      y: [0, 12, -16, 7, -10, 0],

      rotate: [10, 14, 8, 12, 9, 10],

      scale: [1, .99, 1.02, 1, 1.01, 1],
    },

    duration: 11,
  },

  {
    id: 3,

    src: "/images/chilli.png",

    alt: "Chilli",

    className:
      "absolute left-[64%] top-[43%] w-[clamp(5rem,9vw,8rem)] z-50",

    imgClass: "rotate-[22deg]",

    initial: {
      opacity: 0,
      y: 30,
      rotate: 12,
    },

    animate: {
      opacity: 1,

      x: [0, 5, -4, 2, 0],

      y: [0, -12, 6, -8, 0],

      rotate: [22, 28, 20, 25, 22],
    },

    duration: 8,
  },
];