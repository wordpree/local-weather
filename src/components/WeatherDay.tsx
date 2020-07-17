import React from "react";
import { ListItem, makeStyles, Typography } from "@material-ui/core";
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
  const ret = getWeatherEle(day, offset, icon);
  const weekday = getWeekday(day.dt);
  const weatherIcon = getSmWeatherIcon(day.weather[0].icon);
  return (
    <ListItem className={classes.item}>
      <ul className={classes.ul}>
        <li>{weekday}</li>
        <li>
          <img src={weatherIcon} className={classes.weather} alt="weather" />
        </li>
        {ret.map((r) => (
          <li key={r.value} className={classes.wrapper}>
            <Typography component="span">{r.value}</Typography>
            <r.icon className={classes.icon} />
          </li>
        ))}
      </ul>
    </ListItem>
  );
};

export default WeatherDay;
