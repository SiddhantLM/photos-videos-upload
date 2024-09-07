import React from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/operations/auth";

const SideMenu = ({ sideMenuHandler }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

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
  return (
    <div className="fixed z-[1000] top-0 right-0  backdrop:blur-sm min-h-[100vh] bg-white w-[60%] flex flex-col p-8">
      <div
        className="fixed top-6 right-6 p-2 border-2 border-black"
        onClick={() => sideMenuHandler(false)}
      >
        <IoMdClose size={30} />
      </div>
      <ul className="mt-16 flex flex-col gap-3  text-xl capitalize underline underline-offset-4 mb-6">
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              sideMenuHandler(false);
              navigate(`/${item.title}`);
            }}
          >
            {item.title}
          </li>
        ))}
      </ul>

      <hr />

      {token ? (
        <button
          className="bg-red-500 py-2 px-3 text-white text-xl mt-6 w-[135px] rounded-md"
          onClick={handleLogout}
        >
          Sign out
        </button>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          <button
            className={`transition-all duration-200  font-semibold rounded-full px-3 py-1 bg-white border-2 border-[#388087] text-[#293241] w-[135px]`}
            value={"login"}
            onClick={() => {
              sideMenuHandler(false);
              navigate("/login");
            }}
          >
            Login
          </button>

          <button
            value={"signup"}
            onClick={() => {
              sideMenuHandler(false);
              navigate("/signup");
            }}
            className={`font-semibold rounded-full px-3 py-1 bg-white border-2 border-[#388087] text-[#293241] w-[135px]`}
          >
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
