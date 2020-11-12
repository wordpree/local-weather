import {
  Photo,
  PlaceDetail,
  Autocomplete,
  Detail,
  Hourly,
  Daily,
  TCity,
  Current,
  TAsyncAction,
  TAsyncState,
  IWeatherData,
  UnsplashData,
} from "./type";
import defaultImg from "./assets/brisbane.jpg";
// import { throttle } from "throttle-debounce";

type SearchItem = { [key: string]: string };

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

// export function combineReducer(reducers: any) {
//   const initialState = getInitialState(reducers);
//   return (state = initialState, action: ActionType) => {
//     const reducerKeys = Object.keys(reducers) as Key[];
//     return reducerKeys.reduce((acc, current) => {
//       const slice = reducers[current](state[current], action);
//       return { ...acc, [current]: slice };
//     }, state);
//   };
// }

export async function fetchData<T>(url: string): Promise<T> {
  let response = await fetch(url);
  validation(response);
  return await response.json();
}

export function fetchingDataTypeGuard(
  data: PlaceDetail | Autocomplete | IWeatherData
): data is Autocomplete {
  return data.hasOwnProperty("predictions");
}

export function autoCompleteTypeGuard(data: any): data is Autocomplete {
  return data.hasOwnProperty("predictions");
}

export function getWeatherLocationQuery(detail: Detail) {
  if (!detail.hasOwnProperty("geometry")) return "";
  const location = detail.geometry.location;
  const { lat, lng } = location;
  return `lat=${lat}&lon=${lng}`;
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
export function sortCurrentData(data: Current, timezone: number) {
  const { temp, feels_like, uvi, sunset, weather, dt } = data;
  const offset = (new Date().getTimezoneOffset() * 60 + timezone) * 1000;
  const { icon, description } = weather[0];
  const iconUrl = getWeatherIcon(icon);
  const sunSet = getDateTime(sunset * 1000 + offset);
  const date = new Date(dt * 1000 + offset).toDateString();
  return { iconUrl, date, temp, feels_like, sunSet, uvi, description };
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
    const types = curr.types;
    if (
      types.includes("locality") ||
      types.includes("administrative_area_level_1") ||
      types.includes("country")
    ) {
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

export function arrayStack(arr: any[], insert: any) {
  const temp = [...arr, insert];
  if (arr.length > 2) {
    temp.shift();
  }
  return temp;
}

export function reducer<T>(state: TAsyncState<T>, action: TAsyncAction<T>) {
  const { data, error, type } = action;
  let status = { status: "idle" };
  switch (type) {
    case "pending":
      status = { status: "pending" };
      break;
    case "resolved":
      status = { status: "resolved" };
      break;
    case "rejected":
      status = { status: "rejected" };
      break;
    case "clear":
      status = { status: "idle" };
      break;
    default:
      throw new Error(`unknown action type: ${type}`);
  }
  return { ...state, data, error, ...status };
}

export function getGoogleFetchingUrl(
  base: string,
  sessiontoken: string,
  input: string,
  isDetail: boolean
) {
  const queryPara = isDetail ? "place_id" : "input";
  return `${base}&${queryPara}=${input}&sessiontoken=${sessiontoken}`;
}

export function processState<T>(state: TAsyncState<T>) {
  const { data, error, status } = state;
  const pending = status === "pending";
  const resolved = status === "resolved";
  const rejected = status === "rejected";
  const asyncData = data as T;
  return { pending, resolved, rejected, asyncData, error };
}

export function getRandomPhoto(photos: Photo[]) {
  const random = Math.floor(photos.length * Math.random());
  return photos[random].urls.small;
}

export function getImgFromUnsplash(data: UnsplashData) {
  const results = data.results;
  return results.length ? getRandomPhoto(results) : defaultImg;
}

export function isQueryInCity(query: string, city: TCity[]) {
  return city.find((c) => c.query === query);
}
