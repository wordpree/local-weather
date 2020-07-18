import React from "react";
import { TPexels } from "../type";
import WeatherCity from "./WeatherCity";
import { Typography, makeStyles, Grid, useMediaQuery } from "@material-ui/core";

interface ICProps {
  city: string[];
  photo: TPexels;
  handleCityId(id: number): void;
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
    [theme.breakpoints.down(600)]: {
      marginTop: "2rem",
      display: "flex",
      scrollSnapType: "x mandatory",
      scrollSnapAlign: "start",
      overflow: "auto",
    },
  },
}));

const WeatherCityList = ({ city, photo, handleCityId }: ICProps) => {
  const { data } = photo;
  const classes = useStyles();
  const md = useMediaQuery("(min-width:600px)");
  const mdCity = (data: string[]) => (
    <div className={classes.cityWrapper}>
      {data.map((d, index) => (
        <WeatherCity
          key={index}
          photo={d}
          city={city[index]}
          id={index}
          handleCityId={handleCityId}
        />
      ))}
    </div>
  );

  return (
    <div className={classes.entry}>
      <Typography className={classes.title} variant="h4">
        Weekly weather forcast
      </Typography>
      {md ? (
        <Grid className={classes.cityGrid} container spacing={2}>
          {data.map((d, index) => (
            <Grid item xs={4} key={index}>
              <WeatherCity
                photo={d}
                city={city[index]}
                id={index}
                handleCityId={handleCityId}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        mdCity(data)
      )}
    </div>
  );
};

export default WeatherCityList;
