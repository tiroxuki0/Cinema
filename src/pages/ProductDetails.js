import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoMdStar, IoMdCheckmark, IoMdClose } from "react-icons/io";
import { calculateDiscount, displayMoney } from "../helpers/utils";
import useDocTitle from "../hooks/useDocTitle";
import useActive from "../hooks/useActive";
import SectionsHead from "../components/common/SectionsHead";
import RelatedSlider from "../components/sliders/RelatedSlider";
import ProductSummary from "../components/product/ProductSummary";
import Services from "../components/common/Services";
import { useSelector, useDispatch } from "react-redux";
import { addItem as addItemRedux } from "../redux/cartSlice";
import { toggleForm as toggleFormRedux } from "../redux/commonSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const formUserInfo = useSelector((state) => state.common.formUserInfo);
  const productsData = useSelector((state) => state.data.products);
  const imagesData = useSelector((state) => state.data.images);
  const { active, handleActive, activeClass } = useActive(0);
  const [addClick, setAddClick] = useState(false);

  const { productId } = useParams();

  // here the 'id' received has 'string-type', so converting it to a 'Number'
  const prodId = productId;

  // showing the Product based on the received 'id'
  const product = productsData.find((item) => item.id == prodId);
  useDocTitle(
    `Product Details - ${product.title ? product.title : product.info}`
  );

  const {
    title,
    info,
    category,
    finalPrice,
    originalPrice,
    ratings,
    rateCount,
    stock,
  } = product;

  let imagesPreview = product?.heroImage
    ? [product?.heroImage, ...product?.images]
    : [...product?.images];

  const [previewImg, setPreviewImg] = useState(() => {
    const imagePath = product?.heroImage
      ? product?.heroImage
          .replaceAll("/", "%2F")
          .replace("%2F", "")
          .replaceAll(" ", "%20")
      : product.images[0]
          .replaceAll("/", "%2F")
          .replace("%2F", "")
          .replaceAll(" ", "%20");

    const imageFinal = imagesData.find((img) =>
      img.toLowerCase().includes(imagePath.toLowerCase())
    );

    return imageFinal;
  });

  // handling Add-to-cart
  const handleAddItem = () => {
    if (formUserInfo) {
      /*  */
      dispatch(addItemRedux({ uid: formUserInfo.uid, product }));
      /*  */
      setAddClick(true);

      setTimeout(() => {
        setAddClick(false);
      }, 3000);
    } else {
      dispatch(toggleFormRedux(true));
    }
  };

  // setting the very-first image on re-render
  useEffect(() => {
    setPreviewImg(() => {
      const imagePath = product?.heroImage
        ? product?.heroImage
            .replaceAll("/", "%2F")
            .replace("%2F", "")
            .replaceAll(" ", "%20")
        : product.images[0]
            .replaceAll("/", "%2F")
            .replace("%2F", "")
            .replaceAll(" ", "%20");

      const imageFinal = imagesData.find((img) =>
        img.toLowerCase().includes(imagePath.toLowerCase())
      );

      return imageFinal;
    });
    handleActive(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.images]);

  // handling Preview image
  const handlePreviewImg = (i) => {
    setPreviewImg(() => {
      /*  */
      const imagePath = imagesPreview[i]
        .replaceAll("/", "%2F")
        .replace("%2F", "")
        .replaceAll(" ", "%20");

      const imageFinal = imagesData.find((img) =>
        img.toLowerCase().includes(imagePath.toLowerCase())
      );
      /*  */
      return imageFinal;
    });
    handleActive(i);
  };

  // calculating Prices
  const discountedPrice = originalPrice - finalPrice;
  const newPrice = displayMoney(finalPrice);
  const oldPrice = displayMoney(originalPrice);
  const savedPrice = displayMoney(discountedPrice);
  const savedDiscount = calculateDiscount(discountedPrice, originalPrice);

  return (
    <>
      <section id="product_details" className="section">
        <div className="container">
          <div className="wrapper prod_details_wrapper">
            {/*=== Product Details Left-content ===*/}
            <div className="prod_details_left_col">
              <div className="prod_details_tabs">
                {imagesPreview.map((img, i) => {
                  /*  */
                  const imagePath = img
                    .replaceAll("/", "%2F")
                    .replace("%2F", "")
                    .replaceAll(" ", "%20");

                  const imageFinal = imagesData.find((img) =>
                    img.toLowerCase().includes(imagePath.toLowerCase())
                  );
                  /*  */
                  return (
                    <div
                      key={i}
                      className={`tabs_item ${activeClass(i)}`}
                      onClick={() => handlePreviewImg(i)}
                    >
                      <img src={imageFinal} alt="product-img" />
                    </div>
                  );
                })}
              </div>
              <figure className="prod_details_img">
                <img src={previewImg} alt="product-img" />
              </figure>
            </div>

            {/*=== Product Details Right-content ===*/}
            <div className="prod_details_right_col">
              <h1 className="prod_details_title">{title}</h1>
              <h4 className="prod_details_info">{info}</h4>

              <div className="prod_details_ratings">
                <span className="rating_star">
                  {[...Array(rateCount)].map((_, i) => (
                    <IoMdStar key={i} />
                  ))}
                </span>
                <span>|</span>
                <Link to="/">{ratings} Ratings</Link>
              </div>

              <div className="separator"></div>

              <div className="prod_details_price">
                <div className="price_box">
                  <h2 className="price">
                    {newPrice} &nbsp;
                    <small className="del_price">
                      <del>{oldPrice}</del>
                    </small>
                  </h2>
                  <p className="saved_price">
                    You save: {savedPrice} ({savedDiscount}%)
                  </p>
                  <span className="tax_txt">(Inclusive of all taxes)</span>
                </div>
                {stock > 0 ? (
                  <div className="badge">
                    <span>
                      <IoMdCheckmark /> In Stock
                    </span>
                  </div>
                ) : (
                  <div className="badge out_stock">
                    <span>
                      <IoMdClose /> Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="separator"></div>

              <div className="prod_details_offers">
                <h4>Offers and Discounts</h4>
                <ul>
                  <li>No Cost EMI on Credit Card</li>
                  <li>Pay Later & Avail Cashback</li>
                </ul>
              </div>

              <div className="separator"></div>

              <div className="prod_details_buy_btn">
                {stock > 0 ? (
                  <button
                    type="button"
                    className={`btn-prod_details btn ${activeClass(
                      product.id
                    )} ${addClick ? "addStyle" : ""}`}
                    onClick={handleAddItem}
                    disabled={stock > 0 ? false : true}
                  >
                    {addClick ? "Added" : "Add to cart"}
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`btn-prod_details btn ${activeClass(
                      product.id
                    )} disabled`}
                    onClick={handleAddItem}
                    disabled={stock > 0 ? false : true}
                  >
                    {"Out of stock"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductSummary {...product} />

      <section id="related_products" className="section">
        <div className="container">
          <SectionsHead heading="Related Products" />
          <RelatedSlider category={category} />
        </div>
      </section>

      <Services />
    </>
  );
};

export default ProductDetails;
