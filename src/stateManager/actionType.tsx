import { Autocomplete, PlaceDetail } from "../type";

export const INPUT_SEARCH = "INPUT_SEARCH";
export const CLEAR_AUTOCOMPLETE = "CLEAR_AUTOCOMPLETE";
export const FETCH_AUTOCOMPLETE_SUCCESS = "FETCH_AUTOCOMPLETE_SUCCESS";
export const FETCH_AUTOCOMPLETE_FAILED = "FETCH_AUTOCOMPLETE_FAILED";
export const FETCH_AUTOCOMPLETE_REQUEST = "FETCH_AUTOCOMPLETE_REQUEST";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const FETCH_DETAIL_SUCCESS = "FETCH_DETAIL_SUCCESS";
export const FETCH_DETAIL_FAILED = "FETCH_DETAIL_FAILED";
export const FETCH_DETAIL_REQUEST = "FETCH_DETAIL_REQUEST";

//form input
export interface Input {
  type: typeof INPUT_SEARCH;
  input: string;
}

//google place api autocomplete
export interface RequestAutocomplete {
  type: typeof FETCH_AUTOCOMPLETE_REQUEST;
  loading: boolean;
}
export interface GetAutocompleteSuccess {
  type: typeof FETCH_AUTOCOMPLETE_SUCCESS;
  data: Autocomplete | PlaceDetail;
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
  data: Autocomplete | PlaceDetail;
}

//google place api detail
export interface ClearDetail {
  type: typeof CLEAR_DETAIL;
  data: Autocomplete | PlaceDetail;
}
export interface RequestDetail {
  type: typeof FETCH_DETAIL_REQUEST;
  loading: boolean;
}
export interface GetDetailSuccess {
  type: typeof FETCH_DETAIL_SUCCESS;
  data: Autocomplete | PlaceDetail;
  loading: boolean;
  success: boolean;
}
export interface GetDetailFail {
  type: typeof FETCH_DETAIL_FAILED;
  loading: boolean;
  error: string;
  success: boolean;
}

export type InputActionType = Input;
export type AutocompleteActionType =
  | RequestAutocomplete
  | GetAutocompleteSuccess
  | GetAutocompleteFail
  | ClearAutocomplete;
export type DetailActionType =
  | ClearDetail
  | RequestDetail
  | GetDetailSuccess
  | GetDetailFail;
export type ActionType =
  | InputActionType
  | AutocompleteActionType
  | DetailActionType;
