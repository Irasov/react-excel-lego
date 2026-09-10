import React from "react";
import LoadingBlock from "../components/SerFull/LoadingBlock";
import {useParams} from "react-router-dom";
import { fetchSerItem } from "../utils/fetchSerItem";
import type { SerItemType } from "../components/SerItem";
import ItemFull from "../components/ItemFull";

const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwk_rUljFlmES_9rZ6LxWQK4Ce2mFrvNtLRxCNXU4jfKyvhQljrCC5ZSCtQe_-mWQBaCC2KJK-8kSE/pub?gid=0&single=true&output=tsv"; 

const Item: React.FC = () => {
  const {id} = useParams();
  const [error, setError] = React.useState(false);
  const [items, setItems] = React.useState<SerItemType[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        const products = await fetchSerItem(URL);
        if (!cancelled) {
          setItems(products as SerItemType[]);
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

  const item = items[Number(id)];
  if (loading && !item) {
    return <LoadingBlock />;
  }

  return (
    <div className="item">
      <div className="container">
        {error ? (
          <div className="error">
            <p>Failed to load series data. Please try again later.</p>
          </div>
          ) : (
            <ItemFull {...item}/>
          )
        }
      </div>
    </div>
  )
}

export default Item;