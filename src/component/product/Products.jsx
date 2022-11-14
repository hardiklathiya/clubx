import React, { useEffect, useState } from "react";
import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../reducers/productReducer";
import CategoryList from "./CategoryList";
import HomeProduct from "../home/HomeProduct";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Pagination from "react-js-pagination";

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 20000]);
  const [ratings, setRatings] = useState(0);
  const { name } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts({ category, price, ratings, currentPage }));
  }, [fetchProducts, category, price, ratings, currentPage]);
  const { loading, products, error, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );
  const handleChange = (event, newvalue) => {
    setPrice(newvalue);
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const category_list = [
    "menswear",
    "womenswear",
    "kidswear",
    "cosmetics",
    "accessories",
  ];
  return (
    <>
      {category_list.map((cat, i) => (
        <>
          {/* <Link to={`/products/${cat.name}`}> */}
          <span
            style={{ cursor: "pointer" }}
            key={cat}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </span>
          {/* </Link> */}
          <br />
        </>
      ))}
      <Box sx={{ width: 300, marginLeft: "10px" }}>
        <Slider
          value={price}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={0}
          max={20000}
        />
      </Box>

      <Rating
        name="simple-controlled"
        value={ratings}
        onChange={(event, newValue) => {
          setRatings(newValue);
        }}
      />
      <br />

      <span onClick={() => setPrice([0, 1000])} style={{ cursor: "pointer" }}>
        Under 1000
      </span>
      <br />
      <span
        onClick={() => setPrice([1000, 2000])}
        style={{ cursor: "pointer" }}
      >
        1000 - 2000
      </span>
      <br />
      <span
        onClick={() => setPrice([2000, 3000])}
        style={{ cursor: "pointer" }}
      >
        2000 - 3000
      </span>
      <br />
      <span
        onClick={() => setPrice([3000, 20000])}
        style={{ cursor: "pointer" }}
      >
        Over 3000
      </span>

      {products.map((prod) => (
        <HomeProduct product={prod} />
      ))}
      {products.length > resultPerPage && (
        <div className="paginationBox">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={Math.ceil(productCount / resultPerPage)}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </>
  );
}
