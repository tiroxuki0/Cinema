import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { displayMoney } from "../../helpers/utils";
import useActive from "../../hooks/useActive";
import { addItem as addItemRedux } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toggleForm as toggleFormRedux } from "../../redux/commonSlice";

const ProductCard = (props) => {
  const { id, poster_path, title, overview, release_date, vote_average } =
    props;

  const posterPath = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  const release = release_date.split("-")[0];
  const rate = vote_average.toFixed(1);

  const dispatch = useDispatch();
  const formUserInfo = useSelector((state) => state.common.formUserInfo);
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

  return (
    <>
      <div className="card products_card">
        <figure className="products_img">
          <Link /* to={`${path}${id}`} */>
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
        <div className="products_details">
          <h3 className="products_title">
            <Link /* to={`${path}${id}`} */>{title}</Link>
          </h3>
          <h5 className="products_info">{overview}</h5>
          <h2 className="featured_info">
            <div className="featured_rate">
              {release}
              <div className="dot"></div>
              <small>{rate}</small>
              <AiFillStar color="yellow" />
            </div>
            <div className="featured_category">Movie</div>
          </h2>
          <button
            type="button"
            className={`btn products_btn ${activeClass(id)}`}
            onClick={handleAddItem}
          >
            {active ? "Added" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
