import React from "react";
import Skeleton from "@mui/material/Skeleton";

const ProductCard = (props) => {
  return (
    <>
      <div className="card products_card">
        <figure
          className="products_img"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rect"
            width={"100%"}
            height={300}
          />
        </figure>
        <div className="products_details">
          <span className="rating_star">
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={100}
            />
          </span>
          <h3 className="products_title">
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={220}
            />
          </h3>
          <h5 className="products_info">
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={250}
            />
          </h5>
          <div className="separator"></div>
          <h2
            className="products_price"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={100}
            />
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={100}
            />
          </h2>
          <Skeleton
            className={`btn products_btn`}
            sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            width={"100%"}
            height={50}
          />
        </div>
      </div>
    </>
  );
};

export default ProductCard;
