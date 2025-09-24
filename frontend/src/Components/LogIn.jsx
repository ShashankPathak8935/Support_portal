import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function LogIn() {
  const [userdata, setUserData] = useState({
    username: "",
    password: "",
  });

  // handle change
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle login
  const handleLogIn = async () => {
    const url = "http://localhost:8000/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userdata.username,
          password: userdata.password,
        }),
      });

      if (!response.ok) {
        const errordata = await response.json();
        throw new Error(`Response status:${errordata.message}`);
      } else {
        const responseData = await response.json();
        console.log("Login successful:", responseData.message);
        naviagte("/dashboard");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/loginbackgroundimage.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded shadow-md w-100 flex flex-col items-center">
        <img
          src="companylogo.jpeg"
          alt="Company Logo"
          className="mb-4 w-100 h-50"
        />
        <h1 className="text-lg font-bold mb-6 ">Issue Log</h1>
        <input
          type="text"
          id="username"
          name="username"
          value={userdata.username}
          onChange={handleOnchange}
          placeholder="Username"
          className="border border-gray-300 w-full p-2 mb-4 rounded"
        />
        <input
          type="password"
          id="password"
          name="password"
          value={userdata.password}
          placeholder="Password"
          onChange={handleOnchange}
          className="border border-gray-300 w-full p-2 mb-4 rounded"
        />
        <button
          onClick={handleLogIn}
          className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600"
        >
          Log In
        </button>
        <div>
          <Link to="/signup" className="text-blue-500 hover:underline mt-4">
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
