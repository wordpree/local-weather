import * as TYPE from "./actionType";
import { StateType, Autocomplete, PlaceDetail } from "../type";

//single reducer rather focuses on the being changed value not the whole state
export function inputReducer(state: StateType, action: TYPE.ActionType) {
  const { input, type } = action as TYPE.Input;
  switch (type) {
    case TYPE.INPUT_SEARCH:
      return { ...state, input };
    default:
      return state;
  }
}
export function autocompleteReducer(state: StateType, action: TYPE.ActionType) {
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
      };
    default:
      return state;
  }
}

export function detailReducer(state: StateType, action: TYPE.ActionType) {
  const { type } = action;
  switch (type) {
    case TYPE.CLEAR_DETAIL:
      return {
        ...state,
        data: {},
        success: false,
      };
    case TYPE.FETCH_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
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
      };
    default:
      return state;
  }
}
