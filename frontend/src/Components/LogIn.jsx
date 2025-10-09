import React, { useState } from "react";
import { Link } from "react-router-dom";
import { USER_API } from "../api/api";
import { useNavigate } from "react-router-dom";
import { logInValidation } from "../validations/userValidation";
import { useAuth } from "../context/AuthContext";


export default function LogIn() {
  const { setAuthenticated, setAuthenticatedUser } = useAuth();
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({
    email: "",
    password: "",
  });
const [errors, setErrors] = React.useState({});
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
    const url = `${USER_API}/login`;
    try {
      await logInValidation.validate(userdata, {
        abortEarly: false,
      });
      setErrors({});
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userdata.email,
          password: userdata.password,
        }),
        credentials: "include", // include cookies in the request
      });

      if (!response.ok) {
        const errordata = await response.json();
        throw new Error(`Response status:${errordata.message}`);
      } else {
        const responseData = await response.json();
        console.log("Login successful:", responseData.message);
        localStorage.setItem("accessToken", responseData.data.accessToken);
        sessionStorage.setItem("accessToken", responseData.data.accessToken);
         localStorage.setItem("user",JSON.stringify(responseData.data.userData));
        sessionStorage.setItem("user", JSON.stringify(responseData.data.userData));
        setAuthenticated(true);
        setAuthenticatedUser(responseData.data.userData);
        
        navigate("/home");
      }
    } catch (error) {
      console.error(error.message);
      if (error.name === "ValidationError") {
        const formattedErrors = {};
        error.inner.forEach((e) => {
          formattedErrors[e.path] = e.message;
        });
        setErrors(formattedErrors);
      } else {
        console.error("API Error", error);
      }
    } finally {
      console.error("finally block executed");
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
          type="email"
          id="user_email"
          name="email"
          value={userdata.email}
          onChange={handleOnchange}
          placeholder="email"
          className="border border-gray-300 w-full p-2 mb-4 rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <input
          type="password"
          id="password"
          name="password"
          value={userdata.password}
          placeholder="Password"
          onChange={handleOnchange}
          className="border border-gray-300 w-full p-2 mb-4 rounded"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
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
