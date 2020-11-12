import React from "react";
import { motion } from "framer-motion";
import { Autocomplete, PlaceDetail, TAsyncState } from "../../type";
import { ListItem, List, ListItemText, makeStyles } from "@material-ui/core";
import { fetchData, getGoogleFetchingUrl, processState } from "../../util";
import { GOOGLE_PLACE_DETAIL_BASE } from "../../constant";
import DotLoading from "../DotLoading";

const useStyles = makeStyles((theme) => ({
  list: {
    maxWidth: "60%",
  },
}));

interface IAProps {
  input: string;
  state: TAsyncState<Autocomplete>;
  sessionToken: string;
  onSelect(input: string): void;
  detailRun(promise: Promise<PlaceDetail>): void;
  clearData(): void;
}

const AutocompleteList = ({
  state,
  sessionToken,
  onSelect,
  input,
  detailRun,
  clearData,
}: IAProps) => {
  const classes = useStyles();
  const {
    pending,
    resolved,
    rejected,
    asyncData: autoCompleteData,
    error,
  } = processState<Autocomplete>(state);

  const handleClick = (id: string, desc: string) => {
    const placeDetailUrl = getGoogleFetchingUrl(
      GOOGLE_PLACE_DETAIL_BASE,
      sessionToken,
      id,
      true
    );
    onSelect(desc);
    detailRun(fetchData(placeDetailUrl));
    clearData();
  };
  return (
    <>
      {rejected && <p>{error.message}</p>}
      {pending && <DotLoading />}
      {resolved && (
        <List className={classes.list}>
          {input.trim() &&
            autoCompleteData.predictions.map((l) => (
              <motion.div
                key={l.place_id}
                transition={{ type: "spring", stiffness: 300 }}
                whileHover={{
                  scale: 1.04,
                  originX: 0,
                }}
              >
                <ListItem
                  onClick={() => handleClick(l.place_id, l.description)}
                  button
                >
                  <ListItemText primary={l.description} />
                </ListItem>
              </motion.div>
            ))}
        </List>
      )}
    </>
  );
};

export default AutocompleteList;
