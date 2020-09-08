import React, { Component } from "react";
import Search from "../components/Search";
import * as MoviesAPI from "../services/api.js";
import MoviesList from "../components/MoviesList";
import ErrorNotification from "../components/ErrorNotification";
import PropTypes from "prop-types";
import styles from "./pages.module.css";
import Spinner from "../components/Spinner";

var lastQuery = null;
export default class MoviesPage extends Component {
  state = {
    query: "",
    moviesFound: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    if (lastQuery) {
      this.setState({ query: lastQuery });
      this.fetchAPI(lastQuery);
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.query !== this.state.query) {
      lastQuery = this.state.query;
      this.fetchAPI(this.state.query);
    }
  }

  fetchAPI(query) {
    if (this.state.query === "") {
      return;
    }
    // this.setState({ isLoading: true });
    MoviesAPI.getMovieByQuery(query)
      .then(({ data }) => this.setState({ moviesFound: data.results }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  handleChangeQuery = (queryToSearch) => {
    this.setState({ query: queryToSearch });
  };

  render() {
    const { moviesFound, isLoading, error, query } = this.state;

    const currentPath = this.props.location.pathname;
    return (
      <div>
        <Search onSubmit={this.handleChangeQuery} query={lastQuery} />
        {error && <ErrorNotification text={error.message} />}
        {isLoading && <Spinner />}
        {moviesFound.length > 0 && (
          <ul className={styles.listItemsUl}>
            <MoviesList
              items={moviesFound}
              parentPage={currentPath}
              query={query}
            />
          </ul>
        )}
      </div>
    );
  }
}

MoviesPage.propTypes = {
  queryToSearch: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      original_name: PropTypes.string,
    })
  ),
};
