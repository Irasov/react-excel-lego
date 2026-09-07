import React from "react";
import styles from "./SerFull.module.scss";
import {fetchSerItem} from "../../utils/fetchSerItem";
import type { SerItemType } from "../SerItem";
import SerItem from "../SerItem";
import SerItemSkeleton from "../SerItem/SerItemSkeleton";

type SeriaFullProps = {
  name: string;
  image: string;
  description: string;
  items: string;
};

const SerFull: React.FC<SeriaFullProps> = ({ name, image, description, items }) => {
  const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwk_rUljFlmES_9rZ6LxWQK4Ce2mFrvNtLRxCNXU4jfKyvhQljrCC5ZSCtQe_-mWQBaCC2KJK-8kSE/pub?gid=0&single=true&output=tsv"; 

  const [error, setError] = React.useState(false);
  const [serItems, setSerItems] = React.useState<SerItemType[]>([]);
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

  const indexItems = items.split(',');
  const mainItems = [];
  const skeletonItems = [];
  for(let i=0;i < indexItems.length; i+=1) {
    const index = Number(indexItems[i]);
    const props = serItems[index];
    mainItems.push(<SerItem {...props} />);
  }

  for(let i=0;i < indexItems.length; i+=1) {
    skeletonItems.push(<SerItemSkeleton />);
  }


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
          {error ? (
            <div className={styles.error}>
              <p>Failed to load series data. Please try again later.</p>
            </div>
            ) : (
              <div className={styles.list__items}>
                {loading ? skeletonItems : mainItems }
              </div>
            )}
      </div>
    </div>   
  )
}

export default SerFull;