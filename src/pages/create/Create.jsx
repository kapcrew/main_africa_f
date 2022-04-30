import "./create.css";
import Image from "../../assets/Image.png";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Bids, Header } from "../../components";

import bids1 from "../../assets/bids1.png";
import { iconCreactCollection } from "../../assets/icon";
// import Carousel, {
//   slidesToShowPlugin,
//   arrowsPlugin,
// } from "@brainhubeu/react-carousel";
import Carousel from "react-elastic-carousel";

import CardHomePage from "../../components/cardHomePage/CardHomePage";
import apiRequest from "../../api/apiRequest";
const Create = () => {
  const itemNameRef = React.useRef();
  const itemDesciptionRef = React.useRef();
  const itemPriceRef = React.useRef();
  const itemAvaibleRef = React.useRef();

  const create_item = async () => {
    const data = {
      address:
        "0:c19b003394bef654680b0304b632728f264a85bba9a85b84f8090e1cd39df021",
      name: itemNameRef.current.value,
      description: itemDesciptionRef.current.value,
      image: "",
      data: "",
      collection: "Art",
      tags: "Epic",
      price: itemPriceRef.current.value,
    };
    try {
      const response = await axios.post(
        "http://45.137.64.34:4002/items/create_item",
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(itemNameRef.current.value);
    console.log(itemDesciptionRef.current.value);
    console.log(itemPriceRef.current.value);
    console.log(itemAvaibleRef.current.value);
  };

  // FILE TO BASE64 -------------------------------------------------

  const readFileDataAsBase64 = (file) => {
    //const file = event.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target?.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  };

  const [mainFile, setmainFile] = useState();
  const [mainFileName, setmainFileName] = useState();
  const [mainFileBase64, setmainFileBase64] = useState();
  const handleOnDrop = (file) => {
    readFileDataAsBase64(file[0]).then((file) => {
      setmainFileBase64(String(file));
    });

    setmainFileName(file[0].name);
  };

  //CREACT COLLECTION
  const [modalCreactCollection, setmodalCreactCollection] = useState(false);
  const [nameCollection, setnameCollection] = useState();
  // PRICE
  const [priceItem, setpriceItem] = useState();

  const [description, setdescription] = useState();
  const [iconCollectionName, seticoniconCollectionName] = useState();
  const [iconCollectionBase64, seticonCollectionBase64] = useState();

  const collectionHandleOnDrop = (file) => {
    readFileDataAsBase64(file[0]).then((file) => {
      seticonCollectionBase64(String(file));
    });
    seticoniconCollectionName(file[0].name);
  };

  const creactCollection = async () => {
    const req = await apiRequest.post("/collections/create_collection", {
      name: nameCollection,
      description: description,
    });
    console.log(req);
    await getListCollection();
    setmodalCreactCollection(false);
  };
  const [listCollection, setlistCollection] = useState([]);
  const [listCollectionChoiceInti, setlistCollectionChoiceInti] = useState([]);
  const [listCollectionChoice, setlistCollectionChoice] = useState([])
  const [selectedCollection,setselectedCollection] = useState("none")
  
  const getListCollection = async () => {
    const req = await apiRequest.get("/collections/get_collections");
    const arr_list = req.data.map((col, ind) => {
      return (
        <div className="btn-collectionQ" key={ind}>
          {col.name}
        </div>
      );
    });
    setlistCollection(req.data);
    

    setlistCollectionChoice(() => {
      // const arr_cat = [...new Set(req.data.map((item) => item.category))];
      const obj_cat = {};
      for (const key of req.data) {
        obj_cat[key.name] = false;
      }
      return obj_cat;
    });
    setlistCollectionChoiceInti(() => {
      // const arr_cat = [...new Set(req.data.map((item) => item.category))];
      const obj_cat = {};
      for (const key of req.data) {
        obj_cat[key.name] = false;
      }
      return obj_cat;
    });
    
  };
  useEffect(() => {
    getListCollection();
  }, []);
  const collectionChoice = (event) => {
    setlistCollectionChoice(listCollectionChoiceInti)
    setlistCollectionChoice((pre) => {
      return {
        ...pre,
        [event.target.id]: !listCollectionChoice[event.target.id],
      };
    });
    
    setselectedCollection(event.target.id)
    
  };
  // CREACT ITEM

  const creactItem = async () => {
    const req = await apiRequest.post("/items/create_item", {
      name: nameCollection,
      description: description,
      address: "",
      image: mainFileBase64,
      collection: selectedCollection,
      tags: "",
      price: priceItem,
    });
    console.log(req);
    console.log({
      name: nameCollection,
      description: description,
      address: "",
      image: mainFileBase64,
      collection: selectedCollection,
      tags: "",
      price: priceItem,
    });
  };
  return (
    <div className="create section__padding">
      {/* <Carousel
        plugins={[
          {
            resolve: slidesToShowPlugin,
            options: {
              numberOfSlides: 3,
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
                    <path d="M0 12L5 7L0 2L1 0L8 7L1 14L0 12Z" fill="#482B08" />
                  </svg>
                </button>
              ),
              arrowRightDisabled: <button>4</button>,
              addArrowClickHandler: true,
            },
          },
        ]}
      >
        {listCollection.map((e) =>{
            return <div>{e}</div>
          })}
      </Carousel> */}
      <div
        className="creat
      e-container"
      >
        <div className="create-container__main-name">Create new Item</div>
        <div className="create-container__submain-name">Upload File</div>

        <Dropzone onDrop={handleOnDrop} maxSize={13107200} accept="">
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
          }) => {
            const additionalClass = isDragAccept
              ? "accept"
              : isDragReject
              ? "reject"
              : "";

            return (
              <div
                {...getRootProps({
                  className: `dropzone ${additionalClass}`,
                })}
              >
                <input {...getInputProps()} onChange={handleOnDrop} />

                {!mainFileBase64 ? (
                  <div>
                    <div className="dropzone__before">
                      PNG, GIF, WEBP, MP4 or MP3. Max 100mb. <br />
                      Click, select or drag a file to the current area
                    </div>
                    <span className="dropzone__isDragActive">
                      {isDragActive ? "Realease" : "Drag"}
                    </span>
                  </div>
                ) : (
                  <div className={"dropzone__after"}>
                    {mainFileName}
                    <div className={""}></div>
                  </div>
                )}
              </div>
            );
          }}
        </Dropzone>

        <div className="create-container__submain-name">Name</div>
        <input type="text" className="create-container__input" />

        <div className="create-container__submain-name">Description</div>
        <textarea type="text" className="create-container__textarea" />

        <div className="create-container__submain-name">Collection</div>

        <div className="carousel-collection">
          {/* <Bids /> */}
          {/* {listCollection.map((e) =>{
            return <><div className="btn-collectionQ"></div></>
          })} */}
          {/* <Carousel
            slides={
              listCollection.map((e) => <div className="btn-collection"></div>)
            }
            plugins={[
              {
                resolve: slidesToShowPlugin,
                options: {
                  numberOfSlides: 3,
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

            {listCollection?.map((colliction, index) => {
              if (index === 0) {
                return (
                  <button
                    className="btn-collection btn-create-collection"
                    onClick={() => {
                      setmodalCreactCollection(!modalCreactCollection);
                    }}
                  >
                    <div className="btn-create-collection__icon">
                      {iconCreactCollection}
                    </div>
                    <div className="btn-create-collection__text">Create</div>
                  </button>
                );
              }

              return (
                <button className="btn-collection">
                  <div className="btn-collection__icon"></div>
                  <div className="btn-collection__name">{colliction.name}</div>
                </button>
              );
            })} 
            
          </Carousel> */}
          <Carousel itemsToShow={3}>
          <button
                    className="btn-collection btn-create-collection"
                    onClick={() => {
                      setmodalCreactCollection(!modalCreactCollection);
                    }}
                  >
                    <div className="btn-create-collection__icon">
                      {iconCreactCollection}
                    </div>
                    <div className="btn-create-collection__text">Create</div>
                  </button>
            {listCollection?.map((colliction, index) => {
              // if (index === 0) {
              //   
              // }

              return (
                <button className={`btn-collection ${listCollectionChoice[colliction.name] ? "activ_collection" :""}`} onClick={collectionChoice} id={colliction.name}>
                  <div className="btn-collection__icon"></div>
                  <div className="btn-collection__name">{colliction.name}</div>
                </button>
                
              );
            })}
          </Carousel>
        </div>
        {modalCreactCollection && (
          <div className="modal-creact-collection">
            <div className="modal-creact-collection__content">
              <div className="modal-creact-collection__block_name">
                <div className="modal-creact-collection__block_data">
                  <div className="modal-creact-collection__title">Name</div>
                  <input
                    type="text"
                    value={nameCollection}
                    onChange={(e) => setnameCollection(e.target.value)}
                    className="modal-creact-collection__input_name"
                  />
                </div>
              </div>

              <div className="modal-creact-collection__block_data">
                <div className="modal-creact-collection__title">
                  Description
                </div>
                <textarea
                  onChange={(e) => setdescription(e.target.value)}
                  value={description}
                  type="text"
                  className="modal-creact-collection__input_description"
                />
              </div>
              <div className="modal-creact-collection__block_data">
                <Dropzone
                  onDrop={collectionHandleOnDrop}
                  maxSize={13107200}
                  accept=""
                >
                  {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragAccept,
                    isDragReject,
                  }) => {
                    const additionalClass = isDragAccept
                      ? "accept"
                      : isDragReject
                      ? "reject"
                      : "";

                    return (
                      <div
                        {...getRootProps({
                          className: `dropzone-creact-collection ${additionalClass}`,
                        })}
                      >
                        <input {...getInputProps()} onChange={handleOnDrop} />

                        {!iconCollectionBase64 ? (
                          <div>
                            <div className="dropzone-creact-collection__before">
                              Click, select or drag a file to the current area
                            </div>
                            <span className="isDragActive">
                              {isDragActive ? "Realease" : "Drag"}
                            </span>
                          </div>
                        ) : (
                          <div className={"dropzone-creact-collection__after"}>
                            {iconCollectionName}
                            <div className={""}></div>
                          </div>
                        )}
                      </div>
                    );
                  }}
                </Dropzone>
              </div>
            </div>
            <div className="modal-creact-collection__btns">
              <button
                className="modal-creact-collection__btn"
                onClick={creactCollection}
              >
                Save{" "}
              </button>
              <button
                onClick={() => {
                  setmodalCreactCollection(false);
                }}
                className="modalUpdateData__btn"
              >
                Cancel{" "}
              </button>
            </div>
          </div>
        )}
        <div className="block-collection"></div>
        <div className="create-container__submain-name">Price</div>
        {/* <input type="number" className="create-container__input" value={price} onClick={(e)=>{setprice(Number(e.target.value))}} /> */}
        <input
          type="number"
          value={priceItem}
          onChange={(e) => setpriceItem(e.target.value)}
          className="create-container__input"
        />

        <button className="btn-creact-item" onClick={creactItem}>
          Create Item
        </button>
      </div>
    </div>
  );
};

export default Create;
