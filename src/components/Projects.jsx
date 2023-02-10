import React, { useState } from "react";
import { TfiGallery } from "react-icons/tfi";
import Popup from "./Projects/Popup";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../auth";
import Image from "./Image";
import { ThreeDots } from "react-loader-spinner";

const Projects = () => {
  const user = useSelector((state) => state.user.user);
  const { projects, loading } = getProjects(user);
  console.log(projects);
  const [show, setShow] = useState(false);
  // console.log(show);
  return (
    <>
      {show && <Popup setShow={setShow} />}
      <div className="mt-5 w-full rounded-lg bg-white  p-5 px-3 shadow-all ">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <h4 className="text-xl font-bold text-primary">Projects</h4>
            <p>
              <span>{projects.length}</span>
            </p>
          </div>
          <div className="flex cursor-pointer items-center gap-4">
            <TfiGallery
              onClick={() => setShow(!show)}
              className="text-4xl text-slate-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex h-screen items-center justify-center">
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
          <div className="mt-4">
            <div className="grid gap-3 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project.key}>
                  <div className="relative h-[200px] w-full">
                    <Image
                      className="h-full w-full object-cover"
                      src={project.image}
                    />
                    <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] duration-200 ease-linear hover:bg-[rgba(0,0,0,0.9)]">
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="text-xl font-bold text-white">
                          {project.title}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
