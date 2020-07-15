import React from "react";
import { List, ListItem } from "@material-ui/core";
import { Daily } from "../type";
import { useWeatherContext } from "../stateManager/context";
import { getEleByDaily } from "../util";
import CityGallery from "./CityGallery";

interface IWProps {
  daily: Daily[];
}

const WeatherDay = () => {
  const { state } = useWeatherContext();
  const { weather, city } = state;
  if (!weather.success) return null;
  const { daily } = weather.data[weather.data.length - 1];
  // const ret = getEleByDaily(daily);

  return (
    <div>
      <CityGallery city={city} />
      <List>
        <ListItem></ListItem>
      </List>
    </div>
  );
};

export default WeatherDay;
