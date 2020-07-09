import React from "react";
import SearchForm from "./search";
import { Container } from "@material-ui/core";
import { WeatherContextProvid } from "../stateManager/context";
const Layout = () => {
  return (
    <WeatherContextProvid>
      <Container>
        <SearchForm />
      </Container>
    </WeatherContextProvid>
  );
};

export default Layout;
