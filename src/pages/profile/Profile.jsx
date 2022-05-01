import React, { useState, useEffect } from "react";
import "./profile.css";
import profile_banner from "../../assets/profile_banner.png";
import profile_pic from "../../assets/svg/profile.svg";
import Bids from "../../components/bids/Bids";
import axios from "axios";
import { Cards} from "../../components";
import Dropzone from "react-dropzone";
import apiRequest from "../../api/apiRequest";
import coverImage from "../../assets/coverImage.png";
import { menuCard, iconDischarge } from "../../assets/icon";
const Profile = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const getItems = async () => {
    setisLoading(false);
    const res = await apiRequest.get("/items/get_items");
    setItems(res.data);
   
    console.log(res.data.filter(function (el) {
      return el.owner === localStorage.getItem("userAddress")
    })
    )

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
                <Dropzone
                  onDrop={updateImageHandleOnDrop}
                  maxSize={13107200}
                  accept=""
                >
                  {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragAccept,
                    isDragReject,
                  }) => {
                    const additionalClass = isDragAccept
                      ? "accept"
                      : isDragReject
                      ? "reject"
                      : "";

                    return (
                      <div
                        {...getRootProps({
                          className: `dropzone-creact-collection ${additionalClass}`,
                        })}
                      >
                        {!imageFile ? (
                          <div>
                            <div className="dropzone-creact-collection__before">
                              Click, select or drag a file to the current area
                            </div>
                            <span className="isDragActive">
                              {isDragActive ? "Realease" : "Drag"}
                            </span>
                          </div>
                        ) : (
                          <div className={"dropzone-creact-collection__after"}>
                            {imageFileName}
                            <div className={""}></div>
                          </div>
                        )}
                      </div>
                    );
                  }}
                </Dropzone>
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
        <button className="tab-btn tab-onsale">On sale</button>
        <button className="tab-btn tab-creared">Created</button>
        <button className="tab-btn tab-owned">Owned</button>
        <button className="tab-btn tab-favorites">Favorits</button>
      </div>
      <div className="tabs-line"></div>
      <div className="tokens">
        {" "}
        {isLoading ? <Cards items={items} /> : "LOADING...."}
      </div>
    </div>
  );
};

export default Profile;
