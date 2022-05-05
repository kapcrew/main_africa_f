import React from "react";
import "./CardCollection.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
const CardCollection = ({ infoCollection }) => {
  const navigate = useNavigate();
  // console.log(infoCollection);
  const toCollection = () =>{
    navigate("/collection/"+infoCollection.id)
  }
  return (
    <div className="card-collection" onClick={toCollection}>
      <div className="collection-cover">
        <div class="blur"></div>
        <img
          className="collection-cover-img"
          src={infoCollection.picture}
          alt=""
        />
        <div className="card-collection__collection-icon">
          <img
            className="card-collection__collection-icon-img"
            src={infoCollection.picture}
            alt=""
          />
        </div>
      </div>
      <div className="collection-info">
        <div className="collection-info__name">{infoCollection.name}</div>
        <div className="collection-info__description">
          {String(infoCollection.description).substring(0,105)} {" "}
        </div>
      </div>
      <div className="card-collection__attributes">
        <div className="card-collection__attribute">
          <div className="card-collection__name-attribute">Items</div>
          <div className="card-collection__value-attribute">64</div>
        </div>
      </div>{" "}
    </div>
  );
};

export default CardCollection;
