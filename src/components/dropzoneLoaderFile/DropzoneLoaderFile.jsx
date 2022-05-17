import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageCropper } from "../ImageCropper/ImageCropper";
import "./DropzoneLoaderFile.css";
const DropzoneLoaderFile = ({
  className,
  file,
  setfile,
  namefile,
  setnameFile,
  textBefore
}) => {
  const readFileDataAsBase64 = (file) => {
    //const file = event.target.files[0];
    console.log(file);
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
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 3,
    borderRadius: 11,
    borderColor: "rgba(72, 43, 8, 0.24);",
    borderStyle: "dashed",
    backgroundColor: "transparent",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  //ドロップ可能な場合
  const acceptStyle = {
    borderColor: "#afeeee",
    backgroundColor: "#e0ffff",
  };

  //ドロップ拒否の場合
  const rejectStyle = {
    borderColor: "#ff7f50",
    backgroundColor: "#ffe4e1",
  };
  const [fileImage, setfileImage] = useState();
  const [isOpenCropper, setisOpenCropper] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    
    setfileImage(acceptedFiles[0]);
    // readFileDataAsBase64(acceptedFiles[0]).then((file) => {
   
    //   setfile(String(file));
    // });

    setnameFile(acceptedFiles[0].name);
    console.log(acceptedFiles);
  }, []);
  useEffect(() => {
    setisOpenCropper(true);
  }, [fileImage])
  

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: "image/*" });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragReject, isDragAccept]
  );

  return (
    <div>
      {isOpenCropper && fileImage && <ImageCropper image={fileImage} setfile={setfile} setisOpenCropper={setisOpenCropper}/>}

      <div {...getRootProps({ className: className, style })}>
        <input {...getInputProps()} />
        {!file ? (
          <div
            className={`${
              className === "dropzone-modal"
                ? "dropzone__before-modal"
                : "dropzone__before"
            }`}
          >
            {textBefore}
          </div>
        ) : (
          <div
            className={`${
              className === "dropzone-modal"
                ? "dropzone__after-modal"
                : "dropzone__after"
            }`}
          >
            <div className="main-image">
              {/* <div className="main-image-block"> */}
              <img className="main-image-img" src={file} alt="" />
              {/* </div> */}

              <div className={""}>{namefile}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropzoneLoaderFile;
