const API_KEY = "AIzaSyBIDPYFVWcF6oMGjC09UXAjXz7L735A36Y";
const GOOGLE_BASE_URL =
  "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const CORS = "https://cors-anywhere.herokuapp.com/";
export function getGoogleAutoCompleteUrl(loction: string) {
  return `${CORS}${GOOGLE_BASE_URL}?input=${loction}&types=(regions)&key=${API_KEY}`;
}
