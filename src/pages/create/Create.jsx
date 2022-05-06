import "./create.css";
import axios from "axios";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { iconCreactCollection } from "../../assets/icon";
import PagePreloader from "../../components/page-preloader/PagePreloader";
import Carousel from "react-elastic-carousel";
import { sendMoney } from "../../scripts/index.js";
import apiRequest from "../../api/apiRequest";
import { useDropzone } from "react-dropzone";
import DropzoneLoaderFile from "../../components/dropzoneLoaderFile/DropzoneLoaderFile";
const Create = () => {
  // FILE TO BASE64 -------------------------------------------------

  const [nameItem, setnameItem] = useState();
  const [descriptionItem, setdescriptionItem] = useState();
  const [categoryItem, setcategoryItem] = useState();
  const [mainFileName, setmainFileName] = useState();
  const [mainFileBase64, setmainFileBase64] = useState();
  // const handleOnDrop = (file) => {

  //   if (file[0]) {
  //     readFileDataAsBase64(file[0]).then((file) => {
  //       console.log(String(file).split(",")[1]);
  //       setmainFileBase64(String(file).split(",")[1]);
  //     });

  //     setmainFileName(file[0].name);
  //   }
  // };

  //CREACT COLLECTION
  const [modalCreactCollection, setmodalCreactCollection] = useState(false);
  const [nameCollection, setnameCollection] = useState();
  // PRICE
  const [priceItem, setpriceItem] = useState();

  const [description, setdescription] = useState();

  const [iconCollectionName, seticonCollectionName] = useState();
  const [iconCollectionBase64, seticonCollectionBase64] = useState();

  // const collectionHandleOnDrop = (file) => {
  //   console.log(file);
  //   if (file[0]) {
  //     readFileDataAsBase64(file[0]).then((file) => {
  //       seticonCollectionBase64(String(file));
  //     });
  //     seticoniconCollectionName(file[0].name);
  //   } else {
  //     console.log("NOT FILE");
  //   }
  // };

  const creactCollection = async () => {
    const req = await apiRequest.post("/collections/create_collection", {
      name: nameCollection,
      description: description,
      picture: iconCollectionBase64,
    });
    console.log(req);
    await getListCollection();
    setmodalCreactCollection(false);
  };

  const [listCollectionChoiceInti, setlistCollectionChoiceInti] = useState([]);
  const [listCollectionChoice, setlistCollectionChoice] = useState([]);
  const [selectedCollection, setselectedCollection] = useState("none");
  const [listCollection, setlistCollection] = useState([]);

  const getListCollection = async () => {
    const req = await apiRequest.get("/collections/get_collections_by_wallet");
    console.log(req.data);
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
    setlistCollectionChoice(listCollectionChoiceInti);
    setlistCollectionChoice((pre) => {
      return {
        ...pre,
        [event.target.id]: !listCollectionChoice[event.target.id],
      };
    });

    setselectedCollection(event.target.id);
  };
  // CREACT ITEM
  const navigate = useNavigate();

  const [isCreated, setisCreated] = useState(false);

  const creactItem = async () => {
    setisCreated(true);
    const reqSendMoney = await sendMoney();
    console.log(reqSendMoney);
    
    if (reqSendMoney) {
      try{
        const req = await apiRequest.post("/nft/mint", {
          title: nameItem,
          description: descriptionItem,
          category: categoryItem,
          price: priceItem,
          media: mainFileBase64.split(",")[1],
          collection: selectedCollection,
          addrToTransfer: localStorage.getItem("userAddress"),
        });
        setisCreated(false);
        // console.log(req)
        navigate("/item/" + req.data.address);
      }catch({ response: { data } }){
        console.log("error",data)
      }
      
    } else {
      setisCreated(false);
    }
  };

  return (
    <div className="create section__padding">
      {isCreated && <PagePreloader />}

      <div
        className="creat
      e-container"
      >
        <div className="create-container__main-name">Create new Item</div>
        <div className="create-container__submain-name">Upload File</div>
        <DropzoneLoaderFile
          className="dropzone"
          file={mainFileBase64}
          setfile={setmainFileBase64}
          namefile={mainFileName}
          setnameFile={setmainFileName}
          textBefore={
            <>
              PNG, GIF, WEBP, MP4 or MP3. Max 100mb. <br />
              Click, select or drag a file to the current area
            </>
          }
        />

        <div className="create-container__submain-name">Name</div>
        <input
          onChange={(e) => {
            setnameItem(e.target.value);
          }}
          value={nameItem}
          type="text"
          className="create-container__input"
        />

        <div className="create-container__submain-name">Description</div>
        <textarea
          onChange={(e) => {
            setdescriptionItem(e.target.value);
          }}
          value={descriptionItem}
          type="text"
          className="create-container__textarea"
        />

        <div className="create-container__submain-name">Category</div>
        <input
          onChange={(e) => {
            setcategoryItem(e.target.value);
          }}
          value={categoryItem}
          type="text"
          className="create-container__input"
        />

        <div className="create-container__submain-name">Collection</div>

        <div className="carousel-collection">
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
                <button
                  className={`btn-collection ${
                    listCollectionChoice[colliction.name]
                      ? "activ_collection"
                      : ""
                  }`}
                  onClick={collectionChoice}
                  id={colliction.name}
                >
                  <div className="btn-collection__icon">
                    {" "}
                    <img
                      className="btn-collection__icon-img"
                      src={colliction.picture}
                      alt=""
                    />
                  </div>
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
                <div className="modal-creact-collection__loader-image">
                  <DropzoneLoaderFile
                    className="dropzone-modal"
                    file={iconCollectionBase64}
                    setfile={seticonCollectionBase64}
                    namefile={iconCollectionName}
                    setnameFile={seticonCollectionName}
                    textBefore={
                      <>Click, select or drag a file to the current area</>
                    }
                  />
                </div>
            
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
