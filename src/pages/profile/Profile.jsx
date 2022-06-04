import React, { useState, useEffect } from "react";
import "./profile.css";
import { Cards } from "../../components";
import { Toaster, toast } from "react-hot-toast";
import Loader from "../../components/loader/loader";
import apiRequest from "../../api/apiRequest";
import coverImage from "../../assets/coverImage.png";
import {
  menuCard,
  iconDischarge,
  profileDiscord,
  profileTwitter,
  profileInstagram,
} from "../../assets/icon";
import CardCollection from "../../components/cardCollection/CardCollection";
import DropzoneLoaderFile from "../../components/dropzoneLoaderFile/DropzoneLoaderFile";

const Profile = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const getItems = async () => {
    setisLoading(false);
    const res = await apiRequest.get(
      `/items/get_items_by_owner?owner=${localStorage.getItem("userAddress")}`
    );
    setItems(res.data);
    console.log("tokens", res.data, localStorage.getItem("userAddress"));

    await getListCollection();

    setisLoading(true);
  };
  useEffect(() => {
    getItems();
  }, []);

  const [profile, setProfile] = useState([]);

  const [modalUpdateData, setmodalUpdateData] = useState(false);
  const [name, setname] = useState();
  const [surname, setsurname] = useState();
  const [description, setdescription] = useState();
  const [iconPrif, seticonPrif] = useState();

  const [Email, setEmail] = useState();
  const [Instagram, setInstagram] = useState();
  const [Twitter, setTwitter] = useState();
  const [Discord, setDiscord] = useState();
  const [Bio, setBio] = useState();
  const [WebSite, setWebSite] = useState();
  const [ReferalCodeInput, setReferalCodeInput] = useState();
  const [ReferalCode, setReferalCode] = useState();

  const [isDisabledReferalCodeInput, setisDisabledReferalCodeInput] =
    useState(false);

  const getProfile = async () => {
    await apiRequest.get("/profile/get_profile/").then((response) => {
      console.log(response);
      const myProfile = response.data;
      console.log(myProfile);
      setProfile(myProfile);
      setname(response.data.name);
      setsurname(response.data.surname);
      setdescription(response.data.description);
      seticonPrif(response.data.profilePicture);

      setEmail(response.data.email);
      setInstagram(response.data.instagram);
      setTwitter(response.data.twitter);
      setDiscord(response.data.discord);
      setBio(response.data.bio);
      setWebSite(response.data.website);
      setReferalCodeInput(response.data.affiliate);
      setReferalCode(response.data.refCode);

      if (
        !(response.data.affiliate === "xxx" || response.data.affiliate === "")
      ) {
        setisDisabledReferalCodeInput(true);
      }
    });
  };

  useEffect(() => {
    getProfile();
  }, []);
  const updateProfile = async () => {
    if (ReferalCodeInput === "xxx") {
      setReferalCodeInput("");
    }
    console.log("ReferalCodeInput", ReferalCodeInput);
    const objectData = {
      description: "description",
      name: name,
      surname: surname,
      profilePicture: imageFile,
      affiliate: ReferalCodeInput,
      email: Email,
      instagram: Instagram,
      twitter: Twitter,
      discord: Discord,
      bio: Bio,
      website: WebSite,
    };
    if (ReferalCodeInput === "" || ReferalCodeInput === "xxx"){
      delete objectData.affiliate;
    }
    await apiRequest
      .post("/profile/update_profile/", objectData)
      .catch(({ response: { data } }) => {
        toast.error(data.error);
        console.log("error", data);
      });
    await getProfile();
    setmodalUpdateData(false);
  };
  const formatDate = (date) => {
    let formattedDate = new Date(date);
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      formattedDate.getDate() +
      " " +
      months[formattedDate.getMonth()] +
      " " +
      formattedDate.getFullYear()
    );
  };
  // FILE TO BASE64 -------------------------------------------------

  const readFileDataAsBase64 = (file) => {
    //const file = event.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target?.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  };
  const [imageFile, setimageFile] = useState();
  const [imageFileName, setimageFileName] = useState();
  const updateImageHandleOnDrop = (file) => {
    readFileDataAsBase64(file[0]).then((file) => {
      setimageFile(String(file));
    });

    setimageFileName(file[0].name);
  };

  const [listCollection, setlistCollection] = useState([]);

  const getListCollection = async () => {
    // setisLoading(false);
    const req = await apiRequest.get("/collections/get_collections_by_wallet");
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
    // setisLoading(true);
  };

  const [selectingTab, setselectingTab] = useState(1);
  return (
    <div className="content">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "toaster",
        }}
      />
      <div className="cover-image">
        <img src={coverImage} alt="" />
      </div>
      <div className="icon-profile">
        <img className="icon-profile-img" src={iconPrif} alt="" />
      </div>

      <div className="info-user">
        <div className="ref-code">
          <div className="ref-code__title">Referral code</div>
          <div className="ref-code__code">{ReferalCode}</div>
        </div>
        <div className="info-user__name-user">
          {profile.name} {profile.surname}
          <div className="icons_media">
            {Discord && (
              <div
                className="info-user__icon_media"
                onClick={() => window.open(Discord, "_blank")}
              >
                {profileDiscord}
              </div>
            )}
            {Twitter && (
              <div
                className="info-user__icon_media"
                onClick={() => window.open(Twitter, "_blank")}
              >
                {profileTwitter}
              </div>
            )}
            {Instagram && (
              <div
                className="info-user__icon_media"
                onClick={() => window.open(Instagram, "_blank")}
              >
                {profileInstagram}
              </div>
            )}
          </div>
        </div>
        <div className="info-user__email-website">
          {Email && <div className="info-user__email">{Email}</div>}
          {WebSite && Email && (
            <div className="info-user__email-website-wall">
              <svg
                width="1"
                height="27"
                viewBox="0 0 1 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.5"
                  x2="0.5"
                  y2="27"
                  stroke="#482B08"
                  stroke-opacity="0.3"
                />
              </svg>
            </div>
          )}
          {WebSite && <div className="info-user__website">{WebSite}</div>}
        </div>
        <div className="info-user__address-user">
          {"0:" + profile.walletId?.substring(0, 2)}...
          {profile.walletId?.substring(60)}
        </div>
        <div className="info-user__date-reg">
          {formatDate(profile.createdAt)}
        </div>
        <div className="info-user__btns">
          <div
            className="info-user__bnt-update"
            onClick={() => {
              setmodalUpdateData(!modalUpdateData);
            }}
          >
            {menuCard}
          </div>
          <div className="info-user__bnt-discharge">{iconDischarge}</div>
        </div>
        {Bio && (
          <div className="info-user__description">
            <div className="info-user__description_text">{Bio}</div>
          </div>
        )}
        {modalUpdateData && (
          <div className="for-modal-creact-collection">
            <div className="modalUpdateData">
              <div className="modalUpdateData__content">
                <div className="modalUpdateData__block_name">
                  <div className="modalUpdateData__block_data">
                    <div className="modalUpdateData__title">Name</div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      className="modalUpdateData__input_name"
                    />
                  </div>
                  <div className="modalUpdateData__block_data">
                    <div className="modalUpdateData__title">Surname</div>
                    <input
                      type="text"
                      value={surname}
                      onChange={(e) => setsurname(e.target.value)}
                      className="modalUpdateData__input_name"
                    />
                  </div>
                </div>

                <div className="modalUpdateData__block_data">
                  <div className="modalUpdateData__title">Bio</div>
                  <textarea
                    onChange={(e) => setBio(e.target.value)}
                    value={Bio}
                    type="text"
                    className="modalUpdateData__input_description"
                  />
                </div>
                <div className="modalUpdateData__block_data">
                  <div className="modalUpdateData__title">Avatar</div>
                  <div className="modal-creact-collection__loader-image">
                    <DropzoneLoaderFile
                      className="dropzone-modal"
                      file={imageFile}
                      setfile={setimageFile}
                      namefile={imageFileName}
                      setnameFile={setimageFileName}
                      textBefore={
                        <>Click, select or drag a file to the current area</>
                      }
                    />
                  </div>
                </div>
                <div className="modalUpdateData__block_name">
                  <div className="modalUpdateData__block_data">
                    <div className="modalUpdateData__title">Email</div>
                    <input
                      type="text"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="modalUpdateData__input_name"
                    />
                  </div>
                  <div className="modalUpdateData__block_data">
                    <div className="modalUpdateData__title">Instagram</div>
                    <input
                      type="text"
                      value={Instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className="modalUpdateData__input_name"
                    />
                  </div>
                </div>
                <div className="modalUpdateData__block_name">
                  <div className="modalUpdateData__block_data">
                    <div className="modalUpdateData__title">Twitter</div>
                    <input
                      type="text"
                      value={Twitter}
                      onChange={(e) => setTwitter(e.target.value)}
                      className="modalUpdateData__input_name"
                    />
                  </div>
                  <div className="modalUpdateData__block_data">
                    <div className="modalUpdateData__title">Discord</div>
                    <input
                      type="text"
                      value={Discord}
                      onChange={(e) => setDiscord(e.target.value)}
                      className="modalUpdateData__input_name"
                    />
                  </div>
                </div>

                <div className="modalUpdateData__block_data">
                  <div className="modalUpdateData__title">WebSite</div>
                  <input
                    type="text"
                    value={WebSite}
                    onChange={(e) => setWebSite(e.target.value)}
                    className="modalUpdateData__input"
                  />
                </div>
                <div className="modalUpdateData__block_data">
                  <div className="modalUpdateData__title">
                    Enter someone else's referral code
                  </div>
                  <input
                    type="text"
                    disabled={isDisabledReferalCodeInput}
                    value={ReferalCodeInput}
                    onChange={(e) => setReferalCodeInput(e.target.value)}
                    className="modalUpdateData__input"
                  />
                </div>
              </div>
              <div className="modalUpdateData__btns">
                <button
                  className="modalUpdateData__btn"
                  onClick={updateProfile}
                >
                  Save{" "}
                </button>
                <button
                  onClick={() => {
                    setmodalUpdateData(false);
                  }}
                  className="modalUpdateData__btn-cancel"
                >
                  Cancel{" "}
                </button>
              </div>
            </div>
          </div>
        )}
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
          Tokens
        </button>
        {/* <button className="tab-btn tab-creared">Created</button>
        <button className="tab-btn tab-owned">Owned</button>
        <button className="tab-btn tab-favorites">Favorits</button> */}
        <button
          onClick={() => {
            setselectingTab(2);
          }}
          className={`tab-btn tab-favorites ${
            selectingTab == 2 ? "activ-tab-prof" : ""
          }`}
        >
          Collection
        </button>
      </div>
      <div className="tabs-line"></div>
      <div className="tokens">
        {" "}
        {isLoading ? (
          (selectingTab === 1 && <Cards items={items} />) ||
          (selectingTab === 2 && (
            <div className="collection-list-profile">
              {listCollection.map((collection) => {
                return (
                  <CardCollection
                    key={Math.random()}
                    infoCollection={collection}
                  />
                );
              })}
            </div>
          ))
        ) : (
          <div className="loaderr">{<Loader />}</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
