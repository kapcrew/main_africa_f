import React, { useState, useEffect } from "react";
import "./item.css";
import Loader from "../../components/loader/loader";
import { send } from "../../scripts/index.js";
import apiRequest from "../../api/apiRequest";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Account } from '@tonclient/appkit';
import {
  signerKeys,
  TonClient,
  MessageBodyType,
  signerNone,
  abiContract,
} from "@tonclient/core";
import LinkBlockchain from "../../components/linkBlockchain/LinkBlockchain";
const Item = () => {
  function submitform () {
    (async () => {
  
      const client = new TonClient({
        network: {
          endpoints: ['net.ton.dev']
        }
      });
      
  
      // var form = document.querySelector('#myform');
      // var formData = new FormData(form);
      // var address = formData.get('address');
      // var token = formData.get('token');
      // const tokenvalue = parseFloat(token) * 1000000000;
      // console.log(tokenvalue);
      // var seed = formData.get('seed');
      // const SEED_PHRASE_WORD_COUNT = 12;
      // const SEED_PHRASE_DICTIONARY_ENGLISH = 1;
      // const HD_PATH = "m/44'/396'/0'/0/0";
      // const keysgen = (await client.crypto.mnemonic_derive_sign_keys({
      //   dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
      //   word_count: SEED_PHRASE_WORD_COUNT,
      //   phrase: seed,
      //   path: HD_PATH,
      // }).catch(e => console.log("ERROR:", e)));
  
      // const accountroot = new Account(
      //   TokenRoot,
      //   {
      //     signer: signerKeys(keysgen),
      //     address: "0:7f6225f4b84d9889593fb1d9366e12132b6b0c007db813f17897e33033e9a9ae",
      //     client
      //   }
      // );
      // const wallet_address = await(accountroot.runLocal("getWalletAddress",{pubkey:"0x"+keysgen["public"]}).catch(e => console.log("ERROR:", e)))
      // addHTML(`Ваш адрес токена кошелька: ${(wallet_address["decoded"]["output"]["value0"])}`);
      // const wallet_address_f = wallet_address["decoded"]["output"]["value0"]
      // const tip3create = new Account(
      //   TokenWallet,
      //   {
      //     signer: signerKeys(keysgen),
      //     address: wallet_address_f,
      //     client
      //   }
      // );
      // const balancedo1 = await(tip3create.runLocal("getBalance",{}).catch(e => console.log("ERROR:", e)))
      // addHTML(`Ваш баланс: ${(balancedo1["decoded"]["output"]["value0"])} токенов EVR21`);
      // addHTML(`Переводим с вашего кошелька ${wallet_address_f } на кошелек: ${address} в количестве ${token}`);
      // const transfer = await(tip3create.run("transfer",{
      //   answer_addr:wallet_address_f,
      //   to:address,
      //   tokens:tokenvalue,
      //   evers:500000000,
      //   return_ownership:0,
      // }).catch(e => console.log("ERROR:", e)))
  
  
    })();
  };







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
  const putOnSale = () => {
    submitform()
  };

  const withdrawSale = () => {

  };
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
                      <LinkBlockchain address={infoToken.creator} />
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
                      <LinkBlockchain address={infoToken.creator} />
                    </div>
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
            {/* <button className="item-content__btn-buy" onClick={putOnSale}>
              put on sale
            </button>
            <button className="item-content__btn-buy" onClick={withdrawSale}>
              withdraw from sale
            </button> */}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Item;
