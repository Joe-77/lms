import Nav from "../nav/Nav";
import SideBar from "../sideBar/SideBar";
import defaultImg from "../../assets/user.png";
import Swal from "sweetalert2";
import { useContext } from "react";
import { Context } from "../../context api/context";
import { Link } from "react-router-dom";
import { getUserData } from "../../auth/auth";

const Profile = () => {
  const { handleDeleteUser } = useContext(Context);

  const { data } = getUserData();

  const deleteUser = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser();
      }
    });
  };

  return (
    <div className="flex w-full">
      <SideBar />
      <div className="w-full">
        <Nav />
        <div className="card w-11/12 sm:w-1/2 lg:w-1/4 mx-auto my-20 ">
          <div className="w-full p-3 bg-white shadow-md shadow-gray-400 rounded-md">
            <img className=" w-60 m-auto lg:w-full" src={defaultImg} alt="" />
            <div className="my-2 text-[10px] sm:text-sm border-b-[1px] border-b-gray-200 pb-3">
              {" "}
              Username :{" "}
              <span className=" text-orange-700 italic font-mono capitalize">
                {data?.displayName}
              </span>
            </div>
            <div className="my-2 text-[10px] sm:text-sm border-b-[1px] border-b-gray-200 pb-3">
              {" "}
              Email :{" "}
              <span className=" text-orange-700 italic font-mono">
                {data?.email}
              </span>
            </div>
            <div className="my-2 text-[10px] sm:text-sm">
              {" "}
              Country :{" "}
              <span className=" text-orange-700 italic font-mono">
                {data?.country}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center text-[12px] mt-5">
            <Link
              to="/update"
              className="capitalize duration-500 bg-blue-500 hover:bg-blue-700 p-1 text-white rounded-md"
            >
              update profile
            </Link>
            <button
              onClick={deleteUser}
              className="capitalize duration-500 bg-red-500 hover:bg-red-700 p-1 text-white rounded-md"
            >
              delete account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
