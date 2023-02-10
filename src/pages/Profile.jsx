import React, { useEffect, useState } from "react";
import About from "../components/About";
import Experience from "../components/Experience/Index";
import ProfileLayout from "../components/ProfileLayout";
import Projetcs from "../components/Projects";

const Profile = () => {
  return (
    <div className="py-24">
      <ProfileLayout>
        <div className="my-5 grid lg:grid-cols-6">
          <div className="col-span-4">
            <About />
            <Projetcs />
            <Experience />
          </div>
        </div>
      </ProfileLayout>
    </div>
  );
};

export default Profile;
