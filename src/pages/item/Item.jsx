import React, { useState, useEffect } from "react";
import "./item.css";
import Loader from "../../components/loader/loader";
import apiRequest from "../../api/apiRequest";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { getInfoToken } from "../../scripts";
import { BuyToken } from "../../scripts";
import { WithdrawFromSale } from "../../scripts";
import { Address, ProviderRpcClient } from "everscale-inpage-provider";
import { PutOnSale } from "../../scripts";
import LinkBlockchain from "../../components/linkBlockchain/LinkBlockchain";
import { PutUpAuction } from "../../scripts";
import { WithdrawFromAuction } from "../../scripts";
import {
  EndAuction,
  StopAuctionOwner,
  ParticipateInAuction,
} from "../../scripts";
import Modal from "../../components/Modal/Modal";
import { Toaster, toast } from "react-hot-toast";
import PagePreloader from "../../components/page-preloader/PagePreloader";
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

    setchoiceDetails(1)
    
    const token = await getInfoToken(address);

    setendAuctionTime(timeConverter(token.endAuctionTimestamp));
    setisAuctionTime(new Date() > new Date(token.endAuctionTimestamp * 1000));

    console.log(new Date(), new Date(token.endAuctionTimestamp * 1000));
    console.log(new Date() > new Date(token.endAuctionTimestamp * 1000));
  };
  const [endAuctionTime, setendAuctionTime] = useState();
  const [isAuctionTime, setisAuctionTime] = useState(true);
  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }
  useEffect(() => {
    gitInfoItem();
  }, []);

  const [isProcess, setisProcess] = useState(false);
  const [choiceDetails, setchoiceDetails] = useState(1);

  const [priceTokenModal, setpriceTokenModal] = useState();
  const [priceAuction, setpriceAuction] = useState();
  const [durationAuction, setdurationAuction] = useState();
  const [bidAuctionPrice, setbidAuctionPrice] = useState();

  const checkStatus = async (field, value) => {
    toast.loading("There is a process in the blockchain...");
    // const token = await getInfoToken(infoToken.address)

    let timerId = setInterval(async () => {
      const token = await getInfoToken(infoToken.address);
      if (token[field] === value) {
        toast.dismiss();
        toast.success("Your operation is done!");
        clearInterval(timerId);
        clearTimeout(timerTimeout);
        gitInfoItem();
      }
    }, 2000);
    const timerTimeout = setTimeout(() => {
      toast.dismiss();
      toast.error("Something went wrong");
      clearInterval(timerId);
    }, 30000);
  };
  const checkStatusAuctionLider = async () => {
    toast.loading("There is a process in the blockchain...");
    // const token = await getInfoToken(infoToken.address)

    let timerId = setInterval(async () => {
      const token = await getInfoToken(infoToken.address);
      if (token.auctionLider._address === localStorage.getItem("userAddress")) {
        toast.dismiss();
        toast.success("Your operation is done!");
        clearInterval(timerId);
        clearTimeout(timerTimeout);
        gitInfoItem();
      }
    }, 2000);
    const timerTimeout = setTimeout(() => {
      toast.dismiss();
      toast.error("Something went wrong");
      clearInterval(timerId);
    }, 30000);
  };
  // MODAL PUT ON SALE
  const [isModalPutOnSale, setisModalPutOnSale] = useState(false);

  const btnPutOnSale = async () => {
    setisModalPutOnSale(false);
    if (await PutOnSale(infoToken.address, priceTokenModal)) {
      await checkStatus("onSale", true);
    }
  };

  // MODAL BUY
  const [isModalBuy, setisModalBuy] = useState(false);

  const btnBuy = async () => {
    setisModalBuy(false);
    if (await BuyToken(infoToken.address, infoToken.price)) {
      await checkStatus("onSale", false);
    }
  };

  // MODAL withdraw from sale

  const [isWithdrawSaleModal, setisWithdrawSaleModal] = useState(false);

  const btnWithdrawSaleModal = async () => {
    setisWithdrawSaleModal(false);
    if (await WithdrawFromSale(infoToken.address, infoToken.price)) {
      await checkStatus("onSale", false);
    }
  };

  // MODAL put it up for auction

  const [isputItUpAuction, setisputItUpAuction] = useState(false);

  const btnPutItUpAuctionModal = async () => {
    setisputItUpAuction(false);
    console.log(priceAuction, durationAuction);
    if (await PutUpAuction(infoToken.address, priceAuction, durationAuction)) {
      await checkStatus("onAuction", true);
    }
  };

  const [isParticipateInAuction, setisParticipateInAuction] = useState(false);

  const btnParticipateInAuctionModal = async () => {
    const token = await getInfoToken(infoToken.address);

    setendAuctionTime(timeConverter(token.endAuctionTimestamp));
    setisAuctionTime(new Date() > new Date(token.endAuctionTimestamp * 1000));
    console.log(token);

    if (new Date() < new Date(token.endAuctionTimestamp * 1000)) {
      setisParticipateInAuction(false);
      if (Number(token.auctionPrice) < bidAuctionPrice) {
        if (await ParticipateInAuction(infoToken.address, bidAuctionPrice)) {
          await checkStatusAuctionLider();
          // token.auctionLider._address
        }
      } else {
        toast.error(
          `Your bid is lower than the previous one (${token.auctionPrice})`
        );
      }
    } else {
      toast.error("Unfortunately the auction has already ended :(");
    }
  };

  // MODAL StopAuctionOwner

  const [isStopAuctionOwner, setisStopAuctionOwner] = useState(false);

  const btnStopAuctionOwner = async () => {
    setisStopAuctionOwner(false);
    if (await StopAuctionOwner(infoToken.address)) {
      await checkStatus("onAuction", false);
    }
  };

  // MODAL EndAuction

  const [isEndAuction, setisEndAuction] = useState(false);

  const btnEndAuction = async () => {
    setisEndAuction(false);
    if (await EndAuction(infoToken.address)) {
      await checkStatus("onAuction", false);
    }
  };

  const visibleBtnPutOnSale =
    !infoToken.onSale &&
    !infoToken.onAuction &&
    infoToken.owner === localStorage.getItem("userAddress");
  const visibleBtnBuyNow =
    infoToken.onSale &&
    !infoToken.onAuction &&
    infoToken.owner !== localStorage.getItem("userAddress");

  const visibleBtnWithdrawFromSale =
    infoToken.onSale &&
    !infoToken.onAuction &&
    infoToken.owner === localStorage.getItem("userAddress");

  const visibleBtnStopAuctionOwner =
    !infoToken.onSale &&
    infoToken.onAuction &&
    infoToken.owner === localStorage.getItem("userAddress");

  const visibleBtnEndAuction =
    !infoToken.onSale && infoToken.onAuction && isAuctionTime;

  const visibleBtnParticipateInAuction =
    !infoToken.onSale &&
    infoToken.onAuction &&
    infoToken.owner !== localStorage.getItem("userAddress") &&
    !isAuctionTime;
  return (
    <div>
      {isProcess && <PagePreloader />}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "toaster",
        }}
      />
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
            <div className="item-content__status">
              {infoToken.onSale && "On sale"}
              {infoToken.onAuction && "At the auction before:"}
              {infoToken.onAuction && (
                <span className="time-auction">{endAuctionTime}</span>
              )}
              {!infoToken.onSale && !infoToken.onAuction && "Not for sale"}
            </div>

            <div className="item-content__description">
              {infoToken.description}
            </div>

            <div className="item-content__block-details">
              <div className="item-content__choice-details">
                <div
                  className={`main-name-details ${
                    choiceDetails == 1 && "activ-tab-prof"
                  }`}
                  onClick={() => {
                    setchoiceDetails(1);
                  }}
                >
                  Details
                </div>
                {infoToken.onAuction && (
                  <div
                    className={`main-name-details ${
                      choiceDetails == 2 && "activ-tab-prof"
                    }`}
                    onClick={() => {
                      setchoiceDetails(2);
                    }}
                  >
                    Current bid
                  </div>
                )}
              </div>
              {choiceDetails === 1 && (
                <div>
                  <div className="item-content__users">
                    <div className="item-content__block-details-item">
                      <div className="name-details">Creator</div>
                      <div className="res-details">
                        {infoToken.creator?.substring(0, 4)}...
                        {infoToken.creator?.substring(62)}
                        <div className="link-blockchain">
                          {" "}
                          <LinkBlockchain address={infoToken.creator} />
                        </div>
                      </div>
                    </div>
                    <div className="item-content__block-details-item">
                      <div className="name-details">Owner</div>
                      <div className="res-details">
                        {infoToken.owner?.substring(0, 4)}...
                        {infoToken.owner?.substring(62)}
                        <div className="link-blockchain">
                          {" "}
                          <LinkBlockchain address={infoToken.owner} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item-content__item">
                    <div className="item-content__block-details-item">
                      <div className="name-details">Collection</div>
                      <div className="res-details">{infoToken.collection}</div>
                    </div>
                    <div className="item-content__block-details-item">
                      <div className="name-details">Address</div>
                      <div className="res-details">
                        {infoToken.address?.substring(0, 4)}...
                        {infoToken.address?.substring(62)}
                        <div className="link-blockchain">
                          {" "}
                          <LinkBlockchain address={infoToken.address} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {choiceDetails === 2 && (
                <div className="auction-info">
                  {infoToken.onAuction && (
                    <div className="auction-lider">
                      Last bid:
                      {!1 ? (
                        <span className="auction-lider__address">
                          the auction is over
                        </span>
                      ) : infoToken.auctionLider ===
                        "0:0000000000000000000000000000000000000000000000000000000000000000" ? (
                        <span className="auction-lider__address">
                          your bid will be the first
                        </span>
                      ) : (
                        <span>
                          <span className="auction-lider__address">
                            {infoToken.auctionLider?.substring(0, 4)}...
                            {infoToken.auctionLider?.substring(62)}
                          </span>
                          made a bet in{" "}
                          <span className="auction-lider__address">
                            {infoToken.auctionPrice} EVER
                          </span>{" "}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            {visibleBtnBuyNow && (
              <div className="item-content__block-buy">
                <button
                  className="item-content__btn-buy"
                  onClick={() => {
                    setisModalBuy(true);
                  }}
                >
                  Buy now
                </button>
                <div className="item-content__block-price">
                  <div className="item-content__name-price">Current price</div>
                  <div className="item-content__price">{infoToken.price} Ē</div>
                </div>
              </div>
            )}
            <div className="item-content__btns">
              <div className="btns-billing">
                {visibleBtnPutOnSale && (
                  <button
                    className="item-content__btn-buy"
                    onClick={() => {
                      setisModalPutOnSale(true);
                      // PutOnSale(infoToken.address);
                    }}
                  >
                    Put on sale
                  </button>
                )}
                {visibleBtnPutOnSale && (
                  <button
                    className="item-content__btn-buy"
                    onClick={() => {
                      setisputItUpAuction(true);
                    }}
                  >
                    Put it up for auction
                  </button>
                )}
              </div>

              {visibleBtnWithdrawFromSale && (
                <div className="item-content__block-buy">
                  <button
                    className="item-content__btn-buy"
                    onClick={() => {
                      setisWithdrawSaleModal(true);
                    }}
                  >
                    Withdraw from sale
                  </button>
                  <div className="item-content__block-price">
                    <div className="item-content__name-price">
                      Current price
                    </div>
                    <div className="item-content__price">
                      {infoToken.price} Ē
                    </div>
                  </div>
                </div>
              )}
              <div className="btns-billing">
                {visibleBtnStopAuctionOwner && (
                  <button
                    className="item-content__btn-buy"
                    onClick={() => {
                      setisStopAuctionOwner(true);
                    }}
                  >
                    Stop auction
                  </button>
                )}
                {JSON.stringify(visibleBtnEndAuction)}
                {visibleBtnEndAuction && (
                  <button
                    className="item-content__btn-buy"
                    onClick={() => {
                      setisEndAuction(true);
                    }}
                  >
                    End auction
                  </button>
                )}
              </div>
              {visibleBtnParticipateInAuction && (
                <button
                  className="item-content__btn-buy"
                  onClick={() => {
                    setisParticipateInAuction(true);
                  }}
                >
                  Place a bet
                </button>
              )}

              {/* <button
                className="item-content__btn-buy"
                onClick={() => {
                  getInfoToken(infoToken.address);
                }}
              >
                getInfo
              </button> */}
            </div>
          </div>

          <div className="modal-windows-tokens">
            {/* {isModalPutOnSale &&  */}
            <Modal active={isModalPutOnSale} setActive={setisModalPutOnSale}>
              <div className="modal-tokens-action">
                <div className="modal-tokens-action__name">Put on sale</div>
                <div className="modal-tokens-action__content">
                  <div className="modal-tokens-action__submaintext">Item</div>
                  <div className="modal-tokens-action__token-info">
                    <div className="modal-tokens-action__image">
                      <img
                        src={"https://" + infoToken.media}
                        className="modal-tokens-action__image-img"
                        alt=""
                      />
                    </div>
                    <div className="modal-tokens-action__token-title">
                      <div className="modal-tokens-action__token-title-collection">
                        {infoToken.collection} Collection
                      </div>
                      <div className="modal-tokens-action__token-title-name">
                        {infoToken.title}
                      </div>
                    </div>
                    <div className="modal-tokens-action__price">
                      {infoToken.price} Ē
                    </div>
                  </div>

                  <div className="modal-tokens-action__submaintext text-name-price">
                    Your price
                  </div>
                  <input
                    type="number"
                    placeholder="Enter your price"
                    className="modal-tokens-action__input"
                    value={priceTokenModal}
                    onChange={(e) => {
                      setpriceTokenModal(e.target.value);
                    }}
                  />
                  <div className="modal-token__block-btn">
                    <button
                      className="modal-token__btn"
                      onClick={() => {
                        btnPutOnSale();
                      }}
                    >
                      Put on sale
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
            {/* <div className="modal-tokens-action">

             </div> */}
            {/* } */}

            <Modal active={isModalBuy} setActive={setisModalBuy}>
              <div className="modal-tokens-action">
                <div className="modal-tokens-action__name">Buy item</div>
                <div className="modal-tokens-action__content">
                  <div className="modal-tokens-action__submaintext">Item</div>
                  <div className="modal-tokens-action__token-info">
                    <div className="modal-tokens-action__image">
                      <img
                        src={"https://" + infoToken.media}
                        className="modal-tokens-action__image-img"
                        alt=""
                      />
                    </div>
                    <div className="modal-tokens-action__token-title">
                      <div className="modal-tokens-action__token-title-collection">
                        {infoToken.collection} Collection
                      </div>
                      <div className="modal-tokens-action__token-title-name">
                        {infoToken.title}
                      </div>
                    </div>
                    <div className="modal-tokens-action__price">
                      {infoToken.price} Ē
                    </div>
                  </div>

                  <div className="modal-token__block-btn">
                    <button
                      className="modal-token__btn"
                      onClick={() => {
                        btnBuy();
                      }}
                    >
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            </Modal>

            <Modal
              active={isWithdrawSaleModal}
              setActive={setisWithdrawSaleModal}
            >
              <div className="modal-tokens-action">
                <div className="modal-tokens-action__name">
                  Withdraw from sale
                </div>
                <div className="modal-tokens-action__content">
                  <div className="modal-tokens-action__submaintext">Item</div>
                  <div className="modal-tokens-action__token-info">
                    <div className="modal-tokens-action__image">
                      <img
                        src={"https://" + infoToken.media}
                        className="modal-tokens-action__image-img"
                        alt=""
                      />
                    </div>
                    <div className="modal-tokens-action__token-title">
                      <div className="modal-tokens-action__token-title-collection">
                        {infoToken.collection} Collection
                      </div>
                      <div className="modal-tokens-action__token-title-name">
                        {infoToken.title}
                      </div>
                    </div>
                    <div className="modal-tokens-action__price">
                      {infoToken.price} Ē
                    </div>
                  </div>

                  <div className="modal-token__block-btn">
                    <button
                      className="modal-token__btn"
                      onClick={() => {
                        btnWithdrawSaleModal();
                      }}
                    >
                      Withdraw from sale
                    </button>
                  </div>
                </div>
              </div>
            </Modal>

            {/* <Modal
              active={isWithdrawSaleModal}
              setActive={setisWithdrawSaleModal}
            >
              <div className="modal-tokens-action">
                <div className="modal-tokens-action__name">
                  Withdraw from sale
                </div>
                <div className="modal-tokens-action__content">
                  <div className="modal-tokens-action__submaintext">Item</div>
                  <div className="modal-tokens-action__token-info">
                    <div className="modal-tokens-action__image">
                      <img
                        src={"https://" + infoToken.media}
                        className="modal-tokens-action__image-img"
                        alt=""
                      />
                    </div>
                    <div className="modal-tokens-action__token-title">
                      <div className="modal-tokens-action__token-title-collection">
                        {infoToken.collection} Collection
                      </div>
                      <div className="modal-tokens-action__token-title-name">
                        {infoToken.title}
                      </div>
                    </div>
                    <div className="modal-tokens-action__price">
                      {infoToken.price} Ē
                    </div>
                  </div>

                  <div className="modal-token__block-btn">
                    <button
                      className="modal-token__btn"
                      onClick={() => {
                        btnWithdrawSaleModal();
                      }}
                    >
                      Withdraw from sale
                    </button>
                  </div>
                </div>
              </div>
            </Modal> */}

            <Modal active={isputItUpAuction} setActive={setisputItUpAuction}>
              <div className="modal-tokens-action">
                <div className="modal-tokens-action__name">
                  Put it up for auction
                </div>
                <div className="modal-tokens-action__content">
                  <div className="modal-tokens-action__submaintext">Item</div>
                  <div className="modal-tokens-action__token-info">
                    <div className="modal-tokens-action__image">
                      <img
                        src={"https://" + infoToken.media}
                        className="modal-tokens-action__image-img"
                        alt=""
                      />
                    </div>
                    <div className="modal-tokens-action__token-title">
                      <div className="modal-tokens-action__token-title-collection">
                        {infoToken.collection} Collection
                      </div>
                      <div className="modal-tokens-action__token-title-name">
                        {infoToken.title}
                      </div>
                    </div>
                    <div className="modal-tokens-action__price">
                      {infoToken.price} Ē
                    </div>
                  </div>
                  <div className="modal-tokens-action__submaintext text-name-price">
                    Your price
                  </div>
                  <input
                    type="number"
                    placeholder="Enter your price"
                    className="modal-tokens-action__input"
                    value={priceAuction}
                    onChange={(e) => {
                      setpriceAuction(e.target.value);
                    }}
                  />

                  <div className="modal-tokens-action__submaintext text-name-price">
                    Auction duration
                  </div>
                  <input
                    type="number"
                    placeholder="Enter the auction duration in seconds"
                    className="modal-tokens-action__input"
                    value={durationAuction}
                    onChange={(e) => {
                      setdurationAuction(e.target.value);
                    }}
                  />
                  <div className="modal-token__block-btn">
                    <button
                      className="modal-token__btn"
                      onClick={() => {
                        btnPutItUpAuctionModal();
                      }}
                    >
                      Put it up for auction
                    </button>
                  </div>
                </div>
              </div>
            </Modal>

            {/*            

            <Modal
              active={isWithdrawFromAuction}
              setActive={setisWithdrawFromAuction}
            >
              <div className="modal-tokens-action">
                <div className="modal-tokens-action__name">
                  withdraw from auction
                </div>
                <div className="modal-tokens-action__content">
                  <div className="modal-tokens-action__submaintext">Item</div>
                  <div className="modal-tokens-action__token-info">
                    <div className="modal-tokens-action__image">
                      <img
                        src={"https://" + infoToken.media}
                        className="modal-tokens-action__image-img"
                        alt=""
                      />
                    </div>
                    <div className="modal-tokens-action__token-title">
                      <div className="modal-tokens-action__token-title-collection">
                        {infoToken.collection} Collection
                      </div>
                      <div className="modal-tokens-action__token-title-name">
                        {infoToken.title}
                      </div>
                    </div>
                    <div className="modal-tokens-action__price">
                      {infoToken.price} Ē
                    </div>
                  </div>

                  <div className="modal-token__block-btn">
                    <button
                      className="modal-token__btn"
                      onClick={() => {
                        btnWithdrawFromAuctionModal();
                      }}
                    >
                      withdraw from auction
                    </button>
                  </div>
                </div>
              </div>
            </Modal> */}

            <Modal
              active={isParticipateInAuction}
              setActive={setisParticipateInAuction}
            >
              <div className="modal-tokens-action">
                <div className="modal-tokens-action__name">Place a bet</div>
                <div className="modal-tokens-action__content">
                  <div className="modal-tokens-action__submaintext">Item</div>
                  <div className="modal-tokens-action__token-info">
                    <div className="modal-tokens-action__image">
                      <img
                        src={"https://" + infoToken.media}
                        className="modal-tokens-action__image-img"
                        alt=""
                      />
                    </div>
                    <div className="modal-tokens-action__token-title">
                      <div className="modal-tokens-action__token-title-collection">
                        {infoToken.collection} Collection
                      </div>
                      <div className="modal-tokens-action__token-title-name">
                        {infoToken.title}
                      </div>
                    </div>
                    <div className="modal-tokens-action__price">
                      {infoToken.price} Ē
                    </div>
                  </div>
                  <div className="modal-tokens-action__submaintext text-name-price">
                    Your bid
                  </div>
                  <input
                    type="number"
                    placeholder="Enter the auction duration in seconds"
                    className="modal-tokens-action__input"
                    value={bidAuctionPrice}
                    onChange={(e) => {
                      setbidAuctionPrice(e.target.value);
                    }}
                  />
                  <div className="modal-token__block-btn">
                    <button
                      className="modal-token__btn"
                      onClick={() => {
                        btnParticipateInAuctionModal();
                      }}
                    >
                      Place a bet
                    </button>
                  </div>
                </div>
              </div>
            </Modal>

            <Modal
              active={isStopAuctionOwner}
              setActive={setisStopAuctionOwner}
            >
              <div className="modal-tokens-action">
                <div className="modal-tokens-action__name">Stop auction</div>
                <div className="modal-tokens-action__content">
                  <div className="modal-tokens-action__submaintext">Item</div>
                  <div className="modal-tokens-action__token-info">
                    <div className="modal-tokens-action__image">
                      <img
                        src={"https://" + infoToken.media}
                        className="modal-tokens-action__image-img"
                        alt=""
                      />
                    </div>
                    <div className="modal-tokens-action__token-title">
                      <div className="modal-tokens-action__token-title-collection">
                        {infoToken.collection} Collection
                      </div>
                      <div className="modal-tokens-action__token-title-name">
                        {infoToken.title}
                      </div>
                    </div>
                    <div className="modal-tokens-action__price">
                      {infoToken.price} Ē
                    </div>
                  </div>

                  <div className="modal-token__block-btn">
                    <button
                      className="modal-token__btn"
                      onClick={() => {
                        btnStopAuctionOwner();
                      }}
                    >
                      Stop auction
                    </button>
                  </div>
                </div>
              </div>
            </Modal>

            <Modal active={isEndAuction} setActive={setisEndAuction}>
              <div className="modal-tokens-action">
                <div className="modal-tokens-action__name">End auction</div>
                <div className="modal-tokens-action__content">
                  <div className="modal-tokens-action__submaintext">Item</div>
                  <div className="modal-tokens-action__token-info">
                    <div className="modal-tokens-action__image">
                      <img
                        src={"https://" + infoToken.media}
                        className="modal-tokens-action__image-img"
                        alt=""
                      />
                    </div>
                    <div className="modal-tokens-action__token-title">
                      <div className="modal-tokens-action__token-title-collection">
                        {infoToken.collection} Collection
                      </div>
                      <div className="modal-tokens-action__token-title-name">
                        {infoToken.title}
                      </div>
                    </div>
                    <div className="modal-tokens-action__price">
                      {infoToken.price} Ē
                    </div>
                  </div>

                  <div className="modal-token__block-btn">
                    <button
                      className="modal-token__btn"
                      onClick={() => {
                        btnEndAuction();
                      }}
                    >
                      End auction
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      ) : (
        <div className="loader-content-page">
          <Loader />
        </div>
      )}
    </div>
  );
};
// isModalBuy
export default Item;
