"use client";
import { useAuth } from "@/providers/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthButton from "@/app/_components/AuthButton";

export default function AuthPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/profile");
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white relative">
      {/* Go Home Button */}
      <button
        className="absolute top-6 left-6 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        onClick={() => router.push("/")}
      >
        ← Go Home
      </button>

      <h1 className="text-3xl font-bold mb-6">Welcome to AdVenture</h1>
      <p className="mb-4">Sign in to continue</p>
      <AuthButton />
    </div>
  );
}
