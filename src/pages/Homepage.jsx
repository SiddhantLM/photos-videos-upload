import React from "react";
import Reasons from "../components/core/Homepage/Reasons";

const Homepage = () => {
  return (
    <div className="text-black  mt-12">
      <div className=" h-[calc(100vh-3.5rem)] w-3/4  flex mx-auto items-center justify-center flex-col">
        <h1 className="text-[#388087] text-xl md:text-6xl font-bold my-3 text-center">
          Welcome to MemoryMaker
        </h1>
        <h4 className="md:text-2xl text-lg mb-7 font-semibold">
          One stop destination for all your memories
        </h4>

        <p className="text-lg md:w-1/2 align contain-content font-medium">
          Capture and share your life’s precious moments easily with our
          platform. Whether it's photos, videos, or both, we make uploading and
          sharing a breeze!
        </p>
      </div>

      <div className="w-3/4 flex flex-col items-center pb-32 mx-auto">
        <h1 className="text-4xl text-[#388087] font-bold mb-12">
          Why choose MemoryMaker?
        </h1>

        <div className="flex flex-col gap-5 md:flex-row w-full">
          <Reasons
            className="max-w-1/3"
            heading={"Seamless Upload Experience"}
            content={
              "Upload photos and videos directly from your device with just a few clicks. No complicated steps or confusing menus — just a simple, intuitive process."
            }
          />
          <Reasons
            className="w-1/3"
            heading={"Secure and Private"}
            content={
              "Your memories are safe with us. We use top-tier encryption to ensure your data remains private and secure at all times."
            }
          />
          <Reasons
            className="max-w-1/3"
            heading={"Access Anywhere, Anytime"}
            content={
              "Access your uploaded content from any device, at any time. Whether you're on your desktop, tablet, or smartphone, your memories are always within reach."
            }
          />
        </div>
      </div>

      <div className="w-3/4 flex flex-col items-center pb-32 mx-auto">
        <h1 className="text-4xl text-[#388087] font-bold mb-12">
          How MemoryMaker Helps You
        </h1>

        <div className="flex flex-col gap-5 md:flex-row w-full">
          <Reasons
            className="max-w-1/3"
            heading={"Effortless Sharing"}
            content={
              "Share your photos and videos with friends, family, or the whole world in just a few clicks. No more hassle, just instant sharing."
            }
          />
          <Reasons
            className="w-1/3"
            heading={"Organized and Searchable Gallery"}
            content={
              "Easily organize your uploads into albums, add tags, and search by date or keyword, so you always find what you're looking for quickly."
            }
          />
          <Reasons
            className="max-w-1/3"
            heading={"Beautiful, Customizable Profiles"}
            content={
              "Create a profile that reflects your personality. Customize your gallery, add descriptions, and make it uniquely yours!"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
