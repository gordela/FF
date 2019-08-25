import React, { Component } from "react";
import { getProjects, deleteProject } from "../services/projectService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import { Link } from "react-router-dom";
import ProjectFlex from "./projectFlex";
import { toast } from "react-toastify";
import _ from "lodash";
import NewsFlex from "./newsFlex";
import { getNews } from "../services/newsService";

class Projects extends Component {
  state = {
    newss: [],
    categories: [],
    branches: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedStyle: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data: newss } = await getNews();
    this.setState({ newss });
  }

  handleDelete = async project => {
    const originalProjects = this.state.projects;
    const projects = originalProjects.filter(s => s._id !== project._id);
    this.setState({ projects });
    try {
      await deleteProject(project._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This project has already been deleted");
        this.setState({ projects: originalProjects });
      }
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleStyleSelect = style => {
    this.setState({ selectedStyle: style, searchQuery: "", currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedStyle: null, currentPage: 1 });
  };

  renderSortIcon = column => {
    const { sortColumn } = this.state;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      newss: allProjects,
      selectedStyle,
      sortColumn,
      searchQuery
    } = this.state;
    let filtered = allProjects;

    if (searchQuery)
      filtered = allProjects.filter(s =>
        s.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedStyle && selectedStyle._id)
      filtered = allProjects.filter(m => m.style._id === selectedStyle._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order);

    const projects = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: projects };
  };

  render() {
    const { length: count } = this.state.newss;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
    let isAdmin = false;
    if (user) isAdmin = user.isAdmin;

    if (count === 0) return <p>There are no movies in the database</p>;
    const { totalCount, data: newss } = this.getPagedData();

    return (
      <React.Fragment>
        {isAdmin && (
          <Link
            style={{ marginBottom: "10px" }}
            className="btn btn-primary"
            to="/projects/new"
          >
            New Project
          </Link>
        )}
        <br />
        <h1>
          <span class="first-letter">N</span>ews
        </h1>
        <br />
        {/* <SearchBox value={searchQuery} onChange={this.handleSearch} /> */}
        <NewsFlex
          count={this.props.count}
          onRenewBag={this.props.onRenewBag}
          newss={newss}
          onDelete={this.handleDelete}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Projects;
