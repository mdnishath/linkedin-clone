import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import EditCover from "./Edit/EditCover";
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../store/popupSlice";
import EditProfile from "./Edit/EditeProfile";
import EditName from "./Edit/EditName";
import EditBio from "./Edit/EditBio";
import EditPhone from "./Edit/EditPhone";
import EditAddress from "./Edit/EditAddress";
import EditAbout from "./Edit/EditAbout";

const Popup = () => {
  const dispatech = useDispatch();
  const user = useSelector((state) => state.user.user);
  const popup = useSelector((state) => state.popup.isPopup);
  return (
    <div className="absolute top-0 right-0 z-[101] h-screen">
      <div className="flex h-screen items-center justify-end">
        <div className="relative h-[600px] w-[500px] overflow-y-auto rounded-tl-lg bg-white p-5 shadow-all">
          <button
            onClick={() => dispatech(setPopup(!popup))}
            className="absolute top-2 right-2"
          >
            <AiOutlineClose className="text-2xl" />
          </button>
          <EditCover />
          <EditProfile />
          <EditName />
          <EditBio />
          <EditPhone />
          <EditAddress />
          <EditAbout />
        </div>
      </div>
    </div>
  );
};

export default Popup;
