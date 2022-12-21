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
          <a href="#">
            <Skeleton
              sx={{ bgcolor: "grey.900", borderRadius: "20px" }}
              variant="rect"
              width={"100%"}
              height={"100%"}
            />
          </a>
        </figure>
        <div className="products_details">
          <h3 className="products_title">
            <Skeleton
              sx={{ bgcolor: "grey.900", mt: "0" }}
              variant="rectangular"
              width={"80%"}
            />
          </h3>
          <h5 className="products_info">
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={"100%"}
            />
          </h5>
          <h2
            className="products_title"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "60%",
              }}
            >
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                width={"70%"}
                height={20}
              />
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                width={"70%"}
                height={20}
              />
            </div>
            <Skeleton
              sx={{ bgcolor: "grey.900" }}
              variant="rectangular"
              width={"20%"}
              height={25}
            />
          </h2>
          <Skeleton
            className={`btn products_btn`}
            sx={{ bgcolor: "grey.900", mt: ".6rem" }}
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
