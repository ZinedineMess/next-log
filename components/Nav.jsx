import React from "react";

import styles from "./styles/Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navItems}>
        <ul>
          <li>
            <a href="/">My Posts</a>
          </li>
          <li>
            <a href="/notes">Add Note</a>
          </li>
          <li>
            <a href="/users">Add User</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
