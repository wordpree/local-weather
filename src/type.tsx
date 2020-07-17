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
/**pexels photo search**/
export type Photo = {
  id: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    medium: string;
  };
};
export type PexelsData = {
  photos: Photo[];
};
/**state**/
export type City = {
  photo: string;
  name: string;
};

type DataFetching<T> = {
  data: T;
  loading: boolean;
  error: "";
  success: boolean;
};

export type TAutocomplete = DataFetching<Prediction[]>;
export type TPlaceDetail = DataFetching<Detail>;
export type TWeather = DataFetching<WeatherData[]>;
export type TPexels = DataFetching<string[]>;

export interface StateType {
  input: string;
  city: string[];
  pexels: TPexels;
  autocomplete: TAutocomplete;
  placeDetail: TPlaceDetail;
  weather: TWeather;
}
