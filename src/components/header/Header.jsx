import React from "react";
import "./header.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import promo from "../../assets/svg/cover_img.svg";
import cover_gradient from "../../assets/svg/cover_g_f.svg";

import { Link } from "react-router-dom";
const Header = () => {
  
  return (
    <div>
      <div className="promo">
        <div className="promo-content">
          <div className="promo-content-title">
            <h1>
              Discover & trade{" "}
              <span className="promo-content-title__main-word">
                extraordinary
              </span>{" "}
              NFTs from African artists
            </h1>
          </div>
          <div className="promo-content-detail">
            <p>
              Shujaa is the first ethnic NFT marketplace on Everscale blockchain
              created to support local creators. Founded by the African
              community for the whole world
            </p>
          </div>
          <div className="promo-content-buy">
            <button className="primary-btn">Explore now</button>
            <button className="secondary-btn">Create</button>
          </div>
        </div>
        <div className="promo-image">
          <img src={promo} alt="promo" />
        </div>
      </div>
      <div className="promo-specifications">
        <div className="promo-specifications__image">
          <img src={cover_gradient} alt="promo" />
        </div>
      </div>

      
    </div>
  );
};

export default Header;
