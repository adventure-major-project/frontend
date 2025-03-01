"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query-client";

export default function Wrapper({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}