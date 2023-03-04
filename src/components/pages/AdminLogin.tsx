import React from "react";
import { Component } from "react";
import Container from "../Container";
import Card from "../Card";
import Input from "../Input";
import SlideButton from "../SlideButton";
import Grid from "@mui/material/Grid";
import "../../styles/AdminLogin.css";

interface LoginState {
  email: string;
  password: string;
}

interface AdminData {
  auth_token: string;
  role: { is_supreme: boolean };
}

class AdminLogin extends Component {
  state: LoginState = { email: "", password: "" };

  handleUpdates = (e: React.ChangeEvent<HTMLInputElement>) => {
    const elementName: string = e.target.name;
    if (elementName === "email") {
      this.setState({ email: e.target.value });
    } else {
      this.setState({ password: e.target.value });
    }
  };

  handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.state.email !== "" && this.state.password !== "") {
      const inputs = e.target.elements;
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].nodeName == "INPUT") {
          (inputs[i] as HTMLInputElement).value = "";
        }
      }
      const responce = await fetch(
        "https://portfoil.herokuapp.com/api/admin-auth",
        {
          method: "POST",
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
          }),
        }
      );
      if (responce.ok) {
        responce.json().then((data: AdminData) => {
          const auth_token = data.auth_token;
          localStorage.setItem("auth_token", auth_token);
          window.location.replace(`/admin/${auth_token}`);
        });
      }
    }
  };

  async componentDidMount() {
    if (localStorage.getItem("auth_token")) {
      const auth_token = localStorage.getItem("auth_token");
      const responce = await fetch(
        "https://portfoil.herokuapp.com/api/authenticate-token",
        {
          method: "POST",
          headers: {
            "content-type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({
            auth_token: auth_token,
          }),
        }
      );
      if (responce.ok) {
        responce
          .json()
          .then((data: { auth_token: string; authenticated: boolean }) => {
            if (data.authenticated) {
              window.location.replace(`/admin/${data.auth_token}`);
            }
          });
      } else {
        localStorage.clear();
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <nav>
          <h1 className="shadow-text">Admin login</h1>
        </nav>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div className="img-container">
                <img src="./assets/login.svg" alt="login" />
              </div>
            </Grid>
            <Grid item xs={3} style={{ display: "contents" }}>
              <div className="form-container">
                <Card width="100%" height="35vh" id="admin-login">
                  <h2 className="shadow-text">Login</h2>
                  <div className="form">
                    <form onSubmit={this.handleSubmit}>
                      <Input
                        placeholder="Admin email"
                        type="email"
                        onChange={this.handleUpdates}
                        name="email"
                      />
                      <Input
                        placeholder="Password"
                        type="password"
                        onChange={this.handleUpdates}
                        name="password"
                      />
                      <div
                        className="btn-container"
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <SlideButton
                          id="login-button"
                          style={{
                            fontSize: "1rem",
                            backgroundColor: "black",
                            margin: "20px",
                          }}
                        >
                          Login
                        </SlideButton>
                      </div>
                    </form>
                  </div>
                </Card>
              </div>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default AdminLogin;
