import React, { Component } from "react";
import Uploadproduct from "./Uploadproduct";
import { Switch, BrowserRouter, Router, Route } from "react-router-dom";
import Menumanage from "./Menumanage";
import ProductManage from "./Page/ProductManage";
import OrderManage from "./Page/OrderManage";
import UserManage from "./Page/UserManage";
export default class Admin extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/admindashboard/uploadproduct"
            component={Uploadproduct}
          />
          <Route
            exact
            path="/admindashboard/menumange"
            component={Menumanage}
          />
          <Route
            exact
            path="/admindashboard/productManage"
            component={ProductManage}
          />
          <Route
            exact
            path="/admindashboard/orderManage"
            component={OrderManage}
          />
          <Route
            exact
            path="/admindashboard/userManage"
            component={UserManage}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
