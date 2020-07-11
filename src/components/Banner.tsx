import React from "react";
import { motion } from "framer-motion";
import SearchForm from "./search";
import { Container, makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  entry: {
    marginTop: "3rem",
  },
  main: {
    height: 500,
    background: "#F2F2F2",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  searchContainer: {
    padding: "1rem 0.25rem",
    marginTop: "2rem",
  },
  side: {
    background: "#54499E",
    height: 500,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
}));
const Banner = () => {
  const classes = useStyles();
  const searchVariants = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        easeIn: "easeInOut",
        stiffness: 100,
      },
    },
  };
  return (
    <Container className={classes.entry}>
      <Grid container>
        <Grid className={classes.main} item xs={12} md={8}>
          <motion.div
            variants={searchVariants}
            initial="hidden"
            animate="visible"
            className={classes.searchContainer}
          >
            <SearchForm />
          </motion.div>
        </Grid>
        <Grid className={classes.side} item xs={12} md={4}></Grid>
      </Grid>
    </Container>
  );
};

export default Banner;
