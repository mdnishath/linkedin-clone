import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "../components/Root";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Feeds from "../pages/Feeds";
import Profile from "../pages/Profile";
import Friends from "../pages/Friends";
import Posts from "../pages/Posts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/feeds" element={<Feeds />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
    </Route>
  )
);

export default router;
