import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosContainer from "@/lib/axiosContainer";
const fetchCanvasStates = async () => {
  const { data } = await axiosContainer.get("/api/canvas/");
  return data;
};

const createCanvasState = async (canvasData) => {
  const { data } = await axiosContainer.post("/api/canvas/", canvasData);
  return data;
};

const fetchCanvasState = async (id) => {
  const { data } = await axiosContainer.get(`/api/canvas/${id}/`);
  return data;
};

const updateCanvasState = async ({ id, data }) => {
  const response = await axiosContainer.put(`/api/canvas/${id}/`, { data });
  return response.data;
};

const deleteCanvasState = async (id) => {
  await axiosContainer.delete(`/api/canvas/${id}/`);
};

export const useGetCanvasStates = () => {
  return useQuery(["canvas"], fetchCanvasStates);
};

export const useCreateCanvasState = () => {
  const queryClient = useQueryClient();
  return useMutation(createCanvasState, {
    onSuccess: () => {
      queryClient.invalidateQueries(["canvas"]);
    },
  });
};

export const useGetCanvasState = (id) => {
  return useQuery(["canvas", id], () => fetchCanvasState(id), {
    enabled: !!id,
  });
};

export const useUpdateCanvasState = () => {
  const queryClient = useQueryClient();
  return useMutation(updateCanvasState, {
    onSuccess: () => {
      queryClient.invalidateQueries(["canvas"]);
    },
  });
};

export const useDeleteCanvasState = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCanvasState, {
    onSuccess: () => {
      queryClient.invalidateQueries(["canvas"]);
    },
  });
};
