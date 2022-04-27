import React from "react";
import "./bids.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import bids1 from "../../assets/bids1.png";
import bids2 from "../../assets/bids2.png";
import bids3 from "../../assets/bids3.png";
import bids4 from "../../assets/bids4.png";
import bids5 from "../../assets/bids5.png";
import bids6 from "../../assets/bids6.png";
import bids7 from "../../assets/bids7.png";
import bids8 from "../../assets/bids8.png";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Carousel, {
  slidesToShowPlugin,
  arrowsPlugin,
} from "@brainhubeu/react-carousel";
import CardHomePage from "../cardHomePage/CardHomePage"
import "@brainhubeu/react-carousel/lib/style.css";
const Bids = ({ title }) => {
  const FILMS_QUERY = gql`
    {
      accounts(
        filter: {
          code_hash: {
            eq: "00cd3a33ccf746921c61a5f166378d8ddad06a6b72c9874fea572031a7574181"
          }
        }
      ) {
        id
      }
    }
  `;
  const { data, loading, error } = useQuery(FILMS_QUERY);

  console.log(data);
  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>;

  return (
    <div className="bids section__padding">
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>Top collections</h1>
        </div>
        <Carousel
          plugins={[
            "infinite",
            "centered",
            {
              resolve: slidesToShowPlugin,
              options: {
                numberOfSlides: 4,
              },
            },
            {
              resolve: arrowsPlugin,
              options: {
                arrowLeft: <button>1</button>,
                arrowLeftDisabled: <button>2</button>,
                arrowRight: (
                  <button>
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 12L5 7L0 2L1 0L8 7L1 14L0 12Z"
                        fill="#482B08"
                      />
                    </svg>
                  </button>
                ),
                arrowRightDisabled: <button>4</button>,
                addArrowClickHandler: true,
              },
            },
          ]}
        >
          <CardHomePage icon={bids1}/>
          <CardHomePage icon={bids1}/>
          <CardHomePage icon={bids1}/>
          <CardHomePage icon={bids1}/>
          
        </Carousel>

        <div className="bids-container-card">
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids1} alt="" />
                <Link to={`/post/123`}>
                  <p className="bids-title">Abstact Smoke Red</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>
                  1.25 <span>EVER</span>
                </p>
                <p>
                  {" "}
                  <AiFillHeart /> 92
                </p>
              </div>
            </div>
          </div>
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids2} alt="" />
                <Link to={`/post/123`}>
                  <p className="bids-title">Mountain Landscape</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>
                  0.20 <span>EVER</span>
                </p>
                <p>
                  {" "}
                  <AiFillHeart /> 25
                </p>
              </div>
            </div>
          </div>
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids3} alt="" />
                <Link to={`/post/123`}>
                  <p className="bids-title">Paint Color on Wall</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>
                  0.55 <span>EVER</span>
                </p>
                <p>
                  {" "}
                  <AiFillHeart /> 55
                </p>
              </div>
            </div>
          </div>
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids4} alt="" />
                <Link to={`/post/123`}>
                  <p className="bids-title">Abstract Patern</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>
                  0.87 <span>EVER</span>
                </p>
                <p>
                  {" "}
                  <AiFillHeart /> 82
                </p>
              </div>
            </div>
          </div>
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids5} alt="" />
                <Link to={`/post/123`}>
                  <p className="bids-title">White Line Grafiti</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>
                  0.09 <span>EVER</span>
                </p>
                <p>
                  {" "}
                  <AiFillHeart /> 22
                </p>
              </div>
            </div>
          </div>
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids6} alt="" />
                <Link to={`/post/123`}>
                  <p className="bids-title">Abstract Triangle</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>
                  0.90 <span>EVER</span>
                </p>
                <p>
                  {" "}
                  <AiFillHeart /> 71
                </p>
              </div>
            </div>
          </div>
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids7} alt="" />
                <Link to={`/post/123`}>
                  <p className="bids-title">Lake Landscape</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>
                  0.52 <span>EVER</span>
                </p>
                <p>
                  {" "}
                  <AiFillHeart /> 63
                </p>
              </div>
            </div>
          </div>
          <div className="card-column">
            <div className="bids-card">
              <div className="bids-card-top">
                <img src={bids8} alt="" />
                <Link to={`/post/123`}>
                  <p className="bids-title">Blue Red Art</p>
                </Link>
              </div>
              <div className="bids-card-bottom">
                <p>
                  0.85 <span>EVER</span>
                </p>
                <p>
                  {" "}
                  <AiFillHeart /> 66
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="load-more">
        <button>Load More</button>
      </div>
    </div>
  );
};

export default Bids;
