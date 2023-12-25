import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/computer.png";
import { BsBrowserSafari } from "react-icons/bs";
import { AiFillDashboard } from "react-icons/ai";
import "./side.css";
import { useContext } from "react";
import { Context } from "../../context api/context";

const SideBar = () => {
  const { setCategory } = useContext(Context);

  return (
    <aside className="min-w-20 min-h-screen sm:w-56 py-6 sm:py-4 pl-3 sm:pl-7 pr-1 bg-white shadow-md shadow-gray-300 duration-500">
      <Link
        onClick={() => setCategory("")}
        to="/"
        className="logo flex items-center gap-3"
      >
        <img className="w-8 sm:w-10 ml-1 sm:ml-0" src={logo} alt="" />
        <h4 className="text-sm lg:text-xl font-mono italic capitalize hidden sm:block">
          courses
        </h4>
      </Link>

      <div className="mt-8 sm:mt-14">
        <NavLink
          className="links flex  items-center gap-2 text-xl py-2 px-3"
          to={"/home"}
        >
          <BsBrowserSafari />
          <span className=" capitalize tracking-wide text-sm hidden sm:block">
            browser
          </span>
        </NavLink>


        <NavLink
          className="links flex  items-center gap-2 text-xl py-2 px-3 mt-6"
          to={"/dashboard"}
        >
          <AiFillDashboard />
          <span className=" capitalize tracking-wide text-sm hidden sm:block">
            dashboard
          </span>
        </NavLink>
      </div>
    </aside>
  );
};

export default SideBar;
