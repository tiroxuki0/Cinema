import React from "react";
import { TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom";
import QuantityBox from "../common/QuantityBox";
import { useDispatch, useSelector } from "react-redux";
import { removeItem as removeItemRedux } from "../../redux/cartSlice";

const CartItem = (props) => {
  const { id, images, title, info, finalPrice, originalPrice, quantity, path } =
    props;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const formUserInfo = useSelector((state) => state.common.formUserInfo);

  return (
    <>
      <div className="cart_item">
        <figure className="cart_item_img">
          <Link to={`${path}${id}`}>
            <img src={path} alt="product-img" />
          </Link>
        </figure>
        <div className="cart_item_info">
          <div className="cart_item_head">
            <h4 className="cart_item_title">
              <Link to={`/product-details/${id}`}>
                {title} {info}
              </Link>
            </h4>
            <div className="cart_item_del">
              <span
                onClick={() => {
                  /*  */
                  const update = [
                    ...cartItems.filter((item) => item.id !== id),
                  ];
                  dispatch(removeItemRedux(id));
                  /*  */
                }}
              >
                <TbTrash />
              </span>
              <div className="tooltip">Remove Item</div>
            </div>
          </div>

          <h2 className="cart_item_price">
            newPrice
            <small>
              <del>oldPrice</del>
            </small>
          </h2>

          <QuantityBox itemId={id} itemQuantity={quantity} />
        </div>
      </div>
    </>
  );
};

export default CartItem;
