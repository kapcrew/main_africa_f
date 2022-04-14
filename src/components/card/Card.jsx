import React from "react";
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import './cards.css'


const Card = ({ item,title }) => {
  return (
    <>
    <div className='bids section__padding'>
    <div className="bids-container">
    <div className="bids-container-text">
    <h1>{title}</h1>

    </div>
    <div className="bids-container-card">
    {item.map((Val) => {
      return (
        <div className="card-column" key={Val.id}>
        <div className="bids-card">
        <div className="bids-card-top">
        <img src={Val.img} alt={Val.title} />
        <Link to={`/post/123`}>
        <p className="bids-title">{Val.title}</p>
        </Link>
        </div>
        <div className="bids-card-bottom">
        <p>{Val.price} <span>EVER</span></p>
        <p> <AiFillHeart /> 92</p>
        </div>
        </div>
        </div>
      );
    })}
    </div>
    </div>
    </div>


    </>
  );
};

export default Card;
