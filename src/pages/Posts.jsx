import React from "react";
import PostList from "../components/PostList";
import ProfileLayout from "../components/ProfileLayout";

const Posts = () => {
  return (
    <div className="py-24">
      <ProfileLayout>
        <div className="mt-5 w-full">
          <div className="grid lg:grid-cols-6">
            <div className=" col-span-4 w-full ">
              <h4 className="text-xl font-bold text-primary">
                <PostList />
              </h4>
            </div>
          </div>
        </div>
      </ProfileLayout>
    </div>
  );
};

export default Posts;
