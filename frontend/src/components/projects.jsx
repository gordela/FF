import React, { Component } from "react";
import { getProjects, deleteProject } from "../services/projectService";
import { getCategories } from "../services/categoryService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import ProjectFlex from "./projectFlex";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";
import Sort from "./common/sort";
import _ from "lodash";

class Projects extends Component {
  state = {
    projects: [],
    categories: [],
    branches: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedStyle: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getProjects();
    const categories = [{ name: "All Styles", _id: "" }, ...data];
    const { data: projects } = await getProjects();
    this.setState({ projects, categories });
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
      projects: allProjects,
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
    const { length: count } = this.state.projects;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
    let isAdmin = false;
    if (user) isAdmin = user.isAdmin;

    if (count === 0) return <p>There are no movies in the database</p>;
    const { totalCount, data: projects } = this.getPagedData();

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
          <span class="first-letter">P</span>rojects
        </h1>
        <br />
        {/* <SearchBox value={searchQuery} onChange={this.handleSearch} /> */}
        <ProjectFlex
          count={this.props.count}
          onRenewBag={this.props.onRenewBag}
          projects={projects}
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
