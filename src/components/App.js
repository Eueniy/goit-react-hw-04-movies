import React, { Component, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import styles from "./app.module.css";
import Nav from "./Nav";

const HomePage = lazy(() => import("../pages/HomePage"));

const MovieDetailsPage = lazy(() => import("../pages/MovieDetailsPage"));

const MoviesPage = lazy(() => import("../pages/MoviesPage"));

const NotFoundPage = lazy(() => import("../pages/NotFound"));

export default class App extends Component {
  state = {};

  render() {
    return (
      <div className={styles.wrapper}>
        <Nav />
        <Suspense fallback={<h2>Loading...</h2>}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/movies" exact component={MoviesPage} />
            <Route path="/movies/:movieId" component={MovieDetailsPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}
