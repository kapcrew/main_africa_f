import React, { useState, useEffect } from "react";
import "./bids.css";
import Card from "../card/Card";
import Loader from "../loader/loader";
import Carousel from "react-elastic-carousel";
import CardHomePage from "../cardHomePage/CardHomePage";
import apiRequest from "../../api/apiRequest";
import "@brainhubeu/react-carousel/lib/style.css";
const Bids = ({ title }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const getItems = async () => {
    setisLoading(false);
    const res = await apiRequest.get("/items/get_items");
    setItems(res.data);

    console.log(res.data);

    setisLoading(true);
    //  CATEGORY  --------------------
    if (isLoading) {
    }
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>Top token</h1>
        </div>
        {isLoading ? <Carousel itemsToShow={3}>
          {items.map((infoToken) => {
            return <Card infoToken={infoToken} />;
          })}
        </Carousel> : <Loader />}
        
      </div>
    </div>
  );
};

export default Bids;
