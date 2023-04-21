import React from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    console.log("onLogout");
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    console.log("Logged out!");
  };

  return (
    <header className="z-50 w-full flex justify-between items-center bg-white sm:px-8 px-4 py-5 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>
      <div className="flex justify-between items-center">
        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
        {user && (
          <button
            onClick={onLogout}
            className="font-inter font-medium bg-black text-white ml-5 px-4 py-2 rounded-md"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
