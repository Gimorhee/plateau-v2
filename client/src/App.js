import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <div className="App">App component</div>
      </Fragment>
    </Provider>
  );
}

export default App;
