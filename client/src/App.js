import React, { useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import LocaleState from "./context/locale/LocaleState";

function App() {
  useEffect(() => {
    // initializes Materialize JavaScript
    M.AutoInit();
    //  eslint-ignore-next-line
  }, []);

  return (
    <LocaleState>
      <Navbar />
    </LocaleState>
  );
}

export default App;
