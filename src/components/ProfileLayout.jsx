import React from "react";
import Container from "./Container";
import ProfileInfo from "./ProfileInfo";
import ProfileNavigation from "./ProfileNavigation";

const ProfileLayout = ({ children }) => {
  return (
    <>
      <Container>
        <ProfileInfo />
        <ProfileNavigation />
        <div>{children}</div>
      </Container>
    </>
  );
};

export default ProfileLayout;
