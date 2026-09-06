import React from "react";
import Papa from "papaparse";
import {useParams, useNavigate} from "react-router-dom";

interface SeriesItem {
  id: string;
  name: string;
  image: string;
  description: string;
}

 const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwk_rUljFlmES_9rZ6LxWQK4Ce2mFrvNtLRxCNXU4jfKyvhQljrCC5ZSCtQe_-mWQBaCC2KJK-8kSE/pub?gid=824227161&single=true&output=tsv"; 

const Seria: React.FC = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);
  const [series, setSeries] = React.useState<SeriesItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  async function fetchData(url: string): Promise<SeriesItem[]> {
    return new Promise((resolve, reject) => {
      Papa.parse<SeriesItem>(url, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (res) => resolve(res.data),
        error: reject,
      });
    });
  }

  React.useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        const products = await fetchData(URL);
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
  const seria = series[Number(id)];
  return (
    <div className="seria">
      <div className="container">
        <h1>{seria?.name}</h1>
      </div>
    </div>
  )
}

export default Seria;