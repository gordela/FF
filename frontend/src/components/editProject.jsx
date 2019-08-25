import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCategories } from "../services/categoryService";
import { getProject, saveProject } from "../services/projectService";

class EditProject extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      price: "",
      picture: "",
      pictureTwo: "",
      gender: "",
      styleId: "",
      countInBag: 0
    },
    styles: [],
    errors: {}
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(1000)
      .label("Number in Stock"),
    price: Joi.number()
      .required()
      .min(0)
      .label("Price"),
    picture: Joi.string().required(),
    pictureTwo: Joi.string().required(),
    gender: Joi.string().required(),
    countInBag: Joi.number(),
    styleId: Joi.string().required()
  };

  async populateStyles() {
    const { data: styles } = await getCategories();
    this.setState({ styles });
  }

  async populateShoe() {
    try {
      const shoeId = this.props.match.params.id;
      if (shoeId === "new") return;
      const { data: shoe } = await getProject(shoeId);
      this.setState({ data: this.mapToViewModel(shoe) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateStyles();
    await this.populateShoe();
  }

  mapToViewModel(shoe) {
    return {
      _id: shoe._id,
      title: shoe.title,
      styleId: shoe.style._id,
      numberInStock: shoe.numberInStock,
      picture: shoe.picture,
      pictureTwo: shoe.pictureTwo,
      gender: shoe.gender,
      price: shoe.price,
      countInBag: shoe.countInBag
    };
  }

  doSubmit = async () => {
    await saveProject(this.state.data);

    this.props.history.push("/shoes");
  };

  render() {
    return (
      <div>
        <h1>Edit Project</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("picture", "Picture")}
          {this.renderInput("pictureTwo", "Picture Two")}
          {this.renderInput("price", "Price", "number")}
          {this.renderInput("countInBag", "Count In Bag", "number")}
          {this.renderInput("gender", "Gender")}
          {this.renderSelect("styleId", "Style", this.state.styles)}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default EditProject;
