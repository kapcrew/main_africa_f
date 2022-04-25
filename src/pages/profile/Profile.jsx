import React,{ useState, useEffect} from 'react'
import './profile.css'
import profile_banner from '../../assets/profile_banner.png'
import profile_pic from '../../assets/svg/profile.svg'
import Bids from '../../components/bids/Bids'
import axios from 'axios';



const Profile = () => {

  const [profile,setProfile] = useState([]);


  const getProfile = () => {
    axios.get('http://45.137.64.34:4002/profile/get_profile/?wallet_id=c19b003394bef654680b0304b632728f264a85bba9a85b84f8090e1cd39df021')
    .then((response) => {
      console.log(response);
      const myProfile = response.data;
      console.log(myProfile)
      setProfile(myProfile);
    });
  };

  useEffect(() => getProfile(),[]);



  return (

    <div className='profile section__padding'>
    {profile.map((profiles) => (
      <div className="profile-top">
        <div className="profile-banner">
          <img src={profile_banner} alt="banner" />
        </div>
        <div className="profile-pic">
            <img src={profile_pic} alt="profile" />
            <h3>{profiles.name}</h3>
            <div class="address"><p class="address_title">{profiles.wallet_id}</p></div>
            <p class="joined">Joined {profiles.created_at}</p>


        </div>
      </div>
    ))}

      <div className="profile-bottom">
        <div className="profile-bottom-input">
          <input type="text" placeholder='Search Item here' />
          <select>
            <option>Recently Listed</option>
            <option>Popular</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>

        <Bids   title="Item" />
      </div>
    </div>
  );
};

export default Profile;
