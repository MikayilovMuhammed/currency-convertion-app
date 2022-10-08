import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ConverterFromOneCurrencyToAnother from "./ConverterFromOneCurrencyToAnother";
import Home from "./Home";
import CurrentExchangeRates from "./CurrentExchangeRates";
import React from "react";
import Error from "./Error";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path={"/convertion"}
          exact
          component={ConverterFromOneCurrencyToAnother}
        />
        <Route
          path={"/current-exchange"}
          exact
          component={CurrentExchangeRates}
        />
        <Route path={"/error"} exact component={Error} />
        <Redirect to={"/error"} exact />
      </Switch>
    </Router>
  );
}

export default App;
