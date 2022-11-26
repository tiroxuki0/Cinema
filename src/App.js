import { useEffect } from "react";
import Header from "./components/common/Header";
import RouterRoutes from "./routes/RouterRoutes";
import Footer from "./components/common/Footer";
import BackTop from "./components/common/BackTop";
import { onValue, ref, get, child } from "firebase/database";
import { storageListAll, db } from "./firebase/config";
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

  const getImageProducts = async () => {
    dispatch(getImagesStart());
    try {
      const productsImage = await storageListAll("images/products/");
      dispatch(setImages(productsImage));
      dispatch(getImagesEnd());
    } catch (err) {
      console.log(err);
      dispatch(getImagesEnd());
    }
  };

  const getProductsData = async () => {
    dispatch(getProductsStart());
    try {
      const productsDataRef = ref(db, "productsData");
      onValue(productsDataRef, (snapshot) => {
        console.log("products change");
        navigate("/");
        getImageProducts();
        const data = snapshot.val();
        const products = Object.keys(data).map((key) => {
          return { ...data[key], idDB: key };
        });
        dispatch(setProducts(products));
        dispatch(getProductsEnd());
      });
    } catch (err) {
      console.log(err);
      dispatch(getProductsEnd());
    }
  };

  const getReviewsData = () => {
    const reviewsDataRef = ref(db, "reviewsData");
    onValue(reviewsDataRef, (snapshot) => {
      console.log("review change");
      const data = snapshot.val();
      // console.log("reviews", JSON.stringify(data));
      const reviews = data ? Object.keys(data).map((key) => data[key]) : [];
      dispatch(setReviews(reviews));
    });
  };

  const getUsersData = () => {
    const usersDataRef = ref(db, "usersData");
    onValue(usersDataRef, (snapshot) => {
      console.log("user change");
      const data = snapshot.val();
      // console.log("users", JSON.stringify(data));
      const users = data
        ? Object.keys(data).map((key) => {
            const { email, uid } = data[key];
            return { email, uid, id: key };
          })
        : [];
      dispatch(setUsers(users));
    });
  };

  const getOrdersData = () => {
    const ordersDataRef = ref(db, "ordersData");
    onValue(ordersDataRef, (snapshot) => {
      console.log("order change");
      const data = snapshot.val();
      // console.log("orders", JSON.stringify(data));
      dispatch(setOrders(data ? data : {}));
    });
  };
  /*  */
  const getSubsData = () => {
    const subsDataRef = ref(db, "subscribersData");
    onValue(subsDataRef, (snapshot) => {
      console.log("sub change");
      const data = snapshot.val();
    });
  };
  /*  */
  const getCartItemsData = async () => {
    dispatch(getCartItemsStart());
    try {
      const dbRef = await ref(db);
      get(child(dbRef, `cartsData/${formUserInfo.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            dispatch(setCartItems([...data].filter((e) => e !== undefined)));
            dispatch(getCartItemsEnd());
          } else {
            console.log("No cart data available");
          }
        })
        .catch((error) => {
          console.error(error);
          dispatch(getCartItemsEnd());
        });
    } catch (err) {
      console.log(err);
      dispatch(getCartItemsEnd());
    }
  };

  useEffect(() => {
    getReviewsData();
    getUsersData();
    getOrdersData();
    getSubsData();
    getProductsData();
  }, []);

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
