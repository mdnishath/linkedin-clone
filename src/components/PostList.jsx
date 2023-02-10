import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleUserPosts } from "../auth";
import Image from "./Image";
import { ThreeDots } from "react-loader-spinner";

const PostList = () => {
  const user = useSelector((state) => state.user.user);
  const { posts, loading } = getSingleUserPosts(user);
  console.log(posts);

  return (
    <div>
      {loading ? (
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
        posts.map((post) => (
          <div className=" mb-5 rounded-lg bg-white p-4 shadow-all">
            {post.feedtext && (
              <p className="py-2 text-lg font-normal text-slate-800">
                {post.feedtext}
              </p>
            )}

            {post.image && (
              <Image
                className={"h-[300px] w-full object-cover"}
                src={post.image}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
