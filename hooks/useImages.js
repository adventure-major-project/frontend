import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosContainer from "@/lib/axiosContainer";
import API_BASE_URL from "@/lib/config";

export const useBackgrounds = (campaignId) => {
  return useQuery({
    queryKey: ["backgrounds"],
    queryFn: async () => {
      try {
        const response = await axiosContainer.get(`${API_BASE_URL}/api/campaign/${campaignId}/bgs/`);
        return response.data;
      } catch (error) {
        console.error("Error fetching backgrounds:", error);
        throw error;
      }
    },
    enabled: !!campaignId,
  });
};

export const useProducts = (campaignId) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await axiosContainer.get(`${API_BASE_URL}/api/campaign/${campaignId}/prods/`);
        return response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
    enabled: !!campaignId,
  });
};

// Upload Background Text (POST text)
export const useUploadBackgroundText = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ campaign, text }) => {
      if (!campaign || !text.trim()) {
        throw new Error("Missing campaign or text data");
      }

      const payload = { campaign, prompt: text };

      try {
        const response = await axiosContainer.post(`${API_BASE_URL}/api/bg/`, payload, {
          headers: { "Content-Type": "application/json" },
        });
        return response.data;
      } catch (error) {
        console.error("Upload Background Text Error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["backgrounds"]);
    },
  });
};



// Upload Product Text (POST text)
export const useUploadProductText = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ campaign, text }) => {
      if (!campaign || !text.trim()) {
        throw new Error("Missing campaign or text data");
      }

      const payload = { campaign, prompt: text };

      try {
        const response = await axiosContainer.post(`${API_BASE_URL}/api/prod/`, payload, {
          headers: { "Content-Type": "application/json" },
        });
        return response.data;
      } catch (error) {
        console.error("Upload Product Text Error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useDeleteBackground = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!id) {
        console.error("No ID provided for deletion");
        return;
      }

      console.log(`Deleting Background ID: ${id}`); // Debugging

      try {
        const response = await axiosContainer.delete(`${API_BASE_URL}/api/bg/${id}/`);
        console.log("Delete Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Delete Background Error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["backgrounds"]);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!id) {
        console.error("Missing product ID");
        return;
      }

      try {
        const response = await axiosContainer.delete(`${API_BASE_URL}/api/prod/${id}/`);
        console.log("Delete Product Success:", response.data);
        return response.data;
      } catch (error) {
        console.error("Delete Product Error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

export const useUploadProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ campaignId, image }) => {
      if (!campaignId || !image) {
        throw new Error("Missing campaign ID or image file");
      }

      const formData = new FormData();
      formData.append('image', image);
      formData.append('campaign', campaignId);

      try {
        const response = await axiosContainer.post(`${API_BASE_URL}/api/prod/upload/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("Upload Image Success:", response.data);
        return response.data;
      } catch (error) {
        console.error("Upload Image Error:", error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['products', variables.campaignId]);
      console.log('Image uploaded successfully');
    },
  });
};
