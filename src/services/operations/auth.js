import { setLoading, setToken } from "../../slices/authSlice";
import { endpoints } from "../apis";
// import { apiConnector } from "../apiConnector";
import axios from "axios";
import { setUser } from "../../slices/userSlice";

export const sendOtp = (email, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        endpoints.SENDOTP_API,
        { email: email },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        console.log("success");
        navigate("/verify-email");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.log(
        "error while sending otp",
        error.response ? error.response.data : error.message
      );
    }

    dispatch(setLoading(false));
  };
};

export const signUp = (name, email, password, digit1, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        endpoints.SIGNUP_API,
        { email: email, name: name, password: password, otp: digit1 },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("signup done : ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      console.log("success");
      navigate("/login");
    } catch (error) {
      console.log("error while signing up", error);
    }
  };
};

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      console.log("REACT_APP_BASE_URL:", process.env.PUBLIC_URL);

      const response = await axios.post(endpoints.LOGIN_API, {
        email: email,
        password: password,
      });
      dispatch(setToken(response.data.token));
      dispatch(setLoading(false));
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/photos");
    } catch (error) {
      console.log("error while logging in", error);
    }
  };
};

export const logout = (navigate) => {
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
};
