import React from "react";
import { Link, NavLink } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMall";
export default function HomeProduct({ product }) {
  const options = {
    count: 5,
    // onChange: { ratingChanged },
    size: window.innerWidth < 600 ? 15 : 25,
    isHalf: true,
    edit: false,
    color: "#ddd",
    activeColor: "#ffd700",
    value: 4,
  };
  return (
    <>
      <div className="product_card">
        <Link to={product._id}>
          <figure className="featured_product_zoom">
            <img
              src={product.images}
              alt={product.name}
              className="featured_product_img"
            />
          </figure>
        </Link>
        <Link to={product._id} className="featured_product_detail">
          <span className="featured_product_name">{product.name}</span>
          <div className="featured_rating">
            <ReactStars {...options} classNames="featured_product_rating" />
            <span>{product.numOfReviews}</span>
          </div>
          <span className="featured_product_price">₹{product.price}</span>
        </Link>

        <ul className="featured_overlay_ul">
          <li className="featured_overlay ani1">
            <a href="#">
              <VisibilityIcon className="featured_icon" />
            </a>
          </li>
          <li className="featured_overlay ani2">
            <a href="#">
              <FavoriteBorderIcon className="featured_icon" />
            </a>
          </li>
          <li className="featured_overlay ani3">
            <a href="#">
              <LocalMallIcon className="featured_icon" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
