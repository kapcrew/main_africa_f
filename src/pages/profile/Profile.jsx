import React, { useState, useEffect } from "react";
import "./profile.css";
import profile_banner from "../../assets/profile_banner.png";
import profile_pic from "../../assets/svg/profile.svg";
import Bids from "../../components/bids/Bids";
import axios from "axios";
import apiRequest from "../../api/apiRequest";
import coverImage from "../../assets/coverImage.png"
const Profile = () => {
  const [profile, setProfile] = useState([]);

  const getProfile = () => {
    apiRequest.get("/profile/get_profile/").then((response) => {
      console.log(response);
      const myProfile = response.data;
      console.log(myProfile);
      setProfile(myProfile);
    });
  };

  useEffect(() => {getProfile()}, []);
  const updateProfile = () =>{
    apiRequest.post("/profile/update_profile/",
      {
        walletId: "",
        profilePicture:"[img in base64]",
        country: "Russia",
        documentType:"[string]",
        passportNumber:"[string]",
        name:"Fsdfb",
        surname:"sdfgrfsdf]",
        patronymicName:"[string]"
      }
    )
  }
  return (
    <div className="content">
      
      <div className="cover-image"><img src={coverImage} alt="" /></div>
      <div className="icon-profile"><img className="icon-profile-img" src={coverImage} alt="" /></div>
      <div className="info-user">
        <div className="info-user__name-user">{profile.name} {profile.surname}</div>
        <div className="info-user__address-user">{"0:"+profile.walletId.substring(0,2)}...{profile.walletId.substring(60)}</div>
        <div className="info-user__date-reg">{profile.createdAt}</div>
        <div className="info-user__btns">
          <div className="info-user__bnt-update"></div>
          <div className="info-user__bnt-discharge"></div>
        </div>
      </div>
      <div className="tabs-token">
        
      </div>
      <div className="tokens">

      </div>
    </div>
    
  );
};

export default Profile;
