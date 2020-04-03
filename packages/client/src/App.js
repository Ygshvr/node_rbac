import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Welcome(props) {
  return (
    <div>
      <h1>Welcome to the app!</h1>
      <p>You need to login in order to see the users.</p>
    </div>
  );
}
function RbacUI() {
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

let root = document.getElementById("root");

ReactDOM.render(<RbacUI />, root);
