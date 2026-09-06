import React from "react";
import styles from "./CardSeries.module.scss";
import { Link } from "react-router-dom";

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
        <Link to={`/seria/${id}`} className={styles.link}>
          Learn More
        </Link>
      </div>
      </div>
    </div>
  );
}

export default CardSeries;