import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import { getShoes } from "../services/shoeService";

class CartFlex extends Component {
  state = { bag: {}, data: {} };

  async componentDidMount() {
    const user = auth.getCurrentUser();
    const { data } = await getShoes();
    let bag = JSON.parse(localStorage.getItem("bag"));
    Object.keys(bag).map(x => {
      if (data.filter(dataShoe => dataShoe._id === x)) {
        let shoe = data.filter(dataShoe => dataShoe._id === x);
        if (shoe[0]) {
          shoe[0].countInBag = bag[shoe[0]._id];
          bag[shoe[0]._id] = shoe[0];
        }
      }
      return false;
    });
    localStorage.setItem("bagFlex", JSON.stringify(bag));
    this.setState({ user, data, bag });
  }

  remProd = id => {
    let original = { ...this.state.bag };
    let originalBag = JSON.parse(localStorage.getItem("bag"));
    if (original[id].countInBag === 1) {
      delete originalBag[id];
      localStorage.setItem("bag", JSON.stringify(originalBag));
      delete original[id];
      this.props.count();

      this.setState({ bag: original });
      localStorage.setItem("bagFlex", JSON.stringify(original));
      return;
    }
    originalBag[id] -= 1;
    localStorage.setItem("bag", JSON.stringify(originalBag));

    original[id].countInBag -= 1;
    this.setState({ bag: original });
    localStorage.setItem("bagFlex", JSON.stringify(original));
  };
  addProd = id => {
    let original = { ...this.state.bag };
    let originalBag = JSON.parse(localStorage.getItem("bag"));

    originalBag[id] += 1;
    localStorage.setItem("bag", JSON.stringify(originalBag));
    this.props.count();

    original[id].countInBag += 1;
    this.setState({ bag: original });
    localStorage.setItem("bagFlex", JSON.stringify(original));
  };
  delProd = id => {
    let original = { ...this.state.bag };
    let originalBag = JSON.parse(localStorage.getItem("bag"));
    delete originalBag[id];
    localStorage.setItem("bag", JSON.stringify(originalBag));
    this.props.count();
    delete original[id];
    this.setState({ bag: original });
    localStorage.setItem("bagFlex", JSON.stringify(original));
  };

  render() {
    const { bag } = this.state;

    return (
      <div className="d-flex justify-content-around flex-wrap">
        {Object.keys(bag).map(key => (
          <div
            key={bag[key]._id}
            className="card m-1"
            style={{ maxWidth: "15rem" }}
          >
            <Link to={"/shoe/" + bag[key]._id}>
              <img src={bag[key].picture} className="card-img-top" alt="..." />
            </Link>

            <div className="card-body flex-column d-flex">
              <h5 className="card-title">{bag[key].title}</h5>
              <p className="card-text">
                Count In Bag: {bag[key].countInBag} <br /> Sum:
                {bag[key].price * bag[key].countInBag}$
              </p>

              <div style={{ display: "flex" }}>
                <Button
                  onClick={() => this.remProd(bag[key]._id)}
                  variant="btn btn-danger"
                  className="m-auto"
                >
                  -
                </Button>
                <Button
                  onClick={() => this.delProd(bag[key]._id)}
                  variant="btn btn-danger"
                  className="m-auto"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => this.addProd(bag[key]._id)}
                  variant="btn btn-danger"
                  className="m-auto"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default CartFlex;
