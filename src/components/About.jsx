import React, { useState } from "react";
import { getProfile } from "../auth";
import { useSelector, useDispatch } from "react-redux";

const About = () => {
  const [showAll, setShowAll] = useState(false);

  const showMore = () => setShowAll(true);
  const showLess = () => setShowAll(false);
  const limit = 200;
  const user = useSelector((state) => state.user.user);
  const { obj, loading } = getProfile(user);
  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  const toShow = obj.about ? obj.about.substring(0, limit) + "..." : "";

  return (
    <div className="mt-5 w-full rounded-lg bg-white  p-5 px-3 shadow-all ">
      <h4 className="text-xl font-bold text-primary">About</h4>
      {showAll ? (
        <>
          <p>{obj.about}</p>
          <button
            className="rounded-lg py-1 font-semibold text-primary"
            onClick={showLess}
          >
            Read less
          </button>
        </>
      ) : (
        <>
          <p>
            {toShow && toShow}
            {toShow && (
              <button
                className="rounded-lg py-1 font-semibold text-primary"
                onClick={showMore}
              >
                Read more
              </button>
            )}
          </p>
        </>
      )}
    </div>
  );
};

export default About;
