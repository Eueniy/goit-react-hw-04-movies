import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import Spinner from "../components/Spinner";
import * as MoviesAPI from "../services/api.js";
import ErrorNotification from "../components/ErrorNotification";
import Cast from "../components/Cast";
import Reviews from "../components/Reviews";
import styles from "./pages.module.css";

const getIdFromProps = (props) => props.match.params.movieId;
const imgUrl = "https://image.tmdb.org/t/p/w500/";
var currentParentPageToReturn = null;

export default class MovieDetailsPage extends Component {
  state = {
    film: null,
    error: null,
    isLoading: false,
  };

  componentDidMount() {
    if (this.props.location.state) {
      currentParentPageToReturn = this.props.location.state.goOnBack;
    } else {
      currentParentPageToReturn = null;
    }
    this.setState({ isLoading: true });
    const id = getIdFromProps(this.props);
    MoviesAPI.getMovieWithId(id)
      .then(({ data }) => this.setState({ film: data }))
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  }

  handleGoBack = () => {
    if (
      currentParentPageToReturn === undefined ||
      currentParentPageToReturn === null
    ) {
      currentParentPageToReturn = "/";
    }
    this.props.history.push(currentParentPageToReturn);
  };
  render() {
    const { film, isLoading, error } = this.state;

    return (
      <div className={styles.pageWrapper}>
        <button
          type="button"
          className={styles.GobackBtn}
          onClick={this.handleGoBack}
        ></button>
        {isLoading && <Spinner />}
        {film && (
          <>
            <div className={styles.movieDetailWrapper}>
              <div className={styles.movieDetailImgBox}>
                <img
                  src={imgUrl + film.poster_path}
                  className={styles.movieDetailImg}
                  alt={film.title}
                ></img>
              </div>

              <div className={styles.movieDescription}>
                <h1 className={styles.movieDescriptionTitle}>
                  {film.title} ({film.release_date})
                </h1>
                <p>Vote average: {film.vote_average} /10 </p>
                <p>Overview:</p>
                <span className={styles.movieDetailOverviewTxt}>
                  {film.overview}
                </span>
                <p className={styles.movieDetailDescTitle}>Genres:</p>
                <ul className={styles.movieDetailDescUl}>
                  {film.genres.map((item) => (
                    <li key={item.id} className={styles.movieDetailGenresLi}>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.movieDetailAdd}>
              <p className={styles.movieDetailDescTitle}>
                Additional Information
              </p>
              <ul className={styles.movieDetailLinks}>
                <li className={styles.movieDetailAddLi}>
                  <Link
                    to={`/movies/${film.id}/cast`}
                    className={styles.movieDetailAddLiLink}
                  >
                    Cast
                  </Link>
                </li>
                <li className={styles.movieDetailAddLi}>
                  <Link
                    to={`/movies/${film.id}/reviews`}
                    className={styles.movieDetailAddLiLink}
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}

        {<Route path="/movies/:movieId/cast" component={Cast} />}
        {<Route path="/movies/:movieId/reviews" component={Reviews} />}
        {error && <ErrorNotification text={error.message} />}
      </div>
    );
  }
}
