import axios from "axios";
import { setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/userSlice";
import { imageEndpoints, videoEndpoints } from "../apis";

export const uploadImages = (email, files, token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const formData = new FormData();

      // Append each file to the form data
      files.forEach(async (file) => {
        formData.append("imageFile", file);
      });
      formData.append("email", `${email}`);
      const response = await axios.post(
        imageEndpoints.UPLOAD_IMAGES,
        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`, // Include token if needed
          },
          params: {
            token,
          },
        }
      );
      if (!response) {
        throw new Error("error while uploading images");
      }
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log("error while uploading", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const uploadVideos = (email, files, token) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const formData = new FormData();
      // Append each file to the form data
      files.forEach((file) => {
        formData.append("videoFile", file);
      });
      formData.append("email", `${email}`);
      const response = await axios.post(
        videoEndpoints.UPLOAD_VIDEOS,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Authorization: `Bearer ${token}`, // Include token if needed
          },
          params: {
            token,
          },
        }
      );
      if (!response) {
        throw new Error("error while uploading images");
      }
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log("error while uploading", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};
