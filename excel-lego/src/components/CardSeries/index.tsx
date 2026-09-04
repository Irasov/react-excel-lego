import React from "react";
import styles from "./CardSeries.module.scss";

type CardSeriesProps = {
  id:string;
  name:string;
  image:string;
  description:string;
}

const CardSeries: React.FC<CardSeriesProps> = ({ id, name, image, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <div className={styles.image}>
          <img src={image} alt={name} className={styles.img} />
        </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <a href="#" className={styles.link}>
          Learn More
        </a>
      </div>
      </div>
    </div>
  );
}

export default CardSeries;