import "./App.css";
import "./component/home/home.css";
import React, { lazy, Suspense } from "react";
import BottomTop from "./component/bottom_top/BottomTop";
import Footer from "./component/footer/Footer";
import Navbar from "./component/header/Navbar";
// import Home from "./component/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProductDetail from "./component/product/ProductDetail";
import Loader from "./component/home/Loader";
import Products from "./component/product/Products";
import ScrollToTop from "./ScrollToTop";
const Home = lazy(() => import("./component/home/Home"));
const ProductDetail = lazy(() => import("./component/product/ProductDetail"));
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Suspense fallback={<Loader />}>
                <ProductDetail />
              </Suspense>
            }
          />
          <Route path="/products" element={<Products />} />
          {/* <Route path="/products/:name" element={<Products />} /> */}
          {/* <Route path="/products/:name/:page" element={<Products />} /> */}
        </Routes>
        <BottomTop />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
