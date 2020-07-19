import React from "react";
import { motion, useCycle } from "framer-motion";
import { Paper, makeStyles, Typography, Button } from "@material-ui/core";
import { Menu } from "mdi-material-ui";
import logo from "../assets/drop.svg";
import { logoVariants } from "../framerMotion";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    [theme.breakpoints.up(768)]: {
      justifyContent: "center",
    },
  },
  logoWrapper: {
    borderRadius: "50%",
    border: "3px solid #39316B",
    background: "radial-gradient(#3A326E, #39316B)",
    marginRight: "2.5rem",
  },
  logo: {
    maxWidth: 40,
  },
  title: {
    display: "none",
    [theme.breakpoints.up(768)]: {
      display: "inline-block",
      color: "#54499E",
      fontWeight: "bold",
    },
  },
  menu: {
    display: "inherit",
    [theme.breakpoints.up(768)]: {
      display: "none",
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  const [y, yCycle] = useCycle(0, 12, -12);
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
      <motion.div onTap={() => yCycle()} animate={{ y, rotate: y }}>
        <Button className={classes.menu}>
          <Menu />
        </Button>
      </motion.div>
    </Paper>
  );
};

export default Header;
