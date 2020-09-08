import React, { Component } from "react";
import * as MoviesAPI from "../services/api.js";
import MoviesList from "../components/MoviesList";
import Spinner from "./../components/Spinner";
import ErrorNotification from "../components/ErrorNotification";
import styles from "./pages.module.css";

export default class HomePage extends Component {
  state = {
    movies: [],
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    MoviesAPI.getMoviesTrend()
      .then(({ data }) => this.setState({ movies: data.results }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, error, movies } = this.state;
    const currentPath = this.props.location.pathname;
    return (
      <div className={styles.pageWrapper}>
        <h1>What's popular</h1>
        {error && <ErrorNotification text={error.message} />}
        {isLoading && <Spinner />}
        {movies.length > 0 && (
          <ul className={styles.MoviesListUl}>
            <MoviesList items={movies} parentPage={currentPath} />
          </ul>
        )}
      </div>
    );
  }
}
