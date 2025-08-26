import React, { useState } from "react";

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
    const url = "http://localhost:8000";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: {
          username: userdata.username,
          password: userdata.password,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status:${response.status}`);
      }
    } catch (error) {
      console.error("error in handle login", error.message);
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
      </div>
    </div>
  );
}
