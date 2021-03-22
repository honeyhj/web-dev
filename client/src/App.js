import React, { Component } from "react";
import { Switch, BrowserRouter, Router, Route } from "react-router-dom";
import Admin from "./Component/Admin/Admin";
import User from "./Component/User/User";
import Adminlogin from "./Component/User/Adminlogin";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/admindashboard" component={Admin} />
          <Route path="/admin" component={Adminlogin} />
          <Route path="/" component={User} />
        </Switch>
      </BrowserRouter>
    );
  }
}
