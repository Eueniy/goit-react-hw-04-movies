import React, { Component } from "react";
import * as MoviesAPI from "../services/api.js";
import Spinner from "./Spinner";
import ErrorNotification from "./ErrorNotification";
import styles from "./app.module.css";
import PropTypes from "prop-types";

const getIdFromProps = (props) => props.match.params.movieId;
const imgUrl = "https://image.tmdb.org/t/p/w500/";
export default class Cast extends Component {
  state = {
    casts: [],
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    const id = getIdFromProps(this.props);
    MoviesAPI.getMovieCast(id)
      .then(({ data }) => this.setState({ casts: data.cast }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, error, casts } = this.state;
    return (
      <>
        {isLoading && <Spinner />}
        {casts.length > 0 && (
          <>
            <h3>Total cast: {casts.length}</h3>
            <ul className={styles.movieDetailUl}>
              {casts.map((item) => (
                <li key={item.cast_id} className={styles.movieDetailLi}>
                  <p>
                    <img
                      src={imgUrl + item.profile_path}
                      className={styles.movieDetailImg}
                      alt={item.name}
                    ></img>
                  </p>
                  <p>
                    <b>{item.name}</b>
                  </p>
                  <p>Character: {item.character}</p>
                </li>
              ))}
            </ul>
          </>
        )}
        {casts.length === 0 && (
          <h1>there is currently no information on the cast</h1>
        )}
        {error && <ErrorNotification text={error.message} />}
      </>
    );
  }
}

Cast.propTypes = {
  casts: PropTypes.arrayOf(
    PropTypes.shape({
      cast_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
      profile_path: PropTypes.string.isRequired,
    })
  ),
};
