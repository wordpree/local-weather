import React from "react";
import DotLoading from "../DotLoading";
import * as TYPE from "../../stateManager/actionType";
import { motion } from "framer-motion";
import { Prediction } from "../../type";
import { ListItem, List, ListItemText, makeStyles } from "@material-ui/core";
import { useWeatherContext } from "../../stateManager/context";
import { getGoogleFetchUrl, dispatchWithThrottle } from "../../util";
import * as actions from "../../stateManager/actions";
import {
  GOOGLE_PLACE_DETAIL_QUERY,
  GOOGLE_PLACE_DETAIL_PATH,
  detailType,
} from "../../constant";

const useStyles = makeStyles((theme) => ({
  list: {
    maxWidth: "80%",
  },
}));
type InputRef = React.MutableRefObject<HTMLInputElement | undefined>;
interface IAProps {
  inputRef: InputRef;
}

const AutocompleteList = ({ inputRef }: IAProps) => {
  const classes = useStyles();
  const { state, dispatch } = useWeatherContext();
  const { input, autocomplete } = state;
  const { data, loading, success, error } = autocomplete;
  if (error && input.trim()) {
    return (
      <div>
        <p>Nothing to show. Please try another search</p>
      </div>
    );
  }
  if (loading) {
    return <DotLoading />;
  }
  const focusInput = (ref: InputRef) => ref.current && ref.current.focus();
  const handleClick = (list: Prediction[]) => (id: string) => {
    const listItem = list.find((l) => l.place_id === id);
    if (!listItem) return null;
    const { place_id, description } = listItem;
    const fetchUrl = getGoogleFetchUrl(
      `${GOOGLE_PLACE_DETAIL_PATH}`,
      { place_id },
      GOOGLE_PLACE_DETAIL_QUERY
    );
    dispatch(actions.getInput(description, TYPE.INPUT_SEARCH));
    dispatch(actions.clearData(TYPE.CLEAR_AUTOCOMPLETE));
    dispatchWithThrottle(dispatch)(actions, { url: fetchUrl }, detailType);
    focusInput(inputRef);
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
    <List className={classes.list}>
      {success && input.trim() ? renderList(data) : null}
    </List>
  );
};

export default AutocompleteList;
