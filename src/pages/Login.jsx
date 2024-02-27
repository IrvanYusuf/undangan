import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { apiAuth } from "@/api/api";

const Login = () => {
  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState(null);

  const { setAuthToken, token } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formLogin);
    try {
      const response = await fetch(`${apiAuth}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          credentials: true,
        },
        body: JSON.stringify({
          username: formLogin.username,
          password: formLogin.password,
        }),
      });

      const data = await response.json();

      if (response.status === 400 || response.status === 401) {
        setErrMsg(data.message);
      }

      if (response.status === 200) {
        setAuthToken(data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center overflow-hidden">
      <form
        className="sm:w-[400px] w-[350px] border sm:px-8 px-8 py-16 rounded-md"
        onClick={handleLogin}
      >
        {errMsg && (
          <div className="bg-red-300 p-2 rounded-sm mb-3">{errMsg}</div>
        )}
        <div className="mb-4">
          <label htmlFor="username">Username</label>
          <Input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
