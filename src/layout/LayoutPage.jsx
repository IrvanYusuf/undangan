import Header from "@/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutPage;
