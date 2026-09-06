import React from "react";
import styles from "./SeriaFull.module.scss";

type SeriaFullProps = {
  name: string;
  image: string;
  description: string;
  items: string;
};

const SeriaFull: React.FC<SeriaFullProps> = ({ name, image, description, items }) => {
  return (
    <div className={styles.body}>
      <div className={styles.image}>
        <img src={image} alt={name} className={styles.image} />
      </div>
      <h1 className={styles.title}>
        {name}
      </h1>
      <p className={styles.description}>
        {description}
      </p>
    </div>

  )
}

export default SeriaFull;