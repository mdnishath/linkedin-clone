import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "../auth";
import Container from "../components/Container";
import Form from "../components/Form";
import Image from "../components/Image";
import Input from "../components/Input";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  //Form state
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

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
  //Handle password input

  const handlePasswordChange = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
    setPasswordError("");
  };
  //Handeling signup form
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
      setEmailError("Invalid email");
    } else if (!password) {
      setPasswordError(`Password can't be empty`);
    } else {
      const response = await login(email, password);

      if (
        response.message &&
        response.message.includes("auth/user-not-found")
      ) {
        setError("User not found");
        return;
      } else if (
        response.message &&
        response.message.includes("auth/wrong-password")
      ) {
        setError("Wrong password");
        return;
      } else {
        dispatch(setUser(response));
        localStorage.setItem("userInfo", JSON.stringify(response));
        setEmail("");
        setPassword("");
        toast.success("Login Success wait for redirect");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    }
  };
  return (
    <div className="py-[200px]">
      <Container>
        <ToastContainer
          position="bottom-center"
          autoClose={1500}
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

          <h1 className="mt-10 text-center text-4xl font-bold">Login</h1>
          <p className="mt-3 text-center text-xl">
            Free register and you can enjoy it
          </p>

          {error && (
            <p className="mt-5 text-center text-xl text-red-500">{error}</p>
          )}
        </div>
        <div className="mx-auto mt-12 md:w-[500px]">
          <Form onSubmit={(e) => handleLogin(e)}>
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
                  onChange={(e) => handlePasswordChange(e)}
                  type={"password"}
                  placeholder={"Password"}
                  value={password}
                />
                {passwordError && (
                  <p className="ml-2 mt-1 text-red-500">{passwordError}</p>
                )}
              </div>

              <button className="btn bg-primary text-white">Login</button>
              <p className="text-center font-semibold">
                Don't have an account!{" "}
                <Link to={"/signup"} className={"text-primary"}>
                  Signup now
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
