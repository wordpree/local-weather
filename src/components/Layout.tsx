import React, { useEffect } from "react";
import Banner from "./Banner";
import { useWeatherContext } from "../stateManager/context";
import { weatherType, OPEN_WEATHER_MAP_URL } from "../constant";
import { dispatchWithThrottle } from "../util";
import * as actions from "../stateManager/actions";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  const { dispatch } = useWeatherContext();
  const weatherQueryInit = "&lat=-27.4697707&lon=153.0251235";
  useEffect(() => {
    const weatherUrl = OPEN_WEATHER_MAP_URL + weatherQueryInit;
    dispatchWithThrottle(dispatch)(actions, { url: weatherUrl }, weatherType);
  }, [dispatch, weatherQueryInit]);
  return (
    <>
      <Header />
      <Banner />
      <Footer />
    </>
  );
};

export default Layout;
