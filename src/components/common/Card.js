import React from "react";

const Card = ({ icon, heading, content }) => {
  return (
    <div className=" transition-all duration-200 flex flex-col items-center bg-white rounded-md in-h-[200px] md:min-h-[300px] p-4 shadow-xl hover:shadow-2xl hover:border-b-4 hover:border-[#388087] hover:scale-105">
      {icon && <img src={icon} alt="" />}
      <h1 className="text-2xl p-2 font-semibold text-[#388087]">{heading}</h1>
      <p className="mt-4">{content}</p>
    </div>
  );
};

export default Card;
