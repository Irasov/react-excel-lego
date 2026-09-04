import React from "react";
import Papa from "papaparse";
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import styles from "./SeriesBlock.module.scss";
import CardSeries from "../CardSeries";

const SeriesBlock: React.FC = () => {
  const [error, setError] = React.useState(false);
  const [series, setSeries] = React.useState<any[]>([]);
  const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTwk_rUljFlmES_9rZ6LxWQK4Ce2mFrvNtLRxCNXU4jfKyvhQljrCC5ZSCtQe_-mWQBaCC2KJK-8kSE/pub?gid=824227161&single=true&output=tsv"; 

  async function fetchData(url: string) {
      return new Promise((resolve, reject) => {
        Papa.parse(url, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: (res) => resolve(res.data),
          error: reject,
        });
      });
    }

  async function main(url:string) {
    const products = await fetchData(url);
    return products;
  }

  React.useEffect(()=>{
   console.log("DDDDD",main(URL).then((data) => {
      setSeries(data as any[]);
    }));
  },[]);

  const slides = series.map((item) => (
    <SwiperSlide key={item.id}>
      <CardSeries
        id={item.id}
        name={item.name}
        image={item.image}
        description={item.description}
      />
    </SwiperSlide>
  ))

  return (
    <div className="series">
      <div className="container">
        <div className={styles.body}>
            <div className={styles.swiper__container}>
              <Swiper
                className="coffee-slider"
                modules={[Pagination, Navigation]}
                direction = 'horizontal'
                slidesPerView = {3}
                loop = {true} 
                navigation= {{
                  nextEl: '.swiper__next',
                  prevEl: '.swiper__prev',
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  // when window width is >= 640px
                  730: {
                    slidesPerView: 2,
                  },
                  // when window width is >= 768px
                  880: {
                    slidesPerView: 3,
                  },

                }}
              >
              { slides}
                {/* {error ? 'Unable to get coffee...' : slides} */}
                
              </Swiper>
              <div className={styles.control}>
                <div className="swiper__next">NEXT
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SeriesBlock; 