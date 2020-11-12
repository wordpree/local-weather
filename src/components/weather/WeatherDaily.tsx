import React from "react";
import { List } from "@material-ui/core";
import { Daily } from "../../type";
import WeatherDay from "./WeatherDay";
import DotLoading from "../DotLoading";

interface IWProps {
  daily: Daily[];
  timezoneOffset: number;
}
const WeatherDaily = ({ daily, timezoneOffset }: IWProps) => {
  return (
    <div>
      <List>
        {daily.length ? (
          daily.map((d) => (
            <WeatherDay key={d.dt} day={d} offset={timezoneOffset} />
          ))
        ) : (
          <DotLoading />
        )}
      </List>
    </div>
  );
};

export default WeatherDaily;
