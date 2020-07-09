import React from "react";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  dotWrapper: {
    display: "flex",
    maxWidth: 240,
    listStyle: "none",
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: "50%",
    background: "#cecece",
    marginRight: "auto",
  },
});

const DotLoading = () => {
  const classes = useStyles();
  const ulVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const liVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      y: 4,
      transition: {
        yoyo: Infinity,
        stiffness: 1000,
      },
    },
  };
  return (
    <motion.ul
      className={classes.dotWrapper}
      variants={ulVariants}
      animate="visible"
      initial="hidden"
    >
      {[...Array(5)].map((l, index) => (
        <motion.li key={index} className={classes.dot} variants={liVariants} />
      ))}
    </motion.ul>
  );
};

export default DotLoading;
