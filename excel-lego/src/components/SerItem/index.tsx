import React from "react";
import styles from "./SerItem.module.scss";


type SerItemProps = {
  id: string;
}

export interface SerItemType {
  id: string;
  series: string;
  name: string;
  type: string;
  modified: string;
  description: string;
  count: string;
  image1:string;
  image2:string;
  image3:string;
  image4:string;
}

const SerItem: React.FC<SerItemType> = ({id, series, name, type, modified, description, count, image1, image2, image3, image4}) => {

  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img src={image1} alt={name} className={styles.img} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.info__title}>
          {name}
        </h3>
        <a href="#" className={styles.info__link}>More</a>
      </div>
    </div>
  )
}

export default SerItem;