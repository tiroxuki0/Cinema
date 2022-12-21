import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";
import ProductCard from "../movie/MovieCard";
import { useSelector } from "react-redux";

import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";

const RelatedSlider = (props) => {
  const { category } = props;
  const productsData = useSelector((state) => state.data.products);

  const relatedProduct = productsData.filter(
    (item) => item.category === category
  );

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={"auto"}
      pagination={{ clickable: true }}
      navigation={true}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 4,
        },
      }}
      className="related_swiper"
    >
      {relatedProduct.map((item) => (
        <SwiperSlide key={item.id}>
          <ProductCard {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RelatedSlider;
