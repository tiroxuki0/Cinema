import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import useActive from "../../hooks/useActive";
import ProductCardLoading from "./ProductCardLoading";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { createArray } from "../../helpers/utils";
import Skeleton from "@mui/material/Skeleton";

const TopProducts = () => {
  const pendingProducts = useSelector((state) => state.data.pendingProducts);
  const pendingImages = useSelector((state) => state.data.pendingImages);
  const productsData = useSelector((state) => state.data.products);
  const [products, setProducts] = useState(productsData);
  const { activeClass, handleActive } = useActive(0);

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  // making a unique set of product's category
  const productsCategory = [
    "All",
    ...new Set(productsData.map((item) => item.category)),
  ];

  // handling product's filtering
  const handleProducts = (category, i) => {
    if (category === "All") {
      setProducts(productsData);
      handleActive(i);
      return;
    }

    const filteredProducts = productsData.filter(
      (item) => item.category === category
    );
    setProducts(filteredProducts);
    handleActive(i);
  };

  return (
    <>
      {pendingProducts && pendingImages ? (
        <>
          <div className="products_filter_tabs">
            <ul className="tabs">
              {createArray(5, null).map((item, i) => (
                <li key={i}>
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    width={100}
                    height={50}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="wrapper products_wrapper">
            {createArray(7, null).map((item, i) => (
              <ProductCardLoading key={i} />
            ))}
            <div className="card products_card browse_card">
              <Link>
                Browse All <br /> Products <BsArrowRight />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="products_filter_tabs">
            <ul className="tabs">
              {productsCategory.map((item, i) => (
                <li
                  key={i}
                  className={`tabs_item ${activeClass(i)}`}
                  onClick={() => handleProducts(item, i)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="wrapper products_wrapper">
            {products.slice(0, 7).map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
            <div className="card products_card browse_card">
              <Link to="/all-products">
                Browse All <br /> Products <BsArrowRight />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TopProducts;
