import axios from "axios";
import React, { Component } from "react";
import withRouter from "../utils/withRouter";
import MyContext from "../contexts/MyContext";

class ProductDetail extends Component {
    static contextType = MyContext; // using this . context to access global state
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            txtQuantity: 1,
        };
    }
    render() {
        const prod = this.state.product;
        if (prod != null) {
            return (
                <div className="align-center">
                    <h2 className="text-center"> PRODUCT DETAILS </h2>
                    <figure className="caption-right">
                        <img src={"data:image/jpg;base64," + prod.image} width="400px" height="400px" alt="" />
                        <figcaption>
                            <form>
                                <table>
                                    <tbody>
                                        <h4>
                                            <td align="right">ID:</td>
                                            <td>{prod._id}</td>
                                        </h4>
                                        <h3>
                                            <td align="right"></td>
                                            <td>{prod.name}</td>
                                        </h3>
                                        <h5>
                                            <td align="right">Price:</td>
                                            <td>{prod.price}</td>
                                        </h5>
                                        <div class="color-select">
                                            <p>Color:</p>
                                            <label for="black">
                                                <input type="radio" name="color" id="black"></input>
                                                <span className="color-1"></span>
                                            </label>
                                            <label for="silver">
                                                <input type="radio" name="color" id="silver"></input>
                                                <span className="color-2"></span>
                                            </label>
                                            <label for="gold">
                                                <input type="radio" name="color" id="gold"></input>
                                                <span className="color-3"></span>
                                            </label>
                                            <label for="white">
                                                <input type="radio" name="color" id="white"></input>
                                                <span className="color-4"></span>
                                            </label>
                                        </div>

                                        <h6>
                                            <td class="category" align="right">Category:</td>
                                            <td>{prod.category.name}</td>
                                        </h6>
                                        <h6>
                                            <td class="category" align="right">Quantity:</td>
                                            <td class="quantity-select">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="99"
                                                    value={this.state.txtQuantity}
                                                    onChange={(e) => {
                                                        this.setState({ txtQuantity: e.target.value });
                                                    }}
                                                />
                                            </td>
                                        </h6>
                                        <a>
                                            <td></td>
                                            <td class="submit-add">
                                                <input
                                                    type="submit"
                                                    value="ADD TO CART "
                                                    onClick={(e) => this.btnAdd2CartClick(e)}
                                                />
                                            </td>
                                        </a>
                                    </tbody>
                                </table>
                            </form>
                        </figcaption>
                    </figure>
                </div>
            );
        }
        return <div />;
    }
    componentDidMount() {
        const params = this.props.params;
        this.apiGetProduct(params.id);
    }

    // event - handlers
    btnAdd2CartClick(e) {
        e.preventDefault();

        const product = this.state.product;
        const quantity = parseInt(this.state.txtQuantity);
        if (quantity) {
            const mycart = this.context.mycart;
            const index = mycart.findIndex((x) => x.product._id === product._id); // check if the _id exists in mycart;
            if (index === -1) {
                // not found , push newItem
                const newItem = { product: product, quantity: quantity };
                mycart.push(newItem);
            } else {
                // increasing the quantity
                mycart[index].quantity += quantity;
            }
            this.context.setMycart(mycart);
            alert("Success !");
        } else {
            alert("Please input quantity");
        }
    }

    // apis
    apiGetProduct(id) {
        axios.get("/api/customer/products/" + id).then((res) => {
            const result = res.data;
            this.setState({ product: result });
        });
    }
}
export default withRouter(ProductDetail);
