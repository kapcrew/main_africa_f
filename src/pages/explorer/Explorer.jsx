import React from "react";
import { Bids, Filter, Cards, Button } from "../../components";
// import Data from "./Data";
import { useState, useEffect } from "react";
import "./explorer.css";
import Loader from "../../components/loader/loader";
import { iconCheck } from "../../assets/icon";
import {
  iconSaleType,
  iconPriceRange,
  iconCategory,
  iconCollection,
  iconMostRecent,
} from "../../assets/icon";
import birdExplorer from "../../assets/svg/birdExplorer.svg";
import apiRequest from "../../api/apiRequest";
const Explorer = () => {
  /*Constants*/
  const [items, setItems] = useState([]);
  const [itemsInitially, setitemsInitially] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const getItems = async () => {
    setisLoading(false);
    const res = await apiRequest.get("/items/get_items");
    setItems(res.data);
    setitemsInitially(res.data);
    console.log(res);

    setisLoading(true);
    //  CATEGORY  --------------------
    if (isLoading) {
    }
  };
  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    setcategoriesArr(() => {
      return [...new Set(items.map((item) => item.category))];
    });
    setcategories(() => {
      const arr_cat = [...new Set(items.map((item) => item.category))];
      const obj_cat = {};
      for (const key of arr_cat) {
        obj_cat[key] = false;
      }
      return obj_cat;
    });
    //  COLLECTION --------------------
    setcollections(() => {
      const arr_cat = [...new Set(items.map((item) => item.collection))];
      const obj_cat = {};
      for (const key of arr_cat) {
        obj_cat[key] = false;
      }
      return obj_cat;
    });
    setcollectionArr(() => {
      return [...new Set(items.map((item) => item.collection))];
    });
  }, [isLoading]);

  const [modalCategory, setModalCategory] = useState(false);
  const [modalCollection, setModalCollection] = useState(false);
  const [modalSale, setModalSale] = useState(false);
  const [modalPrice, setModalPrice] = useState(false);
  const [modalMost, setModalMost] = useState(false);

  //  CATEGORY  --------------------
  const [categories, setcategories] = useState([]);
  const [categoriesArr, setcategoriesArr] = useState([]);

  const changeCategory = (event) => {
    console.log(categories);
    setcategories((pre) => {
      return {
        ...pre,
        [event.target.id]: !categories[event.target.id],
      };
    });
    console.log(categories);
  };

  //  COLLECTION --------------------
  const [collections, setcollections] = useState([]);
  const [collectionArr, setcollectionArr] = useState([]);

  const changeCollection = (event) => {
    setcollections((pre) => {
      return {
        ...pre,
        [event.target.id]: !collections[event.target.id],
      };
    });
    console.log(collections);
  };

  //  PRICE ---------------------
  const [priceFrom, setpriceFrom] = useState("");
  const [priceTo, setpriceTo] = useState("");

  const clearPriceInput = () => {
    setpriceFrom("");
    setpriceTo("");
    // applyPrice()
  };

  const applyPrice = () => {
    updateListToken();
    setModalPrice(false);
  };

  //  SALE TYPE

  const [listSaleTypes, setlistSaleTypes] = useState({
    "On sale": false,
    Auction: false,
    Others: false,
  });
  const changelistSaleTypes = (event) => {
    setlistSaleTypes((pre) => {
      return {
        ...pre,
        [event.target.id]: !listSaleTypes[event.target.id],
      };
    });
  };

  const updateListToken = () => {
    const newItems = itemsInitially.filter((newVal) => {
      let flagCategories = false;
      let flagCollections = false;
      let flagSaleType = false;
      let flagPriceRange = false;

      let flagCategoriesAll = false;
      let flagCollectionsAll = false;
      let flagSaleTypeAll = false;

      // CATEGORIES
      for (const category in categories) {
        if (categories[category]) {
          flagCategoriesAll = true;
        }
        // console.log(categories[category]);
        if (categories[category] && category === newVal.category) {
          flagCategories = true;
          // return newVal;
        }
      }

      // COLLECTIONS
      for (const collection in collections) {
        if (collections[collection]) {
          flagCollectionsAll = true;
        }
        // console.log(collections[collection]);
        if (collections[collection] && collection === newVal.collection) {
          flagCollections = true;
          // return newVal;
        }
      }
      // SALE TYPES
      for (const saleType in listSaleTypes) {
        if (listSaleTypes[saleType]) {
          flagSaleTypeAll = true;
        }
        // console.log(collections[collection]);
        // console.log(listSaleTypes[saleType],saleType,newVal.onAuction)

        if (
          listSaleTypes[saleType] &&
          listSaleTypes[saleType] === newVal.onAuction &&
          saleType === "Auction"
        ) {
          flagSaleType = true;
        }
        if (
          listSaleTypes[saleType] &&
          listSaleTypes[saleType] === newVal.onSale &&
          saleType === "On sale"
        ) {
          flagSaleType = true;
        }
        if (
          listSaleTypes[saleType] &&
          newVal.onAuction === false &&
          newVal.onSale === false &&
          saleType === "Others"
        ) {
          flagSaleType = true;
        }
      }

      // PRICE RANGE
      console.log(priceFrom, priceTo);
      if (priceFrom !== "" && priceTo !== "") {
        // setItems(() => {
        // return Data.filter((newVal) => {
        if (
          Number(newVal.price) >= priceFrom &&
          Number(newVal.price) <= priceTo
        ) {
          flagPriceRange = true;
        }
        // });
        // });
      } else {
        flagPriceRange = true;
      }

      // console.log("flagCategoriesAll",flagCollectionsAll,flagCollections)
      if (
        ((flagCategories || !flagCategoriesAll) &&
          (flagSaleType || !flagSaleTypeAll) &&
          (flagCollections || !flagCollectionsAll) &&
          flagPriceRange) ||
        (!(flagCategoriesAll || flagCollectionsAll || flagSaleTypeAll) &&
          flagPriceRange)
      ) {
        return newVal;
      }
    });

    for (const sortType in listSortTypes) {
      if (listSortTypes[sortType]) {
        switch (sortType) {
          case "Most recent":
            // newItems.sort((a, b) => {
            //   return Number(a.price) - Number(b.price);
            // });
            newItems.sort((a, b) => {
              return b.createdAt - a.createdAt;
            });
            break;
          case "Price: Low to High":
            newItems.sort((a, b) => {
              return Number(a.price) - Number(b.price);
            });
            break;
          case "Price: High to Low":
            newItems.sort((a, b) => {
              return Number(b.price) - Number(a.price);
            });
            break;
          case "Random":
            newItems.sort(() => Math.random() - 0.5);

            break;
        }
      }
    }
    setItems(newItems);
  };

  // SORT
  const [listSortTypes, setlistSortTypes] = useState({
    "Most recent": false,
    "Price: Low to High": false,
    "Price: High to Low": false,
    Random: false,
  });
  const changelistSortTypes = (event) => {
    console.log(event.target.id, listSortTypes[event.target.id]);
    setlistSortTypes({
      "Most recent": false,
      "Price: Low to High": false,
      "Price: High to Low": false,
      Random: false,
    });
    setlistSortTypes((pre) => {
      return {
        ...pre,
        [event.target.id]: !listSortTypes[event.target.id],
      };
    });
  };
  useEffect(() => {
    updateListToken();
  }, [categories, collections, listSaleTypes, listSortTypes]);

  return (
    <div className="content_explorer section__padding">
      {/*<Filter title="Test" />
  <input type="range" onInput={ handleInput } />
  <h1>Price: { price }</h1>*/}
      <div className="main_name ">Explore NFTs</div>
      <div className="filter">
        <div className="filter-bottoms">
          <div>
            <button
              className={`filter-bottom_ ${
                modalCategory && "filter-bottom-activ"
              }`}
              onClick={() => setModalCategory(!modalCategory)}
            >
              <div className="filter-bottom__icon">{iconCategory}</div>
              <div className="filter-bottom__name">Category</div>
            </button>
            {modalCategory && (
              <div className="for_modal">
                <div className="modal_category">
                  {categoriesArr?.map((category) => {
                    // console.log(category);
                    // console.log(categories[category]);
                    return (
                      <>
                        <button
                          className="modal_category__btn modal-btn"
                          id={category}
                          onClick={changeCategory}
                        >
                          <div className="modal_category__text-btn modal-elem">
                            {category}
                          </div>
                          {categories[category] && (
                            <div className="modal_category__icon_check modal-elem">
                              {iconCheck}
                            </div>
                          )}
                        </button>
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              className={`filter-bottom_ ${
                modalCollection && "filter-bottom-activ"
              }`}
              onClick={() => setModalCollection(!modalCollection)}
            >
              <div className="filter-bottom__icon">{iconCollection}</div>
              <div className="filter-bottom__name">Collection</div>
            </button>

            {modalCollection && (
              <div className="for_modal">
                <div className="modal_collection">
                  {collectionArr.map((collection) => {
                    // console.log(category);
                    // console.log(categories[category]);
                    return (
                      <>
                        <button
                          className="modal_collection__btn modal-btn"
                          id={collection}
                          onClick={changeCollection}
                        >
                          <div className="modal_collection__text-btn modal-elem">
                            {collection}
                          </div>
                          {collections[collection] && (
                            <div className="modal_collection__icon_check modal-elem">
                              {iconCheck}
                            </div>
                          )}
                        </button>
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              className={`filter-bottom_ ${
                modalPrice && "filter-bottom-activ"
              }`}
              onClick={() => setModalPrice(!modalPrice)}
            >
              <div className="filter-bottom__icon">{iconPriceRange}</div>
              <div className="filter-bottom__name">Price range</div>
            </button>
            {modalPrice && (
              <div className="for_modal">
                <div className="modal_price">
                  <div className="modal_price__inputs">
                    <input
                      value={priceFrom}
                      type="number"
                      className="modal_price__input"
                      placeholder="From"
                      onChange={(e) => {
                        setpriceFrom(e.target.value);
                      }}
                    />
                    <input
                      value={priceTo}
                      type="number"
                      className="modal_price__input"
                      placeholder="To"
                      onChange={(e) => {
                        setpriceTo(e.target.value);
                      }}
                    />
                  </div>
                  <div className="modal-price__btns">
                    <button
                      className="modal-price__btn-clear"
                      onClick={clearPriceInput}
                    >
                      Clear all
                    </button>
                    <button
                      className="modal-price__btn-apply"
                      onClick={applyPrice}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
          <button
            className={`filter-bottom_ ${modalSale && "filter-bottom-activ"}`}
            onClick={() => setModalSale(!modalSale)}
          >
            <div className="filter-bottom__icon">{iconSaleType}</div>
            <div className="filter-bottom__name">Sale type</div>
          </button>
          {modalSale && (
            <div className="for_modal">
              <div className="modal_sale">
                <div className="modal_sale__btns">
                  <button
                    className="modal_collection__btn modal-btn"
                    id={"On sale"}
                    onClick={changelistSaleTypes}
                  >
                    <div className="modal_collection__text-btn modal-elem">
                      {"On sale"}
                    </div>
                    {listSaleTypes["On sale"] && (
                      <div className="modal_collection__icon_check modal-elem">
                        {iconCheck}
                      </div>
                    )}
                  </button>
                  <button
                    className="modal_collection__btn modal-btn"
                    id={"Auction"}
                    onClick={changelistSaleTypes}
                  >
                    <div className="modal_collection__text-btn modal-elem">
                      {"Auction"}
                    </div>
                    {listSaleTypes["Auction"] && (
                      <div className="modal_collection__icon_check modal-elem">
                        {iconCheck}
                      </div>
                    )}
                  </button>
                  <button
                    className="modal_collection__btn modal-btn"
                    id={"Others"}
                    onClick={changelistSaleTypes}
                  >
                    <div className="modal_collection__text-btn modal-elem">
                      {"Others"}
                    </div>
                    {listSaleTypes["Others"] && (
                      <div className="modal_collection__icon_check modal-elem">
                        {iconCheck}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
          <div className="filter-bottom_end"></div>
          <div className="image_bird">
            <img src={birdExplorer} alt="" />
          </div>
        </div>
        <div className="most-recent">
          {" "}
          <button
            className={`filter-bottom_ ${modalMost && "filter-bottom-activ"}`}
            onClick={() => setModalMost(!modalMost)}
          >
            <div className="filter-bottom__icon">{iconMostRecent}</div>
            <div className="filter-bottom__name">Most recent</div>
          </button>
          {modalMost && (
            <div className="for_modal">
              <div className="modal_most">
                <div className="modal_most__btns">
                  <div className="modal_most__namesort">Sort by</div>
                  <button
                    className="modal_most__btn modal-btn"
                    id={"Most recent"}
                    onClick={changelistSortTypes}
                  >
                    <div className="modal_most__text-btn modal-elem">
                      {"Most recent"}
                    </div>
                    {listSortTypes["Most recent"] && (
                      <div className="modal_most__icon_check modal-elem">
                        {iconCheck}
                      </div>
                    )}
                  </button>
                  <button
                    className="modal_most__btn modal-btn"
                    id={"Price: Low to High"}
                    onClick={changelistSortTypes}
                  >
                    <div className="modal_most__text-btn modal-elem">
                      {"Price: Low to High"}
                    </div>
                    {listSortTypes["Price: Low to High"] && (
                      <div className="modal_most__icon_check modal-elem">
                        {iconCheck}
                      </div>
                    )}
                  </button>
                  <button
                    className="modal_most__btn modal-btn"
                    id={"Price: High to Low"}
                    onClick={changelistSortTypes}
                  >
                    <div className="modal_most__text-btn modal-elem">
                      {"Price: High to Low"}
                    </div>
                    {listSortTypes["Price: High to Low"] && (
                      <div className="modal_most__icon_check modal-elem">
                        {iconCheck}
                      </div>
                    )}
                  </button>
                  <button
                    className="modal_most__btn modal-btn"
                    id={"Random"}
                    onClick={changelistSortTypes}
                  >
                    <div className="modal_most__text-btn modal-elem">
                      {"Random"}
                    </div>
                    {listSortTypes["Random"] && (
                      <div className="modal_most__icon_check modal-elem">
                        {iconCheck}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isLoading ? (
        <div>
          {" "}
          <Cards items={items} />
        </div>
      ) : (
        <div className="loaderr">{<Loader />}</div>
      )}
    </div>
  );
};

export default Explorer;
