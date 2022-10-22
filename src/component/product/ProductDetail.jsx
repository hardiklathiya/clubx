import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetail } from "../../reducers/productDetailReducer";
import "./productdetail.css";
import Loader from "../home/Loader";
import img from "../../images/return_product.jpg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Keyboard,
  Lazy,
  EffectCube,
  Navigation,
} from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/lazy";
import "swiper/css/effect-cube";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ReactImageMagnify from "react-image-magnify";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);
  const { loading, product, error } = useSelector(
    (state) => state.productDetail
  );
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <section className="product_detail_container">
            <article className="product_detail_nav">
              <h1>ClubX Fashion</h1>
              <ul>
                <li>Men</li>
                <li>Women</li>
                <li>Kids</li>
                <li>Cosmetics</li>
                <li>Accessories</li>
              </ul>
              <img src={img} alt="" />
            </article>
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
                  {prod.name.length > 15
                    ? prod.name.slice(0, 15) + "..."
                    : prod.name}
                </Link>
              ))}
            </article>
            <div className="product_details_div">
              <article className="product_details_img_article">
                <Swiper
                  style={{
                    "--swiper-pagination-color": "#fff",
                  }}
                  pagination={{ clickable: true }}
                  spaceBetween={0}
                  centeredSlides={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  keyboard={{
                    enabled: true,
                  }}
                  navigation={{
                    prevEl: ".prev_product_detail",
                    nextEl: ".next_product_detail",
                  }}
                  effect={"cube"}
                  lazy={true}
                  loop={true}
                  modules={[EffectCube, Pagination, Keyboard, Lazy, Navigation]}
                  className="mySwiper product_detail_slider_container"
                >
                  {product.map((prod) =>
                    prod.images.map((image, i) => (
                      <SwiperSlide className="product_detail_slider">
                        <ReactImageMagnify
                          className="swiper-lazy"
                          {...{
                            smallImage: {
                              alt: prod.name,
                              width: 400,
                              height: 500,
                              src: image.url,
                            },
                            largeImage: {
                              src: image.url,
                              width: 1500,
                              height: 2500,
                            },
                            enlargedImageContainerDimensions: {
                              width: "150%",
                              height: "100%",
                            },

                            shouldUsePositiveSpaceLens: true,

                            fadeDurationInMs: 300,
                          }}
                        />
                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                      </SwiperSlide>
                    ))
                  )}
                  <div className="prev_product_detail">
                    <ChevronLeftIcon className="prev_product_detail_icon"></ChevronLeftIcon>
                  </div>
                  <div className="next_product_detail">
                    <ChevronRightIcon className="next_product_detail_icon"></ChevronRightIcon>
                  </div>
                </Swiper>
              </article>

              <article className="product_detail_desc_article">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aliquam, commodi illum. Suscipit quaerat, deserunt consequuntur
                quidem quod nam dolore itaque. Quasi quia voluptas veritatis
                sed, fuga earum maiores ipsam at.
              </article>
            </div>
          </section>
        </>
      )}
    </>
  );
}
