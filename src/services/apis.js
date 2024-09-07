const REACT_BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
  SENDOTP_API: REACT_BASE_URL + "/auth/sendotp",
  SIGNUP_API: REACT_BASE_URL + "/auth/signup",
  LOGIN_API: `${REACT_BASE_URL}/auth/login`,
  RESETPASSTOKEN_API: REACT_BASE_URL + "/auth/reset-pass",
  RESETPASSWORD_API: REACT_BASE_URL + "/auth/forgot-pass",
};

export const imageEndpoints = {
  GET_ALL_IMAGES: REACT_BASE_URL + "/images/showAllImages",
  UPLOAD_IMAGES: REACT_BASE_URL + "/images/uploadImages",
  DELETE_IMAGES: REACT_BASE_URL + "/images/deleteImage",
};

export const videoEndpoints = {
  GET_ALL_VIDEOS: REACT_BASE_URL + "/videos/showAllImages",
  UPLOAD_VIDEOS: REACT_BASE_URL + "/videos/uploadVideos",
  DELETE_VIDEOS: REACT_BASE_URL + "/videos/deleteVideo",
};
