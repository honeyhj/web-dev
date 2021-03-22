import axios from "axios";
import React, { Component } from "react";
import "./adminlogincss.css";
import URL from "./Url";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "react-router-dom";
class Userlogin extends Component {
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
        `${URL}/login-user`,
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
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log("ee", err.response);
        this.setState({ mesg: err.response.data.messege.msg });
        this.notify();
      });
  };
  render() {
    return (
      <div
        style={{
          border: "1px solid red",
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={this.formsubmit}
          style={{
            border: "1px solid black",
            width: "50%",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onchange}
            placeholder="Username"
          />
          <br></br>
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.onchange}
            placeholder="password"
          />
          <div className="row justify-content-center">
            <input type="submit" defaultValue="Log In" />
          </div>
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
      </div>
    );
  }
}
export default withRouter(Userlogin);
