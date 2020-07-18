import React from "react";
import {
  ListItem,
  makeStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import {
  WeatherSunset,
  WeatherWindy,
  WaterPercent,
  TemperatureCelsius,
} from "mdi-material-ui";
import { getWeatherEle, getWeekday, getSmWeatherIcon } from "../util";

import { Daily } from "../type";

interface IWDProps {
  day: Daily;
  offset: number;
}

const useStyles = makeStyles({
  item: {
    borderBottom: "1px dashed #d0d0d0",
    "&:last-child": {
      border: "none",
    },
  },
  ul: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    listStyle: "none",
    alignItems: "center",
    padding: 0,
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    color: "#0A9DD0",
  },
  weather: {
    width: 40,
    height: 40,
  },
});

const WeatherDay = ({ day, offset }: IWDProps) => {
  const classes = useStyles();
  const icon = [WaterPercent, TemperatureCelsius, WeatherWindy, WeatherSunset];
  const md = useMediaQuery("(min-width:500px)");
  const min = day.temp.min;
  const max = day.temp.max;
  const humidity = day.humidity;
  const ret = getWeatherEle(day, offset, icon);
  const smRet = [
    { value: humidity + "%", icon: icon[0] },
    { value: `${min} - ${max}`, icon: icon[1] },
  ];
  const elements = md ? ret : smRet;
  const weekday = getWeekday(day.dt);
  const weatherIcon = getSmWeatherIcon(day.weather[0].icon);
  return (
    <ListItem className={classes.item}>
      <ul className={classes.ul}>
        <li>{weekday}</li>
        <li>
          <img src={weatherIcon} className={classes.weather} alt="weather" />
        </li>
        {elements.map((e) => (
          <li key={e.value} className={classes.wrapper}>
            <Typography component="span">{e.value}</Typography>
            <e.icon className={classes.icon} />
          </li>
        ))}
      </ul>
    </ListItem>
  );
};

export default WeatherDay;
