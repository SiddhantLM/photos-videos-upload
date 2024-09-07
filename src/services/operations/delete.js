import axios from "axios";
import { setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/userSlice";
import { imageEndpoints, videoEndpoints } from "../apis";

export const deleteImage = (email, imageId, token) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        imageEndpoints.DELETE_IMAGES,
        {
          email: email,
          imageId: imageId,
        },
        {
          headers: { "Content-Type": "application/json" },
          params: { token: token },
        }
      );

      if (!response) {
        throw new Error("response not recieved");
      }
      console.log(response);
      dispatch(setUser(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.log("error while deleting on frontend", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const deleteVideo = (email, videoId, token) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        videoEndpoints.DELETE_VIDEOS,
        {
          email: email,
          videoId: videoId,
        },
        {
          headers: { "Content-Type": "application/json" },
          params: { token: token },
        }
      );

      if (!response) {
        throw new Error("response not recieved");
      }
      dispatch(setUser(response.data.user));
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.log("error while deleting on frontend", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};
