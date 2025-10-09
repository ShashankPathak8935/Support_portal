import React, { createContext, useState, useEffect } from "react";
import { USER_API } from "../api/api";

export const AuthContext = createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [authenticatedUser, setAuthenticatedUser] = React.useState(null);

  const logout = async () => {
    try {
      const url = `${USER_API}/logout`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            localStorage.getItem("accessToken") ||
            sessionStorage.getItem("accessToken")
          }`,
        },
        credentials: "include", // include cookies in the request
      });

      if (!response.ok) {
        const errordata = await response.json();
        throw new Error(`Response status: ${errordata.message}`);
      }

      const responseData = await response.json();
      console.log("Logout successful:", responseData.message);

      // Clear storage and reset user context
      localStorage.clear();
      sessionStorage.clear();
      setAuthenticatedUser(null);
      setAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      // Always clear storage to ensure logout completes safely
      localStorage.clear();
      sessionStorage.clear();
      setAuthenticatedUser(null);
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    const storedUser =
      localStorage.getItem("user") || sessionStorage.getItem("user");
   if (token && storedUser) {
     setAuthenticated(true);
     setAuthenticatedUser(JSON.parse(storedUser));
   }else {
     setAuthenticated(false);
     setAuthenticatedUser(null);
   }
  }, []); // Run only once on component mount

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        authenticatedUser,
        setAuthenticatedUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
