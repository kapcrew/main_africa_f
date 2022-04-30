import React, { useState, useEffect } from "react";
import "./item.css";
import Loader from "../../components/loader/loader"
import creator from "../../assets/seller2.png";
import item from "../../assets/item1.png";
import { login, login_out, login_extraton, send } from "../../scripts/index.js";
import apiRequest from "../../api/apiRequest";
import { useNavigate, useParams, useLocation } from "react-router-dom";
const Item = () => {
  const [isLoading, setisLoading] = useState(false);
  const paramsURL = useParams();
  const [infoToken, setinfoToken] = useState([]);
  const gitInfoItem = async () => {
    setisLoading(false);
    const address = paramsURL.addressItem;
    const res = await apiRequest.get(
      `/items/get_item_by_address?address=${address}`
    );
    console.log(res.data);
    setinfoToken(res.data);
    setisLoading(true);
  };
  useEffect(() => {
    gitInfoItem();
  }, []);

  const buy = () => {
    send();

    //  setUser(true);
  };
  // item
  return (
    <div>
      {isLoading ? (
        <div className="item section__padding">
          <div className="item-image">
            <img
              src={"https://" + infoToken.media}
              className="item-image__img"
              alt=""
            />
          </div>
          <div className="item-content">
            <div className="item-content__name">{infoToken.title}</div>
            <div className="item-content__status">On sale</div>
            <div className="item-content__description">
              {infoToken.description}
            </div>

            <div className="item-content__block-details">
              <div className="main-name-details">Details</div>
              <div className="item-content__users">
                <div className="item-content__block-details-item">
                  <div className="name-details">Creator</div>
                  <div className="res-details">
                    {infoToken.creator?.substring(0, 4)}...
                    {infoToken.creator?.substring(62)}
                  </div>
                </div>
                <div className="item-content__block-details-item">
                  <div className="name-details">Owner</div>
                  <div className="res-details">
                    {infoToken.owner?.substring(0, 4)}...
                    {infoToken.owner?.substring(62)}
                  </div>
                </div>
              </div>
              <div className="item-content__item">
                <div className="item-content__block-details-item">
                  <div className="name-details">Collection</div>
                  <div className="res-details">Art pieces</div>
                </div>
                <div className="item-content__block-details-item">
                  <div className="name-details">Address</div>
                  <div className="res-details">
                    {infoToken.address?.substring(0, 4)}...
                    {infoToken.address?.substring(62)}
                  </div>
                </div>
              </div>
            </div>
            <div className="item-content__block-buy">
              <button className="item-content__btn-buy">Buy now</button>

              <div className="item-content__block-price">
                <div className="item-content__name-price">Current price</div>
                <div className="item-content__price">{infoToken.price} Ē</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader/>
      )}
    </div>
  );
};

export default Item;
