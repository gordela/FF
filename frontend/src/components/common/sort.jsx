import React, { Component } from "react";

class Sort extends Component {
  state = {
    sort: [{ path: "title", title: "Name" }, { path: "price", title: "Price" }]
  };

  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <ul className="list-group list-group-horizontal ">
        {this.state.sort.map(column => (
          <li
            key={column.path}
            onClick={() => this.raiseSort(column.path)}
            className="list-group-item"
            style={{ cursor: "pointer" }}
          >
            {column.title}
            {this.props.sortIcon(column)}
          </li>
        ))}
      </ul>
    );
  }
}

export default Sort;
