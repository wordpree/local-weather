import React, { useReducer, useContext, Dispatch } from "react";
import {
  inputReducer,
  detailReducer,
  autocompleteReducer,
  weatherReducer,
  cityReducer,
} from "./reducer";
import { StateType, Detail, WeatherData, City } from "../type";
import { combineReducer } from "../util";

interface ICProps {
  children: React.ReactNode;
}

const initialState: StateType = {
  input: "",
  city: {} as City,
  autocomplete: {
    data: [],
    loading: false,
    error: "",
    success: false,
  },
  placeDetail: {
    data: {} as Detail,
    loading: false,
    error: "",
    success: false,
  },
  weather: {
    data: [] as WeatherData[],
    loading: false,
    error: "",
    success: false,
  },
};

const WeatherContext = React.createContext<{
  state: StateType;
  dispatch: Dispatch<any>;
}>({ state: initialState, dispatch: () => null });

const WeatherContextProvid = ({ children }: ICProps) => {
  const rootReducer = combineReducer({
    input: inputReducer,
    city: cityReducer,
    autocomplete: autocompleteReducer,
    placeDetail: detailReducer,
    weather: weatherReducer,
  });

  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};
const useWeatherContext = () => useContext(WeatherContext);
export { WeatherContextProvid, useWeatherContext };
