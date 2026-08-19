import React from "react";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.body}>
          <div className="logo">
            HEADER
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;