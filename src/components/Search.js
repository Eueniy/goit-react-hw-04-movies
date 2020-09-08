import React, { Component } from "react";
import styles from "./app.module.css";
import PropTypes from "prop-types";

export default class Search extends Component {
  state = {
    queryToSearch: "",
  };
  componentDidMount() {
    if (this.props.query) {
      this.setState({ queryToSearch: this.props.query });
    }
  }

  handleSubmitSearchText = (e) => {
    e.preventDefault();
    if (this.state.queryToSearch !== "") {
      this.props.onSubmit(this.state.queryToSearch);
    }
  };

  handleChange = (e) => {
    this.setState({ queryToSearch: e.target.value });
  };

  render() {
    const { queryToSearch } = this.state;
    return (
      <header className={styles.Searchbar}>
        <form
          className={styles.SearchForm}
          onSubmit={this.handleSubmitSearchText}
        >
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            value={queryToSearch}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Search.propTypes = {
  query: PropTypes.string,
};
