import * as TYPE from "./actionType";
import {
  TAutocomplete,
  TWeather,
  TPlaceDetail,
  Autocomplete,
  PlaceDetail,
  TPexels,
} from "../type";

//single reducer rather focuses on the being changed value inside the whole state
export function cityReducer(state: string[], action: TYPE.CityActionType) {
  const { city, type } = action as TYPE.CityActionType;
  switch (type) {
    case TYPE.GET_CITY:
      if (state.length > 2) {
        const [first, ...rest] = state;
        return [...rest, city];
      }
      return [...state, city];
    default:
      return state;
  }
}

export function inputReducer(state: string, action: TYPE.InputActionType) {
  const { input, type } = action as TYPE.Input;
  switch (type) {
    case TYPE.INPUT_SEARCH:
      return input;
    default:
      return state;
  }
}
export function autocompleteReducer(
  state: TAutocomplete,
  action: TYPE.AutocompleteActionType
) {
  const { type } = action;
  switch (type) {
    case TYPE.CLEAR_AUTOCOMPLETE:
      return {
        ...state,
        data: [],
        success: false,
      };
    case TYPE.FETCH_AUTOCOMPLETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case TYPE.FETCH_AUTOCOMPLETE_SUCCESS:
      const { data } = action as TYPE.GetAutocompleteSuccess;
      const { predictions } = data as Autocomplete;
      return {
        ...state,
        data: predictions,
        loading: false,
        success: true,
      };
    case TYPE.FETCH_AUTOCOMPLETE_FAILED:
      const { error } = action as TYPE.GetAutocompleteFail;
      return {
        ...state,
        error,
        success: false,
        loading: false,
        data: [],
      };
    default:
      return state;
  }
}

export function detailReducer(
  state: TPlaceDetail,
  action: TYPE.DetailActionType
) {
  const { type } = action;
  switch (type) {
    case TYPE.FETCH_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case TYPE.FETCH_DETAIL_SUCCESS:
      const { data } = action as TYPE.GetDetailSuccess;
      const { result } = data as PlaceDetail;
      return {
        ...state,
        data: result,
        loading: false,
        success: true,
      };
    case TYPE.FETCH_DETAIL_FAILED:
      const { error } = action as TYPE.GetDetailFail;
      return {
        ...state,
        error,
        success: false,
        loading: false,
        data: {},
      };
    default:
      return state;
  }
}

export function weatherReducer(
  state: TWeather,
  action: TYPE.WeatherActionType
) {
  const { type } = action;
  switch (type) {
    case TYPE.FETCH_WEATHER_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case TYPE.FETCH_WEATHER_SUCCESS:
      const { data } = action as TYPE.GetWeatherSuccess;
      const temp = {
        ...state,
        loading: false,
        success: true,
      };
      if (state.data.length > 2) {
        const [first, ...rest] = state.data;
        return { ...temp, data: [...rest, data] };
      }
      return {
        ...temp,
        data: [...state.data, data],
      };
    case TYPE.FETCH_WEATHER_FAILED:
      const { error } = action as TYPE.GetWeatherFail;
      return {
        ...state,
        error,
        success: false,
        loading: false,
        data: {},
      };
    default:
      return state;
  }
}

export function pexelsReducer(state: TPexels, action: TYPE.PexelsActionType) {
  const { type } = action;
  switch (type) {
    case TYPE.FETCH_PEXELS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case TYPE.FETCH_PEXELS_SUCCESS:
      const { data } = action as TYPE.GetPexelsSuccess;
      const temp = {
        ...state,
        loading: false,
        success: true,
      };
      const photo = data.photos[0].src.medium;
      if (state.data.length > 2) {
        const [first, ...rest] = state.data;
        return { ...temp, data: [...rest, photo] };
      }
      return {
        ...temp,
        data: [...state.data, photo],
      };
    case TYPE.FETCH_PEXELS_FAILED:
      const { error } = action as TYPE.GetPexelsFail;
      return {
        ...state,
        error,
        success: false,
        loading: false,
        data: {},
      };
    default:
      return state;
  }
}
