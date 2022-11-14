import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetail } from "../../reducers/productDetailReducer";
import "./productdetail.css";
import Loader from "../home/Loader";
import img from "../../images/return_product.jpg";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReactImageMagnify from "react-image-magnify";

import Rating from "@mui/material/Rating";
import ReactStars from "react-rating-stars-component";
import offer1 from "../../images/offer1.webp";
import offer2 from "../../images/offer2.webp";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SyncIcon from "@mui/icons-material/Sync";
import axios from "axios";
import location from "../../images/location.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MetaData from "../MetaData";
import TransparentOverlap from "../home/TransparentOverlap";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StarIcon from "@mui/icons-material/Star";
import ProductDelivery from "../home/ProductDelivery";
import AddIcon from "@mui/icons-material/Add";
import MinimizeIcon from "@mui/icons-material/Minimize";
import ErrorIcon from "@mui/icons-material/Error";
import FlashOnRoundedIcon from "@mui/icons-material/FlashOnRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Review from "./Review";
import CategoryList from "./CategoryList";
import Close from "@mui/icons-material/Close";
import { fetchCategoryProducts } from "../../reducers/ProductCategoryReducer";

// * react function starts

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetail
  );
  const [prodNameExpand, setProdNameExpand] = useState(false);
  const [priceInfo, setPriceInfo] = useState(false);
  const [pincode, setPincode] = useState("");
  const [Error, setError] = useState("");
  const [city, setCity] = useState("");
  const [isDescExpand, setIsDescExpand] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const [productImage, setProductImage] = useState(null);
  const [isRatingExpand, setIsRatingExpand] = useState(false);
  const [category, setCategory] = useState("");

  let sizeSelection;
  product.map((item) => {
    return (sizeSelection = item.sizes[0].size);
  });
  const [sizeEffect, setsizeEffect] = useState(sizeSelection);

  const inputHandler = (e) => {
    setPincode(e.target.value.replace(/\D/g, ""));
    if (pincode.length > 0 && !/^[0-9]+$/.test(pincode)) {
      setError("Please Enter a valid Number");
    } else {
      setError(null);
    }
  };
  const locationFinder = async () => {
    let location = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );
    if (location.data[0].PostOffice !== null) {
      location.data[0].PostOffice.map((item, i) => {
        if (i === 0) {
          setCity(item.District);
          setPincode(item.Pincode);
          setError(null);
        }
      });
    } else if (location.data[0].PostOffice === null) {
      setError("*Please Enter a valid Pincode number");
      setCity(null);
      setPincode(pincode);
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    locationFinder();
  };

  useEffect(() => {
    if (pincode.length === 0) {
      setError(null);
    }
    dispatch(fetchProductDetail(id));
    dispatch(fetchCategoryProducts(category));
  }, [dispatch, id, pincode, category]);

  console.log(category);
  const productRating = product.map((prod) => prod.ratings);

  const toggleInfo = () => {
    setPriceInfo(!priceInfo);
  };

  let prodImg;

  product.map((item) => {
    return (prodImg = item.images[0].url);
  });
  let imgLength;
  product.map((item) => {
    return (imgLength = item.images.length);
  });

  useEffect(() => {
    setProductImage(prodImg);
  }, [prodImg]);

  let sizeLength;
  product.map((item) => {
    return (sizeLength = item.sizes.length);
  });

  let lengthOfDesc;
  product.map((item) => {
    return (lengthOfDesc = item.description.length);
  });

  const imgRef = useRef([]);
  const hoverHandler = (image, i) => {
    setProductImage(image);
    imgRef.current[i].classList.add("activeImg");
    for (var j = 0; j < imgLength; j++) {
      if (i !== j) {
        imgRef.current[j].classList.remove("activeImg");
      }
    }
  };
  imgRef.current = [];
  const imgRefs = (el) => {
    if (el && !imgRef.current.includes(el)) {
      imgRef.current.push(el);
    }
  };

  let ratingLength = 0;
  product.map((item) => {
    return (ratingLength = item.reviews.filter(function (review) {
      return review.rating;
    }));
  });
  let reviewLength = 0;
  product.map((item) => {
    return (reviewLength = item.reviews.filter(function (review) {
      return review.comment;
    }));
  });

  let ratingOneStar = 0,
    ratingTwoStar = 0,
    ratingThreeStar = 0,
    ratingFourStar = 0,
    ratingFiveStar = 0;
  product.map((item) => {
    return item.reviews.map((review) => {
      if (review.rating === 1) {
        ratingOneStar++;
      } else if (review.rating === 2) {
        ratingTwoStar++;
      }
      if (review.rating === 3) {
        ratingThreeStar++;
      }
      if (review.rating === 4) {
        ratingFourStar++;
      }
      if (review.rating === 5) {
        ratingFiveStar++;
      }
    });
  });
  let ratingRatioOneStar = 0,
    ratingRatioTwoStar = 0,
    ratingRatioThreeStar = 0,
    ratingRatioFourStar = 0,
    ratingRatioFiveStar = 0;
  let totalRating;
  product.map((item) => {
    return (totalRating = item.reviews.length);
  });

  ratingRatioOneStar = Math.floor((ratingOneStar / totalRating) * 100);
  ratingRatioTwoStar = Math.floor((ratingTwoStar / totalRating) * 100);
  ratingRatioThreeStar = Math.floor((ratingThreeStar / totalRating) * 100);
  ratingRatioFourStar = Math.floor((ratingFourStar / totalRating) * 100);
  ratingRatioFiveStar = Math.floor((ratingFiveStar / totalRating) * 100);

  const review = [
    {
      star: 1,
      ratingRatio: ratingRatioOneStar,
    },
    {
      star: 2,
      ratingRatio: ratingRatioTwoStar,
    },
    {
      star: 3,
      ratingRatio: ratingRatioThreeStar,
    },
    {
      star: 4,
      ratingRatio: ratingRatioFourStar,
    },
    {
      star: 5,
      ratingRatio: ratingRatioFiveStar,
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {product.map((item) => (
            <MetaData title={`${item.name}`} key={item._id} />
          ))}
          <section className="product_detail_container">
            <article className="product_detail_nav">
              <h1>ClubX Fashion</h1>

              {CategoryList.map((category, i) => (
                <>
                  <Link
                    to={`../products/${category.name}`}
                    className="cat_list"
                    key={i}
                    onClick={() => setCategory(category.name)}
                  >
                    <img src={category.img} alt="" />
                    <span>{category.name}</span>
                  </Link>
                </>
              ))}
              <img src={img} alt="" />
            </article>
            <div className="product_details_div">
              <article className="product_details_img_article">
                <div className="product_details_img_top_div">
                  <div className="product_details_img_top_left_div">
                    {product.map((prod) =>
                      prod.images.map((img, i) => (
                        <img
                          className={
                            i === 0 ? "img_small activeImg" : "img_small"
                          }
                          onMouseOver={() => hoverHandler(img.url, i)}
                          src={img.url}
                          width="60px"
                          height="70px"
                          ref={imgRefs}
                        />
                      ))
                    )}
                  </div>
                  <div className="product_details_img_top_right_div">
                    {product.map((prod) => (
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: prod.name,
                            width: 400,
                            height: 480,
                            src: productImage,
                          },
                          largeImage: {
                            src: productImage,
                            width: 1500,
                            height: 2500,
                          },
                          enlargedImageContainerDimensions: {
                            width: "180%",
                            height: "100%",
                          },
                          shouldUsePositiveSpaceLens: true,

                          fadeDurationInMs: 300,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="product_details_img_bottom_div">
                  <button className="add_cart_btn">
                    <ShoppingCartRoundedIcon style={{ fontSize: "20px" }} /> add
                    to cart
                  </button>
                  <button className="buy_now_btn">
                    <FlashOnRoundedIcon style={{ fontSize: "20px" }} />
                    buy now
                  </button>
                </div>
              </article>

              {product.map((prod) => (
                <>
                  <article className="product_detail_desc_article">
                    {/* <div key={prod._id}> */}
                    <article className="product_detail_page_link">
                      <Link to="/">Home</Link>
                      <NavigateNextIcon className="navigate_right_icon" />
                      {product.map((prod) => (
                        <Link to="/" key={prod._id}>
                          {prod.category}
                        </Link>
                      ))}
                      <NavigateNextIcon className="navigate_right_icon" />

                      {product.map((prod) => (
                        <Link key={prod._id}>
                          <span
                            onMouseOver={() => {
                              setProdNameExpand(true);
                            }}
                            onMouseLeave={() => setProdNameExpand(false)}
                          >
                            {prodNameExpand
                              ? prod.name
                              : prod.name.slice(0, 25) + "..."}
                          </span>
                        </Link>
                      ))}
                    </article>
                    <span className="product_detail_brand_name">
                      {prod.brand}
                    </span>
                    <h3 className="product_detail_prod_name">{prod.name}</h3>
                    <article className="product_detail_price_section">
                      <h2>
                        ₹{prod.price}
                        {/* .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} */}
                      </h2>
                      <h4>
                        ₹{prod.mrp}
                        {/* .toString()
                      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} */}
                      </h4>
                      <span>{prod.discount}% off</span>
                      <InfoOutlinedIcon
                        onClick={toggleInfo}
                        className="product_detail_info_price"
                      />
                      {priceInfo && (
                        <>
                          <div className="product_detail_price_info_modal">
                            <h4>Price details</h4>
                            <article className="product_detail_retail_price_info">
                              <h5>Maximum Retail Price</h5>
                              <span>
                                <> ₹{prod.mrp}.00 </>
                              </span>
                            </article>
                            <article className="product_detail_selling_price_info">
                              <h5>Selling Price</h5>
                              <span> ₹{prod.price}.00</span>
                            </article>
                            <h5>
                              Overall You save ₹{prod.mrp - prod.price} (
                              {prod.discount}%) on this product
                            </h5>
                          </div>
                        </>
                      )}
                    </article>
                    <TransparentOverlap
                      priceInfo={priceInfo}
                      toggle={toggleInfo}
                    />
                    <div className="product_detail_rating">
                      <div
                        style={{ cursor: "pointer" }}
                        onMouseOver={() => setIsRatingExpand(true)}
                        onMouseLeave={() => setIsRatingExpand(false)}
                      >
                        <Rating
                          name="half-rating-read"
                          value={prod.ratings}
                          precision={0.5}
                          readOnly
                          className="prod_rating"
                        />
                        {isRatingExpand && (
                          <>
                            <div
                              className="customer_reviews_analysis_onhover"
                              onMouseOver={() => setIsRatingExpand(true)}
                              onMouseLeave={() => setIsRatingExpand(false)}
                            >
                              <article>
                                {product.map((prod) => (
                                  <Rating
                                    key={prod._id}
                                    name="half-rating-read"
                                    value={prod.ratings}
                                    precision={0.5}
                                    readOnly
                                    className="customer_ratings"
                                  />
                                ))}
                                {product.map((prod) => (
                                  <span key={prod._id}>
                                    <strong>
                                      {" "}
                                      {prod.ratings.toFixed(1)} out of 5{" "}
                                    </strong>
                                  </span>
                                ))}
                              </article>
                              <h6>{ratingLength.length} Global Ratings</h6>

                              {totalRating > 0 ? (
                                <>
                                  {review.map((review) => (
                                    <>
                                      <div className="rating_chart">
                                        <div className="rating_chart_1">
                                          {review.star} star
                                        </div>
                                        <div className="rating_chart_2">
                                          <span
                                            style={{
                                              width: `${review.ratingRatio}%`,
                                            }}
                                          ></span>
                                        </div>
                                        <div className="rating_chart_3">
                                          {review.ratingRatio}%
                                        </div>
                                      </div>
                                    </>
                                  ))}
                                </>
                              ) : (
                                <h2>No Reviews Yet</h2>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                      <span>
                        ({ratingLength.length} ratings and {reviewLength.length}{" "}
                        reviews)
                      </span>
                    </div>
                    <div className="offer_container">
                      <h5>Available offers</h5>
                      <ul>
                        <li>
                          <img src={offer1} alt="Available offers" />
                          <span>
                            <strong>Bank Offer</strong> 5% Cashback on Flipkart
                            Axis Bank Card
                          </span>
                        </li>
                        <li>
                          <img src={offer1} alt="Available offers" />
                          <span>
                            <strong>Partner Offer</strong> Sign up for Flipkart
                            Pay Later and get Flipkart Gift Card worth upto
                            ₹1000*
                          </span>
                        </li>
                        <li>
                          <img src={offer2} alt="Available offers" />
                          <span>
                            No Cost EMI on Bajaj Finserv EMI Card on cart value
                            above ₹2,999
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="location_service_container">
                      <article className="location_container">
                        <div className="location_top">
                          <img src={location} alt="" />

                          <span>Deliver to</span>
                        </div>
                        <div className="location_bottom">
                          {city === "" ? (
                            <>
                              <form onSubmit={submitForm}>
                                <input
                                  type="tel"
                                  maxLength={6}
                                  onChange={inputHandler}
                                  name="pincode"
                                  value={pincode}
                                  placeholder="Enter Delivery Pincode"
                                />
                                <button
                                  disabled={pincode.length > 5 ? false : true}
                                >
                                  check
                                </button>
                              </form>
                            </>
                          ) : (
                            <>
                              {Error !== null && Error.length < 1 ? (
                                ""
                              ) : (
                                <>
                                  {city !== null && city.length > 0 ? (
                                    <div className="location_bottom">
                                      <div className="result_location_container">
                                        <h6>
                                          {city} - {pincode}
                                        </h6>
                                        {prod.stock > 0 ? (
                                          <span className="available_stock">
                                            <CheckCircleIcon
                                              style={{
                                                fontSize: "12px",
                                              }}
                                            />
                                            Available
                                          </span>
                                        ) : (
                                          <span className="not_available_stock">
                                            <ErrorIcon
                                              style={{
                                                fontSize: "12px",
                                              }}
                                            />
                                            Not Available
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <div className="location_bottom">
                                        <form onSubmit={submitForm}>
                                          <input
                                            type="tel"
                                            maxLength={6}
                                            onChange={inputHandler}
                                            name="pincode"
                                            value={pincode}
                                          />
                                          <button>check</button>
                                        </form>
                                        <span className="error_msg">
                                          {Error}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </article>
                      <article>
                        <div className="service_container">
                          <h5>Services</h5>
                          <ul>
                            <li>
                              <SyncIcon className="refresh_icon" />
                              <span>10 Days Return Policy</span>
                            </li>
                            <li>
                              <CurrencyRupeeIcon className="rupee_icon" />
                              <span>Cash on Delivery available</span>
                            </li>
                          </ul>
                        </div>
                      </article>
                    </div>
                    <ProductDelivery />
                    <div className="size_Selection_container">
                      <h5>Size</h5>
                      <ul>
                        {prod.sizes.map((size, i) => (
                          <li
                            // className={i == 0 ? "size   activeclick" : "size"}
                            key={i}
                            className={
                              sizeEffect === size.size
                                ? "size activeclick"
                                : "size"
                            }
                            onClick={() => setsizeEffect(size.size)}
                            // onClick={() => clickHandler(size.size, i)}
                            // ref={addRefs}
                          >
                            {size.size}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="seller_details">
                      <h5>Seller</h5>
                      <div>
                        <h6>{prod.seller}</h6>
                        <span>
                          <h6>{prod.sellerRating}</h6>
                          <StarIcon className="star_icon" />
                        </span>
                      </div>
                    </div>

                    <div className="product_desc">
                      <article
                        className="product_desc_label"
                        onClick={() => setIsDescExpand(!isDescExpand)}
                      >
                        <h5>Product Details</h5>
                        {isDescExpand === false && (
                          <AddIcon className="add_icon" />
                        )}
                        {isDescExpand && (
                          <MinimizeIcon className="minus_icon" />
                        )}
                      </article>
                      <article className="product_desc_content">
                        {isDescExpand &&
                          prod.description
                            .slice(0, lengthOfDesc / 2)
                            .map((desc) => (
                              <>
                                <div className="product_desc_content_info">
                                  <h6>{desc.key}</h6>
                                  <span>{desc.value}</span>
                                </div>
                              </>
                            ))}

                        {isDescExpand === true && isReadMore === false && (
                          <span
                            onClick={() => {
                              setIsReadMore(true);
                            }}
                          >
                            Read More
                          </span>
                        )}

                        {isDescExpand === true &&
                          isReadMore === true &&
                          prod.description
                            .slice(lengthOfDesc / 2, lengthOfDesc.length)
                            .map((desc) => (
                              <>
                                <div className="product_desc_content_info">
                                  <h6>{desc.key}</h6>
                                  <span>{desc.value}</span>
                                </div>
                              </>
                            ))}
                        {isDescExpand === true && isReadMore === true && (
                          <h6
                            onClick={() => {
                              setIsDescExpand(false);
                              setIsReadMore(false);
                            }}
                            className="read_less_info"
                          >
                            Read Less
                          </h6>
                        )}
                      </article>
                    </div>
                  </article>
                </>
              ))}
            </div>
            <Review />
          </section>
        </>
      )}
    </>
  );
}
export default ProductDetail;
