import axios from "axios";
import React, { Component } from "react";

class Active extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtID: "",
            txtToken: "",
        };
    }
    render() {
        return (
            <div className="login">
                <form action="">
                    <h2> ACTIVE ACCOUNT </h2>
                    <table>
                        <tbody>
                                <div className="input-box">
                                    <input
                                        type="text" placeholder="ID"
                                        value={this.state.txtID}
                                        onChange={(e) => {
                                            this.setState({ txtID: e.target.value });
                                        }}
                                    />
                                </div>

                                <div className="input-box">
                                    <input
                                        type="text" placeholder="Token"
                                        value={this.state.txtToken}
                                        onChange={(e) => {
                                            this.setState({ txtToken: e.target.value });
                                        }}
                                    />
                                </div>

                                    <input class="btn-login" type="submit" value="ACTIVE" onClick={(e) => this.btnActiveClick(e)} />
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }

    // event - handlers
    btnActiveClick(e) {
        e.preventDefault();
        const id = this.state.txtID;
        const token = this.state.txtToken;
        if (id && token) {
            this.apiActive(id, token);
        } else {
            alert("Please input id and token");
        }
    }

    // apis
    apiActive(id, token) {
        const body = { id: id, token: token };
        axios.post("/api/customer/active", body).then((res) => {
            const result = res.data;
            if (result) {
                alert("OK BABY !");
            } else {
                alert("SORRY BABY !");
            }
        });
    }
}
export default Active;
