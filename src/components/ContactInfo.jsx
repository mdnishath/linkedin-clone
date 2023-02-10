import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { getProfile } from "../auth";
import { useSelector, useDispatch } from "react-redux";

const ContactInfo = ({ setShow }) => {
  const user = useSelector((state) => state.user.user);
  const { obj, loading } = getProfile(user);
  return (
    <div className="absolute top-0 right-0 z-[10] h-screen  ">
      <div className="flex h-screen items-center justify-end">
        <div className="relative w-[500px] rounded-tl-lg bg-white p-5 shadow-all">
          <button
            onClick={() => setShow(false)}
            className="absolute top-2 right-2"
          >
            <AiOutlineClose className="text-2xl" />
          </button>
          <h3 className="mb-4 mt-4 text-xl font-bold text-primary">
            Contact Info
          </h3>
          <div className="mt-4">
            <div className="mb-4 flex items-center gap-4 text-xl">
              {obj.email && (
                <>
                  <AiOutlineMail className="text-2xl text-primary" />
                  <p>{obj.email}</p>
                </>
              )}
            </div>
            <div className="mb-4 flex items-center gap-4 text-xl">
              {obj.phone && (
                <>
                  <BsPhone className="text-2xl text-primary" />
                  <p>{obj.phone}</p>
                </>
              )}
            </div>
            <div className="mb-4 flex items-center gap-4 text-xl">
              {obj.address && (
                <>
                  <GoLocation className="text-2xl text-primary" />
                  <p>{obj.address}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
