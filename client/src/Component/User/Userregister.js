import React, { Component } from "react";
import axios from "axios";
import URL from "./Url";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class Userregister extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      email: "",
      username: "",
      password: "",
      Address: "",
      Mobile: "",
      password_confirmation: "",
      redirect: false,
      redirecttocheck: "",
      error: "",
      loding: false,
    };
  }

  savetostate = (data) => {
    this.setState({ [data.target.name]: data.target.value });
  };
  notify = () => toast.error(this.state.error);
  formsubmit = async (e) => {
    e.preventDefault();
    const {
      fullname,
      email,
      username,
      password,
      Address,
      Mobile,
      password_confirmation,
    } = this.state;
    this.setState({ loding: true });
    await axios
      .post(
        `${URL}/register`,
        {
          fullname,
          email,
          username,
          password,
          Address,
          Mobile,
          password_confirmation,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log("data", data);
        if (data.data.messege.success) {
          console.log("sucess true");
          this.setState({ loding: false, redirect: true });
        }
        if (!data.data.messege.success) {
          console.log("sucess falkse");
          this.setState({ error: data.data.messege.msg });
          this.notify();
        }
      })
      .catch((err) => {
        console.log("catch error");
        console.log(err.response.data.errors[0].msg);
        this.setState({ error: err.response.data.errors[0].msg });
        this.notify();
      });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/" }} />;
    }
    return (
      <div className="container register">
        <div className="row">
          <div className="col-md-3 register-left">
            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
            <h3>Welcome</h3>
            <p>You are 30 seconds away from earning your own money!</p>
            <input type="submit" name="" value="Login" />
            <br />
          </div>
          <div className="col-md-9 register-right">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <h3 className="register-heading">Apply as a Employee</h3>
                <form onSubmit={this.formsubmit}>
                  <div className="row register-form">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          name="fullname"
                          className="form-control"
                          onChange={this.savetostate}
                          value={this.state.fullname}
                          placeholder="Your Full Name"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="username"
                          className="form-control"
                          onChange={this.savetostate}
                          value={this.state.username}
                          placeholder="Username"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="Address"
                          className="form-control"
                          onChange={this.savetostate}
                          value={this.state.Address}
                          placeholder="Your Address*"
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="password"
                          className="form-control"
                          onChange={this.savetostate}
                          value={this.state.password}
                          placeholder="Password *"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="password_confirmation"
                          className="form-control"
                          onChange={this.savetostate}
                          value={this.state.password_confirmation}
                          placeholder="Confirm Password *"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Your Email *"
                          onChange={this.savetostate}
                          value={this.state.email}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="Mobile"
                          className="form-control"
                          placeholder="Your Phone *"
                          onChange={this.savetostate}
                          value={this.state.Mobile}
                        />
                      </div>
                      {/* {this.state.loding && <Myloader />} */}

                      <input
                        type="submit"
                        className="btnRegister"
                        defaultValue="Register"
                      />
                    </div>
                  </div>
                </form>
                <div className="d-flex justify-content-center my-4">
                  {/* <GoogleLogin
                    clientId="255391627954-ns76akj2cfe49brdb9l4ndoktmvt2ret.apps.googleusercontent.com"
                    buttonText="google Login"
                    onSuccess={this.SresponseGoogle}
                    onFailure={this.FresponseGoogle}
                    cookiePolicy={"single_host_origin"}
                  /> */}

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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
