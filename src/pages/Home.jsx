import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [verifyMessage, setVeifyMessage] = useState("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          navigate("/feeds");
        }
        console.log(user);
        dispatch(setUser(user));
        localStorage.setItem("userInfo", JSON.stringify(user));
      } else {
        navigate("/login");
      }
    });
    return unsubscribe();
  }, []);

  useEffect(() => {
    // console.log(user.emailVerified);
    if (!user) {
      navigate("/login");
    }
  }, []);

  // verify email
  const handleVerify = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      setVeifyMessage(
        `We sent an verification link to: ${auth.currentUser.email} .After verify please refresh this page`
      );
      // ...
    });
  };
  console.log(user);
  return (
    <>
      {user && !user.emailVerified && (
        <div className="mx-auto flex h-screen w-[500px] items-center">
          <div className="w-full rounded-lg p-5 shadow-all">
            <h1 className="text-center text-2xl font-bold text-primary">
              Please verify your email
            </h1>
            <div className="my-4 flex w-full justify-center">
              <button
                onClick={handleVerify}
                className="rounded bg-primary py-2 px-5 text-white"
              >
                Verify now
              </button>
            </div>

            {verifyMessage && (
              <p className="text-center text-slate-700">{verifyMessage}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
