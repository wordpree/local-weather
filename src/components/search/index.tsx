import React from "react";
import SearchForm from "./SearchForm";
import { Container } from "@material-ui/core";
import { searchVariants } from "../../framerMotion";
import { motion } from "framer-motion";

const Search = () => {
  return (
    <Container style={{ margin: "2rem auto 1rem" }}>
      <motion.div variants={searchVariants} initial="hidden" animate="visible">
        <SearchForm />
      </motion.div>
    </Container>
  );
};

export default Search;
