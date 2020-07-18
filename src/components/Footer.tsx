import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  entry: {
    background: "#dedede",
  },
});

const Footer = () => {
  const classes = useStyles();
  return <div className={classes.entry}></div>;
};

export default Footer;
