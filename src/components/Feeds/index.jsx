import React, { useEffect, useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { setData } from "../../auth";
import { useSelector, useDispatch } from "react-redux";
import Image from "../Image";
import Popup from "./Popup";
import { ThreeDots } from "react-loader-spinner";

const NewFeed = () => {
  const user = useSelector((state) => state.user.user);

  const [feedText, setFeedText] = useState("");
  const [feedImage, setFeedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [newFeed, setNewFeed] = useState({});

  useEffect(() => {
    setNewFeed({
      ...newFeed,
      feedtext: feedText,
      image: feedImage,
      uploadDate: Date.now(),
      uid: user.uid,
    });
  }, [feedText, feedImage]);

  //Handle popup
  const handleImage = () => {
    setShow(!show);
  };

  // handle feed text
  const handleTextArea = (e) => {
    setFeedText(e.target.value);
  };

  // handle new feed
  const handleNewPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    const filtered = Object.keys(newFeed)
      .filter((key) => newFeed[key] !== "" && newFeed[key])
      .reduce((filteredObject, key) => {
        filteredObject[key] = newFeed[key];
        return filteredObject;
      }, {});

    // console.log(filtered);
    if (filtered) {
      await setData(filtered, "feeds");
      setLoading(false);
      setFeedText("");
      setFeedImage("");
      console.log("feed saved");
    }
    // await setData(newFeed, "projects");
  };
  // console.log(newFeed);
  return (
    <div>
      {show && <Popup setShow={setShow} setFeedImage={setFeedImage} />}

      <div className="w-full divide-y rounded-lg bg-white p-8 shadow-lg">
        <h3 className="mb-5 font-semibold">NEW POST</h3>
        <form className="pt-5" onSubmit={(e) => handleNewPost(e)}>
          <div className="relative">
            <textarea
              className="w-full p-4 placeholder:text-slate-400 focus:outline-slate-200"
              rows="3"
              cols="50"
              placeholder=" What’s on your mind?"
              name="feed"
              onChange={(e) => handleTextArea(e)}
              value={feedText}
            ></textarea>
            <div className="absolute bottom-[10px] right-[10px]">
              <div className="flex items-center gap-x-5">
                <BsCardImage
                  onClick={handleImage}
                  className="cursor-pointer text-2xl  text-slate-600"
                />
                {loading ? (
                  <div className="flex items-center justify-center">
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
                  <button
                    type="submit"
                    className={
                      !(feedText || feedImage)
                        ? `rounded-lg bg-slate-500 py-2 px-2 text-white`
                        : `rounded-lg bg-primary py-2 px-2 text-white`
                    }
                    disabled={!(feedText || feedImage)}
                  >
                    <IoIosSend className="text-xl" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 w-[200px]">
            {feedImage && (
              <Image className="w-fit object-fill" src={feedImage} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFeed;
