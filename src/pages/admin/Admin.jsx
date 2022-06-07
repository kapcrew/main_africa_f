import React, { useState, useEffect } from "react";
import "./Admin.css";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import apiRequest from "../../api/apiRequest";

const Admin = () => {
  const [isLoadingCollection, setisLoadingCollection] = useState(false);
  const [isLoadingProfile, setisLoadingProfile] = useState(false);
  // const paramsURL = useParams();
  // const navigate = useNavigate();
  const [isEntry, setisEntry] = useState(false);
  const [Login, setLogin] = useState("");
  const [Password, setPassword] = useState("");

  const [AllCollection, setAllCollection] = useState([]);
  const [AllProfile, setAllProfile] = useState([]);
  const getAllCollection = async () => {
    await apiRequest
      .get(`/admin/get_collections?login=${Login}&password=${Password}`)
      .then(async (res) => {
        console.log(res.data);
        setAllCollection(res.data);
        setisLoadingProfile(true);
      });
  };
  const getAllProfile = async () => {
    await apiRequest
      .get(`/admin/get_profiles?login=${Login}&password=${Password}`)
      .then(async (res) => {
        console.log(res.data);
        setAllProfile(res.data);
        setisLoadingCollection(true);
      });
  };
  const enterAccountAdmin = async () => {
    await apiRequest
      .post(`/admin/login`, {
        login: Login,
        password: Password,
      })
      .then(async (res) => {
        if (res.data) {
          toast.success("You have successfully logged in to your account");
          setisEntry(true);
          getAllProfile();
          getAllCollection();
        } else {
          toast.error("Invalid username or password");
        }
      });
  };
  // /admin/login

  return (
    <div className="admin_content">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "toaster",
        }}
      ></Toaster>
      {!isEntry ? (
        <div className="window_auth">
          <div className="window_auth__title">Login</div>
          <div className="window_auth__subtitle">
            Access to administrator functions
          </div>
          <div className="window_auth__block_inputs">
            <div className="window_auth__block_input">
              <div className="window_auth__input-title">Login</div>
              <input
                type="text"
                className="window_auth__input"
                onChange={(e) => {
                  setLogin(e.target.value);
                }}
              />
            </div>
            <div className="window_auth__block_input">
              <div className="window_auth__input-title">Password</div>
              <input
                type="password"
                className="window_auth__input"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <button className="window_auth__btn" onClick={enterAccountAdmin}>
            Enter
          </button>
        </div>
      ) : (
        <div className="admin_func">
          <div className="admin_func__block_info">
            <div className="admin_func__block_info_title"> All collection </div>{" "}
            <div className="all_collection">
              <table className="table_admin">
                <tr className="title_table">
               
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Description</th>
                  
                  <th>Total supply</th>
                </tr>

                {isLoadingCollection &&
                  AllCollection.map((collection) => {
                    return (
                      <tr>
                        <td>
                          <img
                            className="res-details-img"
                            src={collection.picture}
                            alt=""
                          />
                        </td>
                        <td>{collection.name}</td>
                        <td>{collection.description}</td>

                        <td>{collection.totalSupply}</td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </div>

          <div className="admin_func__block_info">
            <div className="admin_func__block_info_title"> All profile </div>{" "}
            <div className="all_collection">
              <table className="table_admin">
                <tr>
                <th>Picture</th>
                  <th>Wallet</th>
                
                  <th>Bio</th>
                  <th>Ref code</th>
                  <th>Affiliate</th>
                  <th>Email</th>
                  <th>Instagram</th>
                  <th>Twitter</th>
                  <th>Discord</th>
                  <th>Website</th>
                </tr>

                {isLoadingProfile &&
                  AllProfile.map((prof) => {
                    return (
                      <tr>
                        <td>
                          <img
                            className="res-details-img"
                            src={prof.profilePicture}
                            alt=""
                          />
                        </td>
                        <td>{prof.walletId}</td>

                        <td>{prof.bio}</td>

                        <td>{prof.refCode}</td>
                        <td>{prof.affiliate}</td>
                        <td>{prof.email}</td>
                        <td>{prof.instagram}</td>
                        <td>{prof.twitter}</td>
                        <td>{prof.discord}</td>
                        <td>{prof.website}</td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
// isModalBuy
export default Admin;
