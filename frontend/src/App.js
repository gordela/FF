import React, { Component } from "react";
import ProtectedRoute from "./components/common/protectedRoute";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/loginForm";
import EditShoe from "./components/editShoe";
import Register from "./components/register";
import NotFound from "./components/notFound";
import EditUser from "./components/editUser";
import Logout from "./components/logout";
import NavBar from "./components/navBar";
import Shoes from "./components/shoes";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import CartFlex from "./components/cartFlex";
import EditStyle from "./components/editStyle";

class App extends Component {
  state = { countInBag: 0 };
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    this.countBag();
  }

  countBag = () => {
    const bag = JSON.parse(localStorage.getItem("bag")) || {};
    const keys = Object.keys(bag);
    let count = 0;
    keys.filter(i => (count += bag[i]));
    this.setState({ countInBag: count });
  };

  render() {
    return (
      <div className="container">
        <ToastContainer />
        <NavBar count={this.state.countInBag} />
        <Switch>
          <Route path="/user/" component={EditUser} />
          <Route
            path="/cart/"
            render={props => <CartFlex count={this.countBag} {...props} />}
          />
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginForm} />
          <ProtectedRoute path="/shoes/:id" component={EditShoe} />
          <ProtectedRoute path="/styles/:id" component={EditStyle} />

          <Route path="/logout" component={Logout} />
          <Route
            path="/shoes"
            render={props => (
              <Shoes count={this.countBag} user={this.state.user} {...props} />
            )}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/shoes" />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
