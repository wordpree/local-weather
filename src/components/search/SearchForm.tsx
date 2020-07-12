import React from "react";
import { makeStyles, Paper, InputBase, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useWeatherContext } from "../../stateManager/context";
import {
  getGoogleFetchUrl,
  hanldeDataDispatch,
  getWeatherFetchUrl,
} from "../../util";
import * as TYPE from "../../stateManager/actionType";
import * as actions from "../../stateManager/actions";
import {
  GOOGLE_AUTOCOMPLETE_PATH,
  API_KEY,
  GOOGLE_AUTOCOMPLETE_QUERY,
  OPEN_WEATHER_MAP_URL,
  weather,
  autocomplete,
} from "../../constant";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "2rem",
    display: "flex",
    alignItems: "center",
    padding: "3px 6px",
    width: 440,
  },
  input: {
    marginLeft: "0.5rem",
    flex: 1,
  },
}));

const SearchForm = () => {
  const classes = useStyles();
  const { state, dispatch } = useWeatherContext();
  const weatherUrl = getWeatherFetchUrl(
    state.placeDetail.data,
    OPEN_WEATHER_MAP_URL
  );
  const handleClick = () => {
    hanldeDataDispatch(dispatch)(actions, weatherUrl, weather);
  };
  const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    hanldeDataDispatch(dispatch)(actions, weatherUrl, weather);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value: input } = e.target;
    const fetchUrl = getGoogleFetchUrl(
      `${GOOGLE_AUTOCOMPLETE_PATH}`,
      { input },
      GOOGLE_AUTOCOMPLETE_QUERY,
      API_KEY
    );
    dispatch(actions.getInput(input, TYPE.INPUT_SEARCH));
    if (input.trim().length === 0) {
      dispatch(actions.clearData(TYPE.CLEAR_AUTOCOMPLETE));
      dispatch(actions.clearData(TYPE.CLEAR_DETAIL));
    } else {
      hanldeDataDispatch(dispatch)(actions, fetchUrl, autocomplete);
    }
  };
  return (
    <Paper component="form" onSubmit={handleSubmit} className={classes.root}>
      <InputBase
        placeholder="Search your location..."
        inputProps={{ "aria-label": "search location" }}
        onChange={handleChange}
        value={state.form.input}
        className={classes.input}
      />
      <IconButton type="submit" aria-label="search" onClick={handleClick}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchForm;
