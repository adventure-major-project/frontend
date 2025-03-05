import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosContainer from "@/lib/axiosContainer";
import API_BASE_URL from "@/lib/config";

export const useBackgrounds = () => {
  console.log("Fetching backgrounds...");
  return useQuery({
    queryKey: ["backgrounds"],
    queryFn: async () => {
      try {
        const response = await axiosContainer.get(`${API_BASE_URL}/api/bg/`);
        console.log("Backgrounds Response:", response.data); // Debug
        return response.data;
      } catch (error) {
        console.error("Error fetching backgrounds:", error);
        throw error;
      }
    },
  });
};

export const useProducts = () => {
  console.log("Fetching products...");
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await axiosContainer.get(`${API_BASE_URL}/api/prod/`);
        console.log("Products Response:", response.data); // Debug
        return response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
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

      const payload = { campaign, text };

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

      const payload = { campaign, text };

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
