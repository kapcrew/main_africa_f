import React, { useState, useEffect } from "react";
import "./Collection.css";
import Loader from "../../components/loader/loader";
// import { send } from "../../scripts/index.js";
import { Cards } from "../../components";
import apiRequest from "../../api/apiRequest";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import coverImage from "../../assets/coverImage.png";
import { menuCard, iconDischarge } from "../../assets/icon";
import LinkBlockchain from "../../components/linkBlockchain/LinkBlockchain";
const Collection = () => {
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingItem, setisLoadingItem] = useState(false);
  const paramsURL = useParams();
  const [infoCollection, setinfoCollection] = useState([]);
  const [selectingTab, setselectingTab] = useState(1);
  const [items, setItems] = useState([]);
  
  const getItems = async () => {
    setisLoadingItem(false);
    const res = await apiRequest.get(`/collections/get_collection_tokens_by_id?id=${paramsURL.collectionId}`)
    console.log("tokens", res.data);
    setItems(res.data.collectionTokens);
    console.log("tokens", res.data);

    // await getListCollection();

    setisLoadingItem(true);
  };
  // useEffect(() => {
  //   getItems();
  // }, []);

  const gitInfoItem = async () => {
    setisLoading(false);
    const idCollection = paramsURL.collectionId;
    const res = await apiRequest.get(
      `/collections/get_collection_by_id?id=${paramsURL.collectionId}`
    );
    console.log(res.data);
    setinfoCollection(res.data);
    setisLoading(true);

    await getItems()
    
  };
  useEffect(() => {
    gitInfoItem();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="content">
          <div className="cover-image">
            <img src={coverImage} alt="" />
          </div>
          <div className="icon-profile">
            <img className="icon-profile-img" src={infoCollection.collection.picture} alt="" />
          </div>
          <div className="collection-info-prof">
            <div className="collection-info-prof__name">{infoCollection.collection.name}</div>
            <div className="collection-info-prof__statistics">
              <div className="collection-info-prof__statistics_block border_block">
                <div className="collection-info-prof__statistics__name">
                  Items
                </div>
                <div className="collection-info-prof__statistics__value">
                 {infoCollection.collectionTokens}
                </div>
              </div>
              {/* <div className="collection-info-prof__statistics_block border_block">
                <div className="collection-info-prof__statistics__name">
                  Items
                </div>
                <div className="collection-info-prof__statistics__value">
                  8k
                </div>
              </div>
              <div className="collection-info-prof__statistics_block border_block">
                <div className="collection-info-prof__statistics__name">
                  Items
                </div>
                <div className="collection-info-prof__statistics__value">
                  8k
                </div>
              </div> */}
              <div className="collection-info-prof__statistics_block right_block">
                <div className="collection-info-prof__statistics__name">
                  Items
                </div>
                <div className="collection-info-prof__statistics__value">
                  8k
                </div>
              </div>
            </div>
            <div className="collection-info-prof__description">
              {infoCollection.collection.description}
            </div>
          </div>
          <div className="info-collection__btns">
            <div className="info-user__bnt-update">{menuCard}</div>
            <div className="info-user__bnt-discharge">{iconDischarge}</div>
          </div>
          <div className="tabs-token">
            <button
              onClick={() => {
                setselectingTab(1);
              }}
              className={`tab-btn tab-onsale ${
                selectingTab == 1 ? "activ-tab-prof" : ""
              }`}
            >
              Item
            </button>

            <button
              onClick={() => {
                setselectingTab(2);
              }}
              className={`tab-btn tab-favorites ${
                selectingTab == 2 ? "activ-tab-prof" : ""
              }`}
            >
              Activity
            </button>
          </div>
          <div className="tabs-line"></div>
          <div className="tokens">
            {isLoadingItem ? (
              selectingTab === 1 && <Cards items={items} />
            ) : (
              <div className="loaderr">{<Loader />}</div>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Collection;
