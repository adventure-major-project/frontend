import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosContainer from "@/lib/axiosContainer";
const fetchProfile = async () => {
  const { data } = await axiosContainer.get("/api/account/profile/");
  return data;
};

const updateProfile = async (profileData) => {
  const { data } = await axiosContainer.put("/api/account/profile/", profileData);
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
