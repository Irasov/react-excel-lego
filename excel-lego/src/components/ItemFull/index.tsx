import React from "react";
import styles from "./ItemFull.module.scss";
import type { SerItemType } from "../SerItem";

const ItemFull: React.FC <SerItemType> = ({id, series, name, type, modified, description, сount, image1, image2, image3, image4}) => {
  return (
    <div className={styles.body}>
      <div className={styles.image}>
        <img src={image1} alt={name} className={styles.img} />
      </div>
      <h1 className={styles.title}>{name}</h1>
      <h2 className={styles.subtitle}>Series: {series}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.spec}>
        <span className={styles.type}>Type: {type}</span>
        <span className={styles.mod}>Modified: {modified}</span>
        <span className={styles.type}>In stock: {сount}</span>
      </div>

    </div>
  )
}

export default ItemFull;