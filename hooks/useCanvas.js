import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API_BASE_URL from "@/lib/config";
import axiosContainer from "@/lib/axiosContainer";

const fetchCanvasStates = async () => {
  const { data } = await axiosContainer.get(`${API_BASE_URL}/api/canvas/`);
  return data;
};

const createCanvasState = async (canvasData) => {
  const { data } = await axiosContainer.post(`${API_BASE_URL}/api/canvas/`, canvasData);
  return data;
};

const fetchCanvasState = async (id) => {
  const { data } = await axiosContainer.get(`/api/canvas/${id}/`);

  // Reattach image URLs if stored
  if (data?.data?.elements) {
    data.data.elements = data.data.elements.map((el) => {
      if (el.type === "image" && el.imageUrl) {
        return { ...el, src: el.imageUrl }; // Set image URL as source
      }
      return el;
    });
  }

  return data;
};

const updateCanvasState = async ({ id, data }) => {
  const response = await axiosContainer.put(`${API_BASE_URL}/api/canvas/${id}/`, { data });
  return response.data;
};

const deleteCanvasState = async (id) => {
  await axiosContainer.delete(`${API_BASE_URL}/api/canvas/${id}/`);
};

// ✅ Fetch all canvas states
export const useGetCanvasStates = () => {
  return useQuery({
    queryKey: ["canvas"],
    queryFn: fetchCanvasStates,
  });
};

// ✅ Create a new canvas state
export const useCreateCanvasState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCanvasState,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["canvas"] });
    },
  });
};

export const useGetCanvasState = (id) => {
  return useQuery({
    queryKey: ["canvas", id],
    queryFn: () => fetchCanvasState(id),
    enabled: !!id, // Only fetch if id is available
  });
};

// ✅ Update a specific canvas state
export const useUpdateCanvasState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCanvasState,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["canvas"] });
    },
  });
};

// ✅ Delete a specific canvas state
export const useDeleteCanvasState = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCanvasState,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["canvas"] });
    },
  });
};
