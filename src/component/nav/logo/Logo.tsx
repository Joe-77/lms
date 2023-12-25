import { Link } from "react-router-dom";
import logo from '../../../assets/computer.png'
const Logo = () => {
  return (
    <div className="relative z-30 flex justify-between items-center px-5 lg:px-10 py-3">
      <Link to="/">
        <img className="w-14 sm:w-18" src={logo} alt="" />
      </Link>
      <Link
        to="/login"
        className="duration-500 bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded-md text-white "
      >
        Sign In
      </Link>
    </div>
  );
}

export default Logo