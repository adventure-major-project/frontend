import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API_BASE_URL from "@/lib/config";
import axiosContainer from "@/lib/axiosContainer";

const fetchCampaigns = async () => {
  const { data } = await axiosContainer.get(`${API_BASE_URL}/api/campaign/`);
  return data;
};

const createCampaign = async (campaignData) => {
  const { data } = await axiosContainer.post(`${API_BASE_URL}/api/campaign/`, campaignData);
  return data;
};

const fetchCampaign = async (id) => {
  const { data } = await axiosContainer.get(`${API_BASE_URL}/api/campaign/${id}/`);
  return data;
};

const updateCampaign = async ({ id, ...campaignData }) => {
  const { data } = await axiosContainer.put(`${API_BASE_URL}/api/campaign/${id}/`, campaignData);
  return data;
};

const deleteCampaign = async (id) => {
  await axiosContainer.delete(`${API_BASE_URL}/api/campaign/${id}/`);
};

// ✅ Fetch all campaigns
export const useGetCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });
};

// ✅ Fetch a single campaign
export const useGetCampaign = (id) => {
  return useQuery({
    queryKey: ["campaign", id],
    queryFn: () => fetchCampaign(id),
    enabled: !!id, // Prevents running without an ID
  });
};

// ✅ Create a new campaign
export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};

// ✅ Update a campaign
export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};

// ✅ Delete a campaign
export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};
