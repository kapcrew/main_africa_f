import React from "react";
import "./header.css";
import promo from "../../assets/svg/cover_img.svg";
import cover_gradient from "../../assets/svg/cover_g_f.svg";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
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
            Imara is the first ethnic NFT marketplace on Everscale blockchain
              created to support local creators. Founded by the African
              community for the whole world
            </p>
          </div>
          <div className="promo-content-buy">
            <button className="primary-btn" onClick={()=>{navigate("/explorer")}}>Explore now</button>
            <button className="secondary-btn" onClick={()=>{navigate("/create")}}>Create</button>
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
