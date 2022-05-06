import React, { useState, useEffect } from "react";
import "./item.css";
import Loader from "../../components/loader/loader";
import apiRequest from "../../api/apiRequest";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { getInfoToken } from "../../scripts";
import { BuyToken } from "../../scripts";
import { WithdrawFromSale } from "../../scripts";
import {Address, ProviderRpcClient,} from 'everscale-inpage-provider';
import { PutOnSale } from "../../scripts";
import LinkBlockchain from "../../components/linkBlockchain/LinkBlockchain";
import { PutUpAuction } from "../../scripts";
import { WithdrawFromAuction } from "../../scripts";
import { EndAuction,StopAuctionOwner,ParticipateInAuction } from "../../scripts";
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
    // send();
    //  setUser(true);
  };
  // item
  // async function getExistingMultisigAccount(client) {
  //   const keys = {
  //     public:
  //       "4ba7586a7bc1e621b3dc0630c7562434a0052c592c1a63ea18a85496d7ff6b1a",
  //     secret:
  //       "d30409bdc0d1669ff818013240f254895e8854b4f8ba7367daf6c59d6cdd8fe0",
  //   };

  //   // Generate an ed25519 key pair for new account
  //   const account = new Account(SafeMultisigContract, {
  //     address:
  //       "0:0eb093156b485497001f06cf5332861b34f306963c2476af5f433fe7050da0a0",
  //     signer: signerKeys(keys),
  //     client,
  //   });
  //   const address = await account.getAddress();

  //   console.log(`Multisig address: ${address}`);
  //   return account;
  // }

  // const putinSale = async () => {

  //   const client = new TonClient({
  //     network: { endpoints: ["http://net.ton.dev"] },
  //   });
  //   try {
  //     let multisigAccount = await getExistingMultisigAccount(client);

  //     const multisigAccountAddress = await multisigAccount.getAddress();

     
  //     const payload = (
  //       await client.abi.encode_message_body({
  //         abi: pkgData.abi,
  //         call_set: {
  //           function_name: "getInfo",
  //           input: {},
  //         },
  //         is_internal: true,
  //         signer: signerNone(),
  //       })
  //     ).body;

  //     // Send actual money to use for ordinary stake.
  //     await multisigAccount.run("sendTransaction", {
  //       dest: "0:3213540b6c5baa579dc21d6d436be84468201146a5992edcfccb1df50a3452f4",
  //       value: 1_000_000_000, // Add more than stake in addOrdinaryStake for blockchain fees.
  //       bounce: false,
  //       flags: 0,
  //       payload, // Payload contains the "addOrdinaryStake" message with deposit order for ordinary stake with 10 TONs.
  //     });

  //     console.log("Wait for depool answer:");

  //   } catch (error) {
  //     console.error(error);
  //     process.exit(1);
  //   }

  //   client.close();
  //   process.exit(0);
  // };

  const putOnSale = async () => {
    await PutOnSale()
    
  };

  const withdrawSale = () => {};
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
            <div className="item-content__block-buy">
              <button className="item-content__btn-buy" onClick={()=>{BuyToken(infoToken.address)}}>Buy now</button>

              <div className="item-content__block-price">
                <div className="item-content__name-price">Current price</div>
                <div className="item-content__price">{infoToken.price} Ē</div>
              </div>
            </div>
            <div className="item-content__btns">
            <button className="item-content__btn-buy" onClick={()=>{PutOnSale(infoToken.address)}}>
              put on sale
            </button>
            <button className="item-content__btn-buy" onClick={()=>{WithdrawFromSale(infoToken.address)}}>
              withdraw from sale
            </button>
            <button className="item-content__btn-buy" onClick={()=>{PutUpAuction(infoToken.address)}}>
            put it up for auction
            </button>
            <button className="item-content__btn-buy" onClick={()=>{WithdrawFromAuction(infoToken.address)}}>
            withdraw from auction
            </button>
            <button className="item-content__btn-buy" onClick={()=>{ParticipateInAuction(infoToken.address)}}>
            participate in the auction
            </button>
            <button className="item-content__btn-buy" onClick={()=>{StopAuctionOwner(infoToken.address)}}>
            StopAuctionOwner
            </button>
            <button className="item-content__btn-buy" onClick={()=>{EndAuction(infoToken.address)}}>
            EndAuction
            </button>
            <button className="item-content__btn-buy" onClick={()=>{getInfoToken(infoToken.address)}}>getInfo</button>
            </div>
           
          
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Item;
