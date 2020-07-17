import React from "react";
import { TPexels } from "../type";
import WeatherCity from "./WeatherCity";
import { Typography, makeStyles, Grid } from "@material-ui/core";

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
}));

const WeatherCityList = ({ city, photo, handleCityId }: ICProps) => {
  const { data } = photo;
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.title} variant="h4">
        Weather Forcast
      </Typography>
      <Grid className={classes.cityGrid} container spacing={2}>
        {data.map((d, index) => (
          <Grid item md={4} key={index}>
            <WeatherCity
              photo={d}
              city={city[index]}
              id={index}
              handleCityId={handleCityId}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WeatherCityList;
