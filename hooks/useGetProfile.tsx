import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchData = async () => {
  const { data } = await axios.get("/api/profile");
  return data;
};

export const useFetchData = () => {
  return useQuery("data", fetchData);
};