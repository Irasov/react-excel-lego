import React from "react";
import styles from "./ListSeries.module.scss";
import type { SeriesItem } from "../SeriesBlock";
import { fetchSeries } from "../../utils/fetchSeries";
import CardSeries from "../CardSeries";
import CardSeriesSkeleton from "../CardSeries/CardSeriesSkeleton";

const ListSeries: React.FC = () => {
const [error, setError] = React.useState(false);
  const [series, setSeries] = React.useState<SeriesItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwk_rUljFlmES_9rZ6LxWQK4Ce2mFrvNtLRxCNXU4jfKyvhQljrCC5ZSCtQe_-mWQBaCC2KJK-8kSE/pub?gid=824227161&single=true&output=tsv"; 

  React.useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        const products = await fetchSeries(URL);
        if (!cancelled) {
          setSeries(products as SeriesItem[]);
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

  const itemsSeries = series.map((item) => (
    <CardSeries
      id={item.id}
      name={item.name}
      image={item.image}
      description={item.description}
      key={item.id}
    />
  ))


  const itemsSkeleton = Array.from({ length: 8 }, (_, index) => (
    <CardSeriesSkeleton key={index}/>
  ))

  return (
    <>
      {error ? (
        <div className={styles.error}>
          <p>Failed to load series data. Please try again later.</p>
        </div>
      ):(
        <div className={styles.items}>
          { loading ? itemsSkeleton : itemsSeries }
        </div>
      )}
    </>
  )
}

export default ListSeries;