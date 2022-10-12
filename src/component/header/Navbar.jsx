import React, { useEffect } from "react";
import { useState } from "react";
import logo from "../../images/clubX logo.png";
import menu from "../../images/menu.png";
import "./navbar.css";
import BackShadow from "./BackShadow";
import SearchIcon from "@mui/icons-material/Search";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const inputHandle = (e) => {
    setSearch(e.target.value);
  };
  const removeText = () => {
    setSearch("");
  };

  useEffect(() => {
    if (isOpen === true) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [isOpen]);
  return (
    <>
      <header className="app_download">
        <span>
          Download the ClubX App & Get ₹150 off* | Use Code - CX150New
        </span>
        <div>
          <PhoneAndroidIcon className="phone_icon" />
          <span>App Download</span>
        </div>
      </header>

      <header className="navbar">
        <figure className="humburger_menu" onClick={toggleDrawer}>
          <img src={menu} alt="" width="25px" height="25px" />
        </figure>

        {/* Sider bar for navigation for mobile devices */}
        {isOpen && (
          <>
            <aside className="sidebar">
              <div className="header_siderbar">
                <span>
                  <h4>Sign in </h4>
                  <PersonIcon className="user_icon_sidebar_mobile" />
                </span>

                <h2>
                  <p style={{ fontSize: "18px" }}>Browse</p>
                  ClubX
                </h2>
              </div>

              <div className="sidebar_div">
                <article className="article_1_sidebar">
                  <h1>ClubX Home</h1>
                  <HomeIcon className="home_icon_mobile" />
                </article>
                <article className="article_2_sidebar">
                  <h1>Top Categories For You</h1>
                  <ul>
                    <li>Menswear</li>
                    <li>Womenswear</li>
                    <li>Laptop</li>
                    <li>Mobiles</li>
                    <li>See all Categories</li>
                  </ul>
                </article>
                <article className="article_3_sidebar">
                  <ul>
                    <li>My Profile</li>
                    <li>My Cart</li>
                    <li>My Orders</li>
                    <li>My Wishlist</li>
                    <li>My seller Account</li>
                    <li style={{ color: "red" }}>Logout</li>
                  </ul>
                </article>
              </div>
            </aside>

            <CloseIcon
              onClick={toggleDrawer}
              className="close_icon_mobile_sidebar"
            />
          </>
        )}
        <BackShadow isOpen={isOpen} toggleDrawer={toggleDrawer} />

        <div className="logo">
          <img src={logo} alt="clubx logo" />
        </div>
        <div className="search_pc">
          <form action="" className="search_form">
            <input
              type="text"
              className="inputSearch"
              placeholder="Find the best match for you"
              onChange={inputHandle}
              value={search}
            />

            <span className="search_area">
              {search && (
                <CloseRoundedIcon onClick={removeText} className="close_icon" />
              )}
              <SearchIcon className="search_icon" />
            </span>
          </form>
        </div>
        <div className="menu_link_div_pc">
          <ul className="menu_link_ul_pc">
            <li className="menu_link_li_pc">
              <PhoneInTalkIcon className="menu_link_icon_pc" />
              <a className="menu_link_li_field_pc">24/7 Customer Care</a>
            </li>
            <li className="menu_link_li_pc">
              <AddBusinessIcon className="menu_link_icon_pc" />
              <a className="menu_link_li_field_pc">Become a Seller</a>
            </li>
            <li className="menu_link_li_pc sub_menu">
              <PersonOutlineIcon className="menu_link_icon_pc " />

              <a className="menu_link_li_field_pc">Profile</a>
              <div className="sub_menu_ul_pc">
                <div className="sub_menu_pc_profile">
                  <h4 style={{ color: "rgba(0,0,0,0.7" }}>
                    Welcome, Hello User
                  </h4>
                  <p style={{ fontSize: "12px" }}>
                    To access account and manage orders
                  </p>
                  <button className="login_btn_pc">LOGIN/SIGNUP</button>
                  <ul className="sub_menu_pc_profile_list">
                    <li>
                      <a>Your Account</a>
                    </li>
                    <li>
                      <a>Your cart</a>
                    </li>
                    <li>
                      <a>Your Wishlist</a>
                    </li>
                    <li>
                      <a>Your orders</a>
                    </li>
                    <li>
                      <a>See Recommendations</a>
                    </li>
                    <li>
                      <a>Your seller Account</a>
                    </li>
                    <li>
                      <a>Contact Us</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="menu_link_li_pc">
              <ShoppingCartIcon className="menu_link_icon_pc" />
              <a className="menu_link_li_field_pc">Cart</a>
            </li>
            <li className="menu_link_li_pc">
              <FavoriteBorderIcon className="menu_link_icon_pc" />
              <a className="menu_link_li_field_pc">Wishlist</a>
            </li>
          </ul>
        </div>
      </header>
      <header className=" search_header_mobile">
        <div className="search_mobile">
          <form action="" className="search_form ">
            <input
              type="text"
              className="inputSearch inputSearch_mobile"
              placeholder="Find the best match for you"
              onChange={inputHandle}
              value={search}
            />

            <span className="search_area ">
              {search && (
                <CloseRoundedIcon
                  onClick={removeText}
                  className="close_icon close_icon_mobile"
                />
              )}
              <SearchIcon className="search_icon search_icon_mobile" />
            </span>
          </form>
        </div>
      </header>
    </>
  );
}
