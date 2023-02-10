import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
import Image from "./Image";
import { BsSearch } from "react-icons/bs";
import { logout } from "../auth";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../auth";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const { obj, loading } = getProfile(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // handeling logout
  const handleLogout = () => {
    logout();
    dispatch(setUser(null));
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  return (
    <div className="fixed top-0 left-0 z-[100] h-16 w-full bg-white shadow-lg">
      <Container>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link to={"/"}>
              <div className="h-12 w-12">
                <Image src={"images/logo.png"} />
              </div>
            </Link>
          </div>
          <div className="flex-none">
            <div className="flex items-center gap-10">
              <div>
                <BsSearch className="text-lg" />
              </div>
              <div>
                <ul className="flex items-center gap-4 text-lg font-semibold">
                  {!user && (
                    <>
                      <li>
                        <Link to={"/login"}>Login</Link>
                      </li>
                      <li>
                        <Link to={"/signup"}>Signup</Link>
                      </li>
                    </>
                  )}
                  {user && (
                    <div className="flex items-center gap-5">
                      <div className="h-10 w-10">
                        <Link to={"/profile"}>
                          <Image
                            className="h-full w-full rounded-full  border-2 border-primary"
                            src={user.photoURL}
                          />
                        </Link>
                      </div>
                      {/* <p className="text-sm">{user.displayName}</p> */}
                      <AiOutlineLogout
                        onClick={handleLogout}
                        className="cursor-pointer text-3xl"
                      />
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
