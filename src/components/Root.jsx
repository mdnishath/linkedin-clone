import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Root = () => {
  let location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <>
          <Navbar />
        </>
      )}
      <Outlet />
    </>
  );
};

export default Root;
