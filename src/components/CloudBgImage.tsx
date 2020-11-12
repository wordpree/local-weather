import React from "react";
import { motion } from "framer-motion";
import { makeStyles } from "@material-ui/core";
import cloud from "../assets/cloud.svg";
import { cloud1Variants, cloud2Variants } from "../framerMotion";

const useStyles = makeStyles((theme) => ({
  imgWrapper: {
    "&>img": {
      maxWidth: 160,
      position: "absolute",
      [theme.breakpoints.down("sm")]: {
        maxWidth: 80,
      },
    },
  },
  img1: {
    top: "30%",
    right: -60,
    [theme.breakpoints.down("sm")]: {
      right: -40,
    },
  },
  img2: {
    bottom: "5%",
    left: -60,
    [theme.breakpoints.down("sm")]: {
      left: -40,
    },
  },
}));

const CloudBgImage = () => {
  const classes = useStyles();
  return (
    <div className={classes.imgWrapper}>
      <motion.img
        variants={cloud1Variants}
        src={cloud}
        alt="cloud"
        className={classes.img1}
      />
      <motion.img
        src={cloud}
        variants={cloud2Variants}
        alt="cloud"
        className={classes.img2}
      />
    </div>
  );
};

export default CloudBgImage;
