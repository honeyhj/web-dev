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
          flexDirection:"column",
        }}
      >
        <h2 style={{textTransform:"uppercase",fontSize: '25px'}}>log in</h2>
        <form
          onSubmit={this.formsubmit}
          style={{
            border: "1px solid #3333",
            width: "20%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection:"column",
            padding:"10px",
            borderRadius:"5px"
          }}
        >
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onchange}
            placeholder="Username"
            style={{margin:"7px",background:'none',outline:"none",border: "1px solid #3333",padding:"3px",borderRadius:"3px"}}
          />
          
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={this.onchange}
            placeholder="password"
            style={{margin:"7px",background:'none',outline:"none",border: "1px solid #3333",padding:"3px",borderRadius:"3px"}}
          />
          <div className="row justify-content-center">
            <input type="submit" value="Log In" style={{margin:"7px",background:'#22A6F2',color:"#ffff",outline:"none",border: "1px solid #3333",padding:"3px 20px",borderRadius:"3px"}}/>
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
