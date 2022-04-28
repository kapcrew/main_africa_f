import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { menuCard } from "../../assets/icon";
import Card from "../card/Card"
import "./cards.css";

const Cards = ({ items }) => {
  return (
    <>
     {/* {JSON.stringify(items)} */}
      <div className="bids">
        <div className="bids-container">
          <div className="bids-container-card">
            <div className="cards">
             
              {items.map((infoToken) => {
                return (
                
                    <Card infoToken={infoToken} />
                
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
