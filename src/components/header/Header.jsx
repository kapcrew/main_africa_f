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
            <button
              className="primary-btn"
              onClick={() => {
                navigate("/explorer");
              }}
            >
              Explore now{" "}
              <svg
                width="15"
                height="24"
                viewBox="0 0 15 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 12L13.7071 11.2929L14.4142 12L13.7071 12.7071L13 12ZM1 13C0.447715 13 0 12.5523 0 12C0 11.4477 0.447715 11 1 11V13ZM9.70711 7.29289L13.7071 11.2929L12.2929 12.7071L8.29289 8.70711L9.70711 7.29289ZM13.7071 12.7071L9.70711 16.7071L8.29289 15.2929L12.2929 11.2929L13.7071 12.7071ZM13 13H1V11H13V13Z"
                  fill="white"
                />
              </svg>
            </button>
            <button
              className="secondary-btn"
              onClick={() => {
                navigate("/create");
              }}
            >
              Create
            </button>
          </div>
        </div>
        <div className="promo-image">
          <img src={promo} alt="promo" />
        </div>
        <div className="promo-blur-block">Create. Sell. Buy.</div>
      </div>
      <div className="promo-specifications">
        <div className="promo-specifications__image">
          <img
            className="promo-specifications__image-img"
            src={cover_gradient}
            alt="promo"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
