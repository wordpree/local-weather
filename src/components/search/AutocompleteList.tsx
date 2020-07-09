import React from "react";
import DotLoading from "../DotLoading";
import * as TYPE from "../../stateManager/actionType";
import { motion } from "framer-motion";
import { Autocomplete } from "../../type";
import { ListItem, List, ListItemText } from "@material-ui/core";
import { useWeatherContext } from "../../stateManager/context";
import { getGoogleFetchUrl, fetchData } from "../../util";
import {
  getInput,
  clearData,
  requestData,
  getDataFailed,
  getDataSuccess,
} from "../../stateManager/actions";
import {
  GOOGLE_PLACE_DETAIL_QUERY,
  GOOGLE_PLACE_DETAIL_PATH,
  API_KEY,
  CORS,
} from "../constant";

const AutocompleteList = () => {
  const { state, dispatch } = useWeatherContext();
  const { data, loading, success, error } = state.autocomplete;
  if (error) {
    return (
      <div>
        <p>Nothing to show. Please try another search</p>
      </div>
    );
  }
  if (loading) {
    return <DotLoading />;
  }
  const handleClick = (list: Autocomplete) => (id: string) => {
    const listItem = list.find((l) => l.place_id === id);
    if (!listItem) return null;
    const { place_id, description } = listItem;
    const fetchUrl = getGoogleFetchUrl(
      `${CORS}${GOOGLE_PLACE_DETAIL_PATH}`,
      { place_id },
      GOOGLE_PLACE_DETAIL_QUERY,
      API_KEY
    );
    dispatch(getInput(description, TYPE.INPUT_SEARCH));
    dispatch(requestData(TYPE.FETCH_DETAIL_REQUEST));
    fetchData(fetchUrl)
      .then((data) =>
        dispatch(getDataSuccess(data.result, TYPE.FETCH_DETAIL_SUCCESS))
      )
      .catch((error) =>
        dispatch(getDataFailed(error, TYPE.FETCH_DETAIL_FAILED))
      );
    dispatch(clearData(TYPE.CLEAR_AUTOCOMPLETE));
  };
  const renderList = (list: Autocomplete) => {
    if (list.length) {
      return list.map((l) => (
        <motion.div
          key={l.place_id}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 0 4px rgba(0,0,0,0.25)",
            originX: 0,
          }}
        >
          <ListItem onClick={() => handleClick(data)(l.place_id)} button>
            <ListItemText primary={l.description} />
          </ListItem>
        </motion.div>
      ));
    }
  };
  return <List>{success ? renderList(data) : null}</List>;
};

export default AutocompleteList;
