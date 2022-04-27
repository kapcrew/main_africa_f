import React from "react";
import "./footer.css";
import nftlogo from "../../assets/logo.png";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { RiDiscordFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import cover from "../../assets/svg/footer_g.svg";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-links">
        <div className="footer-links_logo">
          <div>
            <img src={nftlogo} alt="logo" />
            <p className=" footer-links_logo__name">shujaa</p>
          </div>
          <div>
            <h3>Join our community</h3>
          </div>
          {/* <div>
            <input type="text" placeholder="Your Email" />
            <button>Email Me!</button>
          </div> */}
          <div>
            <AiOutlineInstagram
              size={25}
              color="white"
              className="footer-icon"
            />
            <AiOutlineTwitter size={25} color="white" className="footer-icon" />
            <RiDiscordFill size={25} color="white" className="footer-icon" />
            <FaTelegramPlane size={25} color="white" className="footer-icon" />
          </div>
          <div>
            <p> © {new Date().getFullYear()} Imara NFT</p>
          </div>
        </div>
        <div className="footer-links_divs"> 
          <div className="footer-links_div">
            <div>Imara NFT</div>
            <p>Explore</p>
            <p>How it Works</p>
            <p>Counters</p>
            <p>Contact Us</p>
          </div>
          <div className="footer-links_div">
            <div>Need help?</div>
            <p>Support</p>
            <p>FAQ</p>
            <p>Contact us</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
