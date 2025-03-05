import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosContainer from "@/lib/axiosContainer";
import API_BASE_URL from "@/lib/config";

const fetchProfile = async () => {
  const { data } = await axiosContainer.get(`${API_BASE_URL}/api/account/profile/`);
  return data;
};

const updateProfile = async (profileData) => {
  const { data } = await axiosContainer.put(`${API_BASE_URL}/api/account/profile/`, profileData);
  return data;
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};
