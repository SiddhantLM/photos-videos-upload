import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/operations/forgotPass";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email, navigate));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <div className="bg-white shadow-xl flex flex-col p-7 items-center min-w-[518px]">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-[#388087] my-4">
            FORGOT PASSWORD
          </h1>
          <p className="text-lg font-semibold">
            Enter email to reset passoword
          </p>
        </div>

        <form
          className="flex flex-col gap-5 mt-10 w-3/4"
          onSubmit={handleOnSubmit}
        >
          <div className="flex relative flex-col mb-10">
            <label htmlFor="email">Enter your email</label>
            <input
              required
              className="bg-gray-300 rounded-md text-lg py-1"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <div className="absolute -bottom-8 right-0">
              <button
                className="text-blue-600 "
                onClick={() => navigate("/login")}
              >
                Back to login
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

export default ForgotPass;
