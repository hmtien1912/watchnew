import axios from "axios";
import React, { Component } from "react";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtUsername: "",
            txtPassword: "",
            txtName: "",
            txtPhone: "",
            txtEmail: "",
        };
    }
    render() {
        return (
            <div className="login">
                <form action="">
                    <h2> SIGN-UP </h2>
                    <table>
                        <tbody>
                                <div className="input-box">
                                    <input
                                        type="text" placeholder="Username"
                                        value={this.state.txtUsername}
                                        onChange={(e) => {
                                            this.setState({ txtUsername: e.target.value });
                                        }}
                                    />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="password" placeholder="Password"
                                        value={this.state.txtPassword}
                                        onChange={(e) => {
                                            this.setState({ txtPassword: e.target.value });
                                        }}
                                    />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="text" placeholder="Name"
                                        value={this.state.txtName}
                                        onChange={(e) => {
                                            this.setState({ txtName: e.target.value });
                                        }}
                                    />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="tel" placeholder="PhoneNumber"
                                        value={this.state.txtPhone}
                                        onChange={(e) => {
                                            this.setState({ txtPhone: e.target.value });
                                        }}
                                    />
                                </div>
                                <div className="input-box">
                                    <input
                                        type="email" placeholder="Email"
                                        value={this.state.txtEmail}
                                        onChange={(e) => {
                                            this.setState({ txtEmail: e.target.value });
                                        }}
                                    />
                                </div>

                                    <input class="btn-login" type="submit" value="SIGN-UP" onClick={(e) => this.btnSignupClick(e)} />

                        </tbody>
                    </table>
                </form>
            </div>
        );
    }

    // event - handlers
    btnSignupClick(e) {
        e.preventDefault();
        const username = this.state.txtUsername;

        const password = this.state.txtPassword;
        const name = this.state.txtName;
        const phone = this.state.txtPhone;
        const email = this.state.txtEmail;
        if (username && password && name && phone && email) {
            const account = { username: username, password: password, name: name, phone: phone, email: email };
            this.apiSignup(account);
        } else {
            alert("Please input username and password and name and phone and email");
        }
    }

    // apis
    apiSignup(account) {
        axios.post("/api/customer/signup", account).then((res) => {
            const result = res.data;
            alert(result.message);
        });
    }
}
export default Signup;
