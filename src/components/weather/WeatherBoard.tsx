import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import CloudBgImage from "../CloudBgImage";
import WeatherHour from "./WeatherHour";
import { processState, sortCurrentData, getDateHourly } from "../../util";
import WeatherDaily from "./WeatherDaily";
import WeatherCurrent from "./WeatherCurrent";
import { Daily, IWeatherData, TAsyncState } from "../../type";

interface IWProps {
  cityNode: React.ReactNode;
  state: TAsyncState<IWeatherData>;
  address: string;
}

const useStyles = makeStyles((theme) => ({
  entry: {
    marginTop: "2rem",
  },
  right: {
    background: "#F2FBFF",
  },
  left: {
    overflow: "hidden",
    position: "relative",
    background: "#332C62",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    [theme.breakpoints.up(960)]: {
      borderRadius: 0,
      borderTopLeftRadius: 12,
    },
  },
}));

const WeatherBoard = ({ address, state, cityNode }: IWProps) => {
  const classes = useStyles();
  let currentEle = {};
  let dailyEle: Daily[] = [];
  let time: string[] = [];
  let data: number[] = [];
  let timezoneOffset = 0;
  const {
    pending,
    rejected,
    resolved,
    asyncData: weatherData,
    error,
  } = processState<IWeatherData>(state);
  if (resolved) {
    const { current, timezone_offset, daily, hourly } = weatherData;
    currentEle = sortCurrentData(current, timezone_offset);
    data = getDateHourly(hourly, timezone_offset).data;
    time = getDateHourly(hourly, timezone_offset).time;
    dailyEle = daily;
    timezoneOffset = timezone_offset;
  }
  if (pending) {
    currentEle = {
      iconUrl: "",
      date: "",
      temp: 0,
      feels_like: 0,
      sunSet: "",
      uvi: 0,
      description: "",
    };
    data = Array(11).fill("0");
    time = Array(11).fill(0);
    dailyEle = [];
  }
  if (rejected) {
    return <p>{error.message}</p>;
  }

  return (
    <Grid container className={classes.entry}>
      <Grid className={classes.left} item xs={12} md={5}>
        <CloudBgImage />
        <WeatherCurrent currentData={currentEle} address={address} />
        <WeatherHour data={data} time={time} />
      </Grid>
      <Grid className={classes.right} item xs={12} md={7}>
        {cityNode}
        <WeatherDaily daily={dailyEle} timezoneOffset={timezoneOffset} />
      </Grid>
    </Grid>
  );
};

export default WeatherBoard;
