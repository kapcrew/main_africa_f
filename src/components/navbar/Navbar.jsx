import React, { useState, useEffect } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { login, login_out, login_extraton } from "../../scripts/index.js";
import useModal from "use-react-modal";
import {
  iconProfile,
  iconMyCollections,
  iconSettings,
  iconEverWallet,
  iconWalletModal,
  iconUserModal,
} from "../../assets/icon";
const Menu = () => (
  <div className="menu_">
    <Link to="/explorer">
      <div>Explore</div>{" "}
    </Link>
    <Link to="/create">
      <div>Сreate</div>{" "}
    </Link>
    {/* <div>Features</div> */}
  </div>
);

const Navbar = () => {
  // const { isOpen, openModal, closeModal, Modal } = useModal();
  const [isOpenModalLogin, setisOpenModalLogin] = useState(false);

  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState(false);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const address = localStorage.getItem("userAddress");
    if (address) {
      setAddress(address);
      setUser(true);
    }
  }, []);

  const handleLogout = async() => {
    setisOpenModalLogin(false)
    await login_out();
    setUser(false);
    window.location.reload();
  };
  function handleLogin(e) {
    e.preventDefault();
    login();
    
  }
  const handleLoginExtraton = () => {
    login_extraton();
    //  setUser(true);
  };

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <Link to="/">
            <div className="main-logo">Imara</div>
          </Link>
        </div>
      </div>
      <div className="navbar-links__menu">
        <Menu />
      </div>
      <div className="navbar-sign">
        <div className="navbar-links_container">
          <input
            type="text"
            placeholder="Search items and collections"
            autoFocus={true}
          />
        </div>
        {user ? (
          <>
            {/* <Link to=""> */}
            <div class="dropdown">
              <div style={{ display: "none" }}>
                <CgProfile
                  size={30}
                  color="rgba(72, 43, 8, 0.8)"
                  class="dropbtn"
                  className="header-icon" /* onClick={handleLogout}*/
                />
              </div>
              <div className="iconProfile main-tab">{iconUserModal}</div>
              <div class="dropdown-content">
                <div>
                  
                  <Link to={`/create`}>
                    <div className="menu_item__block">
                      <div className="menu_item__icon">{iconProfile}</div>
                      <div class="menu_item">Create</div>
                    </div>
                    </Link>
               
                </div>

                <Link to={`/profile/${address}`}>
                  <div className="menu_item__block">
                    <div className="menu_item__icon">{iconProfile}</div>

                    <div class="menu_item">Profile</div>
                  </div>
                </Link>
                <a href="#">
                  <div className="menu_item__block">
                    <div className="menu_item__icon"> {iconMyCollections}</div>

                    <div class="menu_item">My Collections</div>
                  </div>
                </a>
                <a href="#">
                  <div className="menu_item__block">
                    <div className="menu_item__icon"> {iconSettings}</div>

                    <div class="menu_item">Setting</div>
                  </div>
                </a>
              </div>
            </div>
            <div
              className="iconWalletModal main-tab"
              onClick={() => {
                setisOpenModalLogin(!isOpenModalLogin);
              }}
            >
              {iconWalletModal}
            </div>
            {isOpenModalLogin && (
              <div className="modal">
                <div className="modal__name-modal">
                  <div className="modal__icon">
                  {iconWalletModal}
                  </div>
                  <div className="modal__name">My wallet</div>
                </div>
                <div className="model__content-auth">
                <a cl>
                  <div class="address_text">
                  Your address: {address.substring(0, 6)}...{address.substring(60, 66)}
                  </div>
                </a>
                  <div className="model__text-auth">
                    {" "}
                    
                    You can log out of the wallet
                    
                  </div>
                  
                  <div className="model__block-auth">
                  <Link to="/">
                    <div className="model__block-wallet"  onClick={handleLogout}>
                    <div className="model__block-wallet__name">
                    Logout
                      </div>
              
            
                    </div>
                    </Link>
                  </div>
                </div>
              </div>
             
            )}
          </>
        ) : (
          <>

            <div
              className="iconWalletModal main-tab"
              onClick={() => {
                setisOpenModalLogin(!isOpenModalLogin);
              }}
            >
              {iconWalletModal}
            </div>
            {/* <FaWallet
                size={30}
                color="rgba(72, 43, 8, 0.8)"
                className="header-icon"
                onClick={() => {
                  setisOpenModalLogin(!isOpenModalLogin);
                }}
              /> */}

            {isOpenModalLogin && (
              <div className="modal">
                <div className="modal__name-modal">
                  <div className="modal__icon">
                  {iconWalletModal}
                  </div>
                  <div className="modal__name">My wallet</div>
                </div>
                <div className="model__content-auth">
                  <div className="model__text-auth">
                    {" "}
                    Please, connect your wallet to get full access
                  </div>
                  <div className="model__block-auth">
                    <div className="model__block-wallet" onClick={handleLogin}>
                      <div className="model__block-wallet__icon">
                        {iconEverWallet}
                      </div>
                      <div className="model__block-wallet__name">
                        EVER Wallet
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
            )}
            {/*<Link to="/register">*/}
          </>
        )}
      </div>
      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <Menu />
            </div>
            <div className="navbar-menu_container-links-sign">
              {user ? (
                <>
                  <Link to="/create">
                    <button type="button" className="primary-btn">
                      Create
                    </button>
                  </Link>
                  <button type="button" className="secondary-btn">
                    Connect
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={handleLogin}
                    >
                      Sign In
                    </button>
                  </Link>
                  <Link to="/register">
                    <button type="button" className="secondary-btn">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
