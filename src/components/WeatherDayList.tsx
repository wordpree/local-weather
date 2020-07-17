import React from "react";
import { List } from "@material-ui/core";
import WeatherDay from "./WeatherDay";
import { Daily } from "../type";

interface IWProps {
  day: Daily[];
  timezoneOffset: number;
}

const WeatherDayList = ({ day, timezoneOffset }: IWProps) => {
  return (
    <div>
      <List>
        {day.slice(1).map((d) => (
          <WeatherDay key={d.dt} day={d} offset={timezoneOffset} />
        ))}
      </List>
    </div>
  );
};

export default WeatherDayList;
