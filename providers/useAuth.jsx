"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { loginWithGoogle } from "@/lib/firebase";
import { useGoogleLogin, useLogout, useGetProfile } from "@/hooks/useAuth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();
  
  const { data: profile, isSuccess } = useGetProfile();
  const googleLogin = useGoogleLogin();
  const logoutMutation = useLogout();

  useEffect(() => {
    if (isSuccess) {
      setUser(profile); // Set user from profile API
    }
  }, [profile, isSuccess]);

  const login = async () => {
    try {
      const idToken = await loginWithGoogle();
      const response = await googleLogin.mutateAsync(idToken);
      setUser(response);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setUser(null);
      queryClient.clear(); // Clear all queries on logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
