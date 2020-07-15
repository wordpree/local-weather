import {
  StateType,
  PlaceDetail,
  Autocomplete,
  Detail,
  Current,
  Hourly,
  Daily,
  City,
  WeatherData,
} from "./type";
import { ActionType } from "./stateManager/actionType";
import { throttle } from "throttle-debounce";
import { GOOGLE_PLACE_PHOTO } from "./constant";

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
  if (response.statusText !== "OK") {
    throw Error(`error-->${response.status}:${response.statusText}`);
  }
}

export function combineReducer(reducers: any) {
  const initialState = getInitialState(reducers);
  // console.log("init", initialState);
  return (state = initialState, action: ActionType) => {
    const reducerKeys = Object.keys(reducers) as Key[];
    return reducerKeys.reduce((acc, current) => {
      const slice = reducers[current](state[current], action);
      return { ...acc, [current]: slice };
    }, state);
  };
}

export async function fetchData(url: string) {
  const response = await fetch(url);
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
    fetchUrl: string,
    type: { [key: string]: string }
  ) {
    dispatch(actions.requestData(type.request));
    fetchData(fetchUrl)
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
    (actions, fetchUrl, type) =>
      fetchUrl && hanldeDataDispatch(dispatch)(actions, fetchUrl, type)
  );
}

export function dateString(timeStamp: number) {
  return new Date(timeStamp).toDateString();
}

export function currDate() {
  return new Date().toDateString();
}
function getWeatherIcon(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
export function sortCurrentData(data: WeatherData[]) {
  const { temp, feels_like, uvi, sunset, weather } = data[
    data.length - 1
  ].current;
  const icon = weather[0].icon;
  const iconUrl = getWeatherIcon(icon);
  const sunSet = getDateTime(sunset * 1000);
  return { iconUrl, date: currDate(), temp, feels_like, sunSet, uvi };
}

export function getCityInfo(
  city: City,
  defaultName: string,
  defaultImg: string
) {
  let imgUrl = defaultImg;
  let location = defaultName;
  if (city.hasOwnProperty("photo")) {
    const { photo, name } = city;
    imgUrl = `${GOOGLE_PLACE_PHOTO}&photoreference=${photo.photo_reference}`;
    location = name;
  }
  return { imgUrl, location };
}

export function getDateTime(timestamp: number) {
  return new Date(timestamp).toLocaleString("en-AU", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
}

export function getDateHourly(hourly: Hourly[]) {
  let dt: string[] = [];
  let temp: number[] = [];
  hourly.slice(0, 12).forEach((h) => {
    dt.push(getDateTime(h.dt * 1000));
    temp.push(h.temp);
  });
  return { time: dt, data: temp };
}

export function getEleByDaily(daily: Daily[]) {
  let temp = [];
  let humidity = [];
  let windSpeed = [];
}

export function makeCityInfo(detail: Detail) {
  const { photos, name } = detail;
  return { photo: photos[0], name };
}
