import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class ProjectFlex extends Component {
  render() {
    const { projects, onDelete } = this.props;
    const isAdmin = auth.isAdmin();

    return (
      <div
        style={{ minHeight: "60vh" }}
        className="d-flex justify-content-around flex-wrap"
      >
        {projects.map(project => (
          <div
            key={project._id}
            className="card m-1"
            style={{ maxWidth: "15rem" }}
          >
            {isAdmin && (
              <Link
                to={"/projects/" + project._id}
                className="mt-auto btn btn-primary"
              >
                Edit
              </Link>
            )}

            <Link to={"/projects/" + project._id}>
              {" "}
              <img src={project.longImage} className="card-img-top" alt="..." />
            </Link>

            <div className="card-body flex-column d-flex">
              <h5 className="card-title">{project.title}</h5>
              <p className="card-text">
                Client: {project.client} <br /> Duration: {project.duration}{" "}
                Hours <br /> {project.shortDesc}
              </p>
              {isAdmin && (
                <React.Fragment>
                  <Button
                    onClick={() => onDelete(project)}
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
                  onClick={() => this.addToCart(project._id)}
                  variant="btn btn-primary btn-emg"
                  className="mt-auto"
                >
                  Make Feedback
                </Button>
              }
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ProjectFlex;
