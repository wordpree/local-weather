import React from "react";
import { motion } from "framer-motion";
import { Paper, makeStyles, Typography } from "@material-ui/core";
import logo from "../assets/drop.svg";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.75rem 0.25rem",
  },
  logoWrapper: {
    borderRadius: "50%",
    border: "3px solid #39316B",
    background: "radial-gradient(#3A326E, #39316B)",
    marginRight: "2.5rem",
  },
  logo: {
    maxWidth: 48,
  },
  title: {
    color: "#54499E",
    fontWeight: "bold",
  },
}));

const Header = () => {
  const classes = useStyles();
  const logoVariants = {
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
  return (
    <Paper className={classes.paper}>
      <motion.div className={classes.logoWrapper}>
        <motion.img
          src={logo}
          alt="logo"
          className={classes.logo}
          variants={logoVariants}
          animate="visible"
          initial="hidden"
        />
      </motion.div>
      <Typography variant="h3" className={classes.title}>
        A simple weather forecast website
      </Typography>
    </Paper>
  );
};

export default Header;
