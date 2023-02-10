import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Form from "../components/Form";
import Image from "../components/Image";
import Input from "../components/Input";
import { setData, signUp } from "../auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/userSlice";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  //Form state
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/feeds");
    }
  }, []);

  //handle Email input
  const handleEmailchange = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
    setEmailError("");
  };
  //Handle Name Input
  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setName(e.target.value);
    setNameError("");
  };
  //Handle password input

  const handlePasswordChange = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
    setPasswordError("");
  };
  //Handeling signup form
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
      setEmailError("Invalid email");
    } else if (!name) {
      setNameError(`Name can't be empty`);
    } else if (!password) {
      setPasswordError(`Password can't be empty`);
    } else {
      const response = await signUp(name, email, password);

      // console.log(response);
      setError("");
      if (
        response.message &&
        response.message.includes("auth/email-already-in-use")
      ) {
        setError("Email already in use");
        return;
      }
      await setData(
        {
          name: response.displayName,
          email: response.email,
          id: response.uid,
          photoUrl: response.photoURL,
          joinDate: Date.now(),
        },
        "users"
      );
      dispatch(setUser(response));
      localStorage.setItem("userInfo", JSON.stringify(response));
      setEmail("");
      setName("");
      setPassword("");
      toast.success("Registration Success wait for redirect");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };
  return (
    <div className="py-[200px]">
      <Container>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="">
          <Image className="mx-auto" src={"images/logo.png"} />

          <h1 className="mt-10 text-center text-4xl font-bold">
            Get started with easily register
          </h1>
          <p className="mt-3 text-center text-xl">
            Free register and you can enjoy it
          </p>
          {error && (
            <p className="mt-5 text-center text-xl text-red-500">{error}</p>
          )}
        </div>
        <div className="mx-auto mt-12 md:w-[500px]">
          <Form onSubmit={(e) => handleSignup(e)}>
            <div className="flex flex-col gap-4">
              <div>
                <Input
                  onChange={(e) => handleEmailchange(e)}
                  type={"email"}
                  placeholder={"Email address"}
                  value={email}
                />
                {emailError && (
                  <p className="ml-2 mt-1 text-red-500">{emailError}</p>
                )}
              </div>

              <div>
                <Input
                  onChange={(e) => handleNameChange(e)}
                  type={"text"}
                  placeholder={"Full name"}
                  value={name}
                />
                {nameError && (
                  <p className="ml-2 mt-1 text-red-500">{nameError}</p>
                )}
              </div>
              <div>
                <Input
                  onChange={(e) => handlePasswordChange(e)}
                  type={"password"}
                  placeholder={"Password"}
                  value={password}
                />
                {passwordError && (
                  <p className="ml-2 mt-1 text-red-500">{passwordError}</p>
                )}
              </div>
              <button className="btn bg-primary text-white">Signup</button>
              <p className="text-center font-semibold">
                Already have an account!{" "}
                <Link to={"/login"} className={"text-primary"}>
                  Login now
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
