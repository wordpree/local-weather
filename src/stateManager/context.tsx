import React, { useReducer, useContext, Dispatch } from "react";
import * as reducer from "./reducer";
import { StateType, Detail } from "../type";
import { combineReducer } from "../util";
import { defaultLocation, defaultImg } from "../constant";

interface ICProps {
  children: React.ReactNode;
}

const initialState: StateType = {
  input: "",
  city: [defaultLocation],
  pexels: {
    data: [defaultImg],
    loading: false,
    error: "",
    success: false,
  },
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
    data: [],
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
    input: reducer.inputReducer,
    city: reducer.cityReducer,
    pexels: reducer.pexelsReducer,
    autocomplete: reducer.autocompleteReducer,
    placeDetail: reducer.detailReducer,
    weather: reducer.weatherReducer,
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
