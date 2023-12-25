import { FaSearch } from "react-icons/fa";
import "./nav.css";
import Menu from "./Menu";
import { useContext } from "react";
import { Context } from "../../context api/context";

const Nav = () => {
  const { setSearch } = useContext(Context);

  return (
    <nav className="mt-5 flex items-center justify-between w-full pb-4 border-b-2 border-gray-200 px-2 sm:px-5">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="search flex items-center gap-2 bg-gray-200 py-2 px-2 rounded-full duration-700"
      >
        <button className=" cursor-pointer text-gray-400">
          <FaSearch />
        </button>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search for a course"
          className=" bg-transparent outline-none w-20 sm:w-28 duration-500"
        />
      </form>
      <Menu />
    </nav>
  );
};

export default Nav;
