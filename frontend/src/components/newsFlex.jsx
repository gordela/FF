import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class NewsFlex extends Component {
  render() {
    const { newss, onDelete } = this.props;
    const isAdmin = auth.isAdmin();

    return (
      <div
        style={{ minHeight: "60vh" }}
        className="d-flex justify-content-around flex-wrap"
      >
        {newss.map(news => (
          <div
            key={news._id}
            className="card m-1"
            style={{ maxWidth: "15rem" }}
          >
            {isAdmin && (
              <Link
                to={"/news/" + news._id}
                className="mt-auto btn btn-primary"
              >
                Edit
              </Link>
            )}

            <Link to={"/news/" + news._id}>
              {" "}
              <img src={news.longImage} className="card-img-top" alt="..." />
            </Link>

            <div className="card-body flex-column d-flex">
              <h5 className="card-title">{news.title}</h5>
              <p className="card-text">{news.shortDesc}</p>
              {isAdmin && (
                <React.Fragment>
                  <Button
                    onClick={() => onDelete(news)}
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
                  onClick={() => this.addToCart(news._id)}
                  variant="btn btn-primary btn-emg"
                  className="mt-auto"
                >
                  Read More
                </Button>
              }
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default NewsFlex;
