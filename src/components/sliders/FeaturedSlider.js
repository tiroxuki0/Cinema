import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Autoplay } from "swiper";
import { createArray } from "../../helpers/utils";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { AiFillStar } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import "swiper/scss/navigation";

const FeaturedSlider = () => {
  const [imageLoading, setImageLoading] = React.useState(true);
  const [moviesData, setMoviesData] = React.useState([]);

  React.useEffect(() => {
    const apiKey = "6991946ce8c16cbb1b593830839da3bd";
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => {
        setMoviesData(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Swiper
      modules={[Navigation, A11y /* , Autoplay */]}
      loop={true}
      speed={400}
      navigation={true}
      spaceBetween={25}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        480: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 5,
        },
        1280: {
          slidesPerView: 6,
        },
      }}
      className="featured_swiper"
    >
      <>
        {moviesData.length === 0
          ? createArray(7, null).map((item, i) => {
              return (
                <SwiperSlide key={i} className="featured_slides">
                  <div
                    className="featured_title"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Skeleton
                      sx={{ bgcolor: "grey.900" }}
                      width={200}
                      height={50}
                    />
                  </div>
                  <figure className="featured_img">
                    <Skeleton
                      sx={{ bgcolor: "grey.900" }}
                      variant="rect"
                      width={"100%"}
                      height={200}
                    />
                  </figure>
                  <h2
                    className="products_price"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Skeleton
                      sx={{ bgcolor: "grey.900" }}
                      width={100}
                      height={50}
                    />
                    <Skeleton
                      sx={{ bgcolor: "grey.900" }}
                      width={100}
                      height={50}
                    />
                  </h2>
                </SwiperSlide>
              );
            })
          : moviesData.map((item, index) => {
              const { vote_average, release_date, title, poster_path, id } =
                item;
              const posterPath = `https://image.tmdb.org/t/p/w500/${poster_path}`;
              const release = release_date.split("-")[0];
              const rate = vote_average.toFixed(1);

              return (
                <SwiperSlide key={id} className="featured_slides">
                  <figure className="featured_img">
                    <Link /* to={`${path}${id}`} */>
                      {imageLoading && (
                        <Skeleton
                          sx={{ bgcolor: "grey.900" }}
                          variant="rect"
                          width={"100%"}
                          height={200}
                        />
                      )}
                      {!imageLoading && (
                        <LazyLoadImage
                          effect="blur"
                          placeholderSrc={posterPath}
                          alt={posterPath}
                          src={posterPath}
                        />
                      )}
                      <img
                        style={{ display: "none" }}
                        alt={posterPath}
                        src={posterPath}
                        onLoad={() => setImageLoading(false)}
                      />
                    </Link>
                  </figure>
                  <div className="featured_title">{title}</div>
                  <h2 className="featured_info">
                    <div className="featured_rate">
                      {release}
                      <div className="dot"></div>
                      {rate}
                      <AiFillStar color="yellow" style={{ width: "12px" }} />
                    </div>
                    <div className="featured_category">Movie</div>
                  </h2>
                </SwiperSlide>
              );
            })}
      </>
    </Swiper>
  );
};

export default FeaturedSlider;
