import { Link } from "react-router-dom";
import User from "./User";
import { useContext } from "react";
import { Context } from "../../context api/context";

const Menu = () => {
  const { isLogin } = useContext(Context);

  return (
    <div className="mr-2 sm:mr-10">
      {isLogin ? (
        <User />
      ) : (
        <Link
          to="/login"
          className="duration-500 bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded-md text-white "
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default Menu;
