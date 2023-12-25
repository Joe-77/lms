import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../component/routes/SignIn";
import Home from "../component/routes/Home";
import SignUp from "../component/routes/SignUp";
import ResetPass from "../component/routes/ResetPass";
import ProtectRoutes from "./ProtectRoutes";
import Profile from "../component/routes/Profile";
import Update from "../component/routes/Update";
import Video from "../component/video/Video";
import Dashboard from "../component/routes/Dashboard";
import ShowVideo from "../component/video/ShowVideo";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<SignIn />} />
      <Route path="signUp" element={<SignUp />} />
      <Route path="reset" element={<ResetPass />} />

      <Route path="/" element={<ProtectRoutes />}>
        <Route path="profile" element={<Profile />} />
        <Route path="update" element={<Update />} />
        <Route path="video/:name" element={<Video />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="learning/:name" element={<ShowVideo />} />
      </Route>
    </Routes>
  );
};

export default Routers;
