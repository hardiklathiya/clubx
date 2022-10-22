import "./App.css";
import BottomTop from "./component/bottom_top/BottomTop";
import Footer from "./component/footer/Footer";
import Navbar from "./component/header/Navbar";
import Home from "./component/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./component/product/ProductDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <BottomTop />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
