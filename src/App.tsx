import React from "react";
import Layout from "./components/Layout";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { WeatherContextProvid } from "./stateManager/context";

function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Montserrat Alternates",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ].join(","),
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <WeatherContextProvid>
          <Layout />
        </WeatherContextProvid>
      </ThemeProvider>
    </div>
  );
}

export default App;
