import React, { useState, useRef, useEffect } from "react";
import { db } from "../../firebase";
import { ThreeDots } from "react-loader-spinner";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { update, getDatabase, ref as dbRef } from "firebase/database";
import { getProfile } from "../../auth";
import { useSelector, useDispatch } from "react-redux";
import Input from "../Input";

const EditBio = () => {
  const user = useSelector((state) => state.user.user);
  const { obj, loading } = getProfile(user);
  const [bio, setBio] = useState("");
  const bioRef = useRef(null);
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    // const dataName = obj.name;
    setBio(String(obj.bio ? obj.bio : ""));
  }, [obj]);
  // name change

  const handleSave = async () => {
    setUpload(true);
    const updateRef = dbRef(db, "users/" + obj.key);

    if (bio) {
      await update(updateRef, {
        ...obj,
        bio: bio,
      });
    }
    setUpload(false);
  };

  return (
    <div>
      <h3 className="mb-4 mt-4 text-center text-xl font-bold text-primary">
        Change Bio
      </h3>
      <div className="mt-4 flex w-full flex-col items-center justify-center">
        <Input
          onChange={(e) => setBio(e.target.value)}
          type="text"
          className={"file-input w-3/4 px-4"}
          placeholder="Full name"
          value={bio}
          innerref={bioRef}
        />
      </div>

      {bio && (
        <div className="flex justify-center">
          {upload ? (
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
  );
};
export default EditBio;
