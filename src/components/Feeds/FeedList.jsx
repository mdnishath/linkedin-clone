import React from "react";
import { getFeeds } from "../../auth";
import { useSelector, useDispatch } from "react-redux";
import Image from "../Image";
import { getAllProfile } from "../../auth";
import { ThreeDots } from "react-loader-spinner";
import { FaRegEdit } from "react-icons/fa";

const FeedList = () => {
  const user = useSelector((state) => state.user.user);

  const { feeds, feedLoading } = getFeeds();
  const { obj, loading } = getAllProfile(user);
  console.log(obj, feeds);
  return (
    <>
      {feeds.map((item) => (
        <div
          key={item.key}
          className="mb-5 mt-5 rounded-lg bg-white p-5 shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="h-[50px] w-[50px] rounded-full">
              <Image
                className={"w-full rounded-full"}
                src={"images/profile.png"}
              />
            </div>
            <div>
              <h3 className="text-secondery text-sm font-bold">
                {obj.map(
                  (userItem) => userItem.id === item.uid && userItem.name
                )}
              </h3>
              <p className="text-[12px] text-slate-500">iOS developer</p>
            </div>

            <button className="absolute top-5 right-5">
              <FaRegEdit />
            </button>
          </div>
          <div className="mt-4">
            {item.feedtext && <p className="text-slate-600">{item.feedtext}</p>}
          </div>
          <div className="mt-4">
            {item.image && (
              <Image
                className="h-[300px] w-full object-cover"
                src={item.image}
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default FeedList;
