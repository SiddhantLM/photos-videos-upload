import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operations/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <div className="bg-white shadow-xl flex flex-col p-7 items-center min-w-[518px]">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-[#388087] my-4">LOGIN FORM</h1>
          <p className="text-lg font-semibold">Enter you details to login</p>
        </div>

        <form
          action="post"
          className="flex flex-col gap-5 mt-10 w-3/4"
          onSubmit={handleOnSubmit}
        >
          <div className="flex flex-col ">
            <label htmlFor="email">Enter your email</label>
            <input
              required
              className="bg-gray-300 rounded-md text-lg py-1"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="md:flex gap-4 relative mb-10">
            <div className="flex flex-col w-full">
              <label htmlFor="pass">Password</label>
              <input
                autoComplete="true"
                required
                className="bg-gray-300 rounded-md text-lg py-1"
                type="password"
                value={password}
                name="pass"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
            <div className="absolute -bottom-8 right-0">
              <button
                type="button"
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
          <button
            type="button"
            className="bg-[#EEEEE0]  py-4 w-full text-center rounded-lg text-xl font-semibold"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
