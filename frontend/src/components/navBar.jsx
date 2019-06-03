import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import auth from "../services/authService";

class NavBar extends Component {
  state = {
    user: {
      _id: "",
      bag: "",
      email: "",
      isAdmin: "",
      name: ""
    }
  };
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link to="/" className="navbar-brand text-light">
          MSHOES
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav mr-auto">
            <NavLink to="/shoes" className="nav-link">
              Home
            </NavLink>
          </ul>
          <ul className="navbar-nav">
            {!user.email && (
              <React.Fragment>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </React.Fragment>
            )}

            <React.Fragment>
              <NavLink to="/cart" className="nav-link">
                Cart: {this.props.count}
              </NavLink>
              {user.email && (
                <React.Fragment>
                  <NavLink to="/user" className="nav-link">
                    {user.name}
                  </NavLink>
                  <NavLink to="/logout" className="nav-link">
                    Log Out
                  </NavLink>
                </React.Fragment>
              )}
            </React.Fragment>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
