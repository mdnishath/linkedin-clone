import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { setData } from "../../auth";
import Input from "../Input";
import AddLogo from "./AddLogo";
import Image from "../Image";
import { ThreeDots } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";

const Popup = ({ setShow }) => {
  const user = useSelector((state) => state.user.user);
  const [title, setTitle] = useState("");
  const [company, setComapany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState("");
  //   console.log(logo);

  const handleAdd = async () => {
    setLoading(true);
    await setData(
      {
        title,
        company,
        location,
        description,
        logo,
        uid: user.uid,
      },
      "experience"
    );
    setTitle("");
    setComapany("");
    setLocation("");
    setDescription("");
    setLogo("");
    setLoading("");
    console.log("exp added");
  };
  return (
    <div className="fixed top-0 right-0 z-[101] h-screen">
      <div className="flex h-screen items-center justify-end">
        <div className="relative h-[600px] w-[500px] overflow-y-auto rounded-tl-lg bg-white p-5 shadow-all">
          <button
            onClick={() => setShow(false)}
            className="absolute top-2 right-2"
          >
            <AiOutlineClose className="text-2xl" />
          </button>
          <div>
            <h3 className="mb-4 mt-4 text-center text-xl font-bold text-primary">
              Add your experience
            </h3>
            {logo && (
              <div className="flex justify-center">
                <Image className={"h-14 w-14 object-fill"} src={logo} />
              </div>
            )}
            <AddLogo setLogo={setLogo} />
            <div className="mt-4 flex w-full flex-col items-center justify-center">
              <Input
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className={"file-input w-3/4 px-4"}
                placeholder="Title"
                value={title}
                //   innerref={nameRafe}
              />
            </div>
            <div className="mt-4 flex w-full flex-col items-center justify-center">
              <Input
                onChange={(e) => setComapany(e.target.value)}
                type="text"
                className={"file-input w-3/4 px-4"}
                placeholder="Company"
                value={company}
                //   innerref={nameRafe}
              />
            </div>
            <div className="mt-4 flex w-full flex-col items-center justify-center">
              <Input
                onChange={(e) => setLocation(e.target.value)}
                type="text"
                className={"file-input w-3/4 px-4"}
                placeholder="Location"
                value={location}
                //   innerref={nameRafe}
              />
            </div>
            <div className="mt-4 flex w-full flex-col items-center justify-center">
              <Input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className={"file-input w-3/4 px-4"}
                placeholder="discribe"
                value={description}
                //   innerref={nameRafe}
              />
            </div>
            <div className="mt-4 flex w-full flex-col items-center justify-center">
              <div className="flex justify-center">
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
                  <button
                    onClick={handleAdd}
                    className="btn mt-3 border-none bg-primary px-8"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
