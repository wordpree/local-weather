import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dispatchWithThrottle } from "../util";
import { Container, makeStyles, Grid } from "@material-ui/core";
import SearchForm from "./search";
import cloud from "../assets/cloud.svg";
import WeatherDay from "./WeatherDay";
import WeatherCurrent from "./WeatherCurrent";
import WeatherHour from "./WeatherHour";
import { useWeatherContext } from "../stateManager/context";
import * as actions from "../stateManager/actions";
import { weatherType, OPEN_WEATHER_MAP_URL } from "../constant";
import { WeatherData } from "../type";
import {
  searchVariants,
  cloud1Variants,
  cloud2Variants,
} from "../framerMotion";

const useStyles = makeStyles((theme) => ({
  entry: {
    marginTop: "3rem",
  },
  right: {
    height: 500,
    background: "#F2F2F2",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  searchContainer: {
    padding: "1rem 0.25rem",
    marginTop: "2rem",
  },
  left: {
    overflow: "hidden",
    position: "relative",
    background: "#332C62",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    "& >div >img ": {
      maxWidth: 160,
      position: "absolute",
    },
  },
  img1: {
    top: "20%",
    right: -60,
  },
  img2: {
    bottom: "30%",
    left: -60,
  },
}));
const Banner = () => {
  const classes = useStyles();
  const [weather, setWeather] = useState({} as WeatherData);
  const { dispatch } = useWeatherContext();
  useEffect(() => {
    const weatherUrl =
      OPEN_WEATHER_MAP_URL + "&lat=-27.4697707&lon=153.0251235";
    dispatchWithThrottle(dispatch)(actions, weatherUrl, weatherType);
  }, [dispatch]);
  return (
    <Container className={classes.entry}>
      <motion.div initial="hidden" animate="visible">
        <Grid container>
          <Grid className={classes.left} item xs={12} md={5}>
            <motion.div>
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
            </motion.div>
            <WeatherCurrent />
            <WeatherHour />
          </Grid>
          <Grid className={classes.right} item xs={12} md={7}>
            <motion.div
              variants={searchVariants}
              className={classes.searchContainer}
            >
              <SearchForm />
            </motion.div>
            <WeatherDay />
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Banner;
