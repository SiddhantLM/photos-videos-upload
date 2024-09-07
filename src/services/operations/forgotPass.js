import axios from "axios";
import { setLoading } from "../../slices/authSlice";
import { endpoints } from "../apis";

export const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      console.log(email);
      const response = await axios.post(endpoints.RESETPASSTOKEN_API, {
        email: email,
      });

      console.log(response);
      dispatch(setLoading(false));
    } catch (error) {
      throw new Error("error while sending mail", error);
    }
  };
};

export const resetPass = (password, token, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      console.log(password, " token: ", token);
      const response = await axios.post(endpoints.RESETPASSWORD_API, {
        password: password,
        token: token,
      });

      console.log(response);
      dispatch(setLoading(false));
      navigate("/login");
    } catch (error) {
      throw new Error("error while resetting pass", error);
    }
  };
};
