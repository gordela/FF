import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { deleteCategory } from "../../services/categoryService";

class ListGroup extends Component {
  state = { items: [] };

  componentDidMount() {
    this.setState({ items: this.props.items });
  }
  handleDelete = item => {
    let stat = { ...this.state };
    const modded = stat.items.filter(x => x._id !== item._id);
    this.setState({ items: modded });
    deleteCategory(item._id);
  };

  render() {
    const {
      onItemSelect,
      textProperty,
      selectedItem,
      valueProperty,
      isAdmin
    } = this.props;
    const { items } = this.state;
    return (
      <ul className="list-group list-group-horizontal ">
        {!isAdmin &&
          items.map(item => (
            <li
              onClick={() => onItemSelect(item)}
              key={item[valueProperty]}
              className={
                selectedItem === item
                  ? "list-group-item active"
                  : "list-group-item"
              }
              style={{ cursor: "pointer" }}
            >
              {item[textProperty]}
            </li>
          ))}
        {isAdmin &&
          items.map(item => (
            <React.Fragment key={item.name}>
              {item.name !== "All Styles" && (
                <Button
                  onClick={() => this.handleDelete(item)}
                  className="btn-danger"
                >
                  X
                </Button>
              )}
              <Link
                to={"/styles/" + item[valueProperty]}
                key={item[valueProperty]}
                className="btn btn-primary mr-1"
                style={{ cursor: "pointer" }}
              >
                {item[textProperty]}
              </Link>
            </React.Fragment>
          ))}

        {isAdmin && (
          <Link className="btn btn-primary" to="/styles/new">
            New Style
          </Link>
        )}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default ListGroup;
