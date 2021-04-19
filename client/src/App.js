import React, { Component } from "react";
import { Switch, BrowserRouter, Router, Route } from "react-router-dom";
import Admin from "./Component/Admin/Admin";
import User from "./Component/User/User";
import Adminlogin from "./Component/User/Adminlogin";
import axios from "axios";
import URL from "./Component/User/Url";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: []
    }
  }
  getmenus = () => {
    axios.get(`${URL}/getmenus`).then((data) => {
      this.setState({menus:data.data})
    })
  };
  componentDidMount() {
    this.getmenus()
  }
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
