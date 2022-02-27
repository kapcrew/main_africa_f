import React,{ useState} from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import {  Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";


const Menu = () => (
  <>
  <Link to="/"><p>Explore</p> </Link>
  <p>Create</p>
  <p>Features</p>

  </>
)

const Navbar = () => {
  const [toggleMenu,setToggleMenu] = useState(false)
  const [user,setUser] = useState(false)

  const handleLogout = () => {
    setUser(false);
  }
  const handleLogin = () => {
    setUser(true);
  }

  return (
    <div className='navbar'>
    <div className="navbar-links">
    <div className="navbar-links_logo">
    <img src={logo} alt="logo" />
    <Link to="/">
    <h1>Imara</h1>
    </Link>
    </div>
    <div className="navbar-links_container">
    <Menu />
    <input type="text" placeholder='Search Item Here' autoFocus={true} />
    {user && <Link to="/"><p onClick={handleLogout}>Logout</p></Link> }

    </div>
    </div>
    <div className="navbar-sign">
    {user ? (
      <>
      <Link to="/create">
      <button type='button' className='primary-btn' >Create</button>
      </Link>
      <button type='button' className='secondary-btn'>Connect</button>
      </>
    ): (
      <>
      <Link to="/login">
      <CgProfile size={25} color='rgba(72, 43, 8, 0.8)' className='header-icon'  onClick={handleLogin}/>
      </Link>
      <Link to="/register">
      <FaWallet size={25} color='rgba(72, 43, 8, 0.8)' className='header-icon'  onClick={handleLogin}/>
      </Link>
      </>
    )}

    </div>
    <div className="navbar-menu">
    {toggleMenu ?
      <RiCloseLine  color="#fff" size={27} onClick={() => setToggleMenu(false)} />
      : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
      {toggleMenu && (
        <div className="navbar-menu_container scale-up-center" >
        <div className="navbar-menu_container-links">
        <Menu />
        </div>
        <div className="navbar-menu_container-links-sign">
        {user ? (
          <>
          <Link to="/create">
          <button type='button' className='primary-btn' >Create</button>
          </Link>
          <button type='button' className='secondary-btn'>Connect</button>
          </>
        ): (
          <>
          <Link to="/login">
          <button type='button' className='primary-btn' onClick={handleLogin} >Sign In</button>
          </Link>
          <Link to="/register">
          <button type='button' className='secondary-btn'>Sign Up</button>
          </Link>
          </>
        )}

        </div>
        </div>
      )}
      </div>
      </div>
    )
  }

  export default Navbar
