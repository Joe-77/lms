import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineAttachEmail } from "react-icons/md";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context api/context";
import Logo from "../nav/logo/Logo";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const { signUp } = useContext(Context);

  const showPassword: () => void = () => {
    setShowPass(!showPass);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleFormSubmit: (data: {}) => void = (data) => {
    signUp(data);
  };

  return (
    <div className="min-h-screen bg-lms bg-center bg-cover bg-no-repeat relative">
      <div className="overlay w-full h-full absolute top-0 left-0 bg-black opacity-75 z-10"></div>

      <Logo />

      <div className="relative z-50 w-11/12 min-[400px]:w-3/4 min-[500px]:w-[60%] sm:w-1/2 lg:w-1/4 mx-auto mt-28 lg:mt-36  py-5 rounded-lg">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <h4 className="text-xl text-center py-2 text-white">
            Sign up to{" "}
            <span className=" text-indigo-500 font-bold uppercase animate-pulse">
              lms
            </span>
          </h4>

          <div className="mx-auto my-4 w-3/4 bg-gray-300 flex items-center justify-end flex-row-reverse gap-2 px-2 py-1 rounded-lg border-2 border-gray-300 duration-700 focus-within:border-green-500 relative">
            <input
              {...register("userName", { required: true })}
              className=" bg-transparent outline-none w-full"
              placeholder="Name"
              type="text"
              id="name"
            />
            <label
              className="labelMail text-sm text-gray-600 duration-700 labelName"
              htmlFor="name"
            >
              <FaUser />
            </label>
            {errors.userName && (
              <small className=" absolute right-[-15px] text-2xl text-red-600">
                !
              </small>
            )}
          </div>

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

          <div className="mx-auto mt-4 w-3/4 bg-gray-300 flex items-center justify-end flex-row-reverse gap-2 px-2 py-1 rounded-lg border-2 border-gray-300 duration-700 focus-within:border-green-500 relative">
            <input
              {...register("password", { required: true, minLength: 6 })}
              className=" bg-transparent outline-none w-full"
              placeholder="Password"
              type={showPass ? "text" : "password"}
              id="pass"
            />
            <label
              className="labelPass text-sm text-gray-600 duration-700"
              htmlFor="pass"
            >
              <FaLock />
            </label>
            <div
              onClick={showPassword}
              className=" absolute right-3 text-sm top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPass ? <FaRegEyeSlash /> : <FaEye />}
            </div>
            {errors.password && (
              <small className=" absolute right-[-15px] text-2xl text-red-600">
                !
              </small>
            )}
          </div>

          <div className="w-3/4 mx-auto">
            <Link to="/login" className="text-[10px] text-zinc-500">
              already have an account?
            </Link>
          </div>

          <button
            type="submit"
            className="w-3/4 mx-auto my-4 py-1 rounded-md text-white text-center tracking-wider text-lg bg-blue-500 hover:bg-blue-700 duration-500 block"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
