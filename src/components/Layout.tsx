import React from "react";
import Banner from "./Banner";
import { WeatherContextProvid } from "../stateManager/context";
import Footer from "./Footer";
import Header from "./Header";
const Layout = () => {
  return (
    <WeatherContextProvid>
      <Header />
      <Banner />
      <Footer />
    </WeatherContextProvid>
  );
};

export default Layout;
