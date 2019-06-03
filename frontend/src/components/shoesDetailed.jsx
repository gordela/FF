import React, { Component } from "react";
import { getShoe } from "../services/shoeService";

class ShoesDetailed extends Component {
  state = { shoe: getShoe(this.props.match.params.id) };
  render() {
    return (
      <React.Fragment>
        <div className="card-deck">
          <div className="card">
            <img
              src={this.state.shoe.picture}
              alt=""
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <img
              src={this.state.shoe.pictureTwo}
              alt=""
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
          <div className="card">
            <img
              src={this.state.shoe.pictureTwo}
              alt=""
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShoesDetailed;
