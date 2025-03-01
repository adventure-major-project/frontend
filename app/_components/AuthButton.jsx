"use client";

import { useState } from "react";
import { signInWithGoogle, logout } from "@/lib/firebase";
import axios from "axios";

const AuthButton = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const token = await signInWithGoogle();
    if (token) {
    console.log("Token:", token);
      const response = await axios.post("/api/account/google/", { id_token: token });
      console.log("Backend Response:", response.data);
      setUser(response.data);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
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
