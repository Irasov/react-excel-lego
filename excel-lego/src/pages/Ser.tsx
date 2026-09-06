import React from "react";
import SeriaFull from "../components/SerieFull";
import LoadingBlock from "../components/SerieFull/LoadingBlock";
import {useParams, useNavigate} from "react-router-dom";
import { fetchSeries } from "../utils/fetchSeries";
import type {SeriesItem} from "../components/SeriesBlock";

const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwk_rUljFlmES_9rZ6LxWQK4Ce2mFrvNtLRxCNXU4jfKyvhQljrCC5ZSCtQe_-mWQBaCC2KJK-8kSE/pub?gid=824227161&single=true&output=tsv"; 

const Ser: React.FC = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);
  const [series, setSeries] = React.useState<SeriesItem[]>([]);
  const [loading, setLoading] = React.useState(true);

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

  const ser = series[Number(id)];
  console.log(series);
  if (loading && !ser) {
    return <LoadingBlock />;
  }

  return (
    <div className="ser">
      <div className="container">
        <SeriaFull 
          name={ser.name}
          image={ser.image}
          description={ser.description}
          items={ser.items}
        />
      </div>
    </div>
  )
}

export default Ser;