import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import withRouter from "../utils/withRouter";

class Login extends Component {
    static contextType = MyContext; // using this . context to access global state
    constructor(props) {
        super(props);
        this.state = {
            txtUsername: "phuong",
            txtPassword: "1234p",
        };
    }
    render() {
        return (
            <div className="login">
                <head>
                    <link rel="stylesheet"href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"></link>
                </head>
                <form action="">
                    <h2> CUSTOMER LOGIN </h2>
                    <table>
                        <tbody>
                                <div className="input-box">
                                    <input type="text" placeholder="Username"
                                        value={this.state.txtUsername}
                                        onChange={(e) => {
                                            this.setState({ txtUsername: e.target.value });
                                        }}
                                    />
                                    <i class='bx bxs-user'></i>
                                </div>

                                <div className="input-box">
                                    <input
                                        type="password" placeholder="Password"
                                        value={this.state.txtPassword}
                                        onChange={(e) => {
                                            this.setState({ txtPassword: e.target.value });
                                        }}
                                    />
                                    <i class='bx bxs-lock-alt'></i>
                                </div>

                                    <input class="btn-login" type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} />

                        </tbody>
                    </table>
                </form>
            </div>
        );
    }

    // event - handlers
    btnLoginClick(e) {
        e.preventDefault();
        const username = this.state.txtUsername;
        const password = this.state.txtPassword;
        if (username && password) {
            const account = { username: username, password: password };
            this.apiLogin(account);
        } else {
            alert("Please input username and password");
        }
    }

    // apis
    apiLogin(account) {
        axios.post("/api/customer/login", account).then((res) => {
            const result = res.data;
            if (result.success === true) {
                this.context.setToken(result.token);
                this.context.setCustomer(result.customer);
                this.props.navigate("/home");
            } else {
                alert(result.message);
            }
        });
    }
}
export default withRouter(Login);
