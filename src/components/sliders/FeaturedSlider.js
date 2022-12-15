import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  EffectCoverflow,
  Pagination,
  A11y,
  Autoplay,
} from "swiper";
import { displayMoney, createArray } from "../../helpers/utils";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import "swiper/scss/navigation";

const FeaturedSlider = () => {
  const pendingProducts = useSelector((state) => state.data.pendingProducts);
  const pendingImages = useSelector((state) => state.data.pendingImages);
  const productsData = useSelector((state) => state.data.products);
  const imagesData = useSelector((state) => state.data.images);
  const [imageLoading, setImageLoading] = React.useState(true);

  const featuredProducts = productsData.filter(
    (item) => item.tag === "featured-product"
  );

  return (
    <Swiper
      modules={[Navigation, EffectCoverflow, Pagination, A11y, Autoplay]}
      loop={true}
      speed={400}
      navigation={true}
      spaceBetween={100}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
      effect={"coverflow"}
      centeredSlides={true}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 70,
        modifier: 3,
        slideShadows: false,
      }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
          spaceBetween: 200,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 250,
        },
      }}
      className="featured_swiper"
    >
      <>
        {pendingProducts && pendingImages
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
          : featuredProducts.map((item, index) => {
              const { id, images, title, finalPrice, originalPrice, path } =
                item;
              const newPrice = displayMoney(finalPrice);
              const oldPrice = displayMoney(originalPrice);

              /*  */
              const imagePath = images[0]
                .slice(1)
                .split("/")
                .reduce((result, cur) => result + "%2F" + cur, "")
                .replace("%2F", "");

              const imageFinal = imagesData.find((img) =>
                img.toLowerCase().includes(imagePath.toLowerCase())
              );
              /*  */

              return (
                <SwiperSlide key={id} className="featured_slides">
                  <div className="featured_title">{title}</div>
                  <figure className="featured_img">
                    <Link to={`${path}${id}`}>
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
                          placeholderSrc={imageFinal}
                          alt={imageFinal}
                          src={imageFinal}
                        />
                      )}
                      <img
                        style={{ display: "none" }}
                        alt={imageFinal}
                        src={imageFinal}
                        onLoad={() => setImageLoading(false)}
                      />
                    </Link>
                  </figure>
                  <h2 className="products_price">
                    {newPrice} &nbsp;
                    <small>
                      <del>{oldPrice}</del>
                    </small>
                  </h2>
                </SwiperSlide>
              );
            })}
      </>
    </Swiper>
  );
};

export default FeaturedSlider;
