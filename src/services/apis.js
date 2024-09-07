const BASE_URL = process.env.BASE_URL;

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-pass",
  RESETPASSWORD_API: BASE_URL + "/auth/forgot-pass",
};

export const imageEndpoints = {
  GET_ALL_IMAGES: BASE_URL + "/images/showAllImages",
  UPLOAD_IMAGES: BASE_URL + "/images/uploadImages",
  DELETE_IMAGES: BASE_URL + "/images/deleteImage",
};

export const videoEndpoints = {
  GET_ALL_VIDEOS: BASE_URL + "/videos/showAllImages",
  UPLOAD_VIDEOS: BASE_URL + "/videos/uploadVideos",
  DELETE_VIDEOS: BASE_URL + "/videos/deleteVideo",
};
