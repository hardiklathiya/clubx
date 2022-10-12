import React, { useEffect, useState, useContext } from "react";
import "./all.min.css";
import ProductContext from "../../context/ProductContext";
// Import Swiper styles
import ImgSlider from "./ImgSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { Autoplay, Pagination, Navigation, Keyboard } from "swiper";
import "./home.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import features from "../../images/features.png";
import sale from "../../images/sale_girl_img.webp";
import "./homeMedia.css";
import HomeProduct from "./HomeProduct";
import MetaData from "../MetaData";
export default function Home() {
  const [timerDays, setTimerDays] = useState();
  const [timerHours, setTimerHours] = useState();
  const [timerMinutes, setTimerMinutes] = useState();
  const [timerSeconds, setTimerSeconds] = useState();
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

  const context = useContext(ProductContext);
  const { products, getProducts } = context;
  useEffect(() => {
    starterTimer();
  }, []);
  useEffect(() => {
    getProducts();
  });
  // const product = {
  //   name: "This is our best product please visit it",
  //   images: [
  //     {
  //       url: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/5/a/tr:w-550,/5a827dcNFTD_TWDR948_1.jpg?rnd=20200526195200",
  //     },
  //   ],
  //   price: "30,000",
  //   _id: "rjbgerkjlnkfsvlgnwoedv",
  // };
  return (
    <>
      <MetaData title="ClubX" />
      <main className="home">
        <Swiper
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
          loop={true}
          modules={[Autoplay, Pagination, Navigation, Keyboard]}
          className="imgSlider "
        >
          {ImgSlider.map((ele) => {
            return (
              <SwiperSlide key={ele.id}>
                <img src={ele.img} className="img_in_slider" />
              </SwiperSlide>
            );
          })}

          <div className="prev">
            <ChevronLeftIcon className="prev_icon" />
          </div>
          <div className="next">
            <ChevronRightIcon className="next_icon" />
          </div>
          <div className="swiper_pagination"></div>
        </Swiper>
        <h2 className="category_h2">Our Collections</h2>

        <section className="categorys">
          <div className="category_left">
            <figure className="cat_women"></figure>
            <div className="cat_women_text">
              <h2>Women's fashion</h2>
              <span>SHOP NOW</span>
            </div>
          </div>

          <div className="category_right">
            <article className="cat_article1">
              <div className="cat_men_article">
                <figure className="cat_men"></figure>
                <div className="cat_men_text">
                  <h2>Men's fashion</h2>
                  <span>SHOP NOW</span>
                </div>
              </div>
              <div className="cat_kid_article">
                <figure className="cat_kid"></figure>
                <div className="cat_kid_text">
                  <h2>Kid's fashion</h2>
                  <span>SHOP NOW</span>
                </div>
              </div>
            </article>
            <article className="cat_article2">
              <div className="cat_cosmetics_article">
                <figure className="cat_cosmetics"></figure>
                <div className="cat_cosmetics_text">
                  <h2>Cosmetics</h2>
                  <span>SHOP NOW</span>
                </div>
              </div>
              <div className="cat_accessories_article">
                <figure className="cat_accessories"></figure>
                <div className="cat_accessories_text">
                  <h2>Accessories</h2>
                  <span>SHOP NOW</span>
                </div>
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
          {Object.keys(products).map((product, index) => {
            return <HomeProduct key={index} product={product} />;
          })}
        </section>
      </main>
    </>
  );
}