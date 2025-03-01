import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchProfile = async () => {
  const { data } = await axios.get("/api/account/profile/");
  return data;
};

const updateProfile = async (profileData) => {
  const { data } = await axios.put("/api/account/profile/", profileData);
  return data;
};

export const useGetProfile = () => {
  return useQuery(["profile"], fetchProfile);
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
};
