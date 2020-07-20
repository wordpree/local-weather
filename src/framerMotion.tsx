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
      delay: 2,
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

export const logoVariants = {
  hidden: {
    rotate: 0,
  },
  visible: {
    rotate: [90, -90, -45, 45, 0],
    transition: {
      stiffness: 500,
      type: "spring",
      duration: 3,
    },
  },
};

export const infoVariants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    scale: 1.1,
    y: 6,
  },
};
