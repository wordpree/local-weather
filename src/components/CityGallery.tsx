import React from "react";
import { Paper, Typography, makeStyles } from "@material-ui/core";
import defaultImg from "../assets/brisbane.jpg";
import { defaultLocation } from "../constant";
import { getCityInfo } from "../util";
import { City } from "../type";

interface ICGProps {
  city: City;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 180,
    height: 180,
  },
}));

const CityGallery = ({ city }: ICGProps) => {
  const classes = useStyles();
  const { imgUrl, location } = getCityInfo(city, defaultLocation, defaultImg);
  return (
    <div>
      <Typography variant="h3">Weather Forcast</Typography>
      <Paper
        className={classes.paper}
        style={{ background: `center/cover no-repeat url(${imgUrl}) #cecece` }}
      />
      <Typography>{location}</Typography>
    </div>
  );
};

export default CityGallery;
