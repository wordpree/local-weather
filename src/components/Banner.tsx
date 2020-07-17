import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, makeStyles, Grid } from "@material-ui/core";
import cloud from "../assets/cloud.svg";
import WeatherDay from "./WeatherDayList";
import WeatherCityList from "./WeatherCityList";
import Search from "./search";
import WeatherCurrent from "./WeatherCurrent";
import WeatherHour from "./WeatherHour";
import { useWeatherContext } from "../stateManager/context";
import { cloud1Variants, cloud2Variants } from "../framerMotion";

const useStyles = makeStyles((theme) => ({
  entry: {
    marginTop: "3rem",
  },
  left: {
    background: "#F2FBFF",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  searchContainer: {
    padding: "1rem 0.25rem",
    marginTop: "2rem",
  },
  right: {
    overflow: "hidden",
    position: "relative",
    background: "#332C62",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
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
    bottom: "5%",
    left: -60,
  },
}));
const Banner = () => {
  const classes = useStyles();
  const [cityId, setCityId] = useState(0);
  const { state } = useWeatherContext();
  const handleCityId = (id: number) => setCityId(id);
  const { weather, pexels, city } = state;
  const length = weather.data.length;
  useEffect(() => {
    if (weather.success) {
      setCityId(length - 1);
    }
  }, [length, weather.success]);
  return (
    <Container className={classes.entry}>
      <motion.div initial="hidden" animate="visible">
        <Grid container>
          <Grid className={classes.left} item xs={12} md={7}>
            <Search />
            <WeatherCityList
              city={city}
              photo={pexels}
              handleCityId={handleCityId}
            />
            {weather.success && (
              <WeatherDay
                day={weather.data[cityId].daily}
                timezoneOffset={weather.data[cityId].timezone_offset}
              />
            )}
          </Grid>
          <Grid className={classes.right} item xs={12} md={5}>
            <div>
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
            {weather.success && (
              <>
                <WeatherCurrent
                  current={weather.data[cityId].current}
                  city={city[cityId]}
                  timezoneOffset={weather.data[cityId].timezone_offset}
                />
                <WeatherHour
                  hour={weather.data[cityId].hourly}
                  timezoneOffset={weather.data[cityId].timezone_offset}
                />
              </>
            )}
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Banner;
