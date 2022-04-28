import React, { useState, useEffect } from "react";
import "./profile.css";
import profile_banner from "../../assets/profile_banner.png";
import profile_pic from "../../assets/svg/profile.svg";
import Bids from "../../components/bids/Bids";
import axios from "axios";
import apiRequest from "../../api/apiRequest";
import coverImage from "../../assets/coverImage.png";
import { menuCard, iconDischarge } from "../../assets/icon";
const Profile = () => {
  const [profile, setProfile] = useState([]);

  const [modalUpdateData, setmodalUpdateData] = useState(false);
  const [name, setname] = useState("123124");
  const [surname, setsurname] = useState();
  const [description, setdescription] = useState();
  const getProfile = async () => {
    await apiRequest.get("/profile/get_profile/").then((response) => {
      console.log(response);
      const myProfile = response.data;
      console.log(myProfile);
      setProfile(myProfile);
      setname(response.data.name);
      setsurname(response.data.surname);
      setdescription(response.data.description);
    });
  };

  useEffect(() => {
    getProfile();
  }, []);
  const updateProfile = async() => {
    await apiRequest.post("/profile/update_profile/", {
      description: description,
      name: name,
      surname: surname,
    });
    await getProfile()
    setmodalUpdateData(false)
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

  return (
    <div className="content">
      <div className="cover-image">
        <img src={coverImage} alt="" />
      </div>
      <div className="icon-profile">
        <img className="icon-profile-img" src={coverImage} alt="" />
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
      <div className="tokens"></div>
    </div>
  );
};

export default Profile;
