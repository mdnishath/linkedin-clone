import React from "react";
import { getAllProfile, setData } from "../../auth";
import Image from "../Image";
import { useSelector, useDispatch } from "react-redux";

const Users = () => {
  const user = useSelector((state) => state.user.user);
  const { obj, loading } = getAllProfile();

  const handleFriendRequest = async (item) => {
    await setData(
      {
        senderid: user.uid,
        senderName: user.displayName,
        senderImage: user.photoURL,
        senderEmail: user.email,
        receverid: item.id,
        receverName: item.name,
        receverImage: item.photoUrl,
        receverEmail: item.email,
        requestID: item.id + user.uid,
      },
      "fqrList"
    );
    console.log("request added");
  };
  //   console.log(obj);
  return (
    <div className="rounded-lg p-2 shadow-all">
      <h3 className="pl-2 font-semibold text-primary">User List</h3>
      <div className="grid grid-cols-1 gap-2 divide-y">
        {obj.map(
          (item) =>
            item.id !== user.uid && (
              <div key={item.key}>
                <div className="flex items-center gap-2 p-2">
                  <Image
                    className={"h-10 w-10 rounded-full"}
                    src={item.photoUrl}
                  />
                  <div className="flex w-full justify-between">
                    <h4>{item.name}</h4>
                    <button
                      onClick={() => handleFriendRequest(item)}
                      className="rounded-full bg-primary px-3 text-sm text-white"
                    >
                      Add Friend
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Users;
