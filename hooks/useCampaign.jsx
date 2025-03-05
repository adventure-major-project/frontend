import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchCampaigns = async () => {
  const { data } = await axios.get("/api/campaign/");
  return data;
};

const createCampaign = async (campaignData) => {
  const { data } = await axios.post("/api/campaign/", campaignData);
  return data;
};

const fetchCampaign = async (id) => {
  const { data } = await axios.get(`/api/campaign/${id}/`);
  return data;
};

const updateCampaign = async ({ id, ...campaignData }) => {
  const { data } = await axios.put(`/api/campaign/${id}/`, campaignData);
  return data;
};

const deleteCampaign = async (id) => {
  await axios.delete(`/api/campaign/${id}/`);
};

export const useGetCampaigns = () => {
  return useQuery(["campaigns"], fetchCampaigns);
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCampaign, // <-- Correct usage for latest React Query versions
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};

export const useGetCampaign = ({id}) => {
  return useQuery(["campaign", id], () => fetchCampaign(id), {
    enabled: !!id,
  });
};

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCampaign, {
    onSuccess: () => {
      queryClient.invalidateQueries(["campaigns"]);
    },
  });
};

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCampaign, {
    onSuccess: () => {
      queryClient.invalidateQueries(["campaigns"]);
    },
  });
};