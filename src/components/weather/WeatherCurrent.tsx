import React, { useState } from "react";
import { motion } from "framer-motion";
import { makeStyles, Typography, IconButton } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { defaultImg } from "../../constant";
import { imgBorderVariants, infoVariants } from "../../framerMotion";

type Ele = "Feels like" | "Sunset" | "Uv index";
interface IWProps {
  currentData: { [key: string]: string | number };
  address: string;
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
  infoWrapper: {
    position: "relative",
  },
  info: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
  },
  des: {
    display: "inline-block",
    color: "#fff",
    position: "absolute",
    padding: "0.25rem 0.75rem",
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

const WeatherCurrent = ({ currentData, address }: IWProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {
    iconUrl,
    date,
    temp,
    feels_like,
    sunSet,
    uvi,
    description,
  } = currentData;
  const eles = { "Feels like": feels_like, Sunset: sunSet, "Uv index": uvi };
  const handleClick = () => setOpen((prev) => !prev);
  return (
    <motion.div className={classes.entry} initial="hidden" animate="visible">
      <div className={classes.header}>
        <div className={classes.infoWrapper}>
          <div className={classes.info}>
            <Typography component="span">conditions</Typography>
            <IconButton className={classes.btn} onClick={handleClick}>
              {open ? <ArrowDropUp /> : <ArrowDropDown />}
            </IconButton>
          </div>
          {open && (
            <motion.div variants={infoVariants} className={classes.des}>
              <Typography component="span" variant="body2">
                {description}
              </Typography>
            </motion.div>
          )}
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
          <img src={iconUrl as string} alt="weather icon" />
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
          {address}
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
