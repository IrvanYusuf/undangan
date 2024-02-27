import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import { ChevronLeft, LayoutGrid, LogOut, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useWindowWidth } from "@react-hook/window-size";

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onlyWidth = useWindowWidth();

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (onlyWidth < 431) setIsOpen(true);
  }, [onlyWidth]);
  return (
    // <TooltipProvider>
    <div
      className={`relative z-50 h-screen ${
        isOpen ? "w-[76px]" : "w-64"
      } bg-white`}
    >
      <div
        className={`pt-4 fixed ${
          isOpen ? "w-[76px]" : "w-64"
        } bg-white h-screen`}
      >
        <div
          className={`absolute top-7 -right-4 z-50 border-2 bg-white border-primary p-2 border- rounded-full cursor-pointer sm:block hidden`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronLeft
            className={`${isOpen ? "rotate-180 duration-500" : "duration-500"}`}
          />
        </div>
        <div className={`flex items-center justify-center gap-x-3`}>
          <img src={Logo} alt="logo" width={"50px"} height={"50px"} />
          <h1
            className={`text-2xl origin-left duration-300 font-medium ${
              isOpen && "hidden"
            }`}
          >
            Manage
          </h1>
        </div>
        <div className="mt-8">
          <ul className="px-2">
            {/* <Tooltip> */}
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-950 text-white flex md:justify-start justify-center gap-x-2 p-4 origin-left rounded-md duration-200"
                  : "text-black flex gap-x-2 p-4 origin-left md:justify-start justify-center duration-200"
              }
            >
              <LayoutGrid data-state="closed" />
              <span className={`font-medium ${isOpen && "hidden"}`}>
                Dashboard
              </span>
            </NavLink>
            <NavLink
              to={"/users"}
              className={({ isActive }) =>
                isActive
                  ? "bg-slate-950 text-white flex md:justify-start justify-center gap-x-2 p-4 origin-left rounded-md"
                  : "text-black flex gap-x-2 p-4 origin-left md:justify-start justify-center"
              }
            >
              <Users data-state="closed" />
              <span
                className={`font-medium ${isOpen && "hidden"} duration-200`}
              >
                Users
              </span>
            </NavLink>
            <NavLink
              className={"flex gap-x-2 p-4 origin-left"}
              onClick={handleLogout}
            >
              <LogOut className="rotate-180" />
              <span className={`font-medium ${isOpen && "hidden"}`}>
                LogOut
              </span>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
    // </TooltipProvider>
  );
};

export default SideNavbar;
