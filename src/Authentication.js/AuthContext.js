import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (token) {
      localStorage.setItem("jwtToken", token);
    } else {
      localStorage.removeItem("jwtToken");
    }
  }, [token]);

  const logout = () => {
    console.log("logout");
    setToken(null); // Clear the token
    localStorage.removeItem("jwtToken"); // Clear from localStorage
    navigate("/login"); // Redirect to login
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
