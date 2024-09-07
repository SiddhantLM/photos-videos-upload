import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPass } from "../services/operations/forgotPass";

const ResetPass = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const path = location.pathname;
    const token = path.split("/").at(-1);

    if (password !== confirmPassword) {
      console.log("password not same");
    }

    dispatch(resetPass(password, token, navigate));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <div className="bg-white shadow-xl flex flex-col p-7 items-center min-w-[518px]">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-[#388087] my-4">
            Rese tPassword
          </h1>
          <p className="text-lg font-semibold">Enter your new password</p>
        </div>

        <form
          className="flex flex-col gap-5 mt-10 w-3/4"
          onSubmit={handleOnSubmit}
        >
          <div className="flex flex-col w-full">
            <label htmlFor="pass">Password</label>
            <input
              required
              className="bg-gray-300 rounded-md text-lg py-1"
              type="password"
              value={password}
              name="pass"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col gap-4 relative mb-10">
            <div className="flex flex-col w-full">
              <label htmlFor="pass">Confirm Password</label>
              <input
                required
                className="bg-gray-300 rounded-md text-lg py-1"
                type="password"
                value={confirmPassword}
                name="pass"
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              />
            </div>
            <div className="absolute -bottom-8 right-0">
              <button
                className="text-blue-600 "
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>
          </div>
          <button
            type="submit"
            name="submit"
            className="bg-[#388087] text-white py-4 w-full text-center rounded-lg text-xl font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
