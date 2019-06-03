import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import jwtDecode from "jwt-decode";

class EditUser extends Form {
  state = {
    data: {
      name: "",
      email: "",
      _id: ""
    },
    styles: [],
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  async populateUser() {
    try {
      const user = jwtDecode(localStorage.getItem("token"));
      this.setState({ data: this.mapToViewModel(user) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateUser();
  }

  mapToViewModel(user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password
    };
  }

  doSubmit = async () => {
    this.props.history.push("/shoes");
  };

  render() {
    return (
      <div>
        <h1>User Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("_id", "ID")}
          {this.renderButton("Edit")}
        </form>
      </div>
    );
  }
}

export default EditUser;
