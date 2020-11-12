import React from "react";
import useCachedAsync from "../../useCachedAsync";
import WeatherBoard from "./WeatherBoard";
import { OPEN_WEATHER_MAP_URL } from "../../constant";
import { IWeatherData } from "../../type";

interface IWProps {
  query: string;
  address: string;
  children: React.ReactNode;
}

const Weather = ({ query, address, children }: IWProps) => {
  const { state } = useCachedAsync<IWeatherData>(
    query,
    OPEN_WEATHER_MAP_URL + query
  );

  return <WeatherBoard state={state} address={address} cityNode={children} />;
};

export default Weather;
