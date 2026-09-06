import Papa from "papaparse";
import type { SeriesItem } from "../components/SeriesBlock";
  
export async function fetchSeries(url: string): Promise<SeriesItem[]> {
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