import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/operations/auth";

const VerifyEmail = () => {
  const [digit1, setDigit1] = useState("");

  const signupData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const digit1HandleChange = (otp) => {
    setDigit1(otp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupData);
    const { name, email, password } = signupData.signupData;

    dispatch(signUp(name, email, password, digit1, navigate));
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#FFFFF0] flex flex-col items-center justify-center ">
      <div className="bg-white shadow-2xl flex flex-col items-center justify-center gap-4 w-1/4 mx-auto p-5 rounded-lg min-h-[300px]">
        <h1 className="text-2xl font-bold ">ENTER YOUR OTP</h1>
        <p className="text-lg font-medium">enter the otp we have mailed you</p>

        <form onSubmit={handleSubmit}>
          <OTPInput
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
              padding: "10px 10px",
            }}
            numInputs={6}
            value={digit1}
            // onChange={(e) => setOtp(e.target.value)}
            onChange={digit1HandleChange}
            // containerStyle="bg-gray-500 p-6 text-black"
            inputStyle=" px-4 py-3 rounded-md text-black"
            renderInput={(props) => (
              <input
                {...props}
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="text-black border-2 border-black rounded-md aspect-square w-[48px] md:w[60px] text-center font-bold text-2xl"
              />
            )}
            renderSeparator={<span> -- </span>}
          />
          <button
            type="submit"
            className="bg-gray-400 py-3 px-5 rounded-md text-lg text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
