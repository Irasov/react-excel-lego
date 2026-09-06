import React from "react";
import styles from "./SerFull.module.scss";

type SeriaFullProps = {
  name: string;
  image: string;
  description: string;
  items: string;
};

const SerFull: React.FC<SeriaFullProps> = ({ name, image, description, items }) => {
  return (
    <div className={styles.body}>
      <div className={styles.image}>
        <img src={image} alt={name} className={styles.img} />
      </div>
      <h1 className={styles.title}>
        {name}
      </h1>
      <p className={styles.description}>
        {description}
      </p>
      <div className={styles.items}>
        <h2 className={styles.title}>
          Items
        </h2>
        
      </div>
    </div>   
  )
}

export default SerFull;