import React, { Component } from "react";
import { getShoes, deleteShoe } from "../services/shoeService";
import { getStyles } from "../services/styleService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import ShoesFlex from "./shoesFlex";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";
import Sort from "./common/sort";
import _ from "lodash";

class Shoes extends Component {
  state = {
    shoes: [],
    styles: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedStyle: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data } = await getStyles();
    const styles = [{ name: "All Styles", _id: "" }, ...data];
    const { data: shoes } = await getShoes();
    this.setState({ shoes, styles });
  }

  handleDelete = async shoe => {
    const originalShoes = this.state.shoes;
    const shoes = originalShoes.filter(s => s._id !== shoe._id);
    this.setState({ shoes });
    try {
      await deleteShoe(shoe._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("This shoe has already been deleted");
        this.setState({ shoes: originalShoes });
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
      shoes: allShoes,
      selectedStyle,
      sortColumn,
      searchQuery
    } = this.state;
    let filtered = allShoes;

    if (searchQuery)
      filtered = allShoes.filter(s =>
        s.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedStyle && selectedStyle._id)
      filtered = allShoes.filter(m => m.style._id === selectedStyle._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order);

    const shoes = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: shoes };
  };

  render() {
    const { length: count } = this.state.shoes;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
    let isAdmin = false;
    if (user) isAdmin = user.isAdmin;

    if (count === 0) return <p>There are no movies in the database</p>;
    const { totalCount, data: shoes } = this.getPagedData();

    return (
      <React.Fragment>
        {isAdmin && (
          <Link
            style={{ marginBottom: "10px" }}
            className="btn btn-primary"
            to="/shoes/new"
          >
            New Shoe
          </Link>
        )}
        <ul className="d-flex flex-wrap justify-content-between align-content-between">
          <ListGroup
            deleteStyle={this.deleteStyle}
            isAdmin={isAdmin}
            selectedItem={this.state.selectedStyle}
            items={this.state.styles}
            onItemSelect={this.handleStyleSelect}
          />
          <Sort
            sortColumn={sortColumn}
            onSort={this.handleSort}
            sortIcon={this.renderSortIcon}
          />
        </ul>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        <ShoesFlex
          count={this.props.count}
          onRenewBag={this.props.onRenewBag}
          shoes={shoes}
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

export default Shoes;
