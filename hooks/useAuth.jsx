import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { signInWithPopup, auth, provider } from "@/lib/firebase";

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken();
  return idToken;
};


const googleLogin = async (idToken) => {
  const { data } = await axios.post("/api/account/google/", { id_token: idToken });
  return data;
};

const logout = async () => {
  await axios.post("/api/account/logout/");
};

const logoutAll = async () => {
  await axios.post("/api/account/logout-all/");
};

const hardcodedLogin = async () => {
  const { data } = await axios.post("/api/account/hardcoded-login/");
  return data;
};

export const useGoogleLogin = () => {
  return useMutation(googleLogin);
};

export const useLogout = () => {
  return useMutation(logout);
};

export const useLogoutAll = () => {
  return useMutation(logoutAll);
};

export const useHardcodedLogin = () => {
  return useMutation(hardcodedLogin);
};
