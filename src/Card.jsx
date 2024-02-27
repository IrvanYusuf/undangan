import React from "react";

const Card = ({ title, value, icon }) => {
  return (
    <div className="bg-white px-3 py-7 rounded-[18px] flex sm:flex sm:flex-row flex-col items-center gap-4 border border-slate-300">
      <div>
        <div className="w-[59px] h-[54px] bg-slate-200 flex justify-center items-center rounded-[6px]">
          <img src={icon} alt="" width={"80%"} height="100%" loading="lazy" />
        </div>
      </div>
      <div className="text-center sm:text-start">
        <h5>{title}</h5>
        <h6>{value}</h6>
      </div>
    </div>
  );
};

export default Card;
