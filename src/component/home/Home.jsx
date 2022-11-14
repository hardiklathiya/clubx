import React, { useEffect, useState } from "react";
import "./all.min.css";
// Import Swiper styles
import ImgSlider from "./ImgSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/lazy";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Autoplay, Pagination, Navigation, Keyboard, Lazy } from "swiper";
import "./home.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import features from "../../images/features.png";
import sale from "../../images/sale_girl_img.webp";
import "./homeMedia.css";
import HomeProduct from "./HomeProduct";
import MetaData from "../MetaData";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchProducts } from "../../reducers/productReducer";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Home() {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();

  const [serverError, setServerError] = useState(null);

  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [fetchProducts]);
  let interval;
  const starterTimer = () => {
    const countdownTimer = new Date("December 23, 2022 02:50:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownTimer - now;
      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);
      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    });
  };

  useEffect(() => {
    starterTimer();
  }, []);

  const server_error = () => {
    toast.error("Internal Server Error", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  useEffect(() => {
    setServerError(server_error());
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ClubX" />

          <main className="home">
            <Swiper
              style={{
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={0}
              centeredSlides={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              keyboard={{
                enabled: true,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={{
                prevEl: ".prev",
                nextEl: ".next",
              }}
              lazy={true}
              loop={true}
              modules={[Autoplay, Pagination, Navigation, Keyboard, Lazy]}
              className="imgSlider "
            >
              {ImgSlider.map((ele) => {
                return (
                  <SwiperSlide key={ele.id}>
                    <img src={ele.img} className="img_in_slider swiper-lazy" />
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                  </SwiperSlide>
                );
              })}

              <div className="prev">
                <ChevronLeftIcon />
              </div>
              <div className="next">
                <ChevronRightIcon />
              </div>
            </Swiper>
            <h2 className="category_h2">Our Collections</h2>

            <section className="categorys">
              <div className="category_left">
                <Link to="../products/womenswear">
                  <figure className="cat_women"></figure>
                  <div className="cat_women_text">
                    <h2>Women's fashion</h2>
                    <span>SHOP NOW</span>
                  </div>
                </Link>
              </div>
              <div className="category_right">
                <article className="cat_article1">
                  <div className="cat_men_article">
                    <Link to="../products/menswear">
                      <figure className="cat_men"></figure>
                      <div className="cat_men_text">
                        <h2>Men's fashion</h2>
                        <span>SHOP NOW</span>
                      </div>
                    </Link>
                  </div>

                  <div className="cat_kid_article">
                    <Link to="../products/kidswear">
                      <figure className="cat_kid"></figure>
                      <div className="cat_kid_text">
                        <h2>Kid's fashion</h2>
                        <span>SHOP NOW</span>
                      </div>
                    </Link>
                  </div>
                </article>
                <article className="cat_article2">
                  <div className="cat_cosmetics_article">
                    <Link to="../products/cosmetics">
                      <figure className="cat_cosmetics"></figure>
                      <div className="cat_cosmetics_text">
                        <h2>Cosmetics</h2>
                        <span>SHOP NOW</span>
                      </div>
                    </Link>
                  </div>
                  <div className="cat_accessories_article">
                    <Link to="../products/accessories">
                      <figure className="cat_accessories"></figure>
                      <div className="cat_accessories_text">
                        <h2>Accessories</h2>
                        <span>SHOP NOW</span>
                      </div>
                    </Link>
                  </div>
                </article>
              </div>
            </section>
            <div className="features">
              <img src={features} alt="" />
            </div>
            {/* <div className="timeSale">
            <figure className="timeSale_img">
              <img src={sale} alt="sale girl image" />
            </figure>
            <aside className="sale_timing">
              <div className="sale_timing_container">
                <div className="sale_title">
                  <h5>DISCOUNT</h5>
                  <h1>Winter 2022</h1>
                  <p>
                    SALE &nbsp;
                    <span style={{ color: "#ca1515", fontWeight: "bold" }}>
                      50%
                    </span>
                  </p>
                </div>
                <div className="sale_timer">
                  <div className="sale_timer_div">
                    <h1>{timerDays}</h1>
                    <span>Day</span>
                  </div>
                  <div className="sale_timer_div">
                    <h1>{timerHours}</h1>
                    <span>Hour</span>
                  </div>
                  <div className="sale_timer_div">
                    <h1>{timerMinutes}</h1> <span>Min</span>
                  </div>
                  <div className="sale_timer_div">
                    <h1>{timerSeconds}</h1> <span>Sec</span>
                  </div>
                </div>
                <div className="shop_now">
                  <span>SHOP NOW</span>
                </div>
              </div>
            </aside>
          </div> */}

            <h2 className="featured_products">Featured Products</h2>
            <section className="container">
              {products &&
                products.map((product) => (
                  <HomeProduct product={product} key={product._id} />
                ))}
              {/* {error && (
                <>
                  <ToastContainer>{server_error}</ToastContainer>
                  <h4 className="featured_product_error">
                    Error : Internal Server error. We will try to get back to
                    you soon with better services.
                  </h4>
                </>
              )} */}
            </section>
          </main>
        </>
      )}
    </>
  );
}
export default Home;
