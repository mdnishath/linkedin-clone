import React, { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { FaRegEdit } from "react-icons/fa";
import Image from "./Image";
import Popup from "./Popup";
import { getProfile } from "../auth";
import { useSelector, useDispatch } from "react-redux";
import { setPopup } from "../store/popupSlice";
import ContactInfo from "./ContactInfo";

const ProfileInfo = () => {
  const dispatech = useDispatch();
  const user = useSelector((state) => state.user.user);
  const popup = useSelector((state) => state.popup.isPopup);
  const [show, setShow] = useState(false);
  // const [show, setShow] = useState(false);
  const { obj, loading } = getProfile(user);
  // console.log(show);

  return (
    <>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
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
        <>
          {popup && <Popup />}
          {show && <ContactInfo setShow={setShow} />}
          <div className="">
            <div className="flex">
              <div className="grid lg:grid-cols-6">
                <div className="col-span-4">
                  <div className=" w-full rounded-lg bg-white shadow-lg">
                    <div className="relative ">
                      <div className="h-[200px] w-full">
                        <Image
                          className="h-full w-full rounded-t-lg object-cover"
                          src={obj.cover ? obj.cover : "images/cover.png"}
                        />
                      </div>

                      <div className="absolute top-5 right-5">
                        <button
                          onClick={() => dispatech(setPopup(!popup))}
                          className="flex items-center gap-4 rounded-lg bg-white px-8 py-2 shadow-lg"
                        >
                          <FaRegEdit />
                          <p>Edite Profile</p>
                        </button>
                      </div>
                      <div className="z-[100] flex gap-6 bg-white px-5 pb-5">
                        <Image
                          className="relative mt-[-20px]  h-[100px] w-[100px] rounded-full bg-white ring-4 ring-white"
                          src={obj.photoUrl}
                        />
                        <div>
                          <h3 className="text-secondery mt-3 text-xl font-bold">
                            {obj.name}
                          </h3>
                          <p className="mt-3">
                            {obj.bio
                              ? obj.bio
                              : "Lorem ipsum dolor, sit amet consectetur adipisicingDolore tenetur perspiciatis cumque molestiae veniam, placeat eos autem error, laborum nihil sequi"}
                          </p>
                          <button
                            onClick={() => setShow(!show)}
                            className="mt-3 rounded-lg border-none bg-primary py-2 px-8 font-semibold text-white"
                          >
                            Contact Info
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileInfo;
