import React, { useState, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import City from "./City";
import useAsync from "../../useAsync";
import { UnsplashData, TCity } from "../../type";
import { fetchData, isQueryInCity, getImgFromUnsplash } from "../../util";
import { UNSPLASH_QUERY, U_API_KEY } from "../../constant";

interface ICProps {
  query: string;
  address: string;
  onSelect(query: string, address: string): void;
}

const useStyles = makeStyles((theme) => ({
  entry: {
    padding: "2rem",
  },
  title: {
    textAlign: "center",
    color: "#3C4462",
    paddingTop: "1rem",
  },
  cityGrid: {
    marginTop: "2rem",
    marginBottom: "1rem",
    padding: "0.25rem",
  },
  cityWrapper: {
    "&>div": {
      marginRight: "1rem",
      flex: "0 0 30%",
    },
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
    marginTop: "2rem",
  },
}));

const CityBoard: React.FC<ICProps> = ({ query, address, onSelect }) => {
  const classes = useStyles();
  const [city, setCity] = useState<TCity[]>([]);
  const { run } = useAsync<UnsplashData>();

  useEffect(() => {
    const fetchUrl = `${UNSPLASH_QUERY}query=${
      address.split(",")[0]
    }&client_id=${U_API_KEY}`;
    if (isQueryInCity(query, city)) {
      return;
    }
    run(
      fetchData<UnsplashData>(fetchUrl).then((unsplashData) => {
        setCity((city) => {
          return [
            ...city,
            { address, query, image: getImgFromUnsplash(unsplashData) },
          ];
        });
        return unsplashData;
      })
    );
  }, [run, address, query, city]);

  return (
    <div className={classes.entry}>
      <Typography variant="h4" className={classes.title}>
        Weekly weather forcast
      </Typography>
      <div className={classes.cityWrapper}>
        {city.map((c) => (
          <City key={c.query} {...c} click={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default CityBoard;
