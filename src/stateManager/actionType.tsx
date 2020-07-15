import { Autocomplete, PlaceDetail, WeatherData, City } from "../type";

export const GET_CITY = "GET_CITY";
export const INPUT_SEARCH = "INPUT_SEARCH";
export const CLEAR_AUTOCOMPLETE = "CLEAR_AUTOCOMPLETE";
export const FETCH_AUTOCOMPLETE_SUCCESS = "FETCH_AUTOCOMPLETE_SUCCESS";
export const FETCH_AUTOCOMPLETE_FAILED = "FETCH_AUTOCOMPLETE_FAILED";
export const FETCH_AUTOCOMPLETE_REQUEST = "FETCH_AUTOCOMPLETE_REQUEST";
export const FETCH_DETAIL_SUCCESS = "FETCH_DETAIL_SUCCESS";
export const FETCH_DETAIL_FAILED = "FETCH_DETAIL_FAILED";
export const FETCH_DETAIL_REQUEST = "FETCH_DETAIL_REQUEST";
export const FETCH_WEATHER_REQUEST = "FETCH_WEATHER_REQUEST";
export const FETCH_WEATHER_SUCCESS = "FETCH_WEATHER_SUCCESS";
export const FETCH_WEATHER_FAILED = "FETCH_WEATHER_FAILED";

//form input
export interface Input {
  type: typeof INPUT_SEARCH;
  input: string;
}
//get place detail photo
export interface CityInfo {
  type: typeof GET_CITY;
  city: City;
}
//google place api autocomplete
export interface RequestAutocomplete {
  type: typeof FETCH_AUTOCOMPLETE_REQUEST;
  loading: boolean;
}
export interface GetAutocompleteSuccess {
  type: typeof FETCH_AUTOCOMPLETE_SUCCESS;
  data: Autocomplete;
  loading: boolean;
  success: boolean;
}
export interface GetAutocompleteFail {
  type: typeof FETCH_AUTOCOMPLETE_FAILED;
  loading: boolean;
  error: string;
  success: boolean;
}
export interface ClearAutocomplete {
  type: typeof CLEAR_AUTOCOMPLETE;
  data: Autocomplete;
}

//google place api detail
export interface RequestDetail {
  type: typeof FETCH_DETAIL_REQUEST;
  loading: boolean;
}
export interface GetDetailSuccess {
  type: typeof FETCH_DETAIL_SUCCESS;
  data: PlaceDetail;
  loading: boolean;
  success: boolean;
}
export interface GetDetailFail {
  type: typeof FETCH_DETAIL_FAILED;
  loading: boolean;
  error: string;
  success: boolean;
}

//open weather maps api
export interface RequestWeather {
  type: typeof FETCH_WEATHER_REQUEST;
  loading: boolean;
}
export interface GetWeatherSuccess {
  type: typeof FETCH_WEATHER_SUCCESS;
  data: WeatherData;
  loading: boolean;
  success: boolean;
}
export interface GetWeatherFail {
  type: typeof FETCH_WEATHER_FAILED;
  loading: boolean;
  error: string;
  success: boolean;
}

export type InputActionType = Input;
export type CityActionType = CityInfo;
export type AutocompleteActionType =
  | RequestAutocomplete
  | GetAutocompleteSuccess
  | GetAutocompleteFail
  | ClearAutocomplete;
export type DetailActionType = RequestDetail | GetDetailSuccess | GetDetailFail;
export type WeatherActionType =
  | RequestWeather
  | GetWeatherSuccess
  | GetWeatherFail;
export type ActionType =
  | InputActionType
  | CityActionType
  | AutocompleteActionType
  | DetailActionType
  | WeatherActionType;
