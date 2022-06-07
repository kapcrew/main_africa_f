import "./cardHomePage.css";
import React from 'react'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import apiRequest from "../../api/apiRequest";
import { useState } from "react";
import { useEffect } from "react";
const CardHomePage = ({ infoToken }) => {
  const navigate = useNavigate();
  const [imgOwner, setimgOwner] = useState()
  const getImageOwner = async () =>{
    const imgO = await apiRequest.get(
      `/profile/get_image?walletId=${infoToken.owner?.substring(2)}`
    );
    setimgOwner(imgO.data.profilePicture)
  }
  useEffect(() => {
    getImageOwner()
  }, [])
  
  return (
    <div className="card-token-home__block">
      <div className="card-token-home">
        <div className="card-token-home__top">
          <img
            className="card-token-home__top-img"
            src={"https://" + infoToken.media}
          />
        </div>
        <div className="card-token-home__button">
          <div className="card-token-home__info">
            <div className="card-token-home__info-top">
              <div className="card-token-home__info-main">
                <div className="card-token-home__collection">
                  {infoToken.collection}
                </div>
                <div className="card-token-home__title">{infoToken.title}</div>
              </div>

              <div className="card-token-home__price">
                <div className="card-token-home__name-price">Price</div>
                <div className="card-token-home__some-price">
                  {" "}
                  {infoToken.onSale
                    ? infoToken.price + " EVER"
                    : "Not on sale"}{" "}
                </div>
              </div>
            </div>

            <div className="card-token-home__description">
              {infoToken.description?.substring(0, 65)}
            </div>
          </div>
          <div className="card-token-home__owner">
            <div className="card-token-home__image">
            {
              imgOwner?
              <img
              className="card-token-home__image-img"
              src={imgOwner}
              alt=""
            />
              
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-eye-slash" viewBox="0 -2 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
          </svg>
            }
              
            </div>
            <div className="card-token-home__owner-block">
              <div className="card-token-home__owner-name">Owner: </div>
              <div className="card-token-home__owner-address">
                {" "}
                {infoToken.owner.substring(0, 6)}...
                {infoToken.owner.substring(60, 66)}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="card-token-home-top">
        <div>*</div>
        <div className="bids-card__menu">{menuCard}</div>
      </div>
      <div className="card-token-home-card-top">
        <img src={"https://" + infoToken.media} />
      </div>
      <div className="card-bottom">
        <div className="card-name">
          <div className="card-name__main">{infoToken.title} </div>
          <div className="card-name__submain">{infoToken.category}</div>
        </div>
        <div className="card-price">
          {infoToken.onSale
            ? infoToken.price + " EVER"
            : infoToken.onAuction
            ? "At the auction"
            : ""}{" "}
        </div>
        <div className="buy-and-love">
          <button
            className="card-btn-buy"
            onClick={() => {
              navigate(`/item/${infoToken.address}`);
            }}
          >
            Info{" "}
          </button>
          <div className="love">
            <div className="love-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.33801 10.4312L8.55247 15.3296L8.55248 15.3296C8.65088 15.422 8.70008 15.4683 8.75051 15.4973C8.90495 15.5862 9.09505 15.5862 9.24949 15.4973C9.29992 15.4683 9.34913 15.422 9.44753 15.3296L14.662 10.4312C16.1291 9.05294 16.3073 6.78495 15.0734 5.19455L14.8413 4.89551C13.3652 2.99294 10.4022 3.31201 9.365 5.48524C9.21849 5.79222 8.78151 5.79222 8.635 5.48524C7.59778 3.31201 4.63479 2.99294 3.15866 4.89551L2.92664 5.19455C1.69271 6.78495 1.87087 9.05294 3.33801 10.4312Z"
                  stroke="#482B08"
                  strokeOpacity="0.8"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="love-number"></div>
          </div>
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default CardHomePage;
