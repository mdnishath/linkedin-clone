import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../auth";
import Image from "./Image";
import { ThreeDots } from "react-loader-spinner";

const ProfileCard = () => {
  const user = useSelector((state) => state.user.user);
  const { obj, loading } = getProfile(user);
  console.log(obj);
  return (
    <>
      {Object.keys(obj).length !== 0 ? (
        <div className="rounded-lg bg-white shadow-lg">
          <Image className="h-[150px] w-full rounded-t-lg" src={obj.cover} />
          <div className="z-[100] px-5 pb-5">
            <Image
              className="relative mx-auto mt-[-50px] h-[100px] w-[100px] rounded-full bg-white ring-4 ring-primary"
              src={obj.photoUrl}
            />
            <h3 className="text-secondery mt-3 text-center text-xl font-bold">
              {obj.name}
            </h3>
            <p className="mt-3 text-center">{obj.bio}</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
          />
        </div>
      )}
    </>
  );
};

export default ProfileCard;
