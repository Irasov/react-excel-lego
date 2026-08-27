import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className={styles.body}>
          <span className={styles.title}>Page not found</span>
        </div>
      </div>
    </div>
  )
}

export default NotFoundBlock;