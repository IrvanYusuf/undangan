import React from "react";

const Status = ({ text }) => {
  return (
    <div
      className={`${
        text === "Selesai"
          ? "bg-status-success text-status-colorSuccess"
          : "bg-status-failed text-status-colorFailed"
      } px-4 rounded-md font-semibold md:w-auto w-fit`}
    >
      {text}
    </div>
  );
};

export default Status;
