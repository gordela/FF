import React, { Component } from "react";
import ProtectedRoute from "./components/common/protectedRoute";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginForm from "./components/loginForm";
import EditProject from "./components/editProject";
import NotFound from "./components/notFound";
import Logout from "./components/logout";
import NavBar from "./components/navBar";
import Projects from "./components/projects";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import EditStyle from "./components/editStyle";
import Footer from "./components/footer";
import Contact from "./components/contact";
import News from "./components/news";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <ToastContainer />
          <NavBar />
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/contact" component={Contact} />
            <Route path="/news" component={News} />
            <ProtectedRoute path="/projects/:id" component={EditProject} />
            {/* <ProtectedRoute path="/category/:id" component={EditCategory} />
          <ProtectedRoute path="/news/:id" component={EditNews} />
          <ProtectedRoute path="/career/:id" component={EditCareer} /> */}
            <Route path="/logout" component={Logout} />
            <Route
              path="/projects"
              render={props => <Projects user={this.state.user} {...props} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/projects" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default App;
