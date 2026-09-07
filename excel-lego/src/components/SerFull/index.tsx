import React from "react";
import styles from "./SerFull.module.scss";
import {fetchSerItem} from "../../utils/fetchSerItem";
import type { SerItemType } from "../SerItem";
import SerItem from "../SerItem";

type SeriaFullProps = {
  name: string;
  image: string;
  description: string;
  items: string;
};

const SerFull: React.FC<SeriaFullProps> = ({ name, image, description, items }) => {
  const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwk_rUljFlmES_9rZ6LxWQK4Ce2mFrvNtLRxCNXU4jfKyvhQljrCC5ZSCtQe_-mWQBaCC2KJK-8kSE/pub?gid=0&single=true&output=tsv"; 

  const [error, setError] = React.useState(false);
  const [Seritems, setSerItems] = React.useState<SerItemType[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        const products = await fetchSerItem(URL);
        if (!cancelled) {
          setSerItems(products as SerItemType[]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      cancelled = true;
    }
  },[]);

  const item = Seritems[0];

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
      <div className={styles.list}>
        <h2 className={styles.title}>
          Items
        </h2>
        <div className={styles.list__items}>
          <SerItem {...item}/>
        </div>
      </div>
    </div>   
  )
}

export default SerFull;