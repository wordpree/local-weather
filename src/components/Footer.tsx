import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  entry: {
    marginTop: "3rem",
    background: "#332C62",
    padding: "2em",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  title: {
    color: "#fff",
  },
  api: {
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    "&>a": {
      padding: "0.25em",
      textDecorationColor: "#fff",
      transition: "all 0.5s",
    },
    "&>a:hover": {
      textDecoration: "none",
    },
    padding: "1.5em",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      padding: 0,
    },
  },
  span: {
    color: "#fff",
    fontSize: "0.875rem",
  },
  right: {
    color: "#fff",
    "&>a": {
      textDecorationColor: "#fff",
      color: "#fff",
      fontWeight: 600,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.entry}>
      <Typography variant="subtitle1" className={classes.title}>
        A REST API website
      </Typography>
      <div className={classes.api}>
        <Typography
          component="a"
          target="_blank"
          href="https://developers.google.com/places/web-service/overview"
          rel="noopener noreferrer"
        >
          <span className={classes.span}>Google place API</span>
        </Typography>
        <Typography
          component="a"
          href="https://openweathermap.org/api"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className={classes.span}>Open weather map</span>
        </Typography>
        <Typography
          component="a"
          href="https://unsplash.com/developers"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className={classes.span}>Unsplash</span>
        </Typography>
      </div>
      <div>
        <Typography variant="caption" className={classes.right}>
          Plan, design and develop by{" "}
          <a
            href="https://haireact.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            JUN
          </a>
          <sup>&#169;{new Date().getFullYear()}</sup>
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
