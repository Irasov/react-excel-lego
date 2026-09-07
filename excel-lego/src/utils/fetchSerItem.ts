import Papa from "papaparse";
import type {SerItemType} from "../components/SerItem";
  
export async function fetchSerItem(url: string): Promise<SerItemType[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<SerItemType>(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (res) => resolve(res.data),
      error: reject,
    });
  });
}