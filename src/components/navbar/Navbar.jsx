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
} from "../../assets/icon";
const Menu = () => (
  <>
    <Link to="/explorer">
      <p>Explore</p>{" "}
    </Link>
    <Link to="/create">
      <p>Сreate</p>{" "}
    </Link>
    <p>Features</p>
  </>
);

const Navbar = () => {
  const { isOpen, openModal, closeModal, Modal } = useModal();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState(false);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const address = localStorage.getItem("wallet_address");
    if (address) {
      setAddress(address);
      setUser(true);
    }
  }, []);

  const handleLogout = () => {
    login_out();
    setUser(false);
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
            <h1>shujaa</h1>
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
          {user && (
            <Link to="/">
              <p onClick={handleLogout}>Logout</p>
            </Link>
          )}
        </div>
        {user ? (
          <>
            <Link to="">
              <div class="dropdown">
                <CgProfile
                  size={30}
                  color="rgba(72, 43, 8, 0.8)"
                  class="dropbtn"
                  className="header-icon" /* onClick={handleLogout}*/
                />
                <div class="dropdown-content">
                  <a>
                    <h4 class="menu_item">
                      {address.substring(0, 6)}...{address.substring(60, 66)}
                    </h4>
                  </a>
                  <div>
                    <a href="#">
                      <div className="menu_item__block">
                        
                        <div className="menu_item__icon">{iconProfile}</div>
                        <h4 class="menu_item">Create</h4>
                      </div>
                    </a>
                  </div>

                  <a href="#">
                    <div className="menu_item__block">
                      <div className="menu_item__icon">{iconProfile}</div>

                      <h4 class="menu_item">Profile</h4>
                    </div>
                  </a>
                  <a href="#">
                    <div className="menu_item__block">
                      <div className="menu_item__icon">
                        {" "}
                        {iconMyCollections}
                      </div>

                      <h4 class="menu_item">My Collections</h4>
                    </div>
                  </a>
                  <a href="#">
                    <div className="menu_item__block">
                      <div className="menu_item__icon"> {iconSettings}</div>

                      <h4 class="menu_item">Setting</h4>
                    </div>
                  </a>
                </div>
              </div>
            </Link>
            <Link to="">
              <FaWallet
                size={30}
                color="rgba(72, 43, 8, 0.8)"
                className="header-icon"
                onClick={openModal}
              />
            </Link>
          </>
        ) : (
          <>
            {/*<Link to="/login">*/}
            <Link to="">
              <div class="dropdown">
                <CgProfile
                  size={30}
                  color="rgba(72, 43, 8, 0.8)"
                  class="dropbtn"
                  className="header-icon" /* onClick={handleLogout}*/
                />
                <div class="dropdown-content">
                  <a href="#">Profile</a>
                  <a href="#">Settings</a>
                </div>
              </div>
            </Link>
            <Link to="">
              <FaWallet
                size={30}
                color="rgba(72, 43, 8, 0.8)"
                className="header-icon"
                onClick={openModal}
              />
            </Link>
            {isOpen && (
              <Modal>
                <div className="modal">
                  <div className="login section__padding">
                    <div className="login-container">
                      <h1>Login</h1>
                      <form className="login-writeForm" autoComplete="off">
                        <div className="login-formGroup">
                          <button
                            onClick={handleLogin}
                            className="login-writeButton"
                            type="submit"
                          >
                            EVERWallet
                          </button>
                        </div>
                        <div className="login-formGroup">
                          <button
                            onClick={handleLoginExtraton}
                            className="login-writeButton"
                            type="submit"
                          >
                            Extraton
                          </button>
                        </div>
                        <div className="login-formGroup">
                          <button className="login-writeButton" type="submit">
                            EverscaleWallet
                          </button>
                        </div>
                        {/*<div className="login-button">
        <button onClick={closeModal} className='login-writeButton' type='submit'>Close</button>
        </div>*/}
                      </form>
                    </div>
                  </div>
                </div>
              </Modal>
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
