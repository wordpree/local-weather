import React from "react";
import { TextField } from "@material-ui/core";
import { useWeatherContext } from "../../stateManager/context";
import { getGoogleFetchUrl, fetchData } from "../../util";
import * as TYPE from "../../stateManager/actionType";
import {
  getInput,
  clearData,
  requestData,
  getDataSuccess,
  getDataFailed,
} from "../../stateManager/actions";
import {
  GOOGLE_AUTOCOMPLETE_PATH,
  CORS,
  API_KEY,
  GOOGLE_AUTOCOMPLETE_QUERY,
} from "../constant";

const SearchForm = () => {
  const { state, dispatch } = useWeatherContext();
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { value: input } = e.target;
    const fetchUrl = getGoogleFetchUrl(
      `${CORS}${GOOGLE_AUTOCOMPLETE_PATH}`,
      { input },
      GOOGLE_AUTOCOMPLETE_QUERY,
      API_KEY
    );
    dispatch(getInput(input, TYPE.INPUT_SEARCH));
    if (input.trim().length === 0) {
      dispatch(clearData(TYPE.CLEAR_AUTOCOMPLETE));
      dispatch(clearData(TYPE.CLEAR_DETAIL));
    } else {
      dispatch(requestData(TYPE.FETCH_AUTOCOMPLETE_REQUEST));
      fetchData(fetchUrl)
        .then((data) =>
          dispatch(
            getDataSuccess(data.predictions, TYPE.FETCH_AUTOCOMPLETE_SUCCESS)
          )
        )
        .catch((error) =>
          dispatch(getDataFailed(error, TYPE.FETCH_AUTOCOMPLETE_FAILED))
        );
    }
  };
  return (
    <form>
      <TextField
        variant="outlined"
        placeholder="location..."
        onChange={handleChange}
        value={state.form.input}
      />
    </form>
  );
};

export default SearchForm;
