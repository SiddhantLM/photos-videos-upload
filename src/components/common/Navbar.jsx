// import React, { useEffect, useState } from 'react'
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/auth";

const Navbar = () => {
  const location = useLocation();
  let currPath = location.pathname.split("/").at(-1);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      title: "photos",
    },
    {
      id: 2,
      title: "videos",
    },
  ];

  const menuItemHandler = (item) => {
    // setActive(item.title);
    navigate("/" + item.title);
  };

  return (
    <div className="absolute top-0 left-0 z-30   bg-[#FFFFF0]  w-full h-[3.5rem] ">
      <div className="md:w-9/12 p-2 flex mx-auto items-center justify-between mt-2">
        <div className="cursor-pointer">
          <Link to={"/"} className="text-2xl font-semibold">
            MemoryMaker
          </Link>
        </div>

        {auth.token !== null ? (
          <div>
            <ul className="md:flex hidden md:gap-x-3 text-lg ">
              {menuItems.map((item) => {
                return (
                  <li
                    className={`md:px-3 px-2 transition-all duration-200 py-1 cursor-pointer rounded-full font-semibold capitalize ${
                      currPath === item.title
                        ? " bg-[#388087] text-white "
                        : "bg-inherit text-[#293241]"
                    }`}
                    onClick={() => menuItemHandler(item)}
                    key={item.id}
                  >
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div></div>
        )}

        {auth.token === null && (
          <div className="md:flex hidden md:gap-x-3 text-lg">
            <button
              className={`transition-all duration-200 ${
                currPath === "login"
                  ? "bg-[#388087] text-white "
                  : "bg-white border-2 border-[#388087] text-[#293241]"
              } font-semibold rounded-full px-3 py-1`}
              value={"login"}
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              value={"signup"}
              onClick={() => navigate("/signup")}
              className={` ${
                currPath === "signup"
                  ? "bg-[#388087] text-white "
                  : "bg-white border-2 border-[#388087] text-[#293241]"
              } font-semibold rounded-full px-3`}
            >
              Signup
            </button>
          </div>
        )}

        {auth.token !== null && (
          <div className="md:flex hidden md:gap-x-3 text-lg">
            <button
              value={"signup"}
              onClick={() => dispatch(logout(navigate))}
              className="rounded-full font-semibold text-white bg-red-600 px-3  py-[4px]"
            >
              Sign out
            </button>
          </div>
        )}

        <div className="md:hidden py-2 bg-white p-2 flex justify-center items-center rounded-md border-2 border-[#388087]">
          <FiMenu size={25} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
