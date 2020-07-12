import * as TYPE from "./stateManager/actionType";

export const CORS = "https://cors-anywhere.herokuapp.com/";
export const API_KEY = "AIzaSyBIDPYFVWcF6oMGjC09UXAjXz7L735A36Y";
export const GOOGLE_PLACE_URL = `https://maps.googleapis.com/maps/api/place/`;
export const GOOGLE_AUTOCOMPLETE_PATH = `${GOOGLE_PLACE_URL}autocomplete/json`;
export const GOOGLE_PLACE_DETAIL_PATH = `${GOOGLE_PLACE_URL}details/json`;
export const GOOGLE_PLACE_DETAIL_QUERY =
  "fields=geometry,address_component,photo";
export const GOOGLE_AUTOCOMPLETE_QUERY = "types=(regions)";
export const OPEN_WEATHER_MAP_URL = `https://api.openweathermap.org/data/2.5/onecall?exclude=minutely&units=metric&appid=00194910deb21b1edc80422332e0c1ec`;
export const autocomplete = {
  request: TYPE.FETCH_AUTOCOMPLETE_REQUEST,
  success: TYPE.FETCH_AUTOCOMPLETE_SUCCESS,
  failed: TYPE.FETCH_AUTOCOMPLETE_FAILED,
};
export const weather = {
  request: TYPE.FETCH_WEATHER_REQUEST,
  success: TYPE.FETCH_WEATHER_SUCCESS,
  failed: TYPE.FETCH_WEATHER_FAILED,
};
export const detail = {
  request: TYPE.FETCH_DETAIL_REQUEST,
  success: TYPE.FETCH_DETAIL_SUCCESS,
  failed: TYPE.FETCH_DETAIL_FAILED,
};
