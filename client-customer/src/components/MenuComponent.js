import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            txtKeyword: "",
        };
    }
    render() {
        const cates = this.state.categories.map((item) => {
            return (
                <li key={item._id} className="menu">
                    <Link to={"/product/category/" + item._id}>{item.name}</Link>
                </li>
            );
        });
        return (
            <div className="border-bottom">
                <head>
                    <link rel="stylesheet"href="https://unpkg.com/boxicons@latest/css/boxicons.min.css"></link>
                </head>
                <div className="float-left">
                    <ul className="menu">
                        <li className="menu"><Link to="/" class="menuhome"> Home </Link></li>
                        <li className="menu"><Link to='/gmap'>Google Map</Link></li>
                        {cates}
                        <div style={{ display: "inline" }} class="form-switch">
                    <input class="form-check-input" type="checkbox" onChange={(e) => this.ckbChangeMode(e)} />&nbsp; Dark | Light
                        </div>
                    </ul>
                </div>
                <div className="float-right">
                    <form class="search">
                        <input
                            type="search"
                            placeholder="Enter keyword"
                            class="keyword"
                            value={this.state.txtKeyword}
                            onChange={(e) => {
                                this.setState({ txtKeyword: e.target.value });
                            }}
                        />
                        <input class="submit" type="submit" value="SEARCH" onClick={(e) => this.btnSearchClick(e)} />
                    </form>
                </div>
                <div className="float-clear" />
            </div>
        );
    }
    componentDidMount() {
        this.apiGetCategories();
    }

    // event - handlers
    btnSearchClick(e) {
        e.preventDefault();
        this.props.navigate("/product/search/" + this.state.txtKeyword);
    }

    // apis
    apiGetCategories() {
        axios.get("/api/customer/categories").then((res) => {
            const result = res.data;
            this.setState({ categories: result });
        });
    }
     // event-handlers
  ckbChangeMode(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }
}
export default withRouter(Menu);
