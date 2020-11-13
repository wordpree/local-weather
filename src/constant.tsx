export { default as defaultImg } from "./assets/brisbane.jpg";
export { default as flow } from "./assets/weather-flow.jpg";
export { default as app } from "./assets/weather-app.jpg";

const G_API_KEY = "AIzaSyDhCjAt2GiEpze45zZny01LhjvOCBnm5_I";
const W_API_KEY = "00194910deb21b1edc80422332e0c1ec";
const U_API_KEY =
  "62290e497985a003118ae759aa80d4f3f2a5c6b05a053f4d32a744866330b765";
export const CORS = "https://cors-anywhere.herokuapp.com/";
export const UNSPLASH_QUERY = `https://api.unsplash.com/search/photos?client_id=${U_API_KEY}`;
export const GOOGLE_PLACE_URL = `${CORS}https://maps.googleapis.com/maps/api/place/`;
export const GOOGLE_AUTOCOMPLETE_BASE = `${GOOGLE_PLACE_URL}autocomplete/json?types=(regions)&key=${G_API_KEY}`;
export const GOOGLE_PLACE_DETAIL_BASE = `${GOOGLE_PLACE_URL}details/json?fields=geometry,address_component&key=${G_API_KEY}`;
export const OPEN_WEATHER_MAP_URL = `https://api.openweathermap.org/data/2.5/onecall?exclude=minutely&units=metric&appid=${W_API_KEY}&`;
