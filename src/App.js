import { useEffect } from "react";
import Header from "./components/common/Header";
import RouterRoutes from "./routes/RouterRoutes";
import Footer from "./components/common/Footer";
import BackTop from "./components/common/BackTop";
import {
  setProducts,
  setImages,
  getProductsStart,
  getProductsEnd,
  getImagesStart,
  getImagesEnd,
  setReviews,
  setOrders,
  setUsers,
} from "./redux/dataSlice";
import {
  setCartItems,
  getCartItemsStart,
  getCartItemsEnd,
} from "./redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

const App = () => {
  const formUserInfo = useSelector((state) => state.common.formUserInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCartItemsData = async () => {
    dispatch(getCartItemsStart());
    try {
      dispatch(getCartItemsEnd());
    } catch (err) {
      console.log(err);
      dispatch(getCartItemsEnd());
    }
  };

  useEffect(() => {
    getCartItemsData();
  }, [formUserInfo]);

  return (
    <>
      <>
        <Header />
        <RouterRoutes />
        <Footer />
        <BackTop />
        <ToastContainer limit={3} />
      </>
    </>
  );
};

export default App;
