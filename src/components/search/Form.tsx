import React from "react";
import { makeStyles, Paper, InputBase, IconButton } from "@material-ui/core";
import { Magnify } from "mdi-material-ui";
import { searchVariants } from "../../framerMotion";
import { motion } from "framer-motion";

interface IFProps {
  input: string;
  onChange(a: string): void;
  onSubmit(): void;
}

const useStyles = makeStyles((theme) => ({
  entry: {
    padding: "1rem 0.25rem",
    width: "95%",
    [theme.breakpoints.up("md")]: {
      width: "75%",
    },
  },
  root: {
    display: "flex",
    alignItems: "center",
    padding: "3px 6px",
    margin: "0 auto",
    background: "#dedede",
  },
  input: {
    marginLeft: "0.5rem",
    flex: 1,
  },
}));

const Form: React.FC<IFProps> = ({ onChange, input, onSubmit }) => {
  const classes = useStyles();

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    onSubmit();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
  };
  return (
    <motion.div variants={searchVariants} initial="hidden" animate="visible">
      <div className={classes.entry}>
        <Paper
          component="form"
          onSubmit={handleSubmit}
          className={classes.root}
          elevation={0}
        >
          <InputBase
            placeholder="Search your location..."
            inputProps={{ "aria-label": "search location" }}
            onChange={handleChange}
            value={input}
            className={classes.input}
          />
          <IconButton type="submit" aria-label="search">
            <Magnify />
          </IconButton>
        </Paper>
      </div>
    </motion.div>
  );
};

export default Form;
