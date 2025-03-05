"use client";
import { useAuth } from "@/providers/useAuth";

const AuthButton = () => {
  const { user, login, logout } = useAuth();

  return user ? (
    <button onClick={logout} className="p-2 bg-red-500 text-white rounded-md flex items-center gap-2">
      Logout
    </button>
  ) : (
    <button onClick={login} className="p-2 bg-white text-black rounded-md flex items-center gap-2">
      <img src="/google.png" width={24} height={24}/> Login with Google
    </button>
  );
};

export default AuthButton;
