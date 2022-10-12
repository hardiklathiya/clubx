import React from "react";
import "./footer.css";
import logo from "../../images/clubX logo.png";
import playstore from "../../images/playstore.png";
import appstore from "../../images/appstore.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import HelpIcon from "@mui/icons-material/Help";
export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer_1">
          <div className="footer_left">
            <figure className="footer_logo">
              <img src={logo} alt="clubX logo" />
            </figure>
            <h2>DOWNLOAD OUR APP</h2>
            <span>Download our clubX app in Android and ios Mobile Phones</span>
            <figure className="footer_store">
              <img src={playstore} alt="playstore" />
              <img src={appstore} alt="appstore" />
            </figure>
          </div>
          <div className="footer_middle">
            <h3>Contact Us:</h3>
            <ul>
              <li>
                <FacebookIcon className="fb_logo_footer" />
              </li>
              <li>
                <InstagramIcon className="insta_logo_footer" />
              </li>
              <li>
                <TwitterIcon className="twitter_logo_footer" />
              </li>
              <li>
                <YouTubeIcon className="yt_logo_footer" />
              </li>
            </ul>
          </div>
          <div className="footer_right">
            <h3>Subscribe to our newsletter</h3>
            <form action="">
              <input placeholder="Example@gmail.com" type="text" />
              <button>Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer_2">
          <div className="footer_container1">
            <div className="footer_container1_1">
              <h5>company</h5>
              <ul>
                <li>About Us</li>
                <li>What we do</li>
                <li>Careers</li>
                <li>Donations & Sponsorships</li>
                <li>Investor Relations</li>
                <li>Suppliers</li>
              </ul>
            </div>
            <div className="footer_container1_1">
              <h5>Services</h5>
              <ul>
                <li>My Account</li>
                <li>Contact customer service</li>
                <li>Track your order</li>
                <li>Gift cards</li>
                <li>Purchase status</li>
                <li>Shipping info</li>
                <li>Return policy</li>
                <li>Membership</li>
              </ul>
            </div>
            <div className="footer_container1_1">
              <h5>Make Money with Us</h5>
              <ul>
                <li>Sell on clubX</li>
                <li>Sell under ClubX Accelerator</li>
                <li>ClubX Global Selling</li>
                <li>Become an Affiliate</li>
                <li>Fulfilment by ClubX</li>
                <li>Advertise Your Products</li>
              </ul>
            </div>
            <div className="footer_container1_1">
              <h5>Let Us Help You</h5>
              <ul>
                <li>Store events</li>
                <li>Jobs</li>
                <li>Store Location</li>
                <li>ClubX app download</li>
                <li>ClubX Assistant download</li>
                <li>Help</li>
              </ul>
            </div>
          </div>
          <div className="footer_container2">
            <div className="footer_container2_1">
              <CallIcon />
              <div>
                <h3> +91-9913177832</h3>
                <span>Mon-Sun,9am-6pm</span>
              </div>
            </div>
            <div className="footer_container2_1">
              <EmailIcon />
              <div>
                <h3>lathiyahardik86@gmail</h3>
                <span>We will respond as quickly as we can</span>
              </div>
            </div>
            <div className="footer_container2_1 aa">
              <HelpIcon />
              <div>
                <h3>Help Center</h3>
                <span>Find answers online anytime</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_3">
          <ul>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Interest based ads</li>
            <li>Product Recalls</li>
          </ul>
        </div>
        <div className="footer_4">
          <span>© 2022 www.clubX.com. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}
