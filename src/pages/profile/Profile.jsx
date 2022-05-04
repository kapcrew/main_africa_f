import React, { useState, useEffect } from "react";
import "./profile.css";
import { Cards } from "../../components";
import Loader from "../../components/loader/loader";
import apiRequest from "../../api/apiRequest";
import coverImage from "../../assets/coverImage.png";
import { menuCard, iconDischarge } from "../../assets/icon";
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
    console.log("tokens", res.data);

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
    });
  };

  useEffect(() => {
    getProfile();
  }, []);
  const updateProfile = async () => {
    await apiRequest.post("/profile/update_profile/", {
      description: description,
      name: name,
      surname: surname,
      profilePicture: imageFile,
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
    // setisLoading(true);
  };

  const [selectingTab, setselectingTab] = useState(1);
  return (
    <div className="content">
      <div className="cover-image">
        <img src={coverImage} alt="" />
      </div>
      <div className="icon-profile">
        <img className="icon-profile-img" src={iconPrif} alt="" />
      </div>
      <div className="info-user">
        <div className="info-user__name-user">
          {profile.name} {profile.surname}
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
        <div className="info-user__description">
          <div className="info-user__description_text">
            {profile.description}
          </div>
        </div>
        {modalUpdateData && (
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
                <div className="modalUpdateData__title">Description</div>
                <textarea
                  onChange={(e) => setdescription(e.target.value)}
                  value={description}
                  type="text"
                  className="modalUpdateData__input_description"
                />
              </div>
              <div className="modalUpdateData__block_data">
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
            </div>
            <div className="modalUpdateData__btns">
              <button className="modalUpdateData__btn" onClick={updateProfile}>
                Save{" "}
              </button>
              <button
                onClick={() => {
                  setmodalUpdateData(false);
                }}
                className="modalUpdateData__btn"
              >
                Cancel{" "}
              </button>
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
                return <CardCollection infoCollection={collection} />;
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
