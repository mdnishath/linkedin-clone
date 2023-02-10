import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ExperienceList from "./ExperienceList";
import Popup from "./Popup";

const Experience = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      {show && <Popup setShow={setShow} />}
      <div className="mt-5 w-full rounded-lg bg-white  p-5 px-3 shadow-all ">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <h4 className="text-xl font-bold text-primary">Experience</h4>
          </div>
          <div className="flex cursor-pointer items-center gap-4">
            <AiOutlinePlus
              onClick={() => setShow(!show)}
              className="text-4xl text-slate-500"
            />
          </div>
        </div>

        <ExperienceList />
      </div>
    </>
  );
};

export default Experience;
