import SideNavbar from "@/components/organism/SideNavbar";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex">
      <div className="border">
        <SideNavbar />
      </div>
      <div className="flex-1 py-28 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
