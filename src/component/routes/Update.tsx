import { useForm } from "react-hook-form";
import Nav from "../nav/Nav";
import SideBar from "../sideBar/SideBar";
import { Country } from "country-state-city";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context api/context";
import { getUserData } from "../../auth/auth";

const Update = () => {
  const user = getUserData().data;

  const { handleUpdateUser } = useContext(Context);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleUpdate = (data: {}) => {
    handleUpdateUser(data);
  };

  const country = Country.getAllCountries();

  return (
    <div className="flex w-full">
      <SideBar />
      <div className="w-full">
        <Nav />

        <div className="w-full sm:w-96 sm:mx-auto updated bg-white shadow-lg my-28 p-3 rounded-md">
          <form onSubmit={handleSubmit(handleUpdate)}>
            <h3 className=" capitalize tracking-wider italic text-orange-700">
              update profile
            </h3>
            <div className="my-5 relative">
              <label className="block mb-2 " htmlFor="updateName">
                Username : <span className="text-red-500">*</span>
              </label>
              <input
                {...register("updateName", { required: true })}
                placeholder={user?.displayName}
                className="w-full sm:w-3/4 outline-none border-2   rounded-md px-2 py-1"
                id="updateName"
                type="text"
              />
              {errors.updateName && (
                <small className=" absolute ml-2 text-2xl text-red-600">
                  !
                </small>
              )}
            </div>
            <div>
              <h4 className="mb-2">Email :</h4>
              <p className="w-full sm:w-3/4 outline-none border-2 rounded-md px-2 py-1 text-gray-500 cursor-not-allowed select-none leading-7">
                {user?.email}
              </p>
            </div>

            <div className="my-5">
              <label htmlFor="country">Country :</label>
              <select
                className="block mt-2 outline-none border-2 border-gray-300 px-2 py-1 rounded-md w-full sm:w-3/4 text-gray-500"
                {...register("country")}
                name="country"
                id="country"
              >
                {country.map((e, id) => (
                  <option className="text-blue-500" key={id} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 flex gap-3">
              <button
                type="submit"
                className="duration-500 bg-blue-500 hover:bg-blue-700 px-3 rounded-md text-white"
              >
                Save
              </button>
              <Link
                to="/"
                className="duration-500 bg-red-500 hover:bg-red-700 px-3 rounded-md text-white"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
