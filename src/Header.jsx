import React from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-white sm:px-8 px-2 py-8 fixed top-0 w-full z-10"></div>
  );
};

export default Header;
