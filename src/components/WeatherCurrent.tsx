import React from "react";
import { motion } from "framer-motion";
import { makeStyles, Typography, IconButton } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { defaultImg } from "../constant";
import { sortCurrentData } from "../util";
import { imgBorderVariants } from "../framerMotion";
import { Current } from "../type";

type Ele = "Feels like" | "Sunset" | "Uv index";
interface IWProps {
  current: Current;
  city: string;
  timezoneOffset: number;
}

const useStyles = makeStyles((theme) => ({
  entry: {
    padding: "1rem",
    borderBottom: "1px solid #a0a0a0",
  },
  header: {
    display: "flex",
    padding: "2rem",
    justifyContent: "space-between",
  },
  info: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
  },
  btn: {
    color: "#cecece",
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    border: "0px solid #fff",
  },
  body: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    color: "#fff",
    "&>*": {
      paddingTop: "0.5rem",
    },
  },
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  date: {
    display: "flex",
    flexDirection: "column",
    "&>p:first-child": {
      fontWeight: "bold",
      fontSize: "2rem",
      color: "#fff",
    },
    "&>p:last-child": {
      color: "#a0a0a0",
    },
  },
  tempWrapper: {
    position: "relative",
    "&>h2": {
      display: "inline-block",
    },
  },
  temp: {
    position: "absolute",
    "&::before": {
      content: '" \\00B0"',
      color: "#fff",
    },
  },
  location: {
    color: "#a0a0a0",
  },
  eles: {
    display: "flex",
    justifyContent: "center",
    padding: "1.5rem",
    "&>div": {
      marginRight: "auto",
      flexGrow: 1,
    },
  },
  ele: {
    display: "flex",
    flexDirection: "column",
    "&:first-child>span:last-child::after": {
      content: '" \\00B0""\\0043"',
      color: "#fff",
    },
  },
}));

const WeatherCurrent = ({ current, city, timezoneOffset }: IWProps) => {
  const classes = useStyles();
  const weatherEle = sortCurrentData(current, timezoneOffset);
  const { iconUrl, date, temp, feels_like, sunSet, uvi } = weatherEle;
  const eles = { "Feels like": feels_like, Sunset: sunSet, "Uv index": uvi };
  return (
    <motion.div className={classes.entry} initial="hidden" animate="visible">
      <div className={classes.header}>
        <div className={classes.info}>
          <Typography component="span">conditions</Typography>
          <IconButton className={classes.btn}>
            <ArrowDropDownIcon />
          </IconButton>
        </div>
        <div>
          <motion.img
            src={defaultImg}
            className={classes.img}
            alt="city"
            variants={imgBorderVariants}
          />
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.main}>
          <img src={iconUrl} alt="weather icon" />
          <div className={classes.date}>
            <Typography>Today</Typography>
            <Typography>{date}</Typography>
          </div>
        </div>
        <div className={classes.tempWrapper}>
          <Typography variant="h2">{temp}</Typography>
          <Typography component="span" className={classes.temp}>
            C
          </Typography>
        </div>
        <Typography variant="body2" className={classes.location}>
          {city}
        </Typography>
        <div className={classes.eles}>
          {Object.keys(eles).map((k) => (
            <Typography key={k} component="div" className={classes.ele}>
              <span>{k}</span>
              <span>{eles[k as Ele]}</span>
            </Typography>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCurrent;
