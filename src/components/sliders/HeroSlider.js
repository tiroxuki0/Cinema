import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
import { displayMoney, createArray } from "../../helpers/utils";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";

import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";

const HeroSlider = () => {
  const [moviesData, setMoviesData] = React.useState([]);
  const [imageLoading, setImageLoading] = React.useState(true);

  React.useEffect(() => {
    const apiKey = "6991946ce8c16cbb1b593830839da3bd";
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
      .then((res) => {
        setMoviesData(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      loop={true}
      speed={400}
      spaceBetween={100}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {moviesData.length === 0 ? (
        <>
          {createArray(3, null).map((item, i) => {
            return (
              <SwiperSlide
                key={i}
                className={`wrapper hero_wrapper hero_slide-${i}`}
              >
                <div className="hero_item_txt" style={{ width: "100%" }}>
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    width={"25%"}
                    height={80}
                  />
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    width={"45%"}
                    height={80}
                  />
                  <h2
                    className="hero_price"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Skeleton
                      sx={{ bgcolor: "grey.900" }}
                      width={"75px"}
                      height={50}
                    />
                    <Skeleton
                      sx={{ bgcolor: "grey.900" }}
                      width={"75px"}
                      height={50}
                    />
                  </h2>
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    variant="rectangular"
                    width={"15%"}
                    height={50}
                  />
                </div>
                <div
                  className="hero_item_img"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </>
      ) : (
        <>
          {moviesData.map((item, i) => {
            const { original_title, poster_path, backdrop_path, id } = item;
            const backdropPath = `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdrop_path}`;

            return (
              <SwiperSlide
                key={id}
                className={`wrapper hero_wrapper hero_slide-${i}`}
              >
                <div className="child"></div>
                <div className="hero_item_txt">
                  <h3>Trending movie</h3>
                  <h1>{original_title}</h1>
                  <Link /* to={`${path}${id}`} */ className="btn">Watch</Link>
                </div>
                <div className="hero_item_img">
                  {!imageLoading && (
                    <LazyLoadImage
                      effect="blur"
                      placeholderSrc={backdropPath}
                      alt={backdropPath}
                      src={backdropPath}
                    />
                  )}
                  <img
                    style={{ display: "none" }}
                    alt={backdropPath}
                    src={backdropPath}
                    onLoad={() => setImageLoading(false)}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </>
      )}
    </Swiper>
  );
};

export default HeroSlider;
