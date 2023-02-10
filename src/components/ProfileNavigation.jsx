import React from "react";
import { NavLink } from "react-router-dom";

const ProfileNavigation = () => {
  const active = `bg-primary text-white px-5 py-2 inline-block rounded-lg font-semibold text-lg`;
  const notActive =
    "bg-white text-primary px-5 py-2 inline-block rounded-lg font-semibold text-lg";
  return (
    <div className="w-full px-3 md:px-0">
      <div className="mt-5 grid lg:grid-cols-6">
        <div className=" col-span-4 w-full rounded-lg bg-white  shadow-all">
          <ul className="flex gap-10">
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? active : notActive)}
              >
                <p>Profile</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/friends"
                className={({ isActive }) => (isActive ? active : notActive)}
              >
                <p>Friends</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/posts"
                className={({ isActive }) => (isActive ? active : notActive)}
              >
                <p>Posts</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileNavigation;
