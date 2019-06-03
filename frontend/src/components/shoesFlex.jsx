import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class ShoeFlex extends Component {
  addToCart = async id => {
    let bag;
    if (localStorage.getItem("bag")) {
      bag = JSON.parse(localStorage.getItem("bag"));
    } else {
      localStorage.setItem("bag", JSON.stringify({}));
      bag = {};
    }
    if (Object.keys(bag).find(x => x === id)) {
      bag[id] = bag[id] + 1;
      localStorage.setItem("bag", JSON.stringify(bag));
    } else {
      bag[id] = 1;
      localStorage.setItem("bag", JSON.stringify(bag));
    }
    this.props.count();
  };
  render() {
    const { shoes, onDelete } = this.props;
    const isAdmin = auth.isAdmin();

    return (
      <div className="d-flex justify-content-around flex-wrap">
        {shoes.map(shoe => (
          <div
            key={shoe._id}
            className="card m-1"
            style={{ maxWidth: "15rem" }}
          >
            {isAdmin && (
              <Link
                to={"/shoes/" + shoe._id}
                className="mt-auto btn btn-primary"
              >
                Edit
              </Link>
            )}

            <Link to={"/shoes/" + shoe._id}>
              {" "}
              <img src={shoe.picture} className="card-img-top" alt="..." />
            </Link>

            <div className="card-body flex-column d-flex">
              <h5 className="card-title">{shoe.title}</h5>
              <p className="card-text">
                Style: {shoe.style.name} <br /> Price: {shoe.price}$
              </p>
              {isAdmin && (
                <React.Fragment>
                  <Button
                    onClick={() => onDelete(shoe)}
                    variant="btn btn-danger"
                    className="mt-auto"
                  >
                    Delete
                  </Button>
                  <br />
                </React.Fragment>
              )}
              {
                <Button
                  onClick={() => this.addToCart(shoe._id)}
                  variant="btn btn-primary"
                  className="mt-auto"
                >
                  Add To Cart
                </Button>
              }
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ShoeFlex;
