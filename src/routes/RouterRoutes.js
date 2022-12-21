import React from "react";
import { Routes, Route } from "react-router";
import useScrollRestore from "../hooks/useScrollRestore";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import ErrorPage from "../pages/ErrorPage";

const RouterRoutes = () => {
  useScrollRestore();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product-details/:productId" element={<MovieDetails />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default RouterRoutes;
