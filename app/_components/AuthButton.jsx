"use client";
import API_BASE_URL from "@/lib/config";
import { useState } from "react";
import { loginWithGoogle, logout } from "@/lib/firebase"; // Use correct function
import axios from "axios";

const AuthButton = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const token = await loginWithGoogle(); // Corrected function name
      if (token) {
        console.log("Token:", token);
        const response = await axios.post(`${API_BASE_URL}/api/account/google/`, { id_token: token });
        console.log("Backend Response:", response.data);
        setUser(response.data);
      }
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return user ? (
    <button onClick={handleLogout} className="p-2 bg-red-500 text-white">
      Logout
    </button>
  ) : (
    <button onClick={handleLogin} className="p-2 bg-blue-500 text-white">
      Login with Google
    </button>
  );
};

export default AuthButton;
