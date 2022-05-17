import React, { useState, useCallback, useEffect } from "react";
import "./ImageCropper.css";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./canvasUtils";
export const ImageCropper = ({image,setfile,setisOpenCropper}) => {
  //   const CROP_AREA_ASPECT = 2 / 2;

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      setfile(croppedImage)
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const onFileChange = async () => {
    const file = image;
    let imageDataUrl = await readFile(file);
    setImageSrc(imageDataUrl);
  };
  useEffect(() => {
    onFileChange();
  }, []);

  return (
    <div className={`modal-cropper-wrapper`}>
      <div className={"modal-cropper"}>
        <div className={"modal-cropper___content"}>
          <div className={"modal-cropper___cropper"}>
            <Cropper
              minZoom={0.5}
              restrictPosition={false}
              image={imageSrc}
              aspect={1}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              onCropAreaChange={(croppedArea) => {
                setCroppedArea(croppedArea);
              }}
            />
          </div>
        </div>
        <div className="btn-show-result">

          <button
            className="btn-show-result__btn"
            onClick={showCroppedImage}
            variant="contained"
            color="primary"
          >
            Show Result
          </button>
        </div>

        {croppedImage && (
          <div className="block-img-cropped">
            <img
              className="croppedImage-img"
              style={{ border: "1px solid black" }}
              src={croppedImage}
              alt=""
            />
            <button
              className="btn-show-result__btn-save"
              onClick={()=>{setisOpenCropper(false)}}
              variant="contained"
              color="primary"
            >
              Save
            </button>
          </div>
        )}
        {/* <div className="viewer">
          <div>{croppedArea && <Output croppedArea={croppedArea} />}</div>
        </div> */}
      </div>
      ;
    </div>
  );
};
