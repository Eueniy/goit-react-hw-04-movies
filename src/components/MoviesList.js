import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./app.module.css";

export default function MoviesList({ items, parentPage }) {
  return (
    <>
      {items.map((item) => (
        <li key={item.id}>
          <Link
            to={{
              pathname: `/movies/${item.id}`,
              state: { goBack: parentPage },
            }}
            className={styles.listItemsLink}
          >
            {item.title}
            {item.original_name}
          </Link>
        </li>
      ))}
    </>
  );
}

MoviesList.propTypes = {
  parentPage: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      original_name: PropTypes.string,
    })
  ),
};
