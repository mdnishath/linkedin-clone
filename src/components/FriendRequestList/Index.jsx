import React from "react";
import { getrequest } from "../../auth";
import Image from "../Image";
import { useSelector, useDispatch } from "react-redux";

const FriendRequestList = () => {
  const user = useSelector((state) => state.user.user);
  const { obj, loading } = getrequest(user);

  console.log(obj);
  return (
    <div className="rounded-lg p-2 shadow-all">
      <h3 className="pl-2 font-semibold text-primary">Request List</h3>
      <div className="grid grid-cols-1 gap-2 divide-y">
        {obj.map(
          (item) =>
            item.senderid !== user.uid && (
              <div key={item.key}>
                <div className="flex items-center gap-2 p-2">
                  <Image
                    className={"h-10 w-10 rounded-full"}
                    src={item.senderImage}
                  />
                  <div className="flex w-full justify-between">
                    <h4>{item.senderName}</h4>
                    <button
                      // onClick={() => handleFriendRequest(item)}
                      className="rounded-full bg-primary px-3 text-sm text-white"
                    >
                      Accpet
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

export default FriendRequestList;
