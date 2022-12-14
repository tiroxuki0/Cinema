import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { IoMdStar } from "react-icons/io";
import { Link } from "react-router-dom";
import { displayMoney } from "../../helpers/utils";
import useActive from "../../hooks/useActive";
import { addItem as addItemRedux } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toggleForm as toggleFormRedux } from "../../redux/commonSlice";

const ProductCard = (props) => {
  const { id, title, info, finalPrice, originalPrice, rateCount, path, stock } =
    props;

  const dispatch = useDispatch();
  const formUserInfo = useSelector((state) => state.common.formUserInfo);
  const imagesData = useSelector((state) => state.data.images);
  const { active, handleActive, activeClass } = useActive(false);
  const [imageLoading, setImageLoading] = React.useState(true);

  // handling Add-to-cart
  const handleAddItem = () => {
    const item = { ...props };
    if (formUserInfo) {
      /*  */
      dispatch(addItemRedux({ uid: formUserInfo.uid, product: item }));
      /*  */
      handleActive(id);

      setTimeout(() => {
        handleActive(false);
      }, 3000);
    } else {
      dispatch(toggleFormRedux(true));
    }
  };

  const newPrice = displayMoney(finalPrice);
  const oldPrice = displayMoney(originalPrice);

  /*  */
  const imagePath = props?.heroImage
    ? props?.heroImage
        .replaceAll("/", "%2F")
        .replace("%2F", "")
        .replaceAll(" ", "%20")
    : props.images[0]
        .replaceAll("/", "%2F")
        .replace("%2F", "")
        .replaceAll(" ", "%20");

  const imageFinal = imagesData.find((img) =>
    img.toLowerCase().includes(imagePath.toLowerCase())
  );
  /*  */

  return (
    <>
      <div className="card products_card">
        <figure className="products_img">
          <Link to={`${path}${id}`}>
            {imageLoading && (
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                variant="rect"
                width={"100%"}
                height={300}
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
        <div className="products_details">
          <span className="rating_star">
            {[...Array(rateCount)].map((_, i) => (
              <IoMdStar key={i} />
            ))}
          </span>
          <h3 className="products_title">
            <Link to={`${path}${id}`}>{title}</Link>
          </h3>
          <h5 className="products_info">{info}</h5>
          <div className="separator"></div>
          <h2 className="products_price">
            {newPrice} &nbsp;
            <small>
              <del>{oldPrice}</del>
            </small>
          </h2>
          {stock > 0 ? (
            <button
              type="button"
              className={`btn products_btn ${activeClass(id)}`}
              onClick={handleAddItem}
            >
              {active ? "Added" : "Add to cart"}
            </button>
          ) : (
            <button
              type="button"
              className={`btn products_btn ${activeClass(id)}`}
              onClick={handleAddItem}
              disabled
            >
              {"Out of stock"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
