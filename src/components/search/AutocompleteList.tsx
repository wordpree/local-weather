import React from "react";
import DotLoading from "../DotLoading";
import * as TYPE from "../../stateManager/actionType";
import { motion } from "framer-motion";
import { Prediction } from "../../type";
import { ListItem, List, ListItemText, makeStyles } from "@material-ui/core";
import { useWeatherContext } from "../../stateManager/context";
import { getGoogleFetchUrl, hanldeDataDispatch } from "../../util";
import * as actions from "../../stateManager/actions";
import {
  GOOGLE_PLACE_DETAIL_QUERY,
  GOOGLE_PLACE_DETAIL_PATH,
  API_KEY,
  detail,
} from "../../constant";

const useStyles = makeStyles((theme) => ({
  list: {
    maxWidth: "80%",
  },
}));

const AutocompleteList = () => {
  const classes = useStyles();
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
  const handleClick = (list: Prediction[]) => (id: string) => {
    const listItem = list.find((l) => l.place_id === id);
    if (!listItem) return null;
    const { place_id, description } = listItem;
    const fetchUrl = getGoogleFetchUrl(
      `${GOOGLE_PLACE_DETAIL_PATH}`,
      { place_id },
      GOOGLE_PLACE_DETAIL_QUERY,
      API_KEY
    );
    dispatch(actions.getInput(description, TYPE.INPUT_SEARCH));
    hanldeDataDispatch(dispatch)(actions, fetchUrl, detail);
    dispatch(actions.clearData(TYPE.CLEAR_AUTOCOMPLETE));
  };
  const renderList = (list: Prediction[]) => {
    if (list.length) {
      return list.map((l) => (
        <motion.div
          key={l.place_id}
          transition={{ type: "spring", stiffness: 300 }}
          whileHover={{
            scale: 1.04,
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
  return (
    <List className={classes.list}>{success ? renderList(data) : null}</List>
  );
};

export default AutocompleteList;
