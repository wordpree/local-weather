/**google place detail**/
type Geometry = {
  lat: string;
  lng: string;
};
type Photo = {
  photo_reference: string;
};
export interface Detail {
  geometry: {
    location: Geometry;
  };
  photos: Photo[];
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
type Hourly = {
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
interface Daily extends Omit<Hourly, "temp" | "feels_like"> {
  feels_like: DailyFeelsLike;
  temp: DailyTemp;
}
export interface Current extends Hourly {
  sunrise: number;
  sunset: number;
  uvi: number;
  visibility: number;
}

export interface WeatherData {
  timezone_offset: number;
  current: Current;
  daily: Daily[];
  hourly: Hourly[];
}

/**google place autocomplete**/
export type Prediction = {
  description: string;
  place_id: string;
};
export type Autocomplete = { predictions: Prediction[] };

/**state**/
type Form = {
  input: string;
};
type DataFetching<T> = {
  data: T;
  loading: boolean;
  error: "";
  success: boolean;
};
export interface StateType {
  form: Form;
  autocomplete: DataFetching<Prediction[]>;
  placeDetail: DataFetching<Detail>;
  weather: DataFetching<WeatherData>;
}
