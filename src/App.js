import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import appStyles from "./app.scss";

import Repo from "./pages/Repo";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <div className={appStyles.App}>
        <Switch>
          <Redirect exact from="/" to="/search/repositories/react/1" />
          <Route path="/search/repositories/:query/:page" component={Search} />
          <Route path="/repos/:owner/:repo" component={Repo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
