import React, { useState, useEffect } from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { login, login_out } from "../../scripts/index.js";
import { Toaster } from "react-hot-toast";
import Loader from "../../components/loader/loader";
import apiRequest from "../../api/apiRequest";
import {
  iconProfile,
  iconMyCollections,
  iconSettings,
  iconEverWallet,
  iconWalletModal,
  iconUserModal,
} from "../../assets/icon";
import { changeSlide } from "react-slick/lib/utils/innerSliderUtils";
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
  const [isOpenModalLogin, setisOpenModalLogin] = useState(false);

  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState(false);
  const [address, setAddress] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const address = localStorage.getItem("userAddress");
    if (address) {
      setAddress(address);
      setUser(true);
    }
  }, []);

  const handleLogout = async () => {
    setisOpenModalLogin(false);
    await login_out();
    setUser(false);
    window.location.reload();
  };
  function handleLogin(e) {
    e.preventDefault();
    login();
  }

  const [isOpenModalSearchToken, setisOpenModalSearchToken] = useState(false);
  const [nameOrNameCollection, setnameOrNameCollection] = useState("");
  const changeInputSearchToken = (e) => {
    setnameOrNameCollection(e.target.value);
  };
  const [items, setItems] = useState([]);
  const [itemsInitially, setitemsInitially] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingCollection, setisLoadingCollection] = useState(false);

  const getItems = async () => {
    setisLoading(false);
    const res = await apiRequest.get("/items/get_items");
    setItems(res.data);
    setitemsInitially(res.data);
    setisLoading(true);
    searchToken();
  };

  const [listCollection, setlistCollection] = useState([]);
  const [listCollectionInitially, setlistCollectionInitially] = useState([]);

  const getListCollection = async () => {
    setisLoadingCollection(false);
    const req = await apiRequest.get("/collections/get_collections");
    setlistCollection(req.data);
    setlistCollectionInitially(req.data);

    setisLoadingCollection(true);
    searchToken();
    // setisLoading(true);
  };
  useEffect(() => {
    getItems();
    getListCollection();
  }, []);

  const searchToken = () => {
    if (itemsInitially.length !== 0) {
      const newItems = itemsInitially.filter((newVal) => {
        if (
          newVal.title
            ?.toLowerCase()
            .indexOf(nameOrNameCollection.toLowerCase()) !== -1
        ) {
          return true;
        } else {
          return false;
        }
      });
      setItems(newItems);
    }

    if (listCollectionInitially.length !== 0) {
      const newCollection = listCollectionInitially.filter((newVal) => {
        if (
          newVal.name
            ?.toLowerCase()
            .indexOf(nameOrNameCollection.toLowerCase()) !== -1
        ) {
          return true;
        } else {
          return false;
        }
      });
      setlistCollection(newCollection);
    }
  };

  useEffect(() => {
    if (nameOrNameCollection.length !== 0) {
      setisOpenModalSearchToken(true);
    } else {
      setisOpenModalSearchToken(false);
    }
    searchToken();
  }, [nameOrNameCollection]);

  useEffect(() => {
    searchToken();
  }, [itemsInitially, listCollectionInitially]);

  return (
    <div className="navbar">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "toaster",
        }}
      />
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
            className="navbar-links_container__search-input"
            type="text"
            placeholder="Search items and collections"
            autoFocus={true}
            value={nameOrNameCollection}
            onChange={changeInputSearchToken}
          />
          <div className="for_modal">
            <div
              className={`modal-search-token ${
                isOpenModalSearchToken ? "modal-search-active" : ""
              }`}
            >
              {isLoading && isLoadingCollection ? (
                <div className="list-tokens-for-serach">
                  <div className="name-search-elements">Items</div>
                  {items.length === 0 && (
                    <div className="name-search-elements">
                      Tokens not found ;(
                    </div>
                  )}
                  {items.map((item) => {
                    return (
                      <div
                        key={Math.random()}
                        className="block_item_search"
                        onClick={() => {
                          navigate(`item/${item.address}`);
                          setisOpenModalSearchToken(false);
                        }}
                      >
                        <img
                          src={"https://" + item.media}
                          className="img-item-search"
                        />
                        {item.title}
                      </div>
                    );
                  })}
                  <div className="block-search-group">
                    <div className="name-search-elements">Collections</div>
                    {listCollection.length === 0 && (
                      <div className="name-search-elements">
                        Tokens not found ;(
                      </div>
                    )}
                    {listCollection.map((collection) => {
                      return (
                        <div
                          key={Math.random()}
                          className="block_item_search"
                          onClick={() => {
                            navigate(`collection/${collection.id}`);
                            setisOpenModalSearchToken(false);
                          }}
                        >
                          <img
                            src={collection.picture}
                            className="img-item-search"
                          />
                          <div className="block_item_search__block-name">
                            <div className="block_item_search__block-name">
                              {collection.name}
                            </div>
                            <div className="block_item_search__totalSupply">
                              {collection.totalSupply} items
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="loaderr">{<Loader />}</div>
              )}
            </div>
          </div>
        </div>

        {/* listCollection */}
        {user ? (
          <>
            <div className="dropdown">
              <div className="iconProfile main-tab">{iconUserModal}</div>
              <div className="dropdown-content">
                <div>
                  <Link to={`/create`}>
                    <div className="menu_item__block">
                      <div className="menu_item__icon">{iconProfile}</div>
                      <div className="menu_item">Create</div>
                    </div>
                  </Link>
                </div>

                <Link to={`/profile/${address}`}>
                  <div className="menu_item__block">
                    <div className="menu_item__icon">{iconProfile}</div>

                    <div className="menu_item">Profile</div>
                  </div>
                </Link>
                <Link to={`/profile/${address}`}>
                  <div className="menu_item__block">
                    <div className="menu_item__icon"> {iconMyCollections}</div>

                    <div className="menu_item">My Collections</div>
                  </div>
                </Link>
              </div>
            </div>
            <div
              className="iconWalletModal main-tab"
              onClick={() => {
                console.log("!!!");
                setisOpenModalLogin(!isOpenModalLogin);
              }}
            >
              {iconWalletModal}
            </div>
            {1 && (
              <div className="modal">
                <div className="modal__name-modal">
                  <div className="modal__icon">{iconWalletModal}</div>
                  <div className="modal__name">My wallet</div>
                </div>
                <div className="model__content-auth">
                  <a>
                    <div className="address_text">
                      Your address: {address.substring(0, 6)}...
                      {address.substring(60, 66)}
                    </div>
                  </a>
                  <div className="model__text-auth">
                    {" "}
                    You can log out of the wallet
                  </div>

                  <div className="model__block-auth">
                    <Link to="/">
                      <div
                        className="model__block-wallet"
                        onClick={handleLogout}
                      >
                        <div className="model__block-wallet__name">Logout</div>
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

            {1 && (
              <div className="modal">
                <div className="modal__name-modal">
                  <div className="modal__icon">{iconWalletModal}</div>
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
