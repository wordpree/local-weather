import React from "react";
import flow from "../../assets/weather-flow.jpg";
import {
  Card,
  CardMedia,
  makeStyles,
  CardActionArea,
  Typography,
} from "@material-ui/core";

interface ICProps {
  image: string;
  address: string;
  query: string;
  click(query: string, address: string): void;
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
    height: 109,
    minWidth: 130,
  },
  name: {
    paddingTop: "1rem",
  },
}));

const City: React.FC<ICProps> = ({ image, address, click, query }) => {
  const classes = useStyles();
  console.log(flow);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    click(query, address);
  };
  return (
    <div className={classes.entry}>
      <Card className={classes.card}>
        <CardActionArea onClick={handleClick}>
          <CardMedia image={image} className={classes.media} />
        </CardActionArea>
      </Card>
      <Typography variant="body2" className={classes.name}>
        {address}
      </Typography>
    </div>
  );
};

export default City;
