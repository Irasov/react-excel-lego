import React from "react";
import styles from "./LoadingBlock.module.scss";

const LoadingBlock: React.FC = () => {
  return (
    <div className={styles.loading}>
      <div className="container">
        <div className={styles.body}>
          <h2 className={styles.title}>Loading...</h2>
        </div>
      </div>
    </div>
  )
}

export default LoadingBlock;