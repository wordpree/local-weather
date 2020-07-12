import { StateType, PlaceDetail, Autocomplete, Detail } from "./type";
import { ActionType } from "./stateManager/actionType";
import { throttle } from "throttle-debounce";

type SearchItem = { [key: string]: string };
type Key = keyof StateType;

export function getGoogleFetchUrl(
  pathUrl: string,
  searchItem: SearchItem,
  queryString: string,
  key: string
) {
  const searchString = Object.keys(searchItem).map(
    (key) => `${key}=${searchItem[key]}`
  );
  return `${pathUrl}?${queryString}&${searchString}&key=${key}`;
}

export function validation(response: Response) {
  if (response.statusText !== "OK") {
    throw Error(`error-->${response.status}:${response.statusText}`);
  }
}

export function combineReducer(reducers: any) {
  const initialState = getInitialState(reducers);
  return (state = initialState, action: ActionType) => {
    const reducerKeys = Object.keys(reducers) as Key[];
    return reducerKeys.reduce((acc, current) => {
      const slice = reducers[current](state[current], action);
      return { ...acc, [current]: slice };
    }, state);
  };
}

export async function fetchData(url: string) {
  const response = await fetch(url);
  validation(response);
  return await response.json();
}

export function fetchingDataTypeGuard(
  data: PlaceDetail | Autocomplete
): data is Autocomplete {
  return data.hasOwnProperty("predictions");
}

export function getInitialState(reducers: any) {
  return Object.keys(reducers).reduce((acc, curr) => {
    const slice = reducers[curr](undefined, { type: undefined });
    return {
      ...acc,
      ...slice,
    };
  }, {} as StateType);
}

function hanldeDataDispatch(dispatch: React.Dispatch<any>) {
  return function (
    actions: any,
    fetchUrl: string,
    type: { [key: string]: string }
  ) {
    dispatch(actions.requestData(type.request));
    fetchData(fetchUrl)
      .then((data) => dispatch(actions.getDataSuccess(data, type.success)))
      .catch((error) => dispatch(actions.getDataFailed(error, type.failed)));
  };
}

export function getWeatherFetchUrl(detail: Detail, url: string) {
  if (!detail.hasOwnProperty("geometry")) return "";
  const location = detail.geometry.location;
  const { lat, lng } = location;
  return `${url}&lat=${lat}&lon=${lng}`;
}

export function dispatchWithThrottle(dispatch: React.Dispatch<any>) {
  return throttle(200, (actions, fetchUrl, type) =>
    hanldeDataDispatch(dispatch)(actions, fetchUrl, type)
  );
}
