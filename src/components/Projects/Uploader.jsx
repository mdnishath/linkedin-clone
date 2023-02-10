import React, { useEffect, useRef, useState, useCallback } from "react";
import Input from "../Input";
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../../store/popupSlice";
import { getProfile, setData } from "../../auth";
import Image from "../Image";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { update, getDatabase, ref as dbRef } from "firebase/database";
import { uploadString, getDownloadURL, ref } from "firebase/storage";
import { db } from "../../firebase";
import { storage } from "../../firebase";
import { ThreeDots } from "react-loader-spinner";

const Uploader = () => {
  const dispatech = useDispatch();
  const user = useSelector((state) => state.user.user);
  const popup = useSelector((state) => state.popup.isPopup);
  const uploadRef = useRef(null);
  const { obj, loading } = getProfile(user);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState();
  const [upload, setUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  //Change
  const handleCropChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  const handleTitle = (e) => {
    setTitle(e.target.value);
    setError("");
  };
  const handleSave = async () => {
    if (!title) {
      setError("Title can not be empty");
    } else {
      setUpload(true);
      const imageRef = ref(storage, `projects/${Date.now()}`);
      if (cropData) {
        await uploadString(imageRef, cropData, "data_url");
        const photUrl = await getDownloadURL(imageRef);

        await setData(
          {
            title: title,
            image: photUrl,
            uploadDate: Date.now(),
            uid: user.uid,
          },
          "projects"
        );
        uploadRef.current.value = null;
        setImage("");
        setCropData("");
        setTitle("");
      }
    }

    setUpload(false);
  };
  // console.log(upload);
  return (
    <div>
      <h3 className="mb-4 mt-4 text-center text-xl font-bold text-primary">
        Upload your projets
      </h3>
      {error && (
        <p className="text-center font-semibold text-red-400">{error}</p>
      )}

      <div>
        <div className="mt-4 mb-4 flex w-full flex-col items-center justify-center">
          <Input
            onChange={(e) => handleTitle(e)}
            type="text"
            className={"file-input w-3/4 px-4"}
            placeholder="Project title"
            value={title}
          />
        </div>
        {image && (
          <Cropper
            style={{ height: 200, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={2}
            minCropBoxWidth={2}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
        )}
        <div className="mt-4 flex w-full flex-col items-center justify-center">
          <Input
            onChange={(e) => handleCropChange(e)}
            type="file"
            accept="image/*"
            className={"file-input w-3/4 px-0"}
            innerref={uploadRef}
          />
        </div>

        {image && (
          <div className="flex justify-center gap-5">
            {!cropData ? (
              <button
                onClick={getCropData}
                className="btn mt-3 border-none bg-primary px-8"
              >
                Crope
              </button>
            ) : upload ? (
              <div className="flex items-center justify-center">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="9"
                  color="#4fa94d"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              </div>
            ) : (
              <button
                onClick={handleSave}
                className="btn mt-3 border-none bg-primary px-8"
              >
                Save
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
