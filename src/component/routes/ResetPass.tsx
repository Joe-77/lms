import { MdOutlineAttachEmail } from "react-icons/md";
import Logo from "../nav/logo/Logo";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context api/context";

const ResetPass = () => {
  const { resetPass } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleResetPassword: (email: any) => void = (user: any) => {
    resetPass(user);
  };

  return (
    <div className="min-h-screen bg-lms bg-center bg-cover bg-no-repeat relative">
      <div className="overlay w-full h-full absolute top-0 left-0 bg-black opacity-75 z-10"></div>

      <Logo />

      <div className="relative z-50 w-11/12 min-[400px]:w-3/4 min-[500px]:w-[60%] sm:w-1/2 lg:w-1/4 mx-auto mt-28 lg:mt-36  py-5 rounded-lg">
        <form onSubmit={handleSubmit(handleResetPassword)}>
          <h4 className="text-xl text-indigo-700 text-center py-2">
            Reset Password
          </h4>
          <div className="mx-auto my-4 w-3/4 bg-gray-300 flex items-center justify-end flex-row-reverse gap-2 px-2 py-1 rounded-lg border-2 border-gray-300 duration-700 focus-within:border-green-500 relative">
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /\S+@\S+\.com/,
                  message: "Entered value does not match email format",
                },
              })}
              className=" bg-transparent outline-none w-full"
              placeholder="Email"
              type="text"
              id="email"
            />
            <label
              className="labelMail text-sm text-gray-600 duration-700"
              htmlFor="email"
            >
              <MdOutlineAttachEmail />
            </label>
            {errors.email && (
              <small className=" absolute right-[-15px] text-2xl text-red-600">
                !
              </small>
            )}
          </div>
          <button className="w-3/4 mx-auto mt-4 py-1 rounded-md text-white text-center tracking-wider text-lg bg-blue-500 hover:bg-blue-700 duration-500 block">
            Reset Password
          </button>

          <div className="w-3/4 mx-auto capitalize ">
            <Link
              to="/login"
              className="text-[10px] duration-500 text-teal-300 hover:text-teal-600 ml-2"
            >
              login now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
