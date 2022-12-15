import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper";
import { displayMoney, createArray } from "../../helpers/utils";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "swiper/scss";
import "swiper/scss/autoplay";
import "swiper/scss/pagination";

const HeroSlider = () => {
  const pendingProducts = useSelector((state) => state.data.pendingProducts);
  const pendingImages = useSelector((state) => state.data.pendingImages);
  const productsData = useSelector((state) => state.data.products);
  const imagesData = useSelector((state) => state.data.images);
  const [imageLoading, setImageLoading] = React.useState(true);

  const heroProducts = productsData.filter(
    (item) => item.tag === "hero-product"
  );

  return (
    <Swiper
      modules={[Pagination, A11y, Autoplay]}
      loop={true}
      speed={400}
      spaceBetween={100}
      slidesPerView={1}
      pagination={{ clickable: true }}
      /* autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }} */
    >
      {pendingProducts && pendingImages ? (
        <>
          {createArray(3, null).map((item, i) => {
            return (
              <SwiperSlide
                key={i}
                className={`wrapper hero_wrapper hero_slide-${i}`}
              >
                <div className="hero_item_txt" style={{ width: "100%" }}>
                  <h3>
                    <Skeleton
                      sx={{ bgcolor: "grey.900" }}
                      width={"20%"}
                      height={50}
                    />
                  </h3>
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    width={"100%"}
                    height={80}
                  />
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    width={"95%"}
                    height={80}
                  />
                  <h2 className="hero_price">
                    <Skeleton
                      sx={{ bgcolor: "grey.900" }}
                      width={"30%"}
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
                <figure
                  className="hero_item_img"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    variant="rect"
                    width={500}
                    height={400}
                  />
                </figure>
              </SwiperSlide>
            );
          })}
        </>
      ) : (
        <>
          {heroProducts.map((item, i) => {
            const { id, title, tagline, finalPrice, originalPrice, path } =
              item;
            const newPrice = displayMoney(finalPrice);
            const oldPrice = displayMoney(originalPrice);

            /*  */
            const imagePath = item?.heroImage
              ? item?.heroImage
                  .replaceAll("/", "%2F")
                  .replace("%2F", "")
                  .replaceAll(" ", "%20")
              : item.images[0]
                  .replaceAll("/", "%2F")
                  .replace("%2F", "")
                  .replaceAll(" ", "%20");

            const imageFinal = imagesData.find((img) =>
              img.toLowerCase().includes(imagePath.toLowerCase())
            );

            /*  */

            return (
              <SwiperSlide
                key={id}
                className={`wrapper hero_wrapper hero_slide-${i}`}
              >
                <div className="hero_item_txt">
                  <h3>{title}</h3>
                  <h1>{tagline}</h1>
                  <h2 className="hero_price">
                    {newPrice} &nbsp;
                    <small>
                      <del>{oldPrice}</del>
                    </small>
                  </h2>
                  <Link to={`${path}${id}`} className="btn">
                    Shop Now
                  </Link>
                </div>
                <figure className="hero_item_img">
                  {imageLoading && (
                    <Skeleton
                      sx={{ bgcolor: "grey.900" }}
                      variant="rect"
                      width={500}
                      height={400}
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
                </figure>
              </SwiperSlide>
            );
          })}
        </>
      )}
    </Swiper>
  );
};

export default HeroSlider;
