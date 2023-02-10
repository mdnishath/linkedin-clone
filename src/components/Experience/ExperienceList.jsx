import React from "react";
import { getAllExperience } from "../../auth";
import { useSelector, useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import Image from "../Image";

const ExperienceList = () => {
  const user = useSelector((state) => state.user.user);
  const { experiences, loading } = getAllExperience(user);
  return (
    <div className="mt-2 grid grid-cols-1 gap-4 divide-y ">
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
        experiences.map((exp) => (
          <div key={exp.key} className="p-5">
            <div className="flex gap-5 py-5">
              <Image className={"h-11 w-11"} src={exp.logo} />
              <div className="flex flex-col gap-2">
                <h5 className="text-lg font-semibold">{exp.title}</h5>
                <div className="flex gap-4">
                  <p className="font-semibold">{exp.company}</p>
                  <p>{exp.location}</p>
                </div>
                <p>{exp.description}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ExperienceList;
