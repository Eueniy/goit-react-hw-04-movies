import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./app.module.css";

const activeStyle = {
  color: "#F1003C",
};
const Nav = () => (
  <div className={styles.navWrapper}>
    <ul className={styles.nav}>
      <li className={styles.navLi}>
        <NavLink
          to="/"
          exact
          activeStyle={activeStyle}
          className={styles.navLink}
        >
          Home
        </NavLink>
      </li>
      <li className={styles.navLi}>
        <NavLink
          to="/movies"
          activeStyle={activeStyle}
          className={styles.navLink}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  </div>
);
export default Nav;
