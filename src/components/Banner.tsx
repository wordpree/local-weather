import React from "react";
import { motion } from "framer-motion";
import { Container, makeStyles } from "@material-ui/core";
import Weather from "./weather";
import CityBoard from "./city/CityBoard";
import SearchForm from "./search";
import useLocalStorage from "../useLocalStorage";

const useStyles = makeStyles((theme) => ({
  entry: {
    marginTop: "3rem",
    [theme.breakpoints.down(500)]: {
      paddingLeft: "0.35em",
      paddingRight: "0.35em",
    },
  },
}));

const Banner = () => {
  const classes = useStyles();
  const defaultLocationQuery = "lat=-27.4697707&lon=153.0251235";
  const defaultLocation = "Brisbane, Australia";
  const { storage, setStorage } = useLocalStorage(
    { query: defaultLocationQuery, address: defaultLocation },
    "locationOfWeather"
  );
  const handleWeatherQuery = (query: string, address: string) => {
    setStorage({ query, address });
  };
  const handleSelect = (query: string, address: string) => {
    setStorage({ query, address });
  };

  return (
    <Container className={classes.entry}>
      <motion.div initial="hidden" animate="visible">
        <SearchForm onWeatherQuery={handleWeatherQuery} />
        <Weather {...storage}>
          <CityBoard {...storage} onSelect={handleSelect} />
        </Weather>
      </motion.div>
    </Container>
  );
};

export default Banner;
