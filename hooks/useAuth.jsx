import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosContainer from "@/lib/axiosContainer";
import axios from "axios";
import API_BASE_URL from "@/lib/config";

const fetchProfile = async () => {
  const { data } = await axiosContainer.get(`${API_BASE_URL}/api/account/profile/`);
  return data;
};

const updateProfile = async (profileData) => {
  const { data } = await axiosContainer.put(`${API_BASE_URL}/api/account/profile/`, profileData);
  return data;
};

const googleLogin = async (idToken) => {
  const { data } = await axios.post(`${API_BASE_URL}/api/account/google/`, { id_token: idToken });
  return data;
};

const logout = async () => {
  await axiosContainer.post(`${API_BASE_URL}/api/account/logout/`);
};

export const useGetProfile = () => {
  return useQuery({ queryKey: ["profile"], queryFn: fetchProfile });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: updateProfile, onSuccess: () => queryClient.invalidateQueries(["profile"]) });
};

export const useGoogleLogin = () => {
  return useMutation({ mutationFn: googleLogin });
};

export const useLogout = () => {
  return useMutation({ mutationFn: logout });
};
