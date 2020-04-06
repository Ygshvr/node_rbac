import React from "react";
import Header from "./Header";
import Login from "./Login";
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Welcome(props) {
  return (
    <div>
      <p>You need to login in order to see the users.</p>
    </div>
  );
}
export default function App() {
  return (
    <Router>
      <div className="main">
        <Header />
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}
