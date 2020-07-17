import React, { useRef } from "react";
import { makeStyles, Paper, InputBase, IconButton } from "@material-ui/core";
import { Magnify } from "mdi-material-ui";
import AutocompleteList from "./AutocompleteList";
import { useWeatherContext } from "../../stateManager/context";
import {
  getGoogleFetchUrl,
  dispatchWithThrottle,
  getWeatherFetchUrl,
  getAddressByDet,
} from "../../util";
import * as TYPE from "../../stateManager/actionType";
import * as actions from "../../stateManager/actions";
import {
  GOOGLE_AUTOCOMPLETE_PATH,
  GOOGLE_AUTOCOMPLETE_QUERY,
  OPEN_WEATHER_MAP_URL,
  weatherType,
  autocompleteType,
  pexelsType,
  PEXELS_QUERY,
  PEXELS_PARA,
} from "../../constant";

const useStyles = makeStyles((theme) => ({
  entry: {},
  root: {
    display: "flex",
    alignItems: "center",
    padding: "3px 6px",
    maxWidth: 640,
    margin: "0 auto",
  },
  input: {
    marginLeft: "0.5rem",
    flex: 1,
  },
}));

const SearchForm = () => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>();
  const { state, dispatch } = useWeatherContext();
  const { input, placeDetail } = state;
  const weatherUrl = getWeatherFetchUrl(
    state.placeDetail.data,
    OPEN_WEATHER_MAP_URL
  );
  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!input.trim() || !placeDetail.data.hasOwnProperty("address_components"))
      return;
    const city = getAddressByDet(placeDetail.data);
    const pexelsUrl = PEXELS_QUERY + city;
    dispatch(actions.getCity(city, TYPE.GET_CITY));
    dispatchWithThrottle(dispatch)(actions, { url: weatherUrl }, weatherType);
    dispatchWithThrottle(dispatch)(
      actions,
      { url: pexelsUrl, para: { ...PEXELS_PARA } },
      pexelsType
    );
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value: input } = e.target;
    const fetchUrl = getGoogleFetchUrl(
      `${GOOGLE_AUTOCOMPLETE_PATH}`,
      { input },
      GOOGLE_AUTOCOMPLETE_QUERY
    );
    dispatch(actions.getInput(input, TYPE.INPUT_SEARCH));
    if (input.trim().length !== 0) {
      dispatchWithThrottle(dispatch)(
        actions,
        { url: fetchUrl },
        autocompleteType
      );
    }
  };
  return (
    <div className={classes.entry}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        className={classes.root}
        elevation={0}
      >
        <InputBase
          placeholder="Search your location..."
          inputProps={{ "aria-label": "search location" }}
          onChange={handleChange}
          value={state.input}
          className={classes.input}
          inputRef={inputRef}
        />
        <IconButton type="submit" aria-label="search">
          <Magnify />
        </IconButton>
      </Paper>
      <AutocompleteList inputRef={inputRef} />
    </div>
  );
};

export default SearchForm;
