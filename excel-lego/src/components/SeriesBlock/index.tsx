import React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import styles from "./SeriesBlock.module.scss";
import CardSeries from "../CardSeries";
import CardSeriesSkeleton from "../CardSeries/CardSeriesSkeleton";
import { fetchSeries } from "../../utils/fetchSeries";

export interface SeriesItem {
  id: string;
  name: string;
  image: string;
  description: string;
  items: string;
}

const SeriesBlock: React.FC = () => {
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

  const slidesSkeleton = Array.from({ length: 3 }, (_, index) => (
    <SwiperSlide key={index}>
      <CardSeriesSkeleton />
    </SwiperSlide>
  ))

  return (
    <div className="series">
      <div className="container">
        <div className={styles.body}>
            <h2 className={styles.title}>
              Modular Series
            </h2>
            {error ? (
              <div className={styles.error}>
                <p>Failed to load series data. Please try again later.</p>
              </div>
              ) : (
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
                  {loading ? slidesSkeleton : slides }
                    
                  </Swiper>
                  <div className={styles.control}>
                  <div className="swiper__prev">
                      <svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="6 14 46 32">
                        <polygon points="30,30 46,18 46,25 58,25 58,35 46,35 46,42" fill="#e07a5f"/>
                      </svg>
                    </div>
                    <div className="swiper__next">
                      <svg className={styles.arrow} xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="6 14 46 32">
                        <polygon points="30,30 14,18 14,25 2,25 2,35 14,35 14,42" fill="#e07a5f"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )
            }
        </div>
      </div>
    </div>
  );
}

export default SeriesBlock; 