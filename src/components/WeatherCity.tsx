import React from "react";
import {
  Card,
  CardMedia,
  makeStyles,
  CardActionArea,
  CardHeader,
} from "@material-ui/core";

interface ICGProps {
  city: string;
  photo: string;
  id: number;
  handleCityId(id: number): void;
}

const useStyles = makeStyles((theme) => ({
  card: {
    borderBottomLeftRadius: "6%",
    borderBottomRightRadius: "6%",
  },
  media: {
    background: "linear-gradient(90deg,#C7B2E9 0%,#F7C8C1 100%)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: 0,
    paddingTop: "67.75%",
  },
  name: {
    paddingTop: "1rem",
  },
}));

const WeatherCity = ({ city, photo, id, handleCityId }: ICGProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title={city} titleTypographyProps={{ variant: "body2" }} />
      <CardActionArea onClick={() => handleCityId(id)}>
        <CardMedia image={photo} className={classes.media} />
      </CardActionArea>
    </Card>
  );
};

export default WeatherCity;
