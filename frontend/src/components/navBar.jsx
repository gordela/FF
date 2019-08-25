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
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-emg fixed-top">
        <Link to="/" className="navbar-brand text-light">
          EMG
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
            <NavLink to="/projects" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
            <NavLink to="/projects" className="nav-link">
              Projects
            </NavLink>
            <NavLink to="/news" className="nav-link">
              News
            </NavLink>
            <NavLink to="/career" className="nav-link">
              Career
            </NavLink>
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </ul>
          <ul className="navbar-nav">
            <form class="form-inline mt-2 mt-md-0">
              <input
                class="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <NavLink to="/portal" className="nav-link">
              Portal
            </NavLink>
            <div class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="dropdown09"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="flag-icon flag-icon-us"> </span> English
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdown09">
                <a class="dropdown-item" href="#ge">
                  <span class="flag-icon flag-icon-ge"> </span> Georgian
                </a>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
