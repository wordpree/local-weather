import React from "react";
import {
  Card,
  CardMedia,
  makeStyles,
  CardActionArea,
  Typography,
} from "@material-ui/core";

interface ICGProps {
  city: string;
  photo: string;
  id: number;
  handleCityId(id: number): void;
}

const useStyles = makeStyles((theme) => ({
  entry: {
    textAlign: "center",
    [theme.breakpoints.down(600)]: {
      flex: "1 0 60%",
      minWidth: "60%",
      marginRight: "0.75rem",
      "&:last-child": {
        marginRight: 0,
      },
    },
  },
  card: {
    borderRadius: "6%",
  },
  media: {
    background: "linear-gradient(90deg,#C7B2E9 0%,#F7C8C1 100%)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: 0,
    paddingTop: "75.75%",
  },
  name: {
    paddingTop: "1rem",
  },
}));

const WeatherCity = ({ city, photo, id, handleCityId }: ICGProps) => {
  const classes = useStyles();
  return (
    <div className={classes.entry}>
      <Card className={classes.card}>
        <CardActionArea onClick={() => handleCityId(id)}>
          <CardMedia image={photo} className={classes.media} />
        </CardActionArea>
      </Card>
      <Typography variant="body2" className={classes.name}>
        {city}
      </Typography>
    </div>
  );
};

export default WeatherCity;
