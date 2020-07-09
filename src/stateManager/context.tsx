import React, { useReducer, useContext, Dispatch } from "react";
import { inputReducer, detailReducer, autocompleteReducer } from "./reducer";
import { StateType, PlaceDetail } from "../type";
import { combineReducer } from "../util";

interface ICProps {
  children: React.ReactNode;
}

const initialState: StateType = {
  form: {
    input: "",
  },
  autocomplete: {
    data: [],
    loading: false,
    error: "",
    success: false,
  },
  placeDetail: {
    data: {} as PlaceDetail,
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
    form: inputReducer,
    autocomplete: autocompleteReducer,
    placeDetail: detailReducer,
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
