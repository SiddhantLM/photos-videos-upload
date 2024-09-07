import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import { sendOtp } from "../services/operations/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("password doesn't match");
      return;
    }

    const signupData = {
      name: name,
      email: email,
      password: password,
    };
    console.log(signupData);

    dispatch(setSignupData(signupData));
    dispatch(sendOtp(email, navigate));

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <div className="bg-white shadow-xl flex flex-col p-7 items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-[#388087] my-4">
            SIGNUP FORM
          </h1>
          <p className="text-lg font-semibold">Enter you details to sign up</p>
        </div>

        <form
          className="flex flex-col gap-5 mt-10 w-3/4"
          onSubmit={handleOnSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="name">Enter your name</label>
            <input
              className="bg-gray-300 rounded-md text-lg py-1"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              required
            />
          </div>
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
          <div className="md:flex gap-4 relative mb-4">
            <div className="flex flex-col md:w-1/2">
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
            <div className="flex flex-col md:w-1/2">
              <label htmlFor="confirm-pass">Confirm Password</label>
              <input
                required
                className="bg-gray-300 rounded-md text-lg py-1"
                type="password"
                value={confirmPassword}
                name="confirm-pass"
                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="bg-[#388087] text-white py-4 w-full text-center rounded-lg text-xl font-semibold">
            <button type="submit" name="submit">
              Submit
            </button>
          </div>

          <button
            type="button"
            className="bg-[#EEEEE0]  py-4 w-full text-center rounded-lg text-xl font-semibold"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
