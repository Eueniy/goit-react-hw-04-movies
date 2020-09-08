import React, { Component } from "react";
import PropTypes from "prop-types";
import * as MoviesAPI from "../services/api.js";
import ErrorNotification from "./ErrorNotification";
import Spinner from "./Spinner.js";
import styles from "./app.module.css";

const getIdFromProps = (props) => props.match.params.movieId;
export default class Reviews extends Component {
  state = {
    reviews: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const id = getIdFromProps(this.props);
    MoviesAPI.getMovieReviews(id)
      .then(({ data }) => this.setState({ reviews: data.results }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { reviews, isLoading, error } = this.state;
    return (
      <>
        {isLoading && <Spinner />}
        {reviews.length > 0 && (
          <>
            <h3>Total reviews: {reviews.length}</h3>
            <ul className={styles.rewiews}>
              {reviews.map((item) => (
                <li key={item.id}>
                  <b>{item.author}</b> <p>{item.content}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        {reviews.length === 0 && <h1>No reviews yet.</h1>}
        {error && <ErrorNotification text={error.message} />}
      </>
    );
  }
}

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
};
