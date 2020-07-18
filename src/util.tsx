import {
  StateType,
  PlaceDetail,
  Autocomplete,
  Detail,
  Hourly,
  Daily,
  Current,
} from "./type";
import { ActionType } from "./stateManager/actionType";
import { throttle } from "throttle-debounce";

type SearchItem = { [key: string]: string };
type Key = keyof StateType;

export function getGoogleFetchUrl(
  pathUrl: string,
  searchItem: SearchItem,
  queryString: string
) {
  const searchString = Object.keys(searchItem).map((key) => {
    const value = searchItem[key];
    if (value.trim().length === 0) return "";
    return `${key}=${value}`;
  });
  return `${pathUrl}?${queryString}&${searchString}`;
}

export function validation(response: Response) {
  if (!response.ok) {
    throw Error(`error-->${response.status}:${response.statusText}`);
  }
}

export function combineReducer(reducers: any) {
  const initialState = getInitialState(reducers);
  return (state = initialState, action: ActionType) => {
    const reducerKeys = Object.keys(reducers) as Key[];
    return reducerKeys.reduce((acc, current) => {
      const slice = reducers[current](state[current], action);
      return { ...acc, [current]: slice };
    }, state);
  };
}

export async function fetchData(fetchPara: { url: string; para?: any }) {
  const response = await fetch(fetchPara.url, { ...fetchPara.para });
  validation(response);
  return await response.json();
}

export function fetchingDataTypeGuard(
  data: PlaceDetail | Autocomplete
): data is Autocomplete {
  return data.hasOwnProperty("predictions");
}

export function getInitialState(reducers: any) {
  return Object.keys(reducers).reduce((acc, curr) => {
    const slice = reducers[curr](undefined, { type: undefined });
    return {
      ...acc,
      ...slice,
    };
  }, {} as StateType);
}

function hanldeDataDispatch(dispatch: React.Dispatch<any>) {
  return function (
    actions: any,
    fetchPara: { url: string; para?: any },
    type: { [key: string]: string }
  ) {
    dispatch(actions.requestData(type.request));
    fetchData(fetchPara)
      .then((data) => dispatch(actions.getDataSuccess(data, type.success)))
      .catch((error) =>
        dispatch(actions.getDataFailed(error.message, type.failed))
      );
  };
}

export function getWeatherFetchUrl(detail: Detail, url: string) {
  if (!detail.hasOwnProperty("geometry")) return "";
  const location = detail.geometry.location;
  const { lat, lng } = location;
  return `${url}&lat=${lat}&lon=${lng}`;
}

export function dispatchWithThrottle(dispatch: React.Dispatch<any>) {
  return throttle(
    200,
    (actions, fetchPara, type) =>
      fetchPara.url.trim() &&
      hanldeDataDispatch(dispatch)(actions, fetchPara, type)
  );
}

export function dateString(timeStamp: number) {
  return new Date(timeStamp).toDateString();
}

function getWeatherIcon(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
export function getSmWeatherIcon(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}.png`;
}
export function sortCurrentData(data: Current, offset: number) {
  const { temp, feels_like, uvi, sunset, weather, dt } = data;
  const icon = weather[0].icon;
  const iconUrl = getWeatherIcon(icon);
  const sunSet = getDateTime((sunset - offset) * 1000);
  const date = new Date((dt - offset) * 1000).toDateString();
  return { iconUrl, date, temp, feels_like, sunSet, uvi };
}

export function getDateTime(timestamp: number) {
  return new Date(timestamp).toLocaleString("en-AU", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
}

export function getDateHourly(hourly: Hourly[], timezone: number) {
  let dt: string[] = [];
  let temp: number[] = [];
  const offset = new Date().getTimezoneOffset() * 60000 + timezone * 1000;
  hourly.slice(0, 12).forEach((h) => {
    dt.push(getDateTime(h.dt * 1000 + offset));
    temp.push(h.temp);
  });
  return { time: dt, data: temp };
}

export function intNumber(input: number) {
  return Math.floor(input + 0.5);
}

export function getWeatherEle(daily: Daily, timezone: number, icon: any) {
  const { wind_speed, humidity, temp, sunset, sunrise } = daily;
  const { day } = temp;
  const offset = new Date().getTimezoneOffset() * 60000 + timezone * 1000;
  const sun =
    getDateTime(sunrise * 1000 + offset) +
    "--" +
    getDateTime(sunset * 1000 + offset);
  return [
    { value: humidity + "%", icon: icon[0] },
    { value: intNumber(day), icon: icon[1] },
    { value: wind_speed, icon: icon[2] },
    { value: sun, icon: icon[3] },
  ];
}

export function getAddressByDet(detail: Detail) {
  const addr = detail.address_components.reduce((acc, curr) => {
    if (curr.types.includes("locality") || curr.types.includes("country")) {
      acc.push(curr.short_name);
      return acc;
    }
    return acc;
  }, [] as string[]);
  return addr.join(",");
}

export function getWeekday(dt: number) {
  return new Date(dt * 1000).toLocaleString("en-AU", {
    weekday: "short",
  });
}
