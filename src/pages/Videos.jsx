import React, { useEffect, useState } from "react";
import Gallery from "../components/core/Photos/Gallery";
import Uploader from "../components/common/Uploader";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideos } from "../services/operations/upload";

import { CircularProgress } from "@mui/material";
import { deleteVideo } from "../services/operations/delete";

const Photos = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const user = useSelector((state) => state.user);
  const { token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(user.user.Videos);
  }, [user]);

  const handleOnUpload = (files) => {
    dispatch(uploadVideos(user.email, files, token));
  };

  const [galleryWidth, setGalleryWidth] = useState(width >= 768 ? "md" : "sm");

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setGalleryWidth(width >= 768 ? "md" : "sm");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const handleOnDelete = (id) => {
    dispatch(deleteVideo(user.user.email, id, token));
    setVideos(user.user.Images);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col w-3/4 mx-auto pb-10">
      {loading ? (
        <div className="flex items-center justify-center h-[100vh]">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className=" text-center mx-auto text-2xl mb-[1rem] mt-[64px] md:mt-[2rem] text-[#388087] font-bold">
            Welcome to your video gallery{" "}
          </div>

          <div className="flex flex-col mx-auto ">
            <h1>Your Videos</h1>
            <Gallery
              width={galleryWidth === "md" ? 600 : 250}
              mediaAPI={videos.length > 0 ? videos : null}
              mediaType={"videos"}
              handleOnDelete={handleOnDelete}
            />
          </div>

          <div className="flex flex-col mx-auto ">
            <h1 className="md:text-xl text-[#388087] mb-10 font-bold mt-10 ">
              Upload your photos
            </h1>

            <Uploader handleOnUpload={handleOnUpload} mediaType={"videos"} />
          </div>
        </>
      )}
    </div>
  );
};

export default Photos;
