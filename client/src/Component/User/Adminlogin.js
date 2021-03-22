import axios from "axios";
import React, { Component } from "react";
import "./adminlogincss.css";
import URL from "./Url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
class Adminlogin extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      mesg: "",
      redirect: false,
    };
  }

  onchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  notify = () => toast.error(this.state.mesg);
  formsubmit = async (e) => {
    const { username, password } = this.state;
    e.preventDefault();
    await axios
      .post(
        `${URL}/login-admin`,
        { username, password },
        {
          headers: {
            Accept: "application/json",
            "Cotent-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data.data);
        localStorage.setItem("auth", data.data.token);
        localStorage.setItem("userrole", data.data.role);
        localStorage.setItem("username", data.data.username);
        this.props.history.push("/admindashboard");
      })
      .catch((err) => {
        console.log("ee", err.response);
        this.setState({ mesg: err.response.data.messege.msg });
        this.notify();
      });
  };
  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          {/* Tabs Titles */}
          {/* Icon */}
          <div className="fadeIn first"></div>
          {/* Login Form */}
          <form onSubmit={this.formsubmit}>
            <input
              type="text"
              id="login"
              name="username"
              value={this.state.username}
              onChange={this.onchange}
              className="fadeIn second"
              placeholder="Username"
            />
            <input
              type="text"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.onchange}
              className="fadeIn third"
              placeholder="password"
            />
            <input
              type="submit"
              className="fadeIn fourth"
              defaultValue="Log In"
            />
          </form>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <ToastContainer />
          {/* Remind Passowrd */}
          <div id="formFooter">
            <a className="underlineHover" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Adminlogin);
