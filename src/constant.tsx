import * as TYPE from "./stateManager/actionType";
import image from "./assets/brisbane.jpg";

export const G_API_KEY = "AIzaSyBIDPYFVWcF6oMGjC09UXAjXz7L735A36Y";
const W_API_KEY = "00194910deb21b1edc80422332e0c1ec";
const P_API_KEY = "563492ad6f91700001000001f2888cf110ad4577877362bd98cd211d";

export const CORS = "https://cors-anywhere.herokuapp.com/";
export const PEXELS_QUERY = `https://api.pexels.com/v1/search?query=`;
export const GOOGLE_PLACE_URL = `${CORS}https://maps.googleapis.com/maps/api/place/`;
export const GOOGLE_AUTOCOMPLETE_PATH = `${GOOGLE_PLACE_URL}autocomplete/json`;
export const GOOGLE_PLACE_DETAIL_PATH = `${GOOGLE_PLACE_URL}details/json`;
export const GOOGLE_PLACE_DETAIL_QUERY = `fields=geometry,address_component&key=${G_API_KEY}`;
export const GOOGLE_AUTOCOMPLETE_QUERY = `types=(regions)&key=${G_API_KEY}`;
export const OPEN_WEATHER_MAP_URL = `https://api.openweathermap.org/data/2.5/onecall?exclude=minutely&units=metric&appid=${W_API_KEY}`;
export const defaultLocation = "Brisbane City,Australia";
export const defaultImg = image;
export const autocompleteType = {
  request: TYPE.FETCH_AUTOCOMPLETE_REQUEST,
  success: TYPE.FETCH_AUTOCOMPLETE_SUCCESS,
  failed: TYPE.FETCH_AUTOCOMPLETE_FAILED,
};
export const weatherType = {
  request: TYPE.FETCH_WEATHER_REQUEST,
  success: TYPE.FETCH_WEATHER_SUCCESS,
  failed: TYPE.FETCH_WEATHER_FAILED,
};
export const detailType = {
  request: TYPE.FETCH_DETAIL_REQUEST,
  success: TYPE.FETCH_DETAIL_SUCCESS,
  failed: TYPE.FETCH_DETAIL_FAILED,
};
export const pexelsType = {
  request: TYPE.FETCH_PEXELS_REQUEST,
  success: TYPE.FETCH_PEXELS_SUCCESS,
  failed: TYPE.FETCH_PEXELS_FAILED,
};

export const PEXELS_PARA = {
  headers: { Authorization: P_API_KEY },
};
