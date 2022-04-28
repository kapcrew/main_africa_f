import React from "react";
import { Bids, Filter, Cards, Button } from "../../components";
import Data from "./Data";
import { useState } from "react";
import "./explorer.css";
import {
  iconSaleType,
  iconPriceRange,
  iconCategory,
  iconCollection,
  iconMostRecent,
} from "../../assets/icon";
import birdExplorer from "../../assets/svg/birdExplorer.svg";
const Explorer = () => {
  /*Constants*/
  const [item, setItem] = useState(Data);
  const [newItem_title, setItem_title] = useState(Data);
  const [newItem_collection, setItem_collection] = useState(Data);

  const [price, setPrice] = useState(40);

  /*Фильтр по Категории*/
  const menuItems = [...new Set(Data.map((Val) => Val.category))];
  const filterItem = (curcat) => {
    const newItem = Data.filter((newVal) => {
      return newVal.category === curcat;
    });
    setItem(newItem);
  };

  /*********************/

  /*Фильтр по названию*/
  const menuItems_title = [...new Set(Data.map((Val) => Val.title))];
  const filterItem_title = (curcat) => {
    const newItem = Data.filter((newVal) => {
      return newVal.title === curcat;
    });
    setItem(newItem);
  };

  /*********************/

  /*Фильтр по Коллекции*/
  const menuItems_collection = [...new Set(Data.map((Val) => Val.collection))];
  const filterItem_collection = (curcat) => {
    const newItem = Data.filter((newVal) => {
      return newVal.collection === curcat;
    });
    setItem(newItem);
  };
  /*********************/

  /*Фильтр по цене*/
  const handleInput = (e) => {
    setPrice(e.target.value);
  };

  /*********************/

  /****Filter***********/

  const [filteredList, setFilteredList] = useState(Data);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState();

  const filterByBrand = (filteredData) => {
    // Avoid filter for empty string
    if (!selectedBrand) {
      return filteredData;
    }

    const filteredCars = filteredData.filter(
      (Data) => Data.name.split(" ").indexOf(selectedBrand) !== -1
    );
    return filteredCars;
  };

  const [modalCategory, setModalCategory] = useState(false);
  const [modalCollection, setModalCollection] = useState(false);
  const [modalSale, setModalSale] = useState(false);
  const [modalPrice, setModalPrice] = useState(false);
  const [modalMost, setModalMost] = useState(false);

  //CATEGORY
  const [categories, setcategories] = useState({
    all: true,
    art: false,
    audio: false,
    video: false,
    collectibles: false,
  });
  return (
    <div className="section__padding">
      {/*<Filter title="Test" />
  <input type="range" onInput={ handleInput } />
  <h1>Price: { price }</h1>*/}

      <div className="main_name ">Explore NFTs</div>
      <div className="filter">
        <div className="filter-bottoms">
          <button
            className="filter-bottom_"
            onClick={() => setModalCategory(!modalCategory)}
          >
            <div className="filter-bottom__icon">{iconCategory}</div>
            <div className="filter-bottom__name">Category</div>
          </button>
          {modalCategory && (
            <div className="modal_category">
              <button className="modal_category__btn modal-btn">All</button>
              <button className="modal_category__btn modal-btn">Art</button>
              <button className="modal_category__btn modal-btn">Audio</button>
              <button className="modal_category__btn modal-btn">Video</button>
              <button className="modal_category__btn modal-btn">
                Collectibles
              </button>
            </div>
          )}

          <button
            className="filter-bottom_"
            onClick={() => setModalCollection(!modalCollection)}
          >
            <div className="filter-bottom__icon">{iconCollection}</div>
            <div className="filter-bottom__name">Collection</div>
          </button>

          {modalCollection && <div className="modal_collection"></div>}
          <button
            className="filter-bottom_"
            onClick={() => setModalPrice(!modalPrice)}
          >
            <div className="filter-bottom__icon">{iconPriceRange}</div>
            <div className="filter-bottom__name">Price range</div>
          </button>
          {modalPrice && <div className="modal_price"></div>}

          <button
            className="filter-bottom_"
            onClick={() => setModalSale(!modalSale)}
          >
            <div className="filter-bottom__icon">{iconSaleType}</div>
            <div className="filter-bottom__name">Sale type</div>
          </button>
          {modalSale && <div className="modal_sale"></div>}
          <div className="filter-bottom_end"></div>
          <div className="image_bird">
            <img src={birdExplorer} alt="" />
          </div>

          <button
            className="filter-bottom_"
            onClick={() => setModalMost(!modalMost)}
          >
            <div className="filter-bottom__icon">{iconMostRecent}</div>
            <div className="filter-bottom__name">Most recent</div>
          </button>
          {modalMost && <div className="modal_most"></div>}

          {/* <div className="filter-bottom-input">
            <Button
              filterItem={filterItem}
              setItem={setItem}
              menuItems={menuItems}
              title="Type"
            />
            <Button
              filterItem={filterItem_title}
              setItem={newItem_title}
              menuItems={menuItems_title}
              title="Name"
            />
            <Button
              filterItem={filterItem_collection}
              setItem={newItem_collection}
              menuItems={menuItems_collection}
              title="Collection"
            />
          </div> */}
        </div>
      </div>

      {/*<Button
  filterItem={filterItem}
  setItem={setItem}
  menuItems={menuItems}
  />
  <Button
  filterItem={filterItem_title}
  setItem={newItem_title}
  menuItems={menuItems_title}
  />
  {/*<Bids title="Test" />*/}
      <Cards items={item} />

      {/* {JSON.stringify(item)} */}
    </div>
  );
};

export default Explorer;
