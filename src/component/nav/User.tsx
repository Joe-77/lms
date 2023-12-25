import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context api/context";
import { getUserData } from "../../auth/auth";

const User = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { handleSignOut } = useContext(Context);
  const user = getUserData().data;

  

  return (
    <div className="relative ">
      <span
        onClick={() => setShowMenu(!showMenu)}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-teal-600 text-2xl select-none capitalize cursor-pointer"
      >
        {user?.displayName[0]}
      </span>

      {showMenu && (
        <div className="absolute right-1 mt-3">
          <Link
            to="/profile"
            className="capitalize text-xs bg-blue-600 text-white py-1 px-2 rounded-md block w-14"
          >
            profile
          </Link>
          <button
            onClick={handleSignOut}
            className="capitalize text-xs mt-2 bg-red-600 py-1 px-2 rounded-md w-14"
          >
            logout
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
