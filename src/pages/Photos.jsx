import React, { useEffect, useState } from "react";
import Gallery from "../components/core/Photos/Gallery";
// import Upload from "../components/common/Upload";
import { useDispatch, useSelector } from "react-redux";
import Uploader from "../components/common/Uploader";
import { uploadImages } from "../services/operations/upload";
import { CircularProgress } from "@mui/material";
import { deleteImage } from "../services/operations/delete";

const Photos = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const user = useSelector((state) => state.user);
  const { token, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [galleryWidth, setGalleryWidth] = useState(width >= 768 ? "md" : "sm");

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setGalleryWidth(width >= 768 ? "md" : "sm");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const [images, setImages] = useState([]);

  const handleOnUpload = (files) => {
    dispatch(uploadImages(user.email, files, token));
  };

  useEffect(() => {
    setImages(user.user.Images);
  }, [user]);

  const handleOnDelete = (id) => {
    dispatch(deleteImage(user.user.email, id, token));
    setImages(user.user.Images);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col w-3/4 mx-auto pb-10">
      {loading ? (
        <div className="flex items-center justify-center h-[100vh]">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className=" text-center mx-auto text-2xl mt-[2rem] mb-[1.5rem] text-[#388087] font-bold">
            Welcome {user.user.name} to your Photo gallery{" "}
          </div>

          <div className="flex flex-col mx-auto">
            <h1>Your Photos</h1>
            <Gallery
              width={galleryWidth === "md" ? 600 : 250}
              mediaAPI={images}
              mediaType={"images"}
              handleOnDelete={handleOnDelete}
            />
          </div>

          <div className="flex flex-col mx-auto ">
            <h1 className="my-5 md:my-10 md:text-xl text-[#388087] font-bold mt-10 ">
              Upload your photos
            </h1>

            {/* <Upload mediaType={"image"} /> */}

            <Uploader handleOnUpload={handleOnUpload} mediaType={"images"} />
          </div>
        </>
      )}
    </div>
  );
};

export default Photos;
