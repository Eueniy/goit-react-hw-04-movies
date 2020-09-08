import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./app.module.css";

export default class Spinner extends Component {
  render() {
    return (
      <div>
        <Loader
          className={styles.spinner}
          type="RevolvingDot"
          color="orange"
          height={100}
          width={100}
          timeout={3000}
        />
      </div>
    );
  }
}
