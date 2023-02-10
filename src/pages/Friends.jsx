import React from "react";
import FriendRequestList from "../components/FriendRequestList/Index";
import ProfileLayout from "../components/ProfileLayout";
import Users from "../components/Users/Index";

const Friends = () => {
  return (
    <div className="py-24">
      <ProfileLayout>
        <div className="mt-5 w-full">
          <div className="grid lg:grid-cols-6">
            <div className=" col-span-4 w-full rounded-lg bg-white p-4 shadow-all">
              <h4 className="mb-4 text-xl font-bold text-primary">Friends</h4>
              <div className="grid grid-cols-2 gap-2">
                <FriendRequestList />
                <Users />
              </div>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </div>
  );
};

export default Friends;
