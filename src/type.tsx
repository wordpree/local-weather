/**google place detail**/
export type Geometry = {
  lat: string;
  lng: string;
};
export type Components = {
  short_name: string;
  types: string[];
};
export interface Detail {
  geometry: {
    location: Geometry;
  };
  address_components: Components[];
}
export type PlaceDetail = { result: Detail };

/**open weather map**/
type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
type DailyTemp = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};
type DailyFeelsLike = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};
export type Hourly = {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  clouds: number;
  wind_speed: number;
  wind_deg: number;
  rain?: number;
  snow?: number;
  weather: Weather[];
};
export interface Daily extends Omit<Hourly, "temp" | "feels_like"> {
  feels_like: DailyFeelsLike;
  temp: DailyTemp;
  sunrise: number;
  sunset: number;
}
export interface Current extends Hourly {
  sunrise: number;
  sunset: number;
  uvi: number;
  visibility: number;
}

export interface IWeatherData {
  timezone_offset: number;
  current: Current;
  daily: Daily[];
  hourly: Hourly[];
}

export interface IWeatherDataWithLt extends IWeatherData {
  location: string;
}

/**google place autocomplete**/
export type Prediction = {
  description: string;
  place_id: string;
};
export type Autocomplete = { predictions: Prediction[] };

/**unsplash photo **/
export type Photo = {
  id: number;
  urls: { small: string };
};
export type UnsplashData = {
  results: Photo[];
};
/** city **/
export type TCity = {
  query: string;
  address: string;
  image: string;
};

/** Async **/
const IDLE = "idle";
const PEDING = "pending";
const RESOLVED = "resolved";
const REJETED = "rejected";
const CLEAR = "clear";

export type TAsyncData = IWeatherData | Autocomplete | null;

type TActionType =
  | typeof IDLE
  | typeof PEDING
  | typeof RESOLVED
  | typeof CLEAR
  | typeof REJETED;

export type TAsyncState<T> = {
  data: T | null | unknown;
  status: string;
  error: any;
};

export type TAsyncAction<T> = {
  data: T | null | unknown;
  type: TActionType;
  error: any;
};

export type TCashedWeather = {
  [key: string]: IWeatherDataWithLt;
};
