import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Uploader from "./Uploader";

const Popup = ({ setShow }) => {
  return (
    <div className="absolute top-0 right-0 z-[101] h-screen">
      <div className="flex h-screen items-center justify-end">
        <div className="relative h-[600px] w-[500px] overflow-y-auto rounded-tl-lg bg-white p-5 shadow-all">
          <button
            onClick={() => setShow(false)}
            className="absolute top-2 right-2"
          >
            <AiOutlineClose className="text-2xl" />
          </button>
          <Uploader />
        </div>
      </div>
    </div>
  );
};

export default Popup;
