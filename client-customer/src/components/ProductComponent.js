import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
    }
    // Hàm định dạng giá tiền
    formatPrice(price) {
        // Đảm bảo giá trị là một số trước khi định dạng
        const numberPrice = Number(price);
        // Sử dụng 'currencyDisplay: 'code'' để đảm bảo mã tiền tệ hiển thị
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code'
        }).format(numberPrice) + " VND"; // Thêm "VND" vào chuỗi định dạng nếu cần
    }
    render() {
        const prods = this.state.products.map((item) => {
            return (
                <div key={item._id} className="inline">
                    <figure>
                        <Link to={"/product/" + item._id}>
                            <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
                        </Link>
                        <figcaption className="price-center">
                            <a>{item.name}</a>
                            <br /> Price: {item.price}
                        </figcaption>
                    </figure>
                </div>
            );
        });
        return (
            <div className="align-center">
                <h2 className="text-center"> LIST PRODUCTS </h2>
                {prods}
            </div>
        );
    }
    componentDidMount() {
        // first : / product /...
        const params = this.props.params;
        if (params.cid) {
            this.apiGetProductsByCatID(params.cid);
        } else if (params.keyword) {
            this.apiGetProductsByKeyword(params.keyword);
        }
    }
    componentDidUpdate(prevProps) {
        // changed : / product /...
        const params = this.props.params;
        if (params.cid && params.cid !== prevProps.params.cid) {
            this.apiGetProductsByCatID(params.cid);
        } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
            this.apiGetProductsByKeyword(params.keyword);
        }
    }

    // apis
    apiGetProductsByCatID(cid) {
        axios.get("/api/customer/products/category/" + cid).then((res) => {
            const result = res.data;
            this.setState({ products: result });
        });
    }

    apiGetProductsByKeyword(keyword) {
        axios.get("/api/customer/products/search/" + keyword).then((res) => {
            const result = res.data;
            this.setState({ products: result });
        });
    }
    
}
export default withRouter(Product);
