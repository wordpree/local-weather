export const imgBorderVariants = {
  hidden: {
    borderWidth: 0,
  },
  visible: {
    borderWidth: [3, 1, 3],
    transition: {
      type: "spring",
      stiffness: 200,
    },
  },
};

export const searchVariants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      easeIn: "easeInOut",
      stiffness: 100,
    },
  },
};
export const cloud1Variants = {
  hidden: {
    x: "-100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      type: "spring",
      stiffness: 10,
    },
  },
};
export const cloud2Variants = {
  hidden: {
    x: "100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeInOut",
      type: "spring",
      stiffness: 10,
    },
  },
};
