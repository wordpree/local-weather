import { Autocomplete, PlaceDetail } from "../type";

export const getInput = (input: string, type: string) => ({
  type,
  input,
});
export const requestData = (type: string) => ({
  type,
});
export const getDataSuccess = (
  data: Autocomplete | PlaceDetail,
  type: string
) => ({
  type,
  data,
});

export const getDataFailed = (error: string, type: string) => ({
  type,
  error,
});

export const clearData = (type: string) => ({
  type,
});
