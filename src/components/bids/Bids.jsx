import React, { useState, useEffect } from "react";
import "./bids.css";
import Card from "../card/Card";
import Loader from "../loader/loader";
import Carousel from "react-elastic-carousel";
import CardHomePage from "../cardHomePage/CardHomePage";
import apiRequest from "../../api/apiRequest";
import CardCollection from "../cardCollection/CardCollection";
import { outlineArrow } from "../../assets/icon";
const Bids = ({ title }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingCollection, setisLoadingCollection] = useState(false);
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
    getListCollection();
    getItems();
    getWindowDimensions().width > 1300
      ? setcollectionToShow(4)
      : getWindowDimensions().width > 1200
      ? setcollectionToShow(3)
      : getWindowDimensions().width > 800
      ? setcollectionToShow(2)
      : setcollectionToShow(1);

    getWindowDimensions().width > 1300
      ? setItemsToshow(4)
      : getWindowDimensions().width > 1200
      ? setItemsToshow(3)
      : getWindowDimensions().width > 800
      ? setItemsToshow(2)
      : setItemsToshow(1);
    console.log(getWindowDimensions().width, collectionToShow);
  }, []);
  const [itemToShow, setItemsToshow] = useState(4);

  window.addEventListener("resize", function () {
    this.window.innerWidth > 1300
      ? setItemsToshow(4)
      : this.window.innerWidth > 1200
      ? setItemsToshow(3)
      : this.window.innerWidth > 800
      ? setItemsToshow(2)
      : setItemsToshow(1);
  });

  const [collectionToShow, setcollectionToShow] = useState(1);

  window.addEventListener("resize", function () {
    this.window.innerWidth > 1300
      ? setcollectionToShow(4)
      : this.window.innerWidth > 1200
      ? setcollectionToShow(3)
      : this.window.innerWidth > 900
      ? setcollectionToShow(2)
      : setcollectionToShow(1);
  });
  // window.addEventListener("onload", function () {
  //   this.window.innerWidth > 1300
  //     ? setcollectionToShow(4)
  //     : this.window.innerWidth > 1200
  //     ? setcollectionToShow(3)
  //     : this.window.innerWidth > 900
  //     ? setcollectionToShow(2)
  //     : setcollectionToShow(1);
  // });

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  const [listCollection, setlistCollection] = useState([]);

  const getListCollection = async () => {
    setisLoadingCollection(false);
    const req = await apiRequest.get("/collections/get_collections");
    console.log(req.data);
    const arr_list = req.data.map((col, ind) => {
      return (
        <div className="btn-collectionQ" key={ind}>
          {col.name}
        </div>
      );
    });
    setlistCollection(req.data);
    console.log("collection", req.data);
    setisLoadingCollection(true);
    // setisLoading(true);
  };
  return (
    <div className="bids">
      <div className="bids-container">
        <div className="bids-container-text">Top token</div>
        <div className="bids-container-text_rear">Top token</div>
        <div className="outlineArrow-tokens">
          <div>{outlineArrow}</div>
          <div>{outlineArrow}</div>
        </div>
        {isLoading ? (
          <Carousel className="carousel-home" itemsToShow={itemToShow}>
            {items.map((infoToken) => {
              return <CardHomePage key={Math.random()} infoToken={infoToken} />;
            })}
          </Carousel>
        ) : (
          <Loader />
        )}
      </div>

      <div className="collection-container">
        <div className="bids-container-text">Top collection</div>
        <div className="bids-container-text_rear">Top collection</div>
        <div className="outlineArrow-tokens">
          <div>{outlineArrow}</div>
          <div>{outlineArrow}</div>
        </div>
        {isLoadingCollection ? (
          <Carousel className="carousel-home" itemsToShow={collectionToShow}>
            {listCollection.map((collection) => {
              return (
                <CardCollection
                  key={Math.random()}
                  infoCollection={collection}
                />
              );
            })}
          </Carousel>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Bids;
